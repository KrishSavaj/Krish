// renderer.ts is the main file that initializes and renders the 3D scene using Three.js. It imports the necessary functions and components to create the scene, including the PCB plane, models, text, wiring, and axis labels. The renderer function takes in parameters such as the container element, PCB dimensions, model paths, hole positions, text strings, and wiring paths to generate the scene.

import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { createPCBWithHoles } from './components/createPCBPlane';
import { createWiring } from './components/createWirings';
import { createText } from './components/createText';
import { createAxisLabels } from './components/createAxisLabels';
import { loadGLTFModel } from './components/3Dloaders/GLBLoader';
import { loadWRLModel } from './components/3Dloaders/WRLLoader';
import { loadOBJModel } from './components/3Dloaders/OBJLoader';
import { loadSTLModel } from './components/3Dloaders/STLLoader';

/**
 * Initializes and renders a Three.js scene with multiple models, axes, and a plane.
 * @param container The HTML element where the scene will be rendered.
 * @param pcbWidth The width of the PCB plane.
 * @param pcbHeight The height of the PCB plane.
 * @param pcbDepth The depth of the PCB plane.
 * @param models An array of objects containing model paths, file types, and positions.
 * @param holes An array of objects containing hole positions and radii.
 * @param text An array of objects containing text strings and positions.
 * @param wiringPaths An array of objects containing wiring path points and thickness.
 */

export function renderer(
  container: HTMLElement,
  pcbWidth: number,
  pcbHeight: number,
  pcbDepth: number,
  models: { path: string; position: { x: number; z: number }, rotation: { x: number; y: number; z: number, }, isTop: boolean }[],
  holes: { position: { x: number; z: number }, radius: number }[],
  text: { text: string; position: { x: number; z: number, }; angle: number; size: number; isTop: boolean }[],
  wiringPaths: { points: { x: number; z: number }[]; thickness: number; color: number, isTop: boolean }[],
): void {
  // Scene setup
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  // Add point lights to the scene
  const lightDistance = Math.max(pcbWidth, pcbHeight) / 2;
  const doubleLightDistance = lightDistance * 1.5;
  camera.position.set(lightDistance, lightDistance, lightDistance);
  camera.lookAt(0, 0, 0);

  const canvas = document.createElement('canvas');
  container.appendChild(canvas);
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });

  renderer.setSize(window.innerWidth, window.innerHeight);

  const pcbMesh = createPCBWithHoles(pcbWidth, pcbHeight, pcbDepth, holes);
  scene.add(pcbMesh);

  // Ambient light and its intensity
  const ambientLight = new THREE.AmbientLight(0x404040, 30);
  scene.add(ambientLight);

  const pointLightIntensity = 50;

  // Fixed point light configurations
  const pointLights: { position: [number, number, number]; intensity: number }[] = [
    { position: [0, 0, 0], intensity: pointLightIntensity },
    { position: [0, doubleLightDistance, 0], intensity: pointLightIntensity },
    { position: [0, -doubleLightDistance, 0], intensity: pointLightIntensity },
    { position: [doubleLightDistance + 5, 0, 0], intensity: pointLightIntensity },
    { position: [0, 0, doubleLightDistance + 5], intensity: pointLightIntensity },
    { position: [-doubleLightDistance - 5, 0, 0], intensity: pointLightIntensity },
    { position: [0, 0, -doubleLightDistance - 5], intensity: pointLightIntensity },
  ];

  // Generate the grid and add to pointLights array
  for (let x = -lightDistance; x <= lightDistance; x += 20) {
    for (let z = -lightDistance; z <= lightDistance; z += 20) {
      pointLights.push({
        position: [x, 10, z], // Keeping z = 10 for elevation
        intensity: pointLightIntensity
      });

      pointLights.push({
        position: [x, -10, z], // Keeping z = 10 for elevation
        intensity: pointLightIntensity
      });
    }
  }

  console.log(pointLights); // Debug to check added lights

  pointLights.forEach((lightConfig) => {
    const pointLight = new THREE.PointLight(0xffffff, lightConfig.intensity);
    pointLight.position.set(...lightConfig.position);

    // Add helper to visualize the light position
    // const sphereSize = 1;
    // const pointLightHelper = new THREE.PointLightHelper(pointLight, sphereSize);
    // scene.add(pointLightHelper);
    scene.add(pointLight);
  });

  interface ModelDetails {
    path: string;
    position: { x: number; z: number };
    rotation: { x: number; y: number; z: number };
    isTop: boolean;
  }

  const loadModel = ({ path, position, rotation, isTop }: ModelDetails): Promise<THREE.Object3D> => {
    const fileExtension = path.split('.').pop() || '';

    return new Promise((resolve, reject) => {
      if (fileExtension === 'gltf' || fileExtension === 'glb') {
        loadGLTFModel({ path, position, rotation, isTop }, pcbDepth)
        .then(resolve)
        .catch(reject);
      } else if (fileExtension === 'stl') {
        loadSTLModel({ path, position, rotation, isTop }, pcbDepth)
        .then(resolve)
        .catch(reject);
      } else if (fileExtension === 'obj') {
        loadOBJModel({ path, position, rotation, isTop }, pcbDepth)
        .then(resolve)
        .catch(reject);
      } else if (fileExtension === 'wrl') {
        loadWRLModel({ path, position, rotation, isTop }, pcbDepth)
        .then(resolve)
        .catch(reject);
      } else {
        reject(`Unsupported file format: ${fileExtension}`);
      }
    });
  };

  Promise.all(models.map(loadModel))
    .then((loadedModels) => {
      loadedModels.forEach((model) => scene.add(model));
    })
  .catch((error) => console.error(error));

  // Load font and create text
  createText(scene, text, pcbDepth)
  .then(() => {
    console.log('Text rendered successfully');
  })
  .catch((error) => {
    console.error('Error rendering text:', error);
  });

  // Create wiring
  createWiring(scene, wiringPaths, pcbDepth);

  // Add axes
  const axesHelper = new THREE.AxesHelper(lightDistance * 1.3);
  scene.add(axesHelper);

  // Create axis labels
  const axisLabels = [
    { text: 'X', position: new THREE.Vector3(lightDistance * 1.3, 0, 0), color: 0xff0000 }, // Red for X
    { text: 'Y', position: new THREE.Vector3(0, lightDistance * 1.3, 0), color: 0x00ff00 }, // Green for Y
    { text: 'Z', position: new THREE.Vector3(0, 0, lightDistance * 1.3), color: 0x0000ff }  // Blue for Z
  ];

  // Call the function to create and add the axis labels to the scene
  createAxisLabels(scene, axisLabels);

  // OrbitControls for camera movement
  const controls = new OrbitControls(camera, renderer.domElement);

  controls.enableDamping = true;
  controls.dampingFactor = 0.1;
  controls.autoRotate = false;
  controls.target.set(0, 0, 0);

  // Update camera and controls
  function updateCameraAndControls() {
    controls.update();
    renderer.render(scene, camera);
  }

  // Handle window resizing
  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });


  // Animation loop
  function animate() {
    requestAnimationFrame(animate);
    scene.traverse((object) => {
      if (object.userData.type === 'axisLabel') {
        object.quaternion.copy(camera.quaternion);
      }
    });
    updateCameraAndControls();
  }

  animate();
}

