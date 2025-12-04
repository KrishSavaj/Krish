"use strict";
/**
 * Copyright (c) 2017 The xterm.js authors. All rights reserved.
 * @license MIT
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.MouseService = void 0;
const Mouse_1 = require("browser/input/Mouse");
class MouseService {
    constructor(_renderService, _charSizeService) {
        this._renderService = _renderService;
        this._charSizeService = _charSizeService;
    }
    getCoords(event, element, colCount, rowCount, isSelection) {
        return (0, Mouse_1.getCoords)(window, event, element, colCount, rowCount, this._charSizeService.hasValidSize, this._renderService.dimensions.css.cell.width, this._renderService.dimensions.css.cell.height, isSelection);
    }
    getMouseReportCoords(event, element) {
        const coords = (0, Mouse_1.getCoordsRelativeToElement)(window, event, element);
        if (!this._charSizeService.hasValidSize) {
            return undefined;
        }
        coords[0] = Math.min(Math.max(coords[0], 0), this._renderService.dimensions.css.canvas.width - 1);
        coords[1] = Math.min(Math.max(coords[1], 0), this._renderService.dimensions.css.canvas.height - 1);
        return {
            col: Math.floor(coords[0] / this._renderService.dimensions.css.cell.width),
            row: Math.floor(coords[1] / this._renderService.dimensions.css.cell.height),
            x: Math.floor(coords[0]),
            y: Math.floor(coords[1])
        };
    }
}
exports.MouseService = MouseService;
