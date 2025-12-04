"use strict";
/**
 * Copyright (c) 2019 The xterm.js authors. All rights reserved.
 * @license MIT
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.CoreService = void 0;
const Clone_1 = require("common/Clone");
const EventEmitter_1 = require("common/EventEmitter");
const Lifecycle_1 = require("common/Lifecycle");
const DEFAULT_MODES = Object.freeze({
    insertMode: false
});
const DEFAULT_DEC_PRIVATE_MODES = Object.freeze({
    applicationCursorKeys: false,
    applicationKeypad: false,
    bracketedPasteMode: false,
    origin: false,
    reverseWraparound: false,
    sendFocus: false,
    wraparound: true // defaults: xterm - true, vt100 - false
});
class CoreService extends Lifecycle_1.Disposable {
    constructor(_bufferService, _logService, _optionsService) {
        super();
        this._bufferService = _bufferService;
        this._logService = _logService;
        this._optionsService = _optionsService;
        this.isCursorInitialized = false;
        this.isCursorHidden = false;
        this._onData = this.register(new EventEmitter_1.EventEmitter());
        this.onData = this._onData.event;
        this._onUserInput = this.register(new EventEmitter_1.EventEmitter());
        this.onUserInput = this._onUserInput.event;
        this._onBinary = this.register(new EventEmitter_1.EventEmitter());
        this.onBinary = this._onBinary.event;
        this._onRequestScrollToBottom = this.register(new EventEmitter_1.EventEmitter());
        this.onRequestScrollToBottom = this._onRequestScrollToBottom.event;
        this.modes = (0, Clone_1.clone)(DEFAULT_MODES);
        this.decPrivateModes = (0, Clone_1.clone)(DEFAULT_DEC_PRIVATE_MODES);
    }
    reset() {
        this.modes = (0, Clone_1.clone)(DEFAULT_MODES);
        this.decPrivateModes = (0, Clone_1.clone)(DEFAULT_DEC_PRIVATE_MODES);
    }
    triggerDataEvent(data, wasUserInput = false) {
        // Prevents all events to pty process if stdin is disabled
        if (this._optionsService.rawOptions.disableStdin) {
            return;
        }
        // Input is being sent to the terminal, the terminal should focus the prompt.
        const buffer = this._bufferService.buffer;
        if (wasUserInput && this._optionsService.rawOptions.scrollOnUserInput && buffer.ybase !== buffer.ydisp) {
            this._onRequestScrollToBottom.fire();
        }
        // Fire onUserInput so listeners can react as well (eg. clear selection)
        if (wasUserInput) {
            this._onUserInput.fire();
        }
        // Fire onData API
        this._logService.debug(`sending data "${data}"`, () => data.split('').map(e => e.charCodeAt(0)));
        this._onData.fire(data);
    }
    triggerBinaryEvent(data) {
        if (this._optionsService.rawOptions.disableStdin) {
            return;
        }
        this._logService.debug(`sending binary "${data}"`, () => data.split('').map(e => e.charCodeAt(0)));
        this._onBinary.fire(data);
    }
}
exports.CoreService = CoreService;
