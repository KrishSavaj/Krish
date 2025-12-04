"use strict";
/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
Object.defineProperty(exports, "__esModule", { value: true });
exports.BufferDecorationRenderer = void 0;
const Lifecycle_1 = require("common/Lifecycle");
class BufferDecorationRenderer extends Lifecycle_1.Disposable {
    constructor(_screenElement, _bufferService, _coreBrowserService, _decorationService, _renderService) {
        super();
        this._screenElement = _screenElement;
        this._bufferService = _bufferService;
        this._coreBrowserService = _coreBrowserService;
        this._decorationService = _decorationService;
        this._renderService = _renderService;
        this._decorationElements = new Map();
        this._altBufferIsActive = false;
        this._dimensionsChanged = false;
        this._container = document.createElement('div');
        this._container.classList.add('xterm-decoration-container');
        this._screenElement.appendChild(this._container);
        this.register(this._renderService.onRenderedViewportChange(() => this._doRefreshDecorations()));
        this.register(this._renderService.onDimensionsChange(() => {
            this._dimensionsChanged = true;
            this._queueRefresh();
        }));
        this.register(this._coreBrowserService.onDprChange(() => this._queueRefresh()));
        this.register(this._bufferService.buffers.onBufferActivate(() => {
            this._altBufferIsActive = this._bufferService.buffer === this._bufferService.buffers.alt;
        }));
        this.register(this._decorationService.onDecorationRegistered(() => this._queueRefresh()));
        this.register(this._decorationService.onDecorationRemoved(decoration => this._removeDecoration(decoration)));
        this.register((0, Lifecycle_1.toDisposable)(() => {
            this._container.remove();
            this._decorationElements.clear();
        }));
    }
    _queueRefresh() {
        if (this._animationFrame !== undefined) {
            return;
        }
        this._animationFrame = this._renderService.addRefreshCallback(() => {
            this._doRefreshDecorations();
            this._animationFrame = undefined;
        });
    }
    _doRefreshDecorations() {
        for (const decoration of this._decorationService.decorations) {
            this._renderDecoration(decoration);
        }
        this._dimensionsChanged = false;
    }
    _renderDecoration(decoration) {
        this._refreshStyle(decoration);
        if (this._dimensionsChanged) {
            this._refreshXPosition(decoration);
        }
    }
    _createElement(decoration) {
        const element = this._coreBrowserService.mainDocument.createElement('div');
        element.classList.add('xterm-decoration');
        element.classList.toggle('xterm-decoration-top-layer', decoration?.options?.layer === 'top');
        element.style.width = `${Math.round((decoration.options.width || 1) * this._renderService.dimensions.css.cell.width)}px`;
        element.style.height = `${(decoration.options.height || 1) * this._renderService.dimensions.css.cell.height}px`;
        element.style.top = `${(decoration.marker.line - this._bufferService.buffers.active.ydisp) * this._renderService.dimensions.css.cell.height}px`;
        element.style.lineHeight = `${this._renderService.dimensions.css.cell.height}px`;
        const x = decoration.options.x ?? 0;
        if (x && x > this._bufferService.cols) {
            // exceeded the container width, so hide
            element.style.display = 'none';
        }
        this._refreshXPosition(decoration, element);
        return element;
    }
    _refreshStyle(decoration) {
        const line = decoration.marker.line - this._bufferService.buffers.active.ydisp;
        if (line < 0 || line >= this._bufferService.rows) {
            // outside of viewport
            if (decoration.element) {
                decoration.element.style.display = 'none';
                decoration.onRenderEmitter.fire(decoration.element);
            }
        }
        else {
            let element = this._decorationElements.get(decoration);
            if (!element) {
                element = this._createElement(decoration);
                decoration.element = element;
                this._decorationElements.set(decoration, element);
                this._container.appendChild(element);
                decoration.onDispose(() => {
                    this._decorationElements.delete(decoration);
                    element.remove();
                });
            }
            element.style.top = `${line * this._renderService.dimensions.css.cell.height}px`;
            element.style.display = this._altBufferIsActive ? 'none' : 'block';
            decoration.onRenderEmitter.fire(element);
        }
    }
    _refreshXPosition(decoration, element = decoration.element) {
        if (!element) {
            return;
        }
        const x = decoration.options.x ?? 0;
        if ((decoration.options.anchor || 'left') === 'right') {
            element.style.right = x ? `${x * this._renderService.dimensions.css.cell.width}px` : '';
        }
        else {
            element.style.left = x ? `${x * this._renderService.dimensions.css.cell.width}px` : '';
        }
    }
    _removeDecoration(decoration) {
        this._decorationElements.get(decoration)?.remove();
        this._decorationElements.delete(decoration);
        decoration.dispose();
    }
}
exports.BufferDecorationRenderer = BufferDecorationRenderer;
