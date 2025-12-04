import * as THREE from 'three';
import { VRMLLoader } from 'three/examples/jsm/loaders/VRMLLoader.js';

/**
 * @param modelDetails - An object containing the path, position, rotation, and isTop properties.
 * @param pcbDepth - The depth of the PCB plane.
 * @returns A Promise that resolves with the loaded VRML model.
 */

interface ModelDetails {
  path: string;
  position: { x: number; z: number };
  rotation: { x: number; y: number; z: number };
  isTop: boolean;
}

export function loadWRLModel(
  modelDetails: ModelDetails,
  pcbDepth: number
): Promise<THREE.Object3D> {
  const { path, position, rotation, isTop } = modelDetails;
  const vrmlLoader = new VRMLLoader();

  return new Promise((resolve, reject) => {
    vrmlLoader.load(
      path,
      (object) => {
        const wrlBBox = new THREE.Box3().setFromObject(object);
        object.rotation.x = Math.PI * rotation.x;
        object.rotation.y = Math.PI * rotation.y;
        object.rotation.z = Math.PI * rotation.z;
        const wrlMinY = wrlBBox.min.z;
        const yPosition = isTop ? -wrlMinY + pcbDepth : wrlMinY;
        object.position.set(position.x, yPosition, position.z);
        object.scale.set(1, 1, 1);
        resolve(object);
      },
      undefined,
      (error) => reject(`Error loading WRL model: ${error}`)
    );
  });
}
