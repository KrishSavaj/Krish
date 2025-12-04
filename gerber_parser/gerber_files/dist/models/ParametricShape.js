"use strict";
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
exports.ParametricShape = void 0;
// Import Paper.js to use its drawing capabilities.
const paper = __importStar(require("paper"));
/**
 * ParametricShape class implements a shape based on a parametric equation (such as circles, lines, etc.)
 * This class represents a parametric equation shape and defines how it should be drawn using Paper.js.
 */
class ParametricShape {
    // Constructor that initializes the shape with a label and its mathematical equation
    constructor(label, equation) {
        this.label = label;
        this.equation = equation;
    }
    // Paper.js-based draw method that draws the shape on the canvas using the provided paperScope.
    draw(paperScope) {
        // Set up Paper.js with the provided canvas from the view object in paperScope.
        paper.setup(paperScope.view.element);
        // Create a new Path object for the shape (this will be the visual representation on the canvas)
        const path = new paper.Path({
            strokeColor: 'black', // Set the stroke color of the path to black
            strokeWidth: 0.1 // Set the stroke width for the path
        });
        // Example of drawing a line based on the parametric equation.
        // Here, we are just adding two points to define a simple line for demonstration.
        path.add(new paper.Point(100, 100)); // Add the start point (100, 100)
        path.add(new paper.Point(200, 150)); // Add the end point (200, 150)
        // Smooth the path to make the line smoother and less jagged
        path.smooth();
        // Create a new PointText object to display the label on the canvas.
        // The label is placed slightly above the top-left corner of the path's bounding box.
        new paper.PointText({
            point: path.bounds.topLeft.add([0, -10]), // Position the text slightly above the path
            content: this.label, // The content of the text is the shape's label
            fillColor: 'black', // Set the text color to black
            fontSize: 12 // Set the font size for the label
        });
    }
}
exports.ParametricShape = ParametricShape;
