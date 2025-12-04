// // elements.js

// export class GerberElement {
//     constructor(command) {
//       this.command = command.trim().toUpperCase();
//       this.x = 0;
//       this.y = 0;
//     }
  
//     extractXY(lastPoint) {
//       const eq = this.command;
//       const xMatch = eq.match(/X([\d.-]+)/);
//       const yMatch = eq.match(/Y([\d.-]+)/);
//       this.x = xMatch ? parseFloat(xMatch[1]) : (lastPoint ? lastPoint.x : this.x);
//       this.y = yMatch ? -parseFloat(yMatch[1]) : (lastPoint ? lastPoint.y : this.y); // Flip Y for screen coordinates
//     }
  
//     parse(lastPoint) {
//       throw new Error("parse() not implemented in " + this.constructor.name);
//     }
  
//     draw(paper, lastPoint) {
//       throw new Error("draw() not implemented in " + this.constructor.name);
//     }
//   }
  
//   export class LineElement extends GerberElement {
//     parse(lastPoint) {
//       this.extractXY(lastPoint);
//     }
  
//     draw(paper, lastPoint) {
//       const start = lastPoint || new paper.Point(0, 0);
//       const end = new paper.Point(this.x, this.y);
//       const path = new paper.Path({
//         segments: [start, end],
//         strokeColor: 'black',
//         strokeWidth: 2
//       });
//       return end;
//     }
//   }
  
//   export class MoveElement extends GerberElement {
//     parse(lastPoint) {
//       this.extractXY(lastPoint);
//     }
  
//     draw(paper, lastPoint) {
//       return new paper.Point(this.x, this.y); // Just move, don't draw
//     }
//   }
  
//   export class FlashElement extends GerberElement {
//     parse(lastPoint) {
//       this.extractXY(lastPoint);
//     }
  
//     draw(paper, lastPoint) {
//       const center = new paper.Point(this.x, this.y);
//       const flash = new paper.Path.Circle({
//         center: center,
//         radius: 10,
//         fillColor: 'red',
//         strokeColor: 'black'
//       });
//       return center;
//     }
//   }
  
//   export class ArcElement extends GerberElement {
//     constructor(command) {
//       super(command);
//       this.i = 0;
//       this.j = 0;
//       this.clockwise = true;
//     }
  
//     parse(lastPoint) {
//       this.extractXY(lastPoint);
//       const iMatch = this.command.match(/I([\d.-]+)/);
//       const jMatch = this.command.match(/J([\d.-]+)/);
//       this.i = iMatch ? parseFloat(iMatch[1]) : 0;
//       this.j = jMatch ? parseFloat(jMatch[1]) : 0;
//       this.clockwise = this.command.includes("G02");
//     }
  
//     draw(paper, lastPoint) {
//       if (!lastPoint) lastPoint = new paper.Point(0, 0);
//       const start = lastPoint;
//       const end = new paper.Point(this.x, this.y);
//       const center = start.add(new paper.Point(this.i, -this.j)); // Note: J is negated for screen coords
  
//       const radius = center.getDistance(start);
//       const fromAngle = (start.subtract(center)).angle;
//       const toAngle = (end.subtract(center)).angle;
  
//       let throughAngle = toAngle - fromAngle;
//       if (this.clockwise && throughAngle > 0) throughAngle -= 360;
//       else if (!this.clockwise && throughAngle < 0) throughAngle += 360;
  
//       const arc = new paper.Path.Arc({
//         from: start,
//         through: center.add(
//           new paper.Point({
//             length: radius,
//             angle: fromAngle + throughAngle / 2
//           })
//         ),
//         to: end,
//         strokeColor: 'blue',
//         strokeWidth: 2
//       });
  
//       return end;
//     }
//   }
/* elements.js */
// Conversion constants: 1 Gerber unit = 1 µm
const GERBER_TO_MM = 1e-6;   // µm → mm
const MM_TO_PX    = 10;      // px per mm (tweak to zoom in/out)
const U = GERBER_TO_MM * MM_TO_PX;

export class GerberElement {
  constructor(command) {
    this.command = command.trim().toUpperCase();
    this.x = 0; this.y = 0;
  }
  extractXY(lastPoint) {
    const eq = this.command;
    const xm = eq.match(/X([\d.-]+)/);
    const ym = eq.match(/Y([\d.-]+)/);
    this.x = xm ? parseFloat(xm[1]) * U : (lastPoint?.x ?? this.x);
    this.y = ym ? -parseFloat(ym[1]) * U : (lastPoint?.y ?? this.y);
  }
  parse(lastPoint) { throw new Error(`parse() not in ${this.constructor.name}`); }
  draw(paper, lastPoint) { throw new Error(`draw() not in ${this.constructor.name}`); }
}

export class LineElement extends GerberElement {
  parse(lp) { this.extractXY(lp); }
  draw(paper, lp) {
    const start = lp || new paper.Point(0, 0);
    const end   = new paper.Point(this.x, this.y);
    new paper.Path({ segments: [start, end], strokeColor: 'black', strokeWidth: 2 });
    return end;
  }
}

export class MoveElement extends GerberElement {
  parse(lp) { this.extractXY(lp); }
  draw(_, lp) { return new paper.Point(this.x, this.y); }
}

export class FlashElement extends GerberElement {
  parse(lp) { this.extractXY(lp); }
  draw(paper) {
    const c = new paper.Point(this.x, this.y);
    new paper.Path.Circle({ center: c, radius: 5, fillColor: 'red', strokeColor: 'black' });
    return c;
  }
}

export class ArcElement extends GerberElement {
  constructor(cmd) { super(cmd); this.i = 0; this.j = 0; this.clockwise = true; }
  parse(lp) {
    this.extractXY(lp);
    const im = this.command.match(/I([\d.-]+)/),
          jm = this.command.match(/J([\d.-]+)/);
    this.i = im ? parseFloat(im[1]) * U : 0;
    this.j = jm ? parseFloat(jm[1]) * U : 0;
    this.clockwise = this.command.includes('G02');
  }
  draw(paper, lp) {
    const start  = lp || new paper.Point(0, 0),
          end    = new paper.Point(this.x, this.y),
          center = start.add(new paper.Point(this.i, -this.j));
    const r   = center.getDistance(start),
          a0  = start.subtract(center).angle,
          a1  = end.subtract(center).angle;
    let sweep = a1 - a0;
    if (this.clockwise && sweep > 0)   sweep -= 360;
    if (!this.clockwise && sweep < 0)  sweep += 360;
    new paper.Path.Arc({
      from: start,
      through: center.add(new paper.Point({ length: r, angle: a0 + sweep/2 })),
      to: end,
      strokeColor: 'blue',
      strokeWidth: 2
    });
    return end;
  }
}
