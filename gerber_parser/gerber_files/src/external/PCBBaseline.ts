// import { PCBBaselineClient } from './PCBBaselineCLI';
// import { CanonicalShape } from "../models/CanonicalShape";

// export class PCBBaseline {
//   getCanonicalShapes(): Promise<CanonicalShape[]> {
//     const client = new PCBBaselineClient();
//     return client.getCanonicalShapes();
//   }
// }
import type { CanonicalShape } from "../models/CanonicalShape";

export class PCBBaseline {
  getCanonicalShapes(): Promise<CanonicalShape[]> {
    const shapes: CanonicalShape[] = [
      {
        type: 'line',
        label: 'Line 1',
        points: [
          { x: 10, y: 20 },
          { x: 200, y: 100 }
        ]
      },
      {
        type: 'circle',
        label: 'Circle 1',
        center: { x: 150, y: 150 },
        radius: 40
      }
    ];
    return Promise.resolve(shapes);
  }
}
