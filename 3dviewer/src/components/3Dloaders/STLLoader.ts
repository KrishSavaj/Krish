import * as THREE from 'three';
import { STLLoader } from 'three/addons/loaders/STLLoader.js';

/**
 * @param modelDetails - An object containing the path, position, rotation, and isTop properties.
 * @param pcbDepth - The depth of the PCB plane.
 * @returns A Promise that resolves with the loaded STL model.
 */

interface ModelDetails {
  path: string;
  position: { x: number; z: number };
  rotation: { x: number; y: number; z: number };
  isTop: boolean;
}

export function loadSTLModel(
  modelDetails: ModelDetails,
  pcbDepth: number
): Promise<THREE.Object3D> {
  const { path, position, rotation, isTop } = modelDetails;
  const stlLoader = new STLLoader();

  return new Promise((resolve, reject) => {
    stlLoader.load(
      path,
      (geometry) => {
        const material = new THREE.MeshStandardMaterial({ color: 0xaaaaaa });
        const mesh = new THREE.Mesh(geometry, material);
        mesh.rotateX(Math.PI * rotation.x);
        mesh.rotateY(Math.PI * rotation.y);
        mesh.rotateZ(Math.PI * rotation.z);
        const stlBBox = new THREE.Box3().setFromObject(mesh);
        const stlMinY = stlBBox.min.z;
        const yPosition = isTop ? -stlMinY + pcbDepth : stlMinY;
        mesh.position.set(position.x, yPosition, position.z);
        mesh.scale.set(1, 1, 1);
        resolve(mesh);
      },
      undefined,
      (error) => reject(`Error loading STL model: ${error}`)
    );
  });
}
