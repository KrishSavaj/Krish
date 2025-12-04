
// Import Paper.js to use its drawing capabilities.
import * as paper from 'paper';

type PaperScope = typeof paper;

import { CanonicalShape } from '../models/CanonicalShape';
import { CircleShape } from './Shapes/CircleShape';

window.onload = async () => {
  // Setup Paper.js on the canvas
  const canvas = document.getElementById('myCanvas') as HTMLCanvasElement;
  paper.setup(canvas);

  // Load shapes (mock or fetch from a local JSON file or API)
  const response = await fetch('../shapes.json'); // Adjust path as needed
  const shapes: CanonicalShape[] = await response.json();

  for (const shape of shapes) {
    if (shape.type === 'circle') {
      const circle = new CircleShape(shape);
      circle.draw(paper);
    }
    // Add `else if` for other types (line, arc, flash)
  }
};
