"use strict";
/**
 * Copyright (c) 2018 The xterm.js authors. All rights reserved.
 * @license MIT
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.EscapeSequenceParser = exports.VT500_TRANSITION_TABLE = exports.TransitionTable = void 0;
const Types_1 = require("common/parser/Types");
const Constants_1 = require("common/parser/Constants");
const Lifecycle_1 = require("common/Lifecycle");
const Params_1 = require("common/parser/Params");
const OscParser_1 = require("common/parser/OscParser");
const DcsParser_1 = require("common/parser/DcsParser");
/**
 * Transition table for EscapeSequenceParser.
 */
class TransitionTable {
    constructor(length) {
        this.table = new Uint8Array(length);
    }
    /**
     * Set default transition.
     * @param action default action
     * @param next default next state
     */
    setDefault(action, next) {
        this.table.fill(action << 4 /* TableAccess.TRANSITION_ACTION_SHIFT */ | next);
    }
    /**
     * Add a transition to the transition table.
     * @param code input character code
     * @param state current parser state
     * @param action parser action to be done
     * @param next next parser state
     */
    add(code, state, action, next) {
        this.table[state << 8 /* TableAccess.INDEX_STATE_SHIFT */ | code] = action << 4 /* TableAccess.TRANSITION_ACTION_SHIFT */ | next;
    }
    /**
     * Add transitions for multiple input character codes.
     * @param codes input character code array
     * @param state current parser state
     * @param action parser action to be done
     * @param next next parser state
     */
    addMany(codes, state, action, next) {
        for (let i = 0; i < codes.length; i++) {
            this.table[state << 8 /* TableAccess.INDEX_STATE_SHIFT */ | codes[i]] = action << 4 /* TableAccess.TRANSITION_ACTION_SHIFT */ | next;
        }
    }
}
exports.TransitionTable = TransitionTable;
// Pseudo-character placeholder for printable non-ascii characters (unicode).
const NON_ASCII_PRINTABLE = 0xA0;
/**
 * VT500 compatible transition table.
 * Taken from https://vt100.net/emu/dec_ansi_parser.
 */
