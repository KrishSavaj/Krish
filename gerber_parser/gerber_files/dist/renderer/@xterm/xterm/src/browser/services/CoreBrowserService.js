"use strict";
/**
 * Copyright (c) 2019 The xterm.js authors. All rights reserved.
 * @license MIT
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.CoreBrowserService = void 0;
const Lifecycle_1 = require("common/Lifecycle");
const EventEmitter_1 = require("common/EventEmitter");
const Lifecycle_2 = require("browser/Lifecycle");
class CoreBrowserService extends Lifecycle_1.Disposable {
    constructor(_textarea, _window, mainDocument) {
        super();
        this._textarea = _textarea;
        this._window = _window;
        this.mainDocument = mainDocument;
        this._isFocused = false;
        this._cachedIsFocused = undefined;
        this._screenDprMonitor = new ScreenDprMonitor(this._window);
        this._onDprChange = this.register(new EventEmitter_1.EventEmitter());
        this.onDprChange = this._onDprChange.event;
        this._onWindowChange = this.register(new EventEmitter_1.EventEmitter());
        this.onWindowChange = this._onWindowChange.event;
        // Monitor device pixel ratio
        this.register(this.onWindowChange(w => this._screenDprMonitor.setWindow(w)));
        this.register((0, EventEmitter_1.forwardEvent)(this._screenDprMonitor.onDprChange, this._onDprChange));
        this._textarea.addEventListener('focus', () => this._isFocused = true);
        this._textarea.addEventListener('blur', () => this._isFocused = false);
    }
    get window() {
        return this._window;
    }
    set window(value) {
        if (this._window !== value) {
            this._window = value;
            this._onWindowChange.fire(this._window);
        }
    }
    get dpr() {
        return this.window.devicePixelRatio;
    }
    get isFocused() {
        if (this._cachedIsFocused === undefined) {
            this._cachedIsFocused = this._isFocused && this._textarea.ownerDocument.hasFocus();
            queueMicrotask(() => this._cachedIsFocused = undefined);
        }
        return this._cachedIsFocused;
    }
}
exports.CoreBrowserService = CoreBrowserService;
/**
 * The screen device pixel ratio monitor allows listening for when the
 * window.devicePixelRatio value changes. This is done not with polling but with
 * the use of window.matchMedia to watch media queries. When the event fires,
 * the listener will be reattached using a different media query to ensure that
 * any further changes will register.
 *
 * The listener should fire on both window zoom changes and switching to a
 * monitor with a different DPI.
 */
class ScreenDprMonitor extends Lifecycle_1.Disposable {
    constructor(_parentWindow) {
        super();
        this._parentWindow = _parentWindow;
        this._windowResizeListener = this.register(new Lifecycle_1.MutableDisposable());
        this._onDprChange = this.register(new EventEmitter_1.EventEmitter());
        this.onDprChange = this._onDprChange.event;
        // Initialize listener and dpr value
        this._outerListener = () => this._setDprAndFireIfDiffers();
        this._currentDevicePixelRatio = this._parentWindow.devicePixelRatio;
        this._updateDpr();
        // Monitor active window resize
        this._setWindowResizeListener();
        // Setup additional disposables
        this.register((0, Lifecycle_1.toDisposable)(() => this.clearListener()));
    }
    setWindow(parentWindow) {
        this._parentWindow = parentWindow;
        this._setWindowResizeListener();
        this._setDprAndFireIfDiffers();
    }
    _setWindowResizeListener() {
        this._windowResizeListener.value = (0, Lifecycle_2.addDisposableDomListener)(this._parentWindow, 'resize', () => this._setDprAndFireIfDiffers());
    }
    _setDprAndFireIfDiffers() {
        if (this._parentWindow.devicePixelRatio !== this._currentDevicePixelRatio) {
            this._onDprChange.fire(this._parentWindow.devicePixelRatio);
        }
        this._updateDpr();
    }
    _updateDpr() {
        if (!this._outerListener) {
            return;
        }
        // Clear listeners for old DPR
        this._resolutionMediaMatchList?.removeListener(this._outerListener);
        // Add listeners for new DPR
        this._currentDevicePixelRatio = this._parentWindow.devicePixelRatio;
        this._resolutionMediaMatchList = this._parentWindow.matchMedia(`screen and (resolution: ${this._parentWindow.devicePixelRatio}dppx)`);
        this._resolutionMediaMatchList.addListener(this._outerListener);
    }
    clearListener() {
        if (!this._resolutionMediaMatchList || !this._outerListener) {
            return;
        }
        this._resolutionMediaMatchList.removeListener(this._outerListener);
        this._resolutionMediaMatchList = undefined;
        this._outerListener = undefined;
    }
}
