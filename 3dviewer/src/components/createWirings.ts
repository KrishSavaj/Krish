// createWiring.ts is a new file that contains the createWiring function. This function creates wiring meshes based on the wiringPaths array and adds them to the scene. The wiringPaths array contains objects with points, thickness, color, and isTop properties. The createWiring function returns a Promise that resolves when the wiring is added to the scene.

import * as THREE from 'three';

/**
 * @param scene - The scene to which the wiring will be added.
 * @param wiringPaths - An array of objects containing points, thickness, color, and isTop properties.
 * @param pcbDepth - The depth of the PCB plane.
 * @returns A Promise that resolves when the wiring is added to the scene.
 */

interface WiringConfig {
  points: { x: number; z: number }[];
  thickness: number;
  color: number;
  isTop: boolean;
}

export function createWiring(
  scene: THREE.Scene,
  wiringPaths: WiringConfig[],
  pcbDepth: number
): Promise<void> {
  const createWireMeshes = (wiringPath: WiringConfig): Promise<THREE.Object3D[]> => {
    return new Promise((resolve) => {
      const { points, thickness, color, isTop } = wiringPath;
      const material = new THREE.MeshStandardMaterial({
        color: color,
        side: THREE.DoubleSide
      });
      const yPosition = isTop ? pcbDepth + 0.15 : -0.15;
      const meshes: THREE.Object3D[] = [];

      for (let i = 0; i < points.length - 1; i++) {
        const start = new THREE.Vector3(points[i].x, yPosition, points[i].z);
        const end = new THREE.Vector3(points[i + 1].x, yPosition, points[i + 1].z);
        const direction = new THREE.Vector3().subVectors(end, start);
        const length = direction.length();
        const center = new THREE.Vector3().addVectors(start, end).multiplyScalar(0.5);

        const boxGeometry = new THREE.BoxGeometry(thickness, thickness, length);
        const wireMesh = new THREE.Mesh(boxGeometry, material);
                

        wireMesh.position.copy(center);

        const quaternion = new THREE.Quaternion();
        quaternion.setFromUnitVectors(new THREE.Vector3(0, 0, 1), direction.normalize());
        wireMesh.setRotationFromQuaternion(quaternion);

        //make joints smoother
        const cylinderGeometry = new THREE.CylinderGeometry(thickness / 2,thickness / 2, thickness, 16);
        points.forEach((p) =>{
          const cylinderMesh = new THREE.Mesh(cylinderGeometry, material);
          cylinderMesh.position.set(points[i].x, yPosition, points[i].z);
          meshes.push(cylinderMesh);
        });
        meshes.push(wireMesh);
      }

      const knobRadius = thickness / 2 + 0.15;
      const knobHeight = 0.15;

      const startKnob = new THREE.CylinderGeometry(knobRadius, knobRadius, knobHeight, 32);
      const startKnobMesh = new THREE.Mesh(startKnob, material);
      startKnobMesh.position.set(points[0].x, yPosition, points[0].z);
      // startKnobMesh.rotation.x = Math.PI / 2;
      meshes.push(startKnobMesh);

      const endKnob = new THREE.CylinderGeometry(knobRadius, knobRadius, knobHeight, 32);
      const endKnobMesh = new THREE.Mesh(endKnob, material);
      endKnobMesh.position.set(points[points.length - 1].x, yPosition, points[points.length - 1].z);
      // endKnobMesh.rotation.x = Math.PI / 2;
      meshes.push(endKnobMesh);

      resolve(meshes);
    });
  };

  return Promise.all(wiringPaths.map(createWireMeshes))
    .then((wireGroups) => {
      wireGroups.forEach((meshes) => {
        meshes.forEach((mesh) => scene.add(mesh));
      });
    });
}
