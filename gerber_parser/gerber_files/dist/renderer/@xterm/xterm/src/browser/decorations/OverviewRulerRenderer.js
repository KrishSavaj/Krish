"use strict";
/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
Object.defineProperty(exports, "__esModule", { value: true });
exports.OverviewRulerRenderer = void 0;
const ColorZoneStore_1 = require("browser/decorations/ColorZoneStore");
const Lifecycle_1 = require("common/Lifecycle");
// Helper objects to avoid excessive calculation and garbage collection during rendering. These are
// static values for each render and can be accessed using the decoration position as the key.
const drawHeight = {
    full: 0,
    left: 0,
    center: 0,
    right: 0
};
const drawWidth = {
    full: 0,
    left: 0,
    center: 0,
    right: 0
};
const drawX = {
    full: 0,
    left: 0,
    center: 0,
    right: 0
};
class OverviewRulerRenderer extends Lifecycle_1.Disposable {
    get _width() {
        return this._optionsService.options.overviewRulerWidth || 0;
    }
    constructor(_viewportElement, _screenElement, _bufferService, _decorationService, _renderService, _optionsService, _coreBrowserService) {
        super();
        this._viewportElement = _viewportElement;
        this._screenElement = _screenElement;
        this._bufferService = _bufferService;
        this._decorationService = _decorationService;
        this._renderService = _renderService;
        this._optionsService = _optionsService;
        this._coreBrowserService = _coreBrowserService;
        this._colorZoneStore = new ColorZoneStore_1.ColorZoneStore();
        this._shouldUpdateDimensions = true;
        this._shouldUpdateAnchor = true;
        this._lastKnownBufferLength = 0;
        this._canvas = this._coreBrowserService.mainDocument.createElement('canvas');
        this._canvas.classList.add('xterm-decoration-overview-ruler');
        this._refreshCanvasDimensions();
        this._viewportElement.parentElement?.insertBefore(this._canvas, this._viewportElement);
        const ctx = this._canvas.getContext('2d');
        if (!ctx) {
            throw new Error('Ctx cannot be null');
        }
        else {
            this._ctx = ctx;
        }
        this._registerDecorationListeners();
        this._registerBufferChangeListeners();
        this._registerDimensionChangeListeners();
        this.register((0, Lifecycle_1.toDisposable)(() => {
            this._canvas?.remove();
        }));
    }
    /**
     * On decoration add or remove, redraw
     */
    _registerDecorationListeners() {
        this.register(this._decorationService.onDecorationRegistered(() => this._queueRefresh(undefined, true)));
        this.register(this._decorationService.onDecorationRemoved(() => this._queueRefresh(undefined, true)));
    }
    /**
     * On buffer change, redraw
     * and hide the canvas if the alt buffer is active
     */
    _registerBufferChangeListeners() {
        this.register(this._renderService.onRenderedViewportChange(() => this._queueRefresh()));
        this.register(this._bufferService.buffers.onBufferActivate(() => {
            this._canvas.style.display = this._bufferService.buffer === this._bufferService.buffers.alt ? 'none' : 'block';
        }));
        this.register(this._bufferService.onScroll(() => {
            if (this._lastKnownBufferLength !== this._bufferService.buffers.normal.lines.length) {
                this._refreshDrawHeightConstants();
                this._refreshColorZonePadding();
            }
        }));
    }
    /**
     * On dimension change, update canvas dimensions
     * and then redraw
     */
    _registerDimensionChangeListeners() {
        // container height changed
        this.register(this._renderService.onRender(() => {
            if (!this._containerHeight || this._containerHeight !== this._screenElement.clientHeight) {
                this._queueRefresh(true);
                this._containerHeight = this._screenElement.clientHeight;
            }
        }));
        // overview ruler width changed
        this.register(this._optionsService.onSpecificOptionChange('overviewRulerWidth', () => this._queueRefresh(true)));
        // device pixel ratio changed
        this.register(this._coreBrowserService.onDprChange(() => this._queueRefresh(true)));
        // set the canvas dimensions
        this._queueRefresh(true);
    }
    _refreshDrawConstants() {
        // width
        const outerWidth = Math.floor(this._canvas.width / 3);
        const innerWidth = Math.ceil(this._canvas.width / 3);
        drawWidth.full = this._canvas.width;
        drawWidth.left = outerWidth;
        drawWidth.center = innerWidth;
        drawWidth.right = outerWidth;
        // height
        this._refreshDrawHeightConstants();
        // x
        drawX.full = 0;
        drawX.left = 0;
        drawX.center = drawWidth.left;
        drawX.right = drawWidth.left + drawWidth.center;
    }
    _refreshDrawHeightConstants() {
        drawHeight.full = Math.round(2 * this._coreBrowserService.dpr);
        // Calculate actual pixels per line
        const pixelsPerLine = this._canvas.height / this._bufferService.buffer.lines.length;
        // Clamp actual pixels within a range
        const nonFullHeight = Math.round(Math.max(Math.min(pixelsPerLine, 12), 6) * this._coreBrowserService.dpr);
        drawHeight.left = nonFullHeight;
        drawHeight.center = nonFullHeight;
        drawHeight.right = nonFullHeight;
    }
    _refreshColorZonePadding() {
        this._colorZoneStore.setPadding({
            full: Math.floor(this._bufferService.buffers.active.lines.length / (this._canvas.height - 1) * drawHeight.full),
            left: Math.floor(this._bufferService.buffers.active.lines.length / (this._canvas.height - 1) * drawHeight.left),
            center: Math.floor(this._bufferService.buffers.active.lines.length / (this._canvas.height - 1) * drawHeight.center),
            right: Math.floor(this._bufferService.buffers.active.lines.length / (this._canvas.height - 1) * drawHeight.right)
        });
        this._lastKnownBufferLength = this._bufferService.buffers.normal.lines.length;
    }
    _refreshCanvasDimensions() {
        this._canvas.style.width = `${this._width}px`;
        this._canvas.width = Math.round(this._width * this._coreBrowserService.dpr);
        this._canvas.style.height = `${this._screenElement.clientHeight}px`;
        this._canvas.height = Math.round(this._screenElement.clientHeight * this._coreBrowserService.dpr);
        this._refreshDrawConstants();
        this._refreshColorZonePadding();
    }
    _refreshDecorations() {
        if (this._shouldUpdateDimensions) {
            this._refreshCanvasDimensions();
        }
        this._ctx.clearRect(0, 0, this._canvas.width, this._canvas.height);
        this._colorZoneStore.clear();
        for (const decoration of this._decorationService.decorations) {
            this._colorZoneStore.addDecoration(decoration);
        }
        this._ctx.lineWidth = 1;
        const zones = this._colorZoneStore.zones;
        for (const zone of zones) {
            if (zone.position !== 'full') {
                this._renderColorZone(zone);
            }
        }
        for (const zone of zones) {
            if (zone.position === 'full') {
                this._renderColorZone(zone);
            }
        }
        this._shouldUpdateDimensions = false;
        this._shouldUpdateAnchor = false;
    }
    _renderColorZone(zone) {
        this._ctx.fillStyle = zone.color;
        this._ctx.fillRect(
        /* x */ drawX[zone.position || 'full'], 
        /* y */ Math.round((this._canvas.height - 1) * // -1 to ensure at least 2px are allowed for decoration on last line
            (zone.startBufferLine / this._bufferService.buffers.active.lines.length) - drawHeight[zone.position || 'full'] / 2), 
        /* w */ drawWidth[zone.position || 'full'], 
        /* h */ Math.round((this._canvas.height - 1) * // -1 to ensure at least 2px are allowed for decoration on last line
            ((zone.endBufferLine - zone.startBufferLine) / this._bufferService.buffers.active.lines.length) + drawHeight[zone.position || 'full']));
    }
    _queueRefresh(updateCanvasDimensions, updateAnchor) {
        this._shouldUpdateDimensions = updateCanvasDimensions || this._shouldUpdateDimensions;
        this._shouldUpdateAnchor = updateAnchor || this._shouldUpdateAnchor;
        if (this._animationFrame !== undefined) {
            return;
        }
        this._animationFrame = this._coreBrowserService.window.requestAnimationFrame(() => {
            this._refreshDecorations();
            this._animationFrame = undefined;
        });
    }
}
exports.OverviewRulerRenderer = OverviewRulerRenderer;
