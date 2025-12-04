import * as THREE from 'three';
import { OBJLoader } from 'three/addons/loaders/OBJLoader.js';

/**
 * @param modelDetails - An object containing the path, position, rotation, and isTop properties.
 * @param pcbDepth - The depth of the PCB plane.
 * @returns A Promise that resolves with the loaded OBJ model.
 */

interface ModelDetails {
  path: string;
  position: { x: number; z: number };
  rotation: { x: number; y: number; z: number };
  isTop: boolean;
}

export function loadOBJModel(
  modelDetails: ModelDetails,
  pcbDepth: number
): Promise<THREE.Object3D> {
  const { path, position, rotation, isTop } = modelDetails;
  const objLoader = new OBJLoader();

  return new Promise((resolve, reject) => {
    objLoader.load(
      path,
      (object) => {
        const objBBox = new THREE.Box3().setFromObject(object);
        object.rotation.x = Math.PI * rotation.x;
        object.rotation.y = Math.PI * rotation.y;
        object.rotation.z = Math.PI * rotation.z;
        const objMinY = objBBox.min.z;
        const yPosition = isTop ? -objMinY + pcbDepth : objMinY;
        object.position.set(position.x, yPosition, position.z);
        object.scale.set(1, 1, 1);
        resolve(object);
      },
      undefined,
      (error) => reject(`Error loading OBJ model: ${error}`)
    );
  });
}
