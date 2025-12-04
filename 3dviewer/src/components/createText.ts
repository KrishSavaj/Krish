// createText.ts is a new file that contains the createText function. This function creates text meshes based on the TextConfig array and adds them to the scene. The TextConfig array contains objects with text, position, angle, size, and isTop properties. The createText function returns a Promise that resolves when the text is added to the scene.

import * as THREE from 'three';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js';

/**
 * @param scene - The Three.js scene where the text will be added.
 * @param TextConfig - An array of objects containing text strings and positions.
 * @param pcbDepth - The depth of the PCB plane.
 */

interface TextConfig {
  text: string;
  position: { x: number; z: number };
  angle: number;
  size: number;
  isTop: boolean;
}

export function createText(
  scene: THREE.Scene,
  TextConfig: TextConfig[],
  pcbDepth: number
): Promise<void> {
  const fontLoader = new FontLoader();
  const fontUrl = 'https://threejs.org/examples/fonts/helvetiker_regular.typeface.json';

  return new Promise((resolve, reject) => {
    fontLoader.load(fontUrl, (font) => {
      const textPromises = TextConfig.map(({ text: message, position, angle, size, isTop }) => {
        return new Promise<THREE.Mesh>((resolveText) => {
          const textGeometry = new TextGeometry(message, {
            font: font,
            size: size,
            height: 0.15,
            curveSegments: 15,
          });

          const textMaterial = new THREE.MeshStandardMaterial({ color: 0xffffff });
          const textMesh = new THREE.Mesh(textGeometry, textMaterial);

          textMesh.rotateX(-Math.PI / 2);
          textMesh.rotateZ(Math.PI * angle);

          const yPosition = isTop ? pcbDepth : -0.15;
          textMesh.position.set(position.x, yPosition, position.z);

          if (!isTop) {
            textMesh.scale.x = -1;
          }

          resolveText(textMesh);
        });
      });

      Promise.all(textPromises)
        .then((textMeshes) => {
          textMeshes.forEach((mesh) => scene.add(mesh));
          resolve();
        })
        .catch(reject);
    }, undefined, reject);
  });
}