exports.VT500_TRANSITION_TABLE = (function () {
    const table = new TransitionTable(4095);
    // range macro for byte
    const BYTE_VALUES = 256;
    const blueprint = Array.apply(null, Array(BYTE_VALUES)).map((unused, i) => i);
    const r = (start, end) => blueprint.slice(start, end);
    // Default definitions.
    const PRINTABLES = r(0x20, 0x7f); // 0x20 (SP) included, 0x7F (DEL) excluded
    const EXECUTABLES = r(0x00, 0x18);
    EXECUTABLES.push(0x19);
    EXECUTABLES.push.apply(EXECUTABLES, r(0x1c, 0x20));
    const states = r(Constants_1.ParserState.GROUND, Constants_1.ParserState.DCS_PASSTHROUGH + 1);
    let state;
    // set default transition
    table.setDefault(Constants_1.ParserAction.ERROR, Constants_1.ParserState.GROUND);
    // printables
    table.addMany(PRINTABLES, Constants_1.ParserState.GROUND, Constants_1.ParserAction.PRINT, Constants_1.ParserState.GROUND);
    // global anywhere rules
    for (state in states) {
        table.addMany([0x18, 0x1a, 0x99, 0x9a], state, Constants_1.ParserAction.EXECUTE, Constants_1.ParserState.GROUND);
        table.addMany(r(0x80, 0x90), state, Constants_1.ParserAction.EXECUTE, Constants_1.ParserState.GROUND);
        table.addMany(r(0x90, 0x98), state, Constants_1.ParserAction.EXECUTE, Constants_1.ParserState.GROUND);
        table.add(0x9c, state, Constants_1.ParserAction.IGNORE, Constants_1.ParserState.GROUND); // ST as terminator
        table.add(0x1b, state, Constants_1.ParserAction.CLEAR, Constants_1.ParserState.ESCAPE); // ESC
        table.add(0x9d, state, Constants_1.ParserAction.OSC_START, Constants_1.ParserState.OSC_STRING); // OSC
        table.addMany([0x98, 0x9e, 0x9f], state, Constants_1.ParserAction.IGNORE, Constants_1.ParserState.SOS_PM_APC_STRING);
        table.add(0x9b, state, Constants_1.ParserAction.CLEAR, Constants_1.ParserState.CSI_ENTRY); // CSI
        table.add(0x90, state, Constants_1.ParserAction.CLEAR, Constants_1.ParserState.DCS_ENTRY); // DCS
    }
    // rules for executables and 7f
    table.addMany(EXECUTABLES, Constants_1.ParserState.GROUND, Constants_1.ParserAction.EXECUTE, Constants_1.ParserState.GROUND);
    table.addMany(EXECUTABLES, Constants_1.ParserState.ESCAPE, Constants_1.ParserAction.EXECUTE, Constants_1.ParserState.ESCAPE);
    table.add(0x7f, Constants_1.ParserState.ESCAPE, Constants_1.ParserAction.IGNORE, Constants_1.ParserState.ESCAPE);
    table.addMany(EXECUTABLES, Constants_1.ParserState.OSC_STRING, Constants_1.ParserAction.IGNORE, Constants_1.ParserState.OSC_STRING);
    table.addMany(EXECUTABLES, Constants_1.ParserState.CSI_ENTRY, Constants_1.ParserAction.EXECUTE, Constants_1.ParserState.CSI_ENTRY);
    table.add(0x7f, Constants_1.ParserState.CSI_ENTRY, Constants_1.ParserAction.IGNORE, Constants_1.ParserState.CSI_ENTRY);
    table.addMany(EXECUTABLES, Constants_1.ParserState.CSI_PARAM, Constants_1.ParserAction.EXECUTE, Constants_1.ParserState.CSI_PARAM);
    table.add(0x7f, Constants_1.ParserState.CSI_PARAM, Constants_1.ParserAction.IGNORE, Constants_1.ParserState.CSI_PARAM);
    table.addMany(EXECUTABLES, Constants_1.ParserState.CSI_IGNORE, Constants_1.ParserAction.EXECUTE, Constants_1.ParserState.CSI_IGNORE);
    table.addMany(EXECUTABLES, Constants_1.ParserState.CSI_INTERMEDIATE, Constants_1.ParserAction.EXECUTE, Constants_1.ParserState.CSI_INTERMEDIATE);
    table.add(0x7f, Constants_1.ParserState.CSI_INTERMEDIATE, Constants_1.ParserAction.IGNORE, Constants_1.ParserState.CSI_INTERMEDIATE);
    table.addMany(EXECUTABLES, Constants_1.ParserState.ESCAPE_INTERMEDIATE, Constants_1.ParserAction.EXECUTE, Constants_1.ParserState.ESCAPE_INTERMEDIATE);
    table.add(0x7f, Constants_1.ParserState.ESCAPE_INTERMEDIATE, Constants_1.ParserAction.IGNORE, Constants_1.ParserState.ESCAPE_INTERMEDIATE);
    // osc
    table.add(0x5d, Constants_1.ParserState.ESCAPE, Constants_1.ParserAction.OSC_START, Constants_1.ParserState.OSC_STRING);
    table.addMany(PRINTABLES, Constants_1.ParserState.OSC_STRING, Constants_1.ParserAction.OSC_PUT, Constants_1.ParserState.OSC_STRING);
    table.add(0x7f, Constants_1.ParserState.OSC_STRING, Constants_1.ParserAction.OSC_PUT, Constants_1.ParserState.OSC_STRING);
    table.addMany([0x9c, 0x1b, 0x18, 0x1a, 0x07], Constants_1.ParserState.OSC_STRING, Constants_1.ParserAction.OSC_END, Constants_1.ParserState.GROUND);
    table.addMany(r(0x1c, 0x20), Constants_1.ParserState.OSC_STRING, Constants_1.ParserAction.IGNORE, Constants_1.ParserState.OSC_STRING);
    // sos/pm/apc does nothing
    table.addMany([0x58, 0x5e, 0x5f], Constants_1.ParserState.ESCAPE, Constants_1.ParserAction.IGNORE, Constants_1.ParserState.SOS_PM_APC_STRING);
    table.addMany(PRINTABLES, Constants_1.ParserState.SOS_PM_APC_STRING, Constants_1.ParserAction.IGNORE, Constants_1.ParserState.SOS_PM_APC_STRING);
    table.addMany(EXECUTABLES, Constants_1.ParserState.SOS_PM_APC_STRING, Constants_1.ParserAction.IGNORE, Constants_1.ParserState.SOS_PM_APC_STRING);
    table.add(0x9c, Constants_1.ParserState.SOS_PM_APC_STRING, Constants_1.ParserAction.IGNORE, Constants_1.ParserState.GROUND);
    table.add(0x7f, Constants_1.ParserState.SOS_PM_APC_STRING, Constants_1.ParserAction.IGNORE, Constants_1.ParserState.SOS_PM_APC_STRING);
    // csi entries
    table.add(0x5b, Constants_1.ParserState.ESCAPE, Constants_1.ParserAction.CLEAR, Constants_1.ParserState.CSI_ENTRY);
    table.addMany(r(0x40, 0x7f), Constants_1.ParserState.CSI_ENTRY, Constants_1.ParserAction.CSI_DISPATCH, Constants_1.ParserState.GROUND);
    table.addMany(r(0x30, 0x3c), Constants_1.ParserState.CSI_ENTRY, Constants_1.ParserAction.PARAM, Constants_1.ParserState.CSI_PARAM);
    table.addMany([0x3c, 0x3d, 0x3e, 0x3f], Constants_1.ParserState.CSI_ENTRY, Constants_1.ParserAction.COLLECT, Constants_1.ParserState.CSI_PARAM);
    table.addMany(r(0x30, 0x3c), Constants_1.ParserState.CSI_PARAM, Constants_1.ParserAction.PARAM, Constants_1.ParserState.CSI_PARAM);
    table.addMany(r(0x40, 0x7f), Constants_1.ParserState.CSI_PARAM, Constants_1.ParserAction.CSI_DISPATCH, Constants_1.ParserState.GROUND);
    table.addMany([0x3c, 0x3d, 0x3e, 0x3f], Constants_1.ParserState.CSI_PARAM, Constants_1.ParserAction.IGNORE, Constants_1.ParserState.CSI_IGNORE);
    table.addMany(r(0x20, 0x40), Constants_1.ParserState.CSI_IGNORE, Constants_1.ParserAction.IGNORE, Constants_1.ParserState.CSI_IGNORE);
    table.add(0x7f, Constants_1.ParserState.CSI_IGNORE, Constants_1.ParserAction.IGNORE, Constants_1.ParserState.CSI_IGNORE);
    table.addMany(r(0x40, 0x7f), Constants_1.ParserState.CSI_IGNORE, Constants_1.ParserAction.IGNORE, Constants_1.ParserState.GROUND);
    table.addMany(r(0x20, 0x30), Constants_1.ParserState.CSI_ENTRY, Constants_1.ParserAction.COLLECT, Constants_1.ParserState.CSI_INTERMEDIATE);
    table.addMany(r(0x20, 0x30), Constants_1.ParserState.CSI_INTERMEDIATE, Constants_1.ParserAction.COLLECT, Constants_1.ParserState.CSI_INTERMEDIATE);
    table.addMany(r(0x30, 0x40), Constants_1.ParserState.CSI_INTERMEDIATE, Constants_1.ParserAction.IGNORE, Constants_1.ParserState.CSI_IGNORE);
    table.addMany(r(0x40, 0x7f), Constants_1.ParserState.CSI_INTERMEDIATE, Constants_1.ParserAction.CSI_DISPATCH, Constants_1.ParserState.GROUND);
    table.addMany(r(0x20, 0x30), Constants_1.ParserState.CSI_PARAM, Constants_1.ParserAction.COLLECT, Constants_1.ParserState.CSI_INTERMEDIATE);
    // esc_intermediate
    table.addMany(r(0x20, 0x30), Constants_1.ParserState.ESCAPE, Constants_1.ParserAction.COLLECT, Constants_1.ParserState.ESCAPE_INTERMEDIATE);
    table.addMany(r(0x20, 0x30), Constants_1.ParserState.ESCAPE_INTERMEDIATE, Constants_1.ParserAction.COLLECT, Constants_1.ParserState.ESCAPE_INTERMEDIATE);
    table.addMany(r(0x30, 0x7f), Constants_1.ParserState.ESCAPE_INTERMEDIATE, Constants_1.ParserAction.ESC_DISPATCH, Constants_1.ParserState.GROUND);
    table.addMany(r(0x30, 0x50), Constants_1.ParserState.ESCAPE, Constants_1.ParserAction.ESC_DISPATCH, Constants_1.ParserState.GROUND);
    table.addMany(r(0x51, 0x58), Constants_1.ParserState.ESCAPE, Constants_1.ParserAction.ESC_DISPATCH, Constants_1.ParserState.GROUND);
    table.addMany([0x59, 0x5a, 0x5c], Constants_1.ParserState.ESCAPE, Constants_1.ParserAction.ESC_DISPATCH, Constants_1.ParserState.GROUND);
    table.addMany(r(0x60, 0x7f), Constants_1.ParserState.ESCAPE, Constants_1.ParserAction.ESC_DISPATCH, Constants_1.ParserState.GROUND);
    // dcs entry
    table.add(0x50, Constants_1.ParserState.ESCAPE, Constants_1.ParserAction.CLEAR, Constants_1.ParserState.DCS_ENTRY);
    table.addMany(EXECUTABLES, Constants_1.ParserState.DCS_ENTRY, Constants_1.ParserAction.IGNORE, Constants_1.ParserState.DCS_ENTRY);
    table.add(0x7f, Constants_1.ParserState.DCS_ENTRY, Constants_1.ParserAction.IGNORE, Constants_1.ParserState.DCS_ENTRY);
    table.addMany(r(0x1c, 0x20), Constants_1.ParserState.DCS_ENTRY, Constants_1.ParserAction.IGNORE, Constants_1.ParserState.DCS_ENTRY);
    table.addMany(r(0x20, 0x30), Constants_1.ParserState.DCS_ENTRY, Constants_1.ParserAction.COLLECT, Constants_1.ParserState.DCS_INTERMEDIATE);
    table.addMany(r(0x30, 0x3c), Constants_1.ParserState.DCS_ENTRY, Constants_1.ParserAction.PARAM, Constants_1.ParserState.DCS_PARAM);
    table.addMany([0x3c, 0x3d, 0x3e, 0x3f], Constants_1.ParserState.DCS_ENTRY, Constants_1.ParserAction.COLLECT, Constants_1.ParserState.DCS_PARAM);
    table.addMany(EXECUTABLES, Constants_1.ParserState.DCS_IGNORE, Constants_1.ParserAction.IGNORE, Constants_1.ParserState.DCS_IGNORE);
    table.addMany(r(0x20, 0x80), Constants_1.ParserState.DCS_IGNORE, Constants_1.ParserAction.IGNORE, Constants_1.ParserState.DCS_IGNORE);
    table.addMany(r(0x1c, 0x20), Constants_1.ParserState.DCS_IGNORE, Constants_1.ParserAction.IGNORE, Constants_1.ParserState.DCS_IGNORE);
    table.addMany(EXECUTABLES, Constants_1.ParserState.DCS_PARAM, Constants_1.ParserAction.IGNORE, Constants_1.ParserState.DCS_PARAM);
    table.add(0x7f, Constants_1.ParserState.DCS_PARAM, Constants_1.ParserAction.IGNORE, Constants_1.ParserState.DCS_PARAM);
    table.addMany(r(0x1c, 0x20), Constants_1.ParserState.DCS_PARAM, Constants_1.ParserAction.IGNORE, Constants_1.ParserState.DCS_PARAM);
    table.addMany(r(0x30, 0x3c), Constants_1.ParserState.DCS_PARAM, Constants_1.ParserAction.PARAM, Constants_1.ParserState.DCS_PARAM);
    table.addMany([0x3c, 0x3d, 0x3e, 0x3f], Constants_1.ParserState.DCS_PARAM, Constants_1.ParserAction.IGNORE, Constants_1.ParserState.DCS_IGNORE);
    table.addMany(r(0x20, 0x30), Constants_1.ParserState.DCS_PARAM, Constants_1.ParserAction.COLLECT, Constants_1.ParserState.DCS_INTERMEDIATE);
    table.addMany(EXECUTABLES, Constants_1.ParserState.DCS_INTERMEDIATE, Constants_1.ParserAction.IGNORE, Constants_1.ParserState.DCS_INTERMEDIATE);
    table.add(0x7f, Constants_1.ParserState.DCS_INTERMEDIATE, Constants_1.ParserAction.IGNORE, Constants_1.ParserState.DCS_INTERMEDIATE);
    table.addMany(r(0x1c, 0x20), Constants_1.ParserState.DCS_INTERMEDIATE, Constants_1.ParserAction.IGNORE, Constants_1.ParserState.DCS_INTERMEDIATE);
    table.addMany(r(0x20, 0x30), Constants_1.ParserState.DCS_INTERMEDIATE, Constants_1.ParserAction.COLLECT, Constants_1.ParserState.DCS_INTERMEDIATE);
    table.addMany(r(0x30, 0x40), Constants_1.ParserState.DCS_INTERMEDIATE, Constants_1.ParserAction.IGNORE, Constants_1.ParserState.DCS_IGNORE);
    table.addMany(r(0x40, 0x7f), Constants_1.ParserState.DCS_INTERMEDIATE, Constants_1.ParserAction.DCS_HOOK, Constants_1.ParserState.DCS_PASSTHROUGH);
    table.addMany(r(0x40, 0x7f), Constants_1.ParserState.DCS_PARAM, Constants_1.ParserAction.DCS_HOOK, Constants_1.ParserState.DCS_PASSTHROUGH);
    table.addMany(r(0x40, 0x7f), Constants_1.ParserState.DCS_ENTRY, Constants_1.ParserAction.DCS_HOOK, Constants_1.ParserState.DCS_PASSTHROUGH);
    table.addMany(EXECUTABLES, Constants_1.ParserState.DCS_PASSTHROUGH, Constants_1.ParserAction.DCS_PUT, Constants_1.ParserState.DCS_PASSTHROUGH);
    table.addMany(PRINTABLES, Constants_1.ParserState.DCS_PASSTHROUGH, Constants_1.ParserAction.DCS_PUT, Constants_1.ParserState.DCS_PASSTHROUGH);
    table.add(0x7f, Constants_1.ParserState.DCS_PASSTHROUGH, Constants_1.ParserAction.IGNORE, Constants_1.ParserState.DCS_PASSTHROUGH);
    table.addMany([0x1b, 0x9c, 0x18, 0x1a], Constants_1.ParserState.DCS_PASSTHROUGH, Constants_1.ParserAction.DCS_UNHOOK, Constants_1.ParserState.GROUND);
    // special handling of unicode chars
    table.add(NON_ASCII_PRINTABLE, Constants_1.ParserState.GROUND, Constants_1.ParserAction.PRINT, Constants_1.ParserState.GROUND);
    table.add(NON_ASCII_PRINTABLE, Constants_1.ParserState.OSC_STRING, Constants_1.ParserAction.OSC_PUT, Constants_1.ParserState.OSC_STRING);
    table.add(NON_ASCII_PRINTABLE, Constants_1.ParserState.CSI_IGNORE, Constants_1.ParserAction.IGNORE, Constants_1.ParserState.CSI_IGNORE);
    table.add(NON_ASCII_PRINTABLE, Constants_1.ParserState.DCS_IGNORE, Constants_1.ParserAction.IGNORE, Constants_1.ParserState.DCS_IGNORE);
    table.add(NON_ASCII_PRINTABLE, Constants_1.ParserState.DCS_PASSTHROUGH, Constants_1.ParserAction.DCS_PUT, Constants_1.ParserState.DCS_PASSTHROUGH);
    return table;
})();
/**
 * EscapeSequenceParser.
 * This class implements the ANSI/DEC compatible parser described by
 * Paul Williams (https://vt100.net/emu/dec_ansi_parser).
 *
 * To implement custom ANSI compliant escape sequences it is not needed to
 * alter this parser, instead consider registering a custom handler.
 * For non ANSI compliant sequences change the transition table with
 * the optional `transitions` constructor argument and
 * reimplement the `parse` method.
 *
 * This parser is currently hardcoded to operate in ZDM (Zero Default Mode)
 * as suggested by the original parser, thus empty parameters are set to 0.
 * This this is not in line with the latest ECMA-48 specification
 * (ZDM was part of the early specs and got completely removed later on).
 *
 * Other than the original parser from vt100.net this parser supports
 * sub parameters in digital parameters separated by colons. Empty sub parameters
 * are set to -1 (no ZDM for sub parameters).
 *
 * About prefix and intermediate bytes:
 * This parser follows the assumptions of the vt100.net parser with these restrictions:
 * - only one prefix byte is allowed as first parameter byte, byte range 0x3c .. 0x3f
 * - max. two intermediates are respected, byte range 0x20 .. 0x2f
 * Note that this is not in line with ECMA-48 which does not limit either of those.
 * Furthermore ECMA-48 allows the prefix byte range at any param byte position. Currently
 * there are no known sequences that follow the broader definition of the specification.
 *
 * TODO: implement error recovery hook via error handler return values
 */
