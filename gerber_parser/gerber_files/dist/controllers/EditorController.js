"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EditorController = void 0;
const paper_1 = __importDefault(require("paper"));
const GerberParser_1 = require("../parsers/GerberParser");
const ParametricShape_1 = require("../models/ParametricShape");
class EditorController {
    constructor(canvasId, gerberText) {
        this.canvas = document.getElementById(canvasId);
        paper_1.default.setup(this.canvas);
        paper_1.default.view.translate({ x: 0, y: paper_1.default.view.bounds.height }); // fixed
        paper_1.default.view.scale(1, -1);
        this.paperScope = paper_1.default;
        this.shapeSource = new GerberParser_1.GerberParser(gerberText);
    }
    async renderAll() {
        const canonical = await this.shapeSource.loadShapes();
        const shapeObjects = canonical.map(c => {
            switch (c.type) {
                case 'circle':
                case 'line':
                case 'arc':
                case 'outline':
                case 'polygon':
                case 'flash':
                    return new ParametricShape_1.ParametricShape(c.label, JSON.stringify(c));
                default:
                    throw new Error(`Unknown shape type: ${c.type}`);
            }
        });
        shapeObjects.forEach(obj => obj.draw(this.paperScope));
    }
}
exports.EditorController = EditorController;
