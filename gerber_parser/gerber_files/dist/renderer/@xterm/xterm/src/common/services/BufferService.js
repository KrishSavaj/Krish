"use strict";
/**
 * Copyright (c) 2019 The xterm.js authors. All rights reserved.
 * @license MIT
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.BufferService = exports.MINIMUM_ROWS = exports.MINIMUM_COLS = void 0;
const EventEmitter_1 = require("common/EventEmitter");
const Lifecycle_1 = require("common/Lifecycle");
const BufferSet_1 = require("common/buffer/BufferSet");
exports.MINIMUM_COLS = 2; // Less than 2 can mess with wide chars
exports.MINIMUM_ROWS = 1;
class BufferService extends Lifecycle_1.Disposable {
    get buffer() { return this.buffers.active; }
    constructor(optionsService) {
        super();
        /** Whether the user is scrolling (locks the scroll position) */
        this.isUserScrolling = false;
        this._onResize = this.register(new EventEmitter_1.EventEmitter());
        this.onResize = this._onResize.event;
        this._onScroll = this.register(new EventEmitter_1.EventEmitter());
        this.onScroll = this._onScroll.event;
        this.cols = Math.max(optionsService.rawOptions.cols || 0, exports.MINIMUM_COLS);
        this.rows = Math.max(optionsService.rawOptions.rows || 0, exports.MINIMUM_ROWS);
        this.buffers = this.register(new BufferSet_1.BufferSet(optionsService, this));
    }
    resize(cols, rows) {
        this.cols = cols;
        this.rows = rows;
        this.buffers.resize(cols, rows);
        // TODO: This doesn't fire when scrollback changes - add a resize event to BufferSet and forward
        //       event
        this._onResize.fire({ cols, rows });
    }
    reset() {
        this.buffers.reset();
        this.isUserScrolling = false;
    }
    /**
     * Scroll the terminal down 1 row, creating a blank line.
     * @param eraseAttr The attribute data to use the for blank line.
     * @param isWrapped Whether the new line is wrapped from the previous line.
     */
    scroll(eraseAttr, isWrapped = false) {
        const buffer = this.buffer;
        let newLine;
        newLine = this._cachedBlankLine;
        if (!newLine || newLine.length !== this.cols || newLine.getFg(0) !== eraseAttr.fg || newLine.getBg(0) !== eraseAttr.bg) {
            newLine = buffer.getBlankLine(eraseAttr, isWrapped);
            this._cachedBlankLine = newLine;
        }
        newLine.isWrapped = isWrapped;
        const topRow = buffer.ybase + buffer.scrollTop;
        const bottomRow = buffer.ybase + buffer.scrollBottom;
        if (buffer.scrollTop === 0) {
            // Determine whether the buffer is going to be trimmed after insertion.
            const willBufferBeTrimmed = buffer.lines.isFull;
            // Insert the line using the fastest method
            if (bottomRow === buffer.lines.length - 1) {
                if (willBufferBeTrimmed) {
                    buffer.lines.recycle().copyFrom(newLine);
                }
                else {
                    buffer.lines.push(newLine.clone());
                }
            }
            else {
                buffer.lines.splice(bottomRow + 1, 0, newLine.clone());
            }
            // Only adjust ybase and ydisp when the buffer is not trimmed
            if (!willBufferBeTrimmed) {
                buffer.ybase++;
                // Only scroll the ydisp with ybase if the user has not scrolled up
                if (!this.isUserScrolling) {
                    buffer.ydisp++;
                }
            }
            else {
                // When the buffer is full and the user has scrolled up, keep the text
                // stable unless ydisp is right at the top
                if (this.isUserScrolling) {
                    buffer.ydisp = Math.max(buffer.ydisp - 1, 0);
                }
            }
        }
        else {
            // scrollTop is non-zero which means no line will be going to the
            // scrollback, instead we can just shift them in-place.
            const scrollRegionHeight = bottomRow - topRow + 1 /* as it's zero-based */;
            buffer.lines.shiftElements(topRow + 1, scrollRegionHeight - 1, -1);
            buffer.lines.set(bottomRow, newLine.clone());
        }
        // Move the viewport to the bottom of the buffer unless the user is
        // scrolling.
        if (!this.isUserScrolling) {
            buffer.ydisp = buffer.ybase;
        }
        this._onScroll.fire(buffer.ydisp);
    }
    /**
     * Scroll the display of the terminal
     * @param disp The number of lines to scroll down (negative scroll up).
     * @param suppressScrollEvent Don't emit the scroll event as scrollLines. This is used
     * to avoid unwanted events being handled by the viewport when the event was triggered from the
     * viewport originally.
     */
    scrollLines(disp, suppressScrollEvent, source) {
        const buffer = this.buffer;
        if (disp < 0) {
            if (buffer.ydisp === 0) {
                return;
            }
            this.isUserScrolling = true;
        }
        else if (disp + buffer.ydisp >= buffer.ybase) {
            this.isUserScrolling = false;
        }
        const oldYdisp = buffer.ydisp;
        buffer.ydisp = Math.max(Math.min(buffer.ydisp + disp, buffer.ybase), 0);
        // No change occurred, don't trigger scroll/refresh
        if (oldYdisp === buffer.ydisp) {
            return;
        }
        if (!suppressScrollEvent) {
            this._onScroll.fire(buffer.ydisp);
        }
    }
}
exports.BufferService = BufferService;
