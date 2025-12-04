import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

/**
 * @param modelDetails - An object containing the path, position, rotation, and isTop properties.
 * @param pcbDepth - The depth of the PCB plane.
 * @returns A Promise that resolves with the loaded GLTF model.
 */

interface ModelDetails {
  path: string;
  position: { x: number; z: number };
  rotation: { x: number; y: number; z: number };
  isTop: boolean;
}

export function loadGLTFModel(
  modelDetails: ModelDetails,
  pcbDepth: number
): Promise<THREE.Object3D> {
  const { path, position, rotation, isTop } = modelDetails;
  const gltfLoader = new GLTFLoader();

  return new Promise((resolve, reject) => {
    gltfLoader.load(
      path,
      (gltf) => {
        const model = gltf.scene;
        model.rotation.x = Math.PI * rotation.x;
        model.rotation.y = Math.PI * rotation.y;
        model.rotation.z = Math.PI * rotation.z;
        const bbox = new THREE.Box3().setFromObject(model);
        const minY = bbox.min.z;
        const yLength = bbox.max.z - bbox.min.z;
        const yPosition = isTop ? minY : -yLength / 2 - minY + pcbDepth;
        model.position.set(position.x, yPosition, position.z);
        model.scale.set(1, 1, 1);
        resolve(model);
      },
      undefined,
      (error) => reject(`Error loading GLTF/GLB model: ${error}`)
    );
  });
}
