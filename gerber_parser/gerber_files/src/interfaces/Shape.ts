// Import Paper.js to use its drawing capabilities.
import * as paper from 'paper';

type PaperScope = typeof paper;


export interface Shape {
  label: string;
  equation: string;
  draw(paperScope: PaperScope): void;
}
