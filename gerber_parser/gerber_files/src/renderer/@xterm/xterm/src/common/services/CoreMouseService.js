"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CoreMouseService = void 0;
const EventEmitter_1 = require("common/EventEmitter");
const Types_1 = require("common/Types");
const Lifecycle_1 = require("common/Lifecycle");
/**
 * Supported default protocols.
 */
const DEFAULT_PROTOCOLS = {
    /**
     * NONE
     * Events: none
     * Modifiers: none
     */
    NONE: {
        events: Types_1.CoreMouseEventType.NONE,
        restrict: () => false
    },
    /**
     * X10
     * Events: mousedown
     * Modifiers: none
     */
    X10: {
        events: Types_1.CoreMouseEventType.DOWN,
        restrict: (e) => {
            // no wheel, no move, no up
            if (e.button === Types_1.CoreMouseButton.WHEEL || e.action !== Types_1.CoreMouseAction.DOWN) {
                return false;
            }
            // no modifiers
            e.ctrl = false;
            e.alt = false;
            e.shift = false;
            return true;
        }
    },
    /**
     * VT200
     * Events: mousedown / mouseup / wheel
     * Modifiers: all
     */
    VT200: {
        events: Types_1.CoreMouseEventType.DOWN | Types_1.CoreMouseEventType.UP | Types_1.CoreMouseEventType.WHEEL,
        restrict: (e) => {
            // no move
            if (e.action === Types_1.CoreMouseAction.MOVE) {
                return false;
            }
            return true;
        }
    },
    /**
     * DRAG
     * Events: mousedown / mouseup / wheel / mousedrag
     * Modifiers: all
     */
    DRAG: {
        events: Types_1.CoreMouseEventType.DOWN | Types_1.CoreMouseEventType.UP | Types_1.CoreMouseEventType.WHEEL | Types_1.CoreMouseEventType.DRAG,
        restrict: (e) => {
            // no move without button
            if (e.action === Types_1.CoreMouseAction.MOVE && e.button === Types_1.CoreMouseButton.NONE) {
                return false;
            }
            return true;
        }
    },
    /**
     * ANY
     * Events: all mouse related events
     * Modifiers: all
     */
    ANY: {
        events: Types_1.CoreMouseEventType.DOWN | Types_1.CoreMouseEventType.UP | Types_1.CoreMouseEventType.WHEEL
            | Types_1.CoreMouseEventType.DRAG | Types_1.CoreMouseEventType.MOVE,
        restrict: (e) => true
    }
};
// helper for default encoders to generate the event code.
function eventCode(e, isSGR) {
    let code = (e.ctrl ? 16 /* Modifiers.CTRL */ : 0) | (e.shift ? 4 /* Modifiers.SHIFT */ : 0) | (e.alt ? 8 /* Modifiers.ALT */ : 0);
    if (e.button === Types_1.CoreMouseButton.WHEEL) {
        code |= 64;
        code |= e.action;
    }
    else {
        code |= e.button & 3;
        if (e.button & 4) {
            code |= 64;
        }
        if (e.button & 8) {
            code |= 128;
        }
        if (e.action === Types_1.CoreMouseAction.MOVE) {
            code |= Types_1.CoreMouseAction.MOVE;
        }
        else if (e.action === Types_1.CoreMouseAction.UP && !isSGR) {
            // special case - only SGR can report button on release
            // all others have to go with NONE
            code |= Types_1.CoreMouseButton.NONE;
        }
    }
    return code;
}
const S = String.fromCharCode;
/**
 * Supported default encodings.
 */
const DEFAULT_ENCODINGS = {
    /**
     * DEFAULT - CSI M Pb Px Py
     * Single byte encoding for coords and event code.
     * Can encode values up to 223 (1-based).
     */
    DEFAULT: (e) => {
        const params = [eventCode(e, false) + 32, e.col + 32, e.row + 32];
        // supress mouse report if we exceed addressible range
        // Note this is handled differently by emulators
        // - xterm:         sends 0;0 coords instead
        // - vte, konsole:  no report
        if (params[0] > 255 || params[1] > 255 || params[2] > 255) {
            return '';
        }
        return `\x1b[M${S(params[0])}${S(params[1])}${S(params[2])}`;
    },
    /**
     * SGR - CSI < Pb ; Px ; Py M|m
     * No encoding limitation.
     * Can report button on release and works with a well formed sequence.
     */
    SGR: (e) => {
        const final = (e.action === Types_1.CoreMouseAction.UP && e.button !== Types_1.CoreMouseButton.WHEEL) ? 'm' : 'M';
        return `\x1b[<${eventCode(e, true)};${e.col};${e.row}${final}`;
    },
    SGR_PIXELS: (e) => {
        const final = (e.action === Types_1.CoreMouseAction.UP && e.button !== Types_1.CoreMouseButton.WHEEL) ? 'm' : 'M';
        return `\x1b[<${eventCode(e, true)};${e.x};${e.y}${final}`;
    }
};
/**
 * CoreMouseService
 *
 * Provides mouse tracking reports with different protocols and encodings.
 *  - protocols: NONE (default), X10, VT200, DRAG, ANY
 *  - encodings: DEFAULT, SGR (UTF8, URXVT removed in #2507)
 *
 * Custom protocols/encodings can be added by `addProtocol` / `addEncoding`.
 * To activate a protocol/encoding, set `activeProtocol` / `activeEncoding`.
 * Switching a protocol will send a notification event `onProtocolChange`
 * with a list of needed events to track.
 *
 * The service handles the mouse tracking state and decides whether to send
 * a tracking report to the backend based on protocol and encoding limitations.
 * To send a mouse event call `triggerMouseEvent`.
 */
