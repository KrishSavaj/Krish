import paper from 'paper';
type PaperScope = typeof paper;
import { Shape as IShape } from '../interfaces/Shape';
import { ShapeSource } from '../parsers/ShapeSource';
import { GerberParser } from '../parsers/GerberParser';
import { ParametricShape } from '../models/ParametricShape';
import { CanonicalShape } from '../models/CanonicalShape';

export class EditorController {
  private canvas: HTMLCanvasElement;
  private paperScope: PaperScope;
  private shapeSource: ShapeSource;

  constructor(canvasId: string, gerberText: string) {
    this.canvas = document.getElementById(canvasId) as HTMLCanvasElement;
    paper.setup(this.canvas);
    paper.view.translate({ x: 0, y: paper.view.bounds.height });  // fixed
    paper.view.scale(1, -1);
    this.paperScope = paper;

    this.shapeSource = new GerberParser(gerberText);
  }

  async renderAll() {
    const canonical: CanonicalShape[] = await this.shapeSource.loadShapes();

    const shapeObjects: IShape[] = canonical.map(c => {
      switch (c.type) {
        case 'circle':
        case 'line':
        case 'arc':
        case 'outline':
        case 'polygon':
        case 'flash':
          return new ParametricShape(c.label, JSON.stringify(c));
        default:
          throw new Error(`Unknown shape type: ${c.type}`);
      }
    });

    shapeObjects.forEach(obj => obj.draw(this.paperScope));
  }
}