class EscapeSequenceParser extends Lifecycle_1.Disposable {
    constructor(_transitions = exports.VT500_TRANSITION_TABLE) {
        super();
        this._transitions = _transitions;
        // parser stack save for async handler support
        this._parseStack = {
            state: Types_1.ParserStackType.NONE,
            handlers: [],
            handlerPos: 0,
            transition: 0,
            chunkPos: 0
        };
        this.initialState = Constants_1.ParserState.GROUND;
        this.currentState = this.initialState;
        this._params = new Params_1.Params(); // defaults to 32 storable params/subparams
        this._params.addParam(0); // ZDM
        this._collect = 0;
        this.precedingJoinState = 0;
        // set default fallback handlers and handler lookup containers
        this._printHandlerFb = (data, start, end) => { };
        this._executeHandlerFb = (code) => { };
        this._csiHandlerFb = (ident, params) => { };
        this._escHandlerFb = (ident) => { };
        this._errorHandlerFb = (state) => state;
        this._printHandler = this._printHandlerFb;
        this._executeHandlers = Object.create(null);
        this._csiHandlers = Object.create(null);
        this._escHandlers = Object.create(null);
        this.register((0, Lifecycle_1.toDisposable)(() => {
            this._csiHandlers = Object.create(null);
            this._executeHandlers = Object.create(null);
            this._escHandlers = Object.create(null);
        }));
        this._oscParser = this.register(new OscParser_1.OscParser());
        this._dcsParser = this.register(new DcsParser_1.DcsParser());
        this._errorHandler = this._errorHandlerFb;
        // swallow 7bit ST (ESC+\)
        this.registerEscHandler({ final: '\\' }, () => true);
    }
    _identifier(id, finalRange = [0x40, 0x7e]) {
        let res = 0;
        if (id.prefix) {
            if (id.prefix.length > 1) {
                throw new Error('only one byte as prefix supported');
            }
            res = id.prefix.charCodeAt(0);
            if (res && 0x3c > res || res > 0x3f) {
                throw new Error('prefix must be in range 0x3c .. 0x3f');
            }
        }
        if (id.intermediates) {
            if (id.intermediates.length > 2) {
                throw new Error('only two bytes as intermediates are supported');
            }
            for (let i = 0; i < id.intermediates.length; ++i) {
                const intermediate = id.intermediates.charCodeAt(i);
                if (0x20 > intermediate || intermediate > 0x2f) {
                    throw new Error('intermediate must be in range 0x20 .. 0x2f');
                }
                res <<= 8;
                res |= intermediate;
            }
        }
        if (id.final.length !== 1) {
            throw new Error('final must be a single byte');
        }
        const finalCode = id.final.charCodeAt(0);
        if (finalRange[0] > finalCode || finalCode > finalRange[1]) {
            throw new Error(`final must be in range ${finalRange[0]} .. ${finalRange[1]}`);
        }
        res <<= 8;
        res |= finalCode;
        return res;
    }
    identToString(ident) {
        const res = [];
        while (ident) {
            res.push(String.fromCharCode(ident & 0xFF));
            ident >>= 8;
        }
        return res.reverse().join('');
    }
    setPrintHandler(handler) {
        this._printHandler = handler;
    }
    clearPrintHandler() {
        this._printHandler = this._printHandlerFb;
    }
    registerEscHandler(id, handler) {
        const ident = this._identifier(id, [0x30, 0x7e]);
        if (this._escHandlers[ident] === undefined) {
            this._escHandlers[ident] = [];
        }
        const handlerList = this._escHandlers[ident];
        handlerList.push(handler);
        return {
            dispose: () => {
                const handlerIndex = handlerList.indexOf(handler);
                if (handlerIndex !== -1) {
                    handlerList.splice(handlerIndex, 1);
                }
            }
        };
    }
    clearEscHandler(id) {
        if (this._escHandlers[this._identifier(id, [0x30, 0x7e])])
            delete this._escHandlers[this._identifier(id, [0x30, 0x7e])];
    }
    setEscHandlerFallback(handler) {
        this._escHandlerFb = handler;
    }
    setExecuteHandler(flag, handler) {
        this._executeHandlers[flag.charCodeAt(0)] = handler;
    }
    clearExecuteHandler(flag) {
        if (this._executeHandlers[flag.charCodeAt(0)])
            delete this._executeHandlers[flag.charCodeAt(0)];
    }
    setExecuteHandlerFallback(handler) {
        this._executeHandlerFb = handler;
    }
    registerCsiHandler(id, handler) {
        const ident = this._identifier(id);
        if (this._csiHandlers[ident] === undefined) {
            this._csiHandlers[ident] = [];
        }
        const handlerList = this._csiHandlers[ident];
        handlerList.push(handler);
        return {
            dispose: () => {
                const handlerIndex = handlerList.indexOf(handler);
                if (handlerIndex !== -1) {
                    handlerList.splice(handlerIndex, 1);
                }
            }
        };
    }
    clearCsiHandler(id) {
        if (this._csiHandlers[this._identifier(id)])
            delete this._csiHandlers[this._identifier(id)];
    }
    setCsiHandlerFallback(callback) {
        this._csiHandlerFb = callback;
    }
    registerDcsHandler(id, handler) {
        return this._dcsParser.registerHandler(this._identifier(id), handler);
    }
    clearDcsHandler(id) {
        this._dcsParser.clearHandler(this._identifier(id));
    }
    setDcsHandlerFallback(handler) {
        this._dcsParser.setHandlerFallback(handler);
    }
    registerOscHandler(ident, handler) {
        return this._oscParser.registerHandler(ident, handler);
    }
    clearOscHandler(ident) {
        this._oscParser.clearHandler(ident);
    }
    setOscHandlerFallback(handler) {
        this._oscParser.setHandlerFallback(handler);
    }
    setErrorHandler(callback) {
        this._errorHandler = callback;
    }
    clearErrorHandler() {
        this._errorHandler = this._errorHandlerFb;
    }
    /**
     * Reset parser to initial values.
     *
     * This can also be used to lift the improper continuation error condition
     * when dealing with async handlers. Use this only as a last resort to silence
     * that error when the terminal has no pending data to be processed. Note that
     * the interrupted async handler might continue its work in the future messing
     * up the terminal state even further.
     */
    reset() {
        this.currentState = this.initialState;
        this._oscParser.reset();
        this._dcsParser.reset();
        this._params.reset();
        this._params.addParam(0); // ZDM
        this._collect = 0;
        this.precedingJoinState = 0;
        // abort pending continuation from async handler
        // Here the RESET type indicates, that the next parse call will
        // ignore any saved stack, instead continues sync with next codepoint from GROUND
        if (this._parseStack.state !== Types_1.ParserStackType.NONE) {
            this._parseStack.state = Types_1.ParserStackType.RESET;
            this._parseStack.handlers = []; // also release handlers ref
        }
    }
    /**
     * Async parse support.
     */
    _preserveStack(state, handlers, handlerPos, transition, chunkPos) {
        this._parseStack.state = state;
        this._parseStack.handlers = handlers;
        this._parseStack.handlerPos = handlerPos;
        this._parseStack.transition = transition;
        this._parseStack.chunkPos = chunkPos;
    }
    /**
     * Parse UTF32 codepoints in `data` up to `length`.
     *
     * Note: For several actions with high data load the parsing is optimized
     * by using local read ahead loops with hardcoded conditions to
     * avoid costly table lookups. Make sure that any change of table values
     * will be reflected in the loop conditions as well and vice versa.
     * Affected states/actions:
     * - GROUND:PRINT
     * - CSI_PARAM:PARAM
     * - DCS_PARAM:PARAM
     * - OSC_STRING:OSC_PUT
     * - DCS_PASSTHROUGH:DCS_PUT
     *
     * Note on asynchronous handler support:
     * Any handler returning a promise will be treated as asynchronous.
     * To keep the in-band blocking working for async handlers, `parse` pauses execution,
     * creates a stack save and returns the promise to the caller.
     * For proper continuation of the paused state it is important
     * to await the promise resolving. On resolve the parse must be repeated
     * with the same chunk of data and the resolved value in `promiseResult`
     * until no promise is returned.
     *
     * Important: With only sync handlers defined, parsing is completely synchronous as well.
     * As soon as an async handler is involved, synchronous parsing is not possible anymore.
     *
     * Boilerplate for proper parsing of multiple chunks with async handlers:
     *
     * ```typescript
     * async function parseMultipleChunks(chunks: Uint32Array[]): Promise<void> {
     *   for (const chunk of chunks) {
     *     let result: void | Promise<boolean>;
     *     let prev: boolean | undefined;
     *     while (result = parser.parse(chunk, chunk.length, prev)) {
     *       prev = await result;
     *     }
     *   }
     *   // finished parsing all chunks...
     * }
     * ```
     */
    parse(data, length, promiseResult) {
        let code = 0;
        let transition = 0;
        let start = 0;
        let handlerResult;
        // resume from async handler
        if (this._parseStack.state) {
            // allow sync parser reset even in continuation mode
            // Note: can be used to recover parser from improper continuation error below
            if (this._parseStack.state === Types_1.ParserStackType.RESET) {
                this._parseStack.state = Types_1.ParserStackType.NONE;
                start = this._parseStack.chunkPos + 1; // continue with next codepoint in GROUND
            }
            else {
                if (promiseResult === undefined || this._parseStack.state === Types_1.ParserStackType.FAIL) {
                    /**
                     * Reject further parsing on improper continuation after pausing. This is a really bad
                     * condition with screwed up execution order and prolly messed up terminal state,
                     * therefore we exit hard with an exception and reject any further parsing.
                     *
                     * Note: With `Terminal.write` usage this exception should never occur, as the top level
                     * calls are guaranteed to handle async conditions properly. If you ever encounter this
                     * exception in your terminal integration it indicates, that you injected data chunks to
                     * `InputHandler.parse` or `EscapeSequenceParser.parse` synchronously without waiting for
                     * continuation of a running async handler.
                     *
                     * It is possible to get rid of this error by calling `reset`. But dont rely on that, as
                     * the pending async handler still might mess up the terminal later. Instead fix the
                     * faulty async handling, so this error will not be thrown anymore.
                     */
                    this._parseStack.state = Types_1.ParserStackType.FAIL;
                    throw new Error('improper continuation due to previous async handler, giving up parsing');
                }
                // we have to resume the old handler loop if:
                // - return value of the promise was `false`
                // - handlers are not exhausted yet
                const handlers = this._parseStack.handlers;
                let handlerPos = this._parseStack.handlerPos - 1;
                switch (this._parseStack.state) {
                    case Types_1.ParserStackType.CSI:
                        if (promiseResult === false && handlerPos > -1) {
                            for (; handlerPos >= 0; handlerPos--) {
                                handlerResult = handlers[handlerPos](this._params);
                                if (handlerResult === true) {
                                    break;
                                }
                                else if (handlerResult instanceof Promise) {
                                    this._parseStack.handlerPos = handlerPos;
                                    return handlerResult;
                                }
                            }
                        }
                        this._parseStack.handlers = [];
                        break;
                    case Types_1.ParserStackType.ESC:
                        if (promiseResult === false && handlerPos > -1) {
                            for (; handlerPos >= 0; handlerPos--) {
                                handlerResult = handlers[handlerPos]();
                                if (handlerResult === true) {
                                    break;
                                }
                                else if (handlerResult instanceof Promise) {
                                    this._parseStack.handlerPos = handlerPos;
                                    return handlerResult;
                                }
                            }
                        }
                        this._parseStack.handlers = [];
                        break;
                    case Types_1.ParserStackType.DCS:
                        code = data[this._parseStack.chunkPos];
                        handlerResult = this._dcsParser.unhook(code !== 0x18 && code !== 0x1a, promiseResult);
                        if (handlerResult) {
                            return handlerResult;
                        }
                        if (code === 0x1b)
                            this._parseStack.transition |= Constants_1.ParserState.ESCAPE;
                        this._params.reset();
                        this._params.addParam(0); // ZDM
                        this._collect = 0;
                        break;
                    case Types_1.ParserStackType.OSC:
                        code = data[this._parseStack.chunkPos];
                        handlerResult = this._oscParser.end(code !== 0x18 && code !== 0x1a, promiseResult);
                        if (handlerResult) {
                            return handlerResult;
                        }
                        if (code === 0x1b)
                            this._parseStack.transition |= Constants_1.ParserState.ESCAPE;
                        this._params.reset();
                        this._params.addParam(0); // ZDM
                        this._collect = 0;
                        break;
                }
                // cleanup before continuing with the main sync loop
                this._parseStack.state = Types_1.ParserStackType.NONE;
                start = this._parseStack.chunkPos + 1;
                this.precedingJoinState = 0;
                this.currentState = this._parseStack.transition & 15 /* TableAccess.TRANSITION_STATE_MASK */;
            }
        }
        // continue with main sync loop
        // process input string
        for (let i = start; i < length; ++i) {
            code = data[i];
            // normal transition & action lookup
            transition = this._transitions.table[this.currentState << 8 /* TableAccess.INDEX_STATE_SHIFT */ | (code < 0xa0 ? code : NON_ASCII_PRINTABLE)];
            switch (transition >> 4 /* TableAccess.TRANSITION_ACTION_SHIFT */) {
                case Constants_1.ParserAction.PRINT:
                    // read ahead with loop unrolling
                    // Note: 0x20 (SP) is included, 0x7F (DEL) is excluded
                    for (let j = i + 1;; ++j) {
                        if (j >= length || (code = data[j]) < 0x20 || (code > 0x7e && code < NON_ASCII_PRINTABLE)) {
                            this._printHandler(data, i, j);
                            i = j - 1;
                            break;
                        }
                        if (++j >= length || (code = data[j]) < 0x20 || (code > 0x7e && code < NON_ASCII_PRINTABLE)) {
                            this._printHandler(data, i, j);
                            i = j - 1;
                            break;
                        }
                        if (++j >= length || (code = data[j]) < 0x20 || (code > 0x7e && code < NON_ASCII_PRINTABLE)) {
                            this._printHandler(data, i, j);
                            i = j - 1;
                            break;
                        }
                        if (++j >= length || (code = data[j]) < 0x20 || (code > 0x7e && code < NON_ASCII_PRINTABLE)) {
                            this._printHandler(data, i, j);
                            i = j - 1;
                            break;
                        }
                    }
                    break;
                case Constants_1.ParserAction.EXECUTE:
                    if (this._executeHandlers[code])
                        this._executeHandlers[code]();
                    else
                        this._executeHandlerFb(code);
                    this.precedingJoinState = 0;
                    break;
                case Constants_1.ParserAction.IGNORE:
                    break;
                case Constants_1.ParserAction.ERROR:
                    const inject = this._errorHandler({
                        position: i,
                        code,
                        currentState: this.currentState,
                        collect: this._collect,
                        params: this._params,
                        abort: false
                    });
                    if (inject.abort)
                        return;
                    // inject values: currently not implemented
                    break;
                case Constants_1.ParserAction.CSI_DISPATCH:
                    // Trigger CSI Handler
                    const handlers = this._csiHandlers[this._collect << 8 | code];
                    let j = handlers ? handlers.length - 1 : -1;
                    for (; j >= 0; j--) {
                        // true means success and to stop bubbling
                        // a promise indicates an async handler that needs to finish before progressing
                        handlerResult = handlers[j](this._params);
                        if (handlerResult === true) {
                            break;
                        }
                        else if (handlerResult instanceof Promise) {
                            this._preserveStack(Types_1.ParserStackType.CSI, handlers, j, transition, i);
                            return handlerResult;
                        }
                    }
                    if (j < 0) {
                        this._csiHandlerFb(this._collect << 8 | code, this._params);
                    }
                    this.precedingJoinState = 0;
                    break;
                case Constants_1.ParserAction.PARAM:
                    // inner loop: digits (0x30 - 0x39) and ; (0x3b) and : (0x3a)
                    do {
                        switch (code) {
                            case 0x3b:
                                this._params.addParam(0); // ZDM
                                break;
                            case 0x3a:
                                this._params.addSubParam(-1);
                                break;
                            default: // 0x30 - 0x39
                                this._params.addDigit(code - 48);
                        }
                    } while (++i < length && (code = data[i]) > 0x2f && code < 0x3c);
                    i--;
                    break;
                case Constants_1.ParserAction.COLLECT:
                    this._collect <<= 8;
                    this._collect |= code;
                    break;
                case Constants_1.ParserAction.ESC_DISPATCH:
                    const handlersEsc = this._escHandlers[this._collect << 8 | code];
                    let jj = handlersEsc ? handlersEsc.length - 1 : -1;
                    for (; jj >= 0; jj--) {
                        // true means success and to stop bubbling
                        // a promise indicates an async handler that needs to finish before progressing
                        handlerResult = handlersEsc[jj]();
                        if (handlerResult === true) {
                            break;
                        }
                        else if (handlerResult instanceof Promise) {
                            this._preserveStack(Types_1.ParserStackType.ESC, handlersEsc, jj, transition, i);
                            return handlerResult;
                        }
                    }
                    if (jj < 0) {
                        this._escHandlerFb(this._collect << 8 | code);
                    }
                    this.precedingJoinState = 0;
                    break;
                case Constants_1.ParserAction.CLEAR:
                    this._params.reset();
                    this._params.addParam(0); // ZDM
                    this._collect = 0;
                    break;
                case Constants_1.ParserAction.DCS_HOOK:
                    this._dcsParser.hook(this._collect << 8 | code, this._params);
                    break;
                case Constants_1.ParserAction.DCS_PUT:
                    // inner loop - exit DCS_PUT: 0x18, 0x1a, 0x1b, 0x7f, 0x80 - 0x9f
                    // unhook triggered by: 0x1b, 0x9c (success) and 0x18, 0x1a (abort)
                    for (let j = i + 1;; ++j) {
                        if (j >= length || (code = data[j]) === 0x18 || code === 0x1a || code === 0x1b || (code > 0x7f && code < NON_ASCII_PRINTABLE)) {
                            this._dcsParser.put(data, i, j);
                            i = j - 1;
                            break;
                        }
                    }
                    break;
                case Constants_1.ParserAction.DCS_UNHOOK:
                    handlerResult = this._dcsParser.unhook(code !== 0x18 && code !== 0x1a);
                    if (handlerResult) {
                        this._preserveStack(Types_1.ParserStackType.DCS, [], 0, transition, i);
                        return handlerResult;
                    }
                    if (code === 0x1b)
                        transition |= Constants_1.ParserState.ESCAPE;
                    this._params.reset();
                    this._params.addParam(0); // ZDM
                    this._collect = 0;
                    this.precedingJoinState = 0;
                    break;
                case Constants_1.ParserAction.OSC_START:
                    this._oscParser.start();
                    break;
                case Constants_1.ParserAction.OSC_PUT:
                    // inner loop: 0x20 (SP) included, 0x7F (DEL) included
                    for (let j = i + 1;; j++) {
                        if (j >= length || (code = data[j]) < 0x20 || (code > 0x7f && code < NON_ASCII_PRINTABLE)) {
                            this._oscParser.put(data, i, j);
                            i = j - 1;
                            break;
                        }
                    }
                    break;
                case Constants_1.ParserAction.OSC_END:
                    handlerResult = this._oscParser.end(code !== 0x18 && code !== 0x1a);
                    if (handlerResult) {
                        this._preserveStack(Types_1.ParserStackType.OSC, [], 0, transition, i);
                        return handlerResult;
                    }
                    if (code === 0x1b)
                        transition |= Constants_1.ParserState.ESCAPE;
                    this._params.reset();
                    this._params.addParam(0); // ZDM
                    this._collect = 0;
                    this.precedingJoinState = 0;
                    break;
            }
            this.currentState = transition & 15 /* TableAccess.TRANSITION_STATE_MASK */;
        }
    }
}
exports.EscapeSequenceParser = EscapeSequenceParser;
