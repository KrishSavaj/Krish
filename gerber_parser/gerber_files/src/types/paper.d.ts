// declare module 'paper' {
//     // Declare the 'Point' interface, which represents a point in a 2D coordinate system
//     export interface Point {
//       x: number; // X-coordinate of the point
//       y: number; // Y-coordinate of the point
//     }
  
//     // Declare the 'Path' interface, which represents a path (a series of connected lines or curves)
//     export interface Path {
//       // Method to move the drawing cursor to a new point without drawing
//       moveTo(point: [number, number]): void;
  
//       // Method to draw a line from the current position to the provided point
//       lineTo(point: [number, number]): void;
  
//       // Method to draw an arc from the current position to the 'to' point, passing through the 'through' point
//       arcTo(
//         to: [number, number], // The endpoint of the arc
//         through: [number, number], // The point through which the arc will pass
//         options?: { clockwise: boolean } // Optional: if true, the arc is drawn clockwise
//       ): void;
  
//       // The 'lastSegment' property contains information about the last point in the path
//       lastSegment: { point: Point };
//     }
  
//     // Declare the 'PaperScope' interface, which represents the Paper.js environment
//     export interface PaperScope {
//       // The 'Path' object provides methods to create shapes, such as a circle
//       Path: {
//         // Method to create a circle path with the given options (center, radius, and optional fill color)
//         Circle(options: { center: [number, number]; radius: number; fillColor?: string }): Path;
//       };
  
//       // The 'view' object provides methods to manipulate the Paper.js view (the canvas and its transformations)
//       view: {
//         // Method to translate the entire canvas by a certain amount in the X and Y directions
//         translate(x: number, y: number): void;
  
//         // Method to scale the canvas by given X and Y factors (uniform scaling is possible by providing just 'x')
//         scale(x: number, y?: number): void;
  
//         // 'bounds' represents the visible area of the canvas (view), here we're defining only the height
//         bounds: { height: number };
  
//         // 'canvas' represents the actual HTML canvas element where Paper.js renders the content
//         canvas: HTMLCanvasElement;  // This is where you access the canvas
//       };
  
//       // Method to install Paper.js on a window object (making Paper.js available globally)
//       install(window: any): void;
  
//       // Method to set up Paper.js with a given HTML canvas element
//       setup(canvas: HTMLCanvasElement): void;
//     }
  
//     // Declare the global 'paper' object which is an instance of 'PaperScope'
//     const paper: PaperScope;
  
//     // Export the 'paper' object as the default export of this module
//     export default paper;
//   }
  // src/types/paper.d.ts

interface Point {
    x: number;
    y: number;
  }
  
  interface Path {
    moveTo(point: [number, number]): void;
    lineTo(point: [number, number]): void;
    arcTo(to: [number, number], through: [number, number], options?: { clockwise: boolean }): void;
    lastSegment: { point: Point };
  }
  
  interface PaperScope {
    Path: {
      Circle(options: { center: [number, number]; radius: number; fillColor?: string }): Path;
    };
    view: {
      translate(delta: { x: number; y: number }): void;
      scale(x: number, y?: number): void;
      bounds: { height: number };
      canvas: HTMLCanvasElement;
    };
    install(window: any): void;
    setup(canvas: HTMLCanvasElement): void;
  }
  
  declare const paper: PaperScope;
  