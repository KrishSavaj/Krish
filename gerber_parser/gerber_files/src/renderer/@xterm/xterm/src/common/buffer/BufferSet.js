"use strict";
/**
 * Copyright (c) 2017 The xterm.js authors. All rights reserved.
 * @license MIT
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.BufferSet = void 0;
const EventEmitter_1 = require("common/EventEmitter");
const Lifecycle_1 = require("common/Lifecycle");
const Buffer_1 = require("common/buffer/Buffer");
/**
 * The BufferSet represents the set of two buffers used by xterm terminals (normal and alt) and
 * provides also utilities for working with them.
 */
class BufferSet extends Lifecycle_1.Disposable {
    /**
     * Create a new BufferSet for the given terminal.
     */
    constructor(_optionsService, _bufferService) {
        super();
        this._optionsService = _optionsService;
        this._bufferService = _bufferService;
        this._onBufferActivate = this.register(new EventEmitter_1.EventEmitter());
        this.onBufferActivate = this._onBufferActivate.event;
        this.reset();
        this.register(this._optionsService.onSpecificOptionChange('scrollback', () => this.resize(this._bufferService.cols, this._bufferService.rows)));
        this.register(this._optionsService.onSpecificOptionChange('tabStopWidth', () => this.setupTabStops()));
    }
    reset() {
        this._normal = new Buffer_1.Buffer(true, this._optionsService, this._bufferService);
        this._normal.fillViewportRows();
        // The alt buffer should never have scrollback.
        // See http://invisible-island.net/xterm/ctlseqs/ctlseqs.html#h2-The-Alternate-Screen-Buffer
        this._alt = new Buffer_1.Buffer(false, this._optionsService, this._bufferService);
        this._activeBuffer = this._normal;
        this._onBufferActivate.fire({
            activeBuffer: this._normal,
            inactiveBuffer: this._alt
        });
        this.setupTabStops();
    }
    /**
     * Returns the alt Buffer of the BufferSet
     */
    get alt() {
        return this._alt;
    }
    /**
     * Returns the currently active Buffer of the BufferSet
     */
    get active() {
        return this._activeBuffer;
    }
    /**
     * Returns the normal Buffer of the BufferSet
     */
    get normal() {
        return this._normal;
    }
    /**
     * Sets the normal Buffer of the BufferSet as its currently active Buffer
     */
    activateNormalBuffer() {
        if (this._activeBuffer === this._normal) {
            return;
        }
        this._normal.x = this._alt.x;
        this._normal.y = this._alt.y;
        // The alt buffer should always be cleared when we switch to the normal
        // buffer. This frees up memory since the alt buffer should always be new
        // when activated.
        this._alt.clearAllMarkers();
        this._alt.clear();
        this._activeBuffer = this._normal;
        this._onBufferActivate.fire({
            activeBuffer: this._normal,
            inactiveBuffer: this._alt
        });
    }
    /**
     * Sets the alt Buffer of the BufferSet as its currently active Buffer
     */
    activateAltBuffer(fillAttr) {
        if (this._activeBuffer === this._alt) {
            return;
        }
        // Since the alt buffer is always cleared when the normal buffer is
        // activated, we want to fill it when switching to it.
        this._alt.fillViewportRows(fillAttr);
        this._alt.x = this._normal.x;
        this._alt.y = this._normal.y;
        this._activeBuffer = this._alt;
        this._onBufferActivate.fire({
            activeBuffer: this._alt,
            inactiveBuffer: this._normal
        });
    }
    /**
     * Resizes both normal and alt buffers, adjusting their data accordingly.
     * @param newCols The new number of columns.
     * @param newRows The new number of rows.
     */
    resize(newCols, newRows) {
        this._normal.resize(newCols, newRows);
        this._alt.resize(newCols, newRows);
        this.setupTabStops(newCols);
    }
    /**
     * Setup the tab stops.
     * @param i The index to start setting up tab stops from.
     */
    setupTabStops(i) {
        this._normal.setupTabStops(i);
        this._alt.setupTabStops(i);
    }
}
exports.BufferSet = BufferSet;
