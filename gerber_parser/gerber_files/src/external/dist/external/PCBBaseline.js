"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PCBBaseline = void 0;
class PCBBaseline {
    getCanonicalShapes() {
        return Promise.resolve([
            {
                type: "circle",
                label: "BaselineCircle",
                center: { x: 50, y: 50 },
                radius: 25
            },
            {
                type: "line",
                label: "BaselineLine",
                from: { x: 10, y: 10 },
                to: { x: 100, y: 100 }
            },
            {
                type: "arc",
                label: "BaselineArc",
                from: { x: 20, y: 20 },
                through: { x: 40, y: 60 },
                to: { x: 60, y: 20 },
                clockwise: true
            },
            {
                type: "polygon",
                label: "BaselinePolygon",
                center: { x: 70, y: 70 },
                diameter: 40,
                sides: 6
            }
        ]);
    }
}
exports.PCBBaseline = PCBBaseline;
