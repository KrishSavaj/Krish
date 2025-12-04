
import { CanonicalShape } from '../../models/CanonicalShape';
import { Shape } from '../../interfaces/Shape';

// Import Paper.js to use its drawing capabilities.
import * as paper from 'paper';

type PaperScope = typeof paper;

export class CircleShape implements Shape {
  label: string;
  equation: string;
  center: { x: number, y: number };
  radius: number;

  constructor(shape: CanonicalShape) {
    this.label = shape.label;
    this.center = shape.center!;
    this.radius = shape.radius!;
    this.equation = `(x - ${this.center.x})^2 + (y - ${this.center.y})^2 = ${this.radius}^2`;
  }
draw(paperScope: PaperScope): void {
  const circle = new paperScope.Path.Circle({
    center: new paperScope.Point(this.center.x, this.center.y),
    radius: this.radius,
    strokeColor: 'blue',
    strokeWidth: 0.2,
  });
}
}