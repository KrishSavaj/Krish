"use strict";
// import { ipcRenderer } from 'electron';
Object.defineProperty(exports, "__esModule", { value: true });
// async function loadShapes() {
//   try {
//     const shapes = await ipcRenderer.invoke('get-canonical-shapes');
//     console.log('Received Canonical Shapes:', shapes);
//     // Now render with Paper.js or however you want
//   } catch (error) {
//     console.error("Failed to load shapes:", error);
//   }
// }
// loadShapes();
const PCBBaseline_1 = require("../external/PCBBaseline");
window.onload = async () => {
    const baseline = new PCBBaseline_1.PCBBaseline();
    const shapes = await baseline.getCanonicalShapes();
    // Send shapes to the editor.html window
    for (const shape of shapes) {
        if (shape.type === 'circle' && shape.center && shape.radius !== undefined) {
            window.postMessage({
                type: 'circle',
                circle: {
                    center: shape.center,
                    radius: shape.radius
                }
            }, '*');
        }
        // Add similar blocks for lines, arcs, etc., as needed
    }
};
