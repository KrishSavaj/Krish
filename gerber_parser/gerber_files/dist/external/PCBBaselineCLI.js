"use strict";
// import { spawn, ChildProcessWithoutNullStreams } from 'child_process';
// import { CanonicalShape } from '../models/CanonicalShape';  // Adjust path as per your project structure
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.PCBBaselineClient = void 0;
// import * as path from 'path';
// export class PCBBaselineClient {
//   private proc: ChildProcessWithoutNullStreams;
//   private buffer = "";
//   private points: { x: number; y: number }[] = [];
//   private resolveShapes: ((shapes: CanonicalShape[]) => void) | null = null;
//   constructor() {
//    const exePath = path.resolve(
//     __dirname,
//     'PCBBaselineNative',
//     'PCBBaseline',
//     'build',
//     'Release',
//     'PCBApp.exe'
//   );
//     this.proc = spawn(exePath, ['C:\\Users\\kulsu\\OneDrive\\Desktop\\gerber\\file.gbr'], { stdio: ['pipe', 'pipe', 'pipe'] });
//     this.proc.stdout.on('data', (chunk: Buffer) => {
//       this.buffer += chunk.toString();
//       let idx: number;
//       while ((idx = this.buffer.indexOf('\n')) >= 0) {
//         const line = this.buffer.slice(0, idx).trim();
//         this.buffer = this.buffer.slice(idx + 1);
//         if (line) this.handleResponse(line);
//       }
//     });
//     this.proc.on('close', () => {
//       // Once process ends, resolve the promise with parsed shapes
//       if (this.resolveShapes) {
//         const shapes = this.pointsToCanonicalShapes(this.points);
//         this.resolveShapes(shapes);
//       }
//     });
//   }
//   private handleResponse(line: string): void {
//     console.log("Received:", line);
//     // parse lines like Point(x, y)
//     const match = line.match(/Point\(([-\d.]+),\s*([-\d.]+)\)/);
//     if (match) {
//       const x = parseFloat(match[1]);
//       const y = parseFloat(match[2]);
//       this.points.push({ x, y });
//     }
//   }
//   // Convert points to your CanonicalShape format (example: circles with radius 1)
//   private pointsToCanonicalShapes(points: { x: number; y: number }[]): CanonicalShape[] {
//     return points.map((p, i) => ({
//       type: "circle",
//       label: `PointCircle${i}`,
//       center: p,
//       radius: 0.5  // small radius for visualizing points
//     }));
//   }
//   public getCanonicalShapes(): Promise<CanonicalShape[]> {
//     return new Promise((resolve) => {
//       this.resolveShapes = resolve;
//     });
//   }
// }
// // At bottom of pcbbaselinecli.ts file
// async function test() {
//   const client = new PCBBaselineClient();
//   const shapes = await client.getCanonicalShapes();
//   console.log('Parsed shapes:', shapes);
// }
// test();
const child_process_1 = require("child_process");
const path = __importStar(require("path"));
class PCBBaselineClient {
    getCanonicalShapes() {
        return new Promise((resolve, reject) => {
            const exePath = path.resolve(__dirname, 'PCBBaselineNative', 'PCBBaseline', 'build', 'Release', 'PCBApp.exe');
            const proc = (0, child_process_1.spawn)(exePath, ['C:\\Users\\kulsu\\OneDrive\\Desktop\\gerber\\file.gbr'], { stdio: ['pipe', 'pipe', 'pipe'] });
            let jsonData = '';
            proc.stdout.on('data', (data) => {
                jsonData += data.toString();
            });
            proc.on('close', () => {
                try {
                    const shapes = JSON.parse(jsonData);
                    resolve(shapes);
                }
                catch (err) {
                    console.error("Failed to parse JSON from C++:", jsonData);
                    reject(err);
                }
            });
            proc.on('error', reject);
        });
    }
}
exports.PCBBaselineClient = PCBBaselineClient;
