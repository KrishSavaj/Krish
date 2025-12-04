"use strict";
/**
 * Copyright (c) 2016 The xterm.js authors. All rights reserved.
 * @license MIT
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.Viewport = void 0;
const Lifecycle_1 = require("browser/Lifecycle");
const EventEmitter_1 = require("common/EventEmitter");
const Lifecycle_2 = require("common/Lifecycle");
const FALLBACK_SCROLL_BAR_WIDTH = 15;
/**
 * Represents the viewport of a terminal, the visible area within the larger buffer of output.
 * Logic for the virtual scroll bar is included in this object.
 */
class Viewport extends Lifecycle_2.Disposable {
    constructor(_viewportElement, _scrollArea, _bufferService, _optionsService, _charSizeService, _renderService, _coreBrowserService, themeService) {
        super();
        this._viewportElement = _viewportElement;
        this._scrollArea = _scrollArea;
        this._bufferService = _bufferService;
        this._optionsService = _optionsService;
        this._charSizeService = _charSizeService;
        this._renderService = _renderService;
        this._coreBrowserService = _coreBrowserService;
        this.scrollBarWidth = 0;
        this._currentRowHeight = 0;
        this._currentDeviceCellHeight = 0;
        this._lastRecordedBufferLength = 0;
        this._lastRecordedViewportHeight = 0;
        this._lastRecordedBufferHeight = 0;
        this._lastTouchY = 0;
        this._lastScrollTop = 0;
        // Stores a partial line amount when scrolling, this is used to keep track of how much of a line
        // is scrolled so we can "scroll" over partial lines and feel natural on touchpads. This is a
        // quick fix and could have a more robust solution in place that reset the value when needed.
        this._wheelPartialScroll = 0;
        this._refreshAnimationFrame = null;
        this._ignoreNextScrollEvent = false;
        this._smoothScrollState = {
            startTime: 0,
            origin: -1,
            target: -1
        };
        this._onRequestScrollLines = this.register(new EventEmitter_1.EventEmitter());
        this.onRequestScrollLines = this._onRequestScrollLines.event;
        // Measure the width of the scrollbar. If it is 0 we can assume it's an OSX overlay scrollbar.
        // Unfortunately the overlay scrollbar would be hidden underneath the screen element in that
        // case, therefore we account for a standard amount to make it visible
        this.scrollBarWidth = (this._viewportElement.offsetWidth - this._scrollArea.offsetWidth) || FALLBACK_SCROLL_BAR_WIDTH;
        this.register((0, Lifecycle_1.addDisposableDomListener)(this._viewportElement, 'scroll', this._handleScroll.bind(this)));
        // Track properties used in performance critical code manually to avoid using slow getters
        this._activeBuffer = this._bufferService.buffer;
        this.register(this._bufferService.buffers.onBufferActivate(e => this._activeBuffer = e.activeBuffer));
        this._renderDimensions = this._renderService.dimensions;
        this.register(this._renderService.onDimensionsChange(e => this._renderDimensions = e));
        this._handleThemeChange(themeService.colors);
        this.register(themeService.onChangeColors(e => this._handleThemeChange(e)));
        this.register(this._optionsService.onSpecificOptionChange('scrollback', () => this.syncScrollArea()));
        // Perform this async to ensure the ICharSizeService is ready.
        setTimeout(() => this.syncScrollArea());
    }
    _handleThemeChange(colors) {
        this._viewportElement.style.backgroundColor = colors.background.css;
    }
    reset() {
        this._currentRowHeight = 0;
        this._currentDeviceCellHeight = 0;
        this._lastRecordedBufferLength = 0;
        this._lastRecordedViewportHeight = 0;
        this._lastRecordedBufferHeight = 0;
        this._lastTouchY = 0;
        this._lastScrollTop = 0;
        // Sync on next animation frame to ensure the new terminal state is used
        this._coreBrowserService.window.requestAnimationFrame(() => this.syncScrollArea());
    }
    /**
     * Refreshes row height, setting line-height, viewport height and scroll area height if
     * necessary.
     */
    _refresh(immediate) {
        if (immediate) {
            this._innerRefresh();
            if (this._refreshAnimationFrame !== null) {
                this._coreBrowserService.window.cancelAnimationFrame(this._refreshAnimationFrame);
            }
            return;
        }
        if (this._refreshAnimationFrame === null) {
            this._refreshAnimationFrame = this._coreBrowserService.window.requestAnimationFrame(() => this._innerRefresh());
        }
    }
    _innerRefresh() {
        if (this._charSizeService.height > 0) {
            this._currentRowHeight = this._renderDimensions.device.cell.height / this._coreBrowserService.dpr;
            this._currentDeviceCellHeight = this._renderDimensions.device.cell.height;
            this._lastRecordedViewportHeight = this._viewportElement.offsetHeight;
            const newBufferHeight = Math.round(this._currentRowHeight * this._lastRecordedBufferLength) + (this._lastRecordedViewportHeight - this._renderDimensions.css.canvas.height);
            if (this._lastRecordedBufferHeight !== newBufferHeight) {
                this._lastRecordedBufferHeight = newBufferHeight;
                this._scrollArea.style.height = this._lastRecordedBufferHeight + 'px';
            }
        }
        // Sync scrollTop
        const scrollTop = this._bufferService.buffer.ydisp * this._currentRowHeight;
        if (this._viewportElement.scrollTop !== scrollTop) {
            // Ignore the next scroll event which will be triggered by setting the scrollTop as we do not
            // want this event to scroll the terminal
            this._ignoreNextScrollEvent = true;
            this._viewportElement.scrollTop = scrollTop;
        }
        this._refreshAnimationFrame = null;
    }
    /**
     * Updates dimensions and synchronizes the scroll area if necessary.
     */
    syncScrollArea(immediate = false) {
        // If buffer height changed
        if (this._lastRecordedBufferLength !== this._bufferService.buffer.lines.length) {
            this._lastRecordedBufferLength = this._bufferService.buffer.lines.length;
            this._refresh(immediate);
            return;
        }
        // If viewport height changed
        if (this._lastRecordedViewportHeight !== this._renderService.dimensions.css.canvas.height) {
            this._refresh(immediate);
            return;
        }
        // If the buffer position doesn't match last scroll top
        if (this._lastScrollTop !== this._activeBuffer.ydisp * this._currentRowHeight) {
            this._refresh(immediate);
            return;
        }
        // If row height changed
        if (this._renderDimensions.device.cell.height !== this._currentDeviceCellHeight) {
            this._refresh(immediate);
            return;
        }
    }
    /**
     * Handles scroll events on the viewport, calculating the new viewport and requesting the
     * terminal to scroll to it.
     * @param ev The scroll event.
     */
    _handleScroll(ev) {
        // Record current scroll top position
        this._lastScrollTop = this._viewportElement.scrollTop;
        // Don't attempt to scroll if the element is not visible, otherwise scrollTop will be corrupt
        // which causes the terminal to scroll the buffer to the top
        if (!this._viewportElement.offsetParent) {
            return;
        }
        // Ignore the event if it was flagged to ignore (when the source of the event is from Viewport)
        if (this._ignoreNextScrollEvent) {
            this._ignoreNextScrollEvent = false;
            // Still trigger the scroll so lines get refreshed
            this._onRequestScrollLines.fire({ amount: 0, suppressScrollEvent: true });
            return;
        }
        const newRow = Math.round(this._lastScrollTop / this._currentRowHeight);
        const diff = newRow - this._bufferService.buffer.ydisp;
        this._onRequestScrollLines.fire({ amount: diff, suppressScrollEvent: true });
    }
    _smoothScroll() {
        // Check valid state
        if (this._isDisposed || this._smoothScrollState.origin === -1 || this._smoothScrollState.target === -1) {
            return;
        }
        // Calculate position complete
        const percent = this._smoothScrollPercent();
        this._viewportElement.scrollTop = this._smoothScrollState.origin + Math.round(percent * (this._smoothScrollState.target - this._smoothScrollState.origin));
        // Continue or finish smooth scroll
        if (percent < 1) {
            this._coreBrowserService.window.requestAnimationFrame(() => this._smoothScroll());
        }
        else {
            this._clearSmoothScrollState();
        }
    }
    _smoothScrollPercent() {
        if (!this._optionsService.rawOptions.smoothScrollDuration || !this._smoothScrollState.startTime) {
            return 1;
        }
        return Math.max(Math.min((Date.now() - this._smoothScrollState.startTime) / this._optionsService.rawOptions.smoothScrollDuration, 1), 0);
    }
    _clearSmoothScrollState() {
        this._smoothScrollState.startTime = 0;
        this._smoothScrollState.origin = -1;
        this._smoothScrollState.target = -1;
    }
    /**
     * Handles bubbling of scroll event in case the viewport has reached top or bottom
     * @param ev The scroll event.
     * @param amount The amount scrolled
     */
    _bubbleScroll(ev, amount) {
        const scrollPosFromTop = this._viewportElement.scrollTop + this._lastRecordedViewportHeight;
        if ((amount < 0 && this._viewportElement.scrollTop !== 0) ||
            (amount > 0 && scrollPosFromTop < this._lastRecordedBufferHeight)) {
            if (ev.cancelable) {
                ev.preventDefault();
            }
            return false;
        }
        return true;
    }
    /**
     * Handles mouse wheel events by adjusting the viewport's scrollTop and delegating the actual
     * scrolling to `onScroll`, this event needs to be attached manually by the consumer of
     * `Viewport`.
     * @param ev The mouse wheel event.
     */
    handleWheel(ev) {
        const amount = this._getPixelsScrolled(ev);
        if (amount === 0) {
            return false;
        }
        if (!this._optionsService.rawOptions.smoothScrollDuration) {
            this._viewportElement.scrollTop += amount;
        }
        else {
            this._smoothScrollState.startTime = Date.now();
            if (this._smoothScrollPercent() < 1) {
                this._smoothScrollState.origin = this._viewportElement.scrollTop;
                if (this._smoothScrollState.target === -1) {
                    this._smoothScrollState.target = this._viewportElement.scrollTop + amount;
                }
                else {
                    this._smoothScrollState.target += amount;
                }
                this._smoothScrollState.target = Math.max(Math.min(this._smoothScrollState.target, this._viewportElement.scrollHeight), 0);
                this._smoothScroll();
            }
            else {
                this._clearSmoothScrollState();
            }
        }
        return this._bubbleScroll(ev, amount);
    }
    scrollLines(disp) {
        if (disp === 0) {
            return;
        }
        if (!this._optionsService.rawOptions.smoothScrollDuration) {
            this._onRequestScrollLines.fire({ amount: disp, suppressScrollEvent: false });
        }
        else {
            const amount = disp * this._currentRowHeight;
            this._smoothScrollState.startTime = Date.now();
            if (this._smoothScrollPercent() < 1) {
                this._smoothScrollState.origin = this._viewportElement.scrollTop;
                this._smoothScrollState.target = this._smoothScrollState.origin + amount;
                this._smoothScrollState.target = Math.max(Math.min(this._smoothScrollState.target, this._viewportElement.scrollHeight), 0);
                this._smoothScroll();
            }
            else {
                this._clearSmoothScrollState();
            }
        }
    }
    _getPixelsScrolled(ev) {
        // Do nothing if it's not a vertical scroll event
        if (ev.deltaY === 0 || ev.shiftKey) {
            return 0;
        }
        // Fallback to WheelEvent.DOM_DELTA_PIXEL
        let amount = this._applyScrollModifier(ev.deltaY, ev);
        if (ev.deltaMode === WheelEvent.DOM_DELTA_LINE) {
            amount *= this._currentRowHeight;
        }
        else if (ev.deltaMode === WheelEvent.DOM_DELTA_PAGE) {
            amount *= this._currentRowHeight * this._bufferService.rows;
        }
        return amount;
    }
    getBufferElements(startLine, endLine) {
        let currentLine = '';
        let cursorElement;
        const bufferElements = [];
        const end = endLine ?? this._bufferService.buffer.lines.length;
        const lines = this._bufferService.buffer.lines;
        for (let i = startLine; i < end; i++) {
            const line = lines.get(i);
            if (!line) {
                continue;
            }
            const isWrapped = lines.get(i + 1)?.isWrapped;
            currentLine += line.translateToString(!isWrapped);
            if (!isWrapped || i === lines.length - 1) {
                const div = document.createElement('div');
                div.textContent = currentLine;
                bufferElements.push(div);
                if (currentLine.length > 0) {
                    cursorElement = div;
                }
                currentLine = '';
            }
        }
        return { bufferElements, cursorElement };
    }
    /**
     * Gets the number of pixels scrolled by the mouse event taking into account what type of delta
     * is being used.
     * @param ev The mouse wheel event.
     */
    getLinesScrolled(ev) {
        // Do nothing if it's not a vertical scroll event
        if (ev.deltaY === 0 || ev.shiftKey) {
            return 0;
        }
        // Fallback to WheelEvent.DOM_DELTA_LINE
        let amount = this._applyScrollModifier(ev.deltaY, ev);
        if (ev.deltaMode === WheelEvent.DOM_DELTA_PIXEL) {
            amount /= this._currentRowHeight + 0.0; // Prevent integer division
            this._wheelPartialScroll += amount;
            amount = Math.floor(Math.abs(this._wheelPartialScroll)) * (this._wheelPartialScroll > 0 ? 1 : -1);
            this._wheelPartialScroll %= 1;
        }
        else if (ev.deltaMode === WheelEvent.DOM_DELTA_PAGE) {
            amount *= this._bufferService.rows;
        }
        return amount;
    }
    _applyScrollModifier(amount, ev) {
        const modifier = this._optionsService.rawOptions.fastScrollModifier;
        // Multiply the scroll speed when the modifier is down
        if ((modifier === 'alt' && ev.altKey) ||
            (modifier === 'ctrl' && ev.ctrlKey) ||
            (modifier === 'shift' && ev.shiftKey)) {
            return amount * this._optionsService.rawOptions.fastScrollSensitivity * this._optionsService.rawOptions.scrollSensitivity;
        }
        return amount * this._optionsService.rawOptions.scrollSensitivity;
    }
    /**
     * Handles the touchstart event, recording the touch occurred.
     * @param ev The touch event.
     */
    handleTouchStart(ev) {
        this._lastTouchY = ev.touches[0].pageY;
    }
    /**
     * Handles the touchmove event, scrolling the viewport if the position shifted.
     * @param ev The touch event.
     */
    handleTouchMove(ev) {
        const deltaY = this._lastTouchY - ev.touches[0].pageY;
        this._lastTouchY = ev.touches[0].pageY;
        if (deltaY === 0) {
            return false;
        }
        this._viewportElement.scrollTop += deltaY;
        return this._bubbleScroll(ev, deltaY);
    }
}
exports.Viewport = Viewport;
