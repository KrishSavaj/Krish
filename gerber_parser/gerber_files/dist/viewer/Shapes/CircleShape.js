"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CircleShape = void 0;
class CircleShape {
    constructor(shape) {
        this.label = shape.label;
        this.center = shape.center;
        this.radius = shape.radius;
        this.equation = `(x - ${this.center.x})^2 + (y - ${this.center.y})^2 = ${this.radius}^2`;
    }
    draw(paperScope) {
        const circle = new paperScope.Path.Circle({
            center: new paperScope.Point(this.center.x, this.center.y),
            radius: this.radius,
            strokeColor: 'blue',
            strokeWidth: 0.2,
        });
    }
}
exports.CircleShape = CircleShape;