class CoreMouseService extends Lifecycle_1.Disposable {
    constructor(_bufferService, _coreService) {
        super();
        this._bufferService = _bufferService;
        this._coreService = _coreService;
        this._protocols = {};
        this._encodings = {};
        this._activeProtocol = '';
        this._activeEncoding = '';
        this._lastEvent = null;
        this._onProtocolChange = this.register(new EventEmitter_1.EventEmitter());
        this.onProtocolChange = this._onProtocolChange.event;
        // register default protocols and encodings
        for (const name of Object.keys(DEFAULT_PROTOCOLS))
            this.addProtocol(name, DEFAULT_PROTOCOLS[name]);
        for (const name of Object.keys(DEFAULT_ENCODINGS))
            this.addEncoding(name, DEFAULT_ENCODINGS[name]);
        // call reset to set defaults
        this.reset();
    }
    addProtocol(name, protocol) {
        this._protocols[name] = protocol;
    }
    addEncoding(name, encoding) {
        this._encodings[name] = encoding;
    }
    get activeProtocol() {
        return this._activeProtocol;
    }
    get areMouseEventsActive() {
        return this._protocols[this._activeProtocol].events !== 0;
    }
    set activeProtocol(name) {
        if (!this._protocols[name]) {
            throw new Error(`unknown protocol "${name}"`);
        }
        this._activeProtocol = name;
        this._onProtocolChange.fire(this._protocols[name].events);
    }
    get activeEncoding() {
        return this._activeEncoding;
    }
    set activeEncoding(name) {
        if (!this._encodings[name]) {
            throw new Error(`unknown encoding "${name}"`);
        }
        this._activeEncoding = name;
    }
    reset() {
        this.activeProtocol = 'NONE';
        this.activeEncoding = 'DEFAULT';
        this._lastEvent = null;
    }
    /**
     * Triggers a mouse event to be sent.
     *
     * Returns true if the event passed all protocol restrictions and a report
     * was sent, otherwise false. The return value may be used to decide whether
     * the default event action in the bowser component should be omitted.
     *
     * Note: The method will change values of the given event object
     * to fullfill protocol and encoding restrictions.
     */
    triggerMouseEvent(e) {
        // range check for col/row
        if (e.col < 0 || e.col >= this._bufferService.cols
            || e.row < 0 || e.row >= this._bufferService.rows) {
            return false;
        }
        // filter nonsense combinations of button + action
        if (e.button === Types_1.CoreMouseButton.WHEEL && e.action === Types_1.CoreMouseAction.MOVE) {
            return false;
        }
        if (e.button === Types_1.CoreMouseButton.NONE && e.action !== Types_1.CoreMouseAction.MOVE) {
            return false;
        }
        if (e.button !== Types_1.CoreMouseButton.WHEEL && (e.action === Types_1.CoreMouseAction.LEFT || e.action === Types_1.CoreMouseAction.RIGHT)) {
            return false;
        }
        // report 1-based coords
        e.col++;
        e.row++;
        // debounce move events at grid or pixel level
        if (e.action === Types_1.CoreMouseAction.MOVE
            && this._lastEvent
            && this._equalEvents(this._lastEvent, e, this._activeEncoding === 'SGR_PIXELS')) {
            return false;
        }
        // apply protocol restrictions
        if (!this._protocols[this._activeProtocol].restrict(e)) {
            return false;
        }
        // encode report and send
        const report = this._encodings[this._activeEncoding](e);
        if (report) {
            // always send DEFAULT as binary data
            if (this._activeEncoding === 'DEFAULT') {
                this._coreService.triggerBinaryEvent(report);
            }
            else {
                this._coreService.triggerDataEvent(report, true);
            }
        }
        this._lastEvent = e;
        return true;
    }
    explainEvents(events) {
        return {
            down: !!(events & Types_1.CoreMouseEventType.DOWN),
            up: !!(events & Types_1.CoreMouseEventType.UP),
            drag: !!(events & Types_1.CoreMouseEventType.DRAG),
            move: !!(events & Types_1.CoreMouseEventType.MOVE),
            wheel: !!(events & Types_1.CoreMouseEventType.WHEEL)
        };
    }
    _equalEvents(e1, e2, pixels) {
        if (pixels) {
            if (e1.x !== e2.x)
                return false;
            if (e1.y !== e2.y)
                return false;
        }
        else {
            if (e1.col !== e2.col)
                return false;
            if (e1.row !== e2.row)
                return false;
        }
        if (e1.button !== e2.button)
            return false;
        if (e1.action !== e2.action)
            return false;
        if (e1.ctrl !== e2.ctrl)
            return false;
        if (e1.alt !== e2.alt)
            return false;
        if (e1.shift !== e2.shift)
            return false;
        return true;
    }
}
exports.CoreMouseService = CoreMouseService;
