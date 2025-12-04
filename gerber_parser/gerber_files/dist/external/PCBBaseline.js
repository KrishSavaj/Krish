"use strict";
// import { PCBBaselineClient } from './PCBBaselineCLI';
// import { CanonicalShape } from "../models/CanonicalShape";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PCBBaseline = void 0;
class PCBBaseline {
    getCanonicalShapes() {
        const shapes = [
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
exports.PCBBaseline = PCBBaseline;
