"use strict";
/**
 * Copyright (c) 2019 The xterm.js authors. All rights reserved.
 * @license MIT
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.RenderService = void 0;
const RenderDebouncer_1 = require("browser/RenderDebouncer");
const EventEmitter_1 = require("common/EventEmitter");
const Lifecycle_1 = require("common/Lifecycle");
const TaskQueue_1 = require("common/TaskQueue");
class RenderService extends Lifecycle_1.Disposable {
    get dimensions() { return this._renderer.value.dimensions; }
    constructor(_rowCount, screenElement, optionsService, _charSizeService, decorationService, bufferService, coreBrowserService, themeService) {
        super();
        this._rowCount = _rowCount;
        this._charSizeService = _charSizeService;
        this._renderer = this.register(new Lifecycle_1.MutableDisposable());
        this._pausedResizeTask = new TaskQueue_1.DebouncedIdleTask();
        this._observerDisposable = this.register(new Lifecycle_1.MutableDisposable());
        this._isPaused = false;
        this._needsFullRefresh = false;
        this._isNextRenderRedrawOnly = true;
        this._needsSelectionRefresh = false;
        this._canvasWidth = 0;
        this._canvasHeight = 0;
        this._selectionState = {
            start: undefined,
            end: undefined,
            columnSelectMode: false
        };
        this._onDimensionsChange = this.register(new EventEmitter_1.EventEmitter());
        this.onDimensionsChange = this._onDimensionsChange.event;
        this._onRenderedViewportChange = this.register(new EventEmitter_1.EventEmitter());
        this.onRenderedViewportChange = this._onRenderedViewportChange.event;
        this._onRender = this.register(new EventEmitter_1.EventEmitter());
        this.onRender = this._onRender.event;
        this._onRefreshRequest = this.register(new EventEmitter_1.EventEmitter());
        this.onRefreshRequest = this._onRefreshRequest.event;
        this._renderDebouncer = new RenderDebouncer_1.RenderDebouncer((start, end) => this._renderRows(start, end), coreBrowserService);
        this.register(this._renderDebouncer);
        this.register(coreBrowserService.onDprChange(() => this.handleDevicePixelRatioChange()));
        this.register(bufferService.onResize(() => this._fullRefresh()));
        this.register(bufferService.buffers.onBufferActivate(() => this._renderer.value?.clear()));
        this.register(optionsService.onOptionChange(() => this._handleOptionsChanged()));
        this.register(this._charSizeService.onCharSizeChange(() => this.handleCharSizeChanged()));
        // Do a full refresh whenever any decoration is added or removed. This may not actually result
        // in changes but since decorations should be used sparingly or added/removed all in the same
        // frame this should have minimal performance impact.
        this.register(decorationService.onDecorationRegistered(() => this._fullRefresh()));
        this.register(decorationService.onDecorationRemoved(() => this._fullRefresh()));
        // Clear the renderer when the a change that could affect glyphs occurs
        this.register(optionsService.onMultipleOptionChange([
            'customGlyphs',
            'drawBoldTextInBrightColors',
            'letterSpacing',
            'lineHeight',
            'fontFamily',
            'fontSize',
            'fontWeight',
            'fontWeightBold',
            'minimumContrastRatio',
            'rescaleOverlappingGlyphs'
        ], () => {
            this.clear();
            this.handleResize(bufferService.cols, bufferService.rows);
            this._fullRefresh();
        }));
        // Refresh the cursor line when the cursor changes
        this.register(optionsService.onMultipleOptionChange([
            'cursorBlink',
            'cursorStyle'
        ], () => this.refreshRows(bufferService.buffer.y, bufferService.buffer.y, true)));
        this.register(themeService.onChangeColors(() => this._fullRefresh()));
        this._registerIntersectionObserver(coreBrowserService.window, screenElement);
        this.register(coreBrowserService.onWindowChange((w) => this._registerIntersectionObserver(w, screenElement)));
    }
    _registerIntersectionObserver(w, screenElement) {
        // Detect whether IntersectionObserver is detected and enable renderer pause
        // and resume based on terminal visibility if so
        if ('IntersectionObserver' in w) {
            const observer = new w.IntersectionObserver(e => this._handleIntersectionChange(e[e.length - 1]), { threshold: 0 });
            observer.observe(screenElement);
            this._observerDisposable.value = (0, Lifecycle_1.toDisposable)(() => observer.disconnect());
        }
    }
    _handleIntersectionChange(entry) {
        this._isPaused = entry.isIntersecting === undefined ? (entry.intersectionRatio === 0) : !entry.isIntersecting;
        // Terminal was hidden on open
        if (!this._isPaused && !this._charSizeService.hasValidSize) {
            this._charSizeService.measure();
        }
        if (!this._isPaused && this._needsFullRefresh) {
            this._pausedResizeTask.flush();
            this.refreshRows(0, this._rowCount - 1);
            this._needsFullRefresh = false;
        }
    }
    refreshRows(start, end, isRedrawOnly = false) {
        if (this._isPaused) {
            this._needsFullRefresh = true;
            return;
        }
        if (!isRedrawOnly) {
            this._isNextRenderRedrawOnly = false;
        }
        this._renderDebouncer.refresh(start, end, this._rowCount);
    }
    _renderRows(start, end) {
        if (!this._renderer.value) {
            return;
        }
        // Since this is debounced, a resize event could have happened between the time a refresh was
        // requested and when this triggers. Clamp the values of start and end to ensure they're valid
        // given the current viewport state.
        start = Math.min(start, this._rowCount - 1);
        end = Math.min(end, this._rowCount - 1);
        // Render
        this._renderer.value.renderRows(start, end);
        // Update selection if needed
        if (this._needsSelectionRefresh) {
            this._renderer.value.handleSelectionChanged(this._selectionState.start, this._selectionState.end, this._selectionState.columnSelectMode);
            this._needsSelectionRefresh = false;
        }
        // Fire render event only if it was not a redraw
        if (!this._isNextRenderRedrawOnly) {
            this._onRenderedViewportChange.fire({ start, end });
        }
        this._onRender.fire({ start, end });
        this._isNextRenderRedrawOnly = true;
    }
    resize(cols, rows) {
        this._rowCount = rows;
        this._fireOnCanvasResize();
    }
    _handleOptionsChanged() {
        if (!this._renderer.value) {
            return;
        }
        this.refreshRows(0, this._rowCount - 1);
        this._fireOnCanvasResize();
    }
    _fireOnCanvasResize() {
        if (!this._renderer.value) {
            return;
        }
        // Don't fire the event if the dimensions haven't changed
        if (this._renderer.value.dimensions.css.canvas.width === this._canvasWidth && this._renderer.value.dimensions.css.canvas.height === this._canvasHeight) {
            return;
        }
        this._onDimensionsChange.fire(this._renderer.value.dimensions);
    }
    hasRenderer() {
        return !!this._renderer.value;
    }
    setRenderer(renderer) {
        this._renderer.value = renderer;
        // If the value was not set, the terminal is being disposed so ignore it
        if (this._renderer.value) {
            this._renderer.value.onRequestRedraw(e => this.refreshRows(e.start, e.end, true));
            // Force a refresh
            this._needsSelectionRefresh = true;
            this._fullRefresh();
        }
    }
    addRefreshCallback(callback) {
        return this._renderDebouncer.addRefreshCallback(callback);
    }
    _fullRefresh() {
        if (this._isPaused) {
            this._needsFullRefresh = true;
        }
        else {
            this.refreshRows(0, this._rowCount - 1);
        }
    }
    clearTextureAtlas() {
        if (!this._renderer.value) {
            return;
        }
        this._renderer.value.clearTextureAtlas?.();
        this._fullRefresh();
    }
    handleDevicePixelRatioChange() {
        // Force char size measurement as DomMeasureStrategy(getBoundingClientRect) is not stable
        // when devicePixelRatio changes
        this._charSizeService.measure();
        if (!this._renderer.value) {
            return;
        }
        this._renderer.value.handleDevicePixelRatioChange();
        this.refreshRows(0, this._rowCount - 1);
    }
    handleResize(cols, rows) {
        if (!this._renderer.value) {
            return;
        }
        if (this._isPaused) {
            this._pausedResizeTask.set(() => this._renderer.value?.handleResize(cols, rows));
        }
        else {
            this._renderer.value.handleResize(cols, rows);
        }
        this._fullRefresh();
    }
    // TODO: Is this useful when we have onResize?
    handleCharSizeChanged() {
        this._renderer.value?.handleCharSizeChanged();
    }
    handleBlur() {
        this._renderer.value?.handleBlur();
    }
    handleFocus() {
        this._renderer.value?.handleFocus();
    }
    handleSelectionChanged(start, end, columnSelectMode) {
        this._selectionState.start = start;
        this._selectionState.end = end;
        this._selectionState.columnSelectMode = columnSelectMode;
        this._renderer.value?.handleSelectionChanged(start, end, columnSelectMode);
    }
    handleCursorMove() {
        this._renderer.value?.handleCursorMove();
    }
    clear() {
        this._renderer.value?.clear();
    }
}
exports.RenderService = RenderService;
