"use strict";
/**
 * Copyright (c) 2018 The xterm.js authors. All rights reserved.
 * @license MIT
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.RenderDebouncer = void 0;
/**
 * Debounces calls to render terminal rows using animation frames.
 */
class RenderDebouncer {
    constructor(_renderCallback, _coreBrowserService) {
        this._renderCallback = _renderCallback;
        this._coreBrowserService = _coreBrowserService;
        this._refreshCallbacks = [];
    }
    dispose() {
        if (this._animationFrame) {
            this._coreBrowserService.window.cancelAnimationFrame(this._animationFrame);
            this._animationFrame = undefined;
        }
    }
    addRefreshCallback(callback) {
        this._refreshCallbacks.push(callback);
        if (!this._animationFrame) {
            this._animationFrame = this._coreBrowserService.window.requestAnimationFrame(() => this._innerRefresh());
        }
        return this._animationFrame;
    }
    refresh(rowStart, rowEnd, rowCount) {
        this._rowCount = rowCount;
        // Get the min/max row start/end for the arg values
        rowStart = rowStart !== undefined ? rowStart : 0;
        rowEnd = rowEnd !== undefined ? rowEnd : this._rowCount - 1;
        // Set the properties to the updated values
        this._rowStart = this._rowStart !== undefined ? Math.min(this._rowStart, rowStart) : rowStart;
        this._rowEnd = this._rowEnd !== undefined ? Math.max(this._rowEnd, rowEnd) : rowEnd;
        if (this._animationFrame) {
            return;
        }
        this._animationFrame = this._coreBrowserService.window.requestAnimationFrame(() => this._innerRefresh());
    }
    _innerRefresh() {
        this._animationFrame = undefined;
        // Make sure values are set
        if (this._rowStart === undefined || this._rowEnd === undefined || this._rowCount === undefined) {
            this._runRefreshCallbacks();
            return;
        }
        // Clamp values
        const start = Math.max(this._rowStart, 0);
        const end = Math.min(this._rowEnd, this._rowCount - 1);
        // Reset debouncer (this happens before render callback as the render could trigger it again)
        this._rowStart = undefined;
        this._rowEnd = undefined;
        // Run render callback
        this._renderCallback(start, end);
        this._runRefreshCallbacks();
    }
    _runRefreshCallbacks() {
        for (const callback of this._refreshCallbacks) {
            callback(0);
        }
        this._refreshCallbacks = [];
    }
}
exports.RenderDebouncer = RenderDebouncer;
