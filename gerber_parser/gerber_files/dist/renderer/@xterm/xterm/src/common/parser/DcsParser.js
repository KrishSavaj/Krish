"use strict";
/**
 * Copyright (c) 2019 The xterm.js authors. All rights reserved.
 * @license MIT
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.DcsHandler = exports.DcsParser = void 0;
const TextDecoder_1 = require("common/input/TextDecoder");
const Params_1 = require("common/parser/Params");
const Constants_1 = require("common/parser/Constants");
const EMPTY_HANDLERS = [];
class DcsParser {
    constructor() {
        this._handlers = Object.create(null);
        this._active = EMPTY_HANDLERS;
        this._ident = 0;
        this._handlerFb = () => { };
        this._stack = {
            paused: false,
            loopPosition: 0,
            fallThrough: false
        };
    }
    dispose() {
        this._handlers = Object.create(null);
        this._handlerFb = () => { };
        this._active = EMPTY_HANDLERS;
    }
    registerHandler(ident, handler) {
        if (this._handlers[ident] === undefined) {
            this._handlers[ident] = [];
        }
        const handlerList = this._handlers[ident];
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
    clearHandler(ident) {
        if (this._handlers[ident])
            delete this._handlers[ident];
    }
    setHandlerFallback(handler) {
        this._handlerFb = handler;
    }
    reset() {
        // force cleanup leftover handlers
        if (this._active.length) {
            for (let j = this._stack.paused ? this._stack.loopPosition - 1 : this._active.length - 1; j >= 0; --j) {
                this._active[j].unhook(false);
            }
        }
        this._stack.paused = false;
        this._active = EMPTY_HANDLERS;
        this._ident = 0;
    }
    hook(ident, params) {
        // always reset leftover handlers
        this.reset();
        this._ident = ident;
        this._active = this._handlers[ident] || EMPTY_HANDLERS;
        if (!this._active.length) {
            this._handlerFb(this._ident, 'HOOK', params);
        }
        else {
            for (let j = this._active.length - 1; j >= 0; j--) {
                this._active[j].hook(params);
            }
        }
    }
    put(data, start, end) {
        if (!this._active.length) {
            this._handlerFb(this._ident, 'PUT', (0, TextDecoder_1.utf32ToString)(data, start, end));
        }
        else {
            for (let j = this._active.length - 1; j >= 0; j--) {
                this._active[j].put(data, start, end);
            }
        }
    }
    unhook(success, promiseResult = true) {
        if (!this._active.length) {
            this._handlerFb(this._ident, 'UNHOOK', success);
        }
        else {
            let handlerResult = false;
            let j = this._active.length - 1;
            let fallThrough = false;
            if (this._stack.paused) {
                j = this._stack.loopPosition - 1;
                handlerResult = promiseResult;
                fallThrough = this._stack.fallThrough;
                this._stack.paused = false;
            }
            if (!fallThrough && handlerResult === false) {
                for (; j >= 0; j--) {
                    handlerResult = this._active[j].unhook(success);
                    if (handlerResult === true) {
                        break;
                    }
                    else if (handlerResult instanceof Promise) {
                        this._stack.paused = true;
                        this._stack.loopPosition = j;
                        this._stack.fallThrough = false;
                        return handlerResult;
                    }
                }
                j--;
            }
            // cleanup left over handlers (fallThrough for async)
            for (; j >= 0; j--) {
                handlerResult = this._active[j].unhook(false);
                if (handlerResult instanceof Promise) {
                    this._stack.paused = true;
                    this._stack.loopPosition = j;
                    this._stack.fallThrough = true;
                    return handlerResult;
                }
            }
        }
        this._active = EMPTY_HANDLERS;
        this._ident = 0;
    }
}
exports.DcsParser = DcsParser;
// predefine empty params as [0] (ZDM)
const EMPTY_PARAMS = new Params_1.Params();
EMPTY_PARAMS.addParam(0);
/**
 * Convenient class to create a DCS handler from a single callback function.
 * Note: The payload is currently limited to 50 MB (hardcoded).
 */
class DcsHandler {
    constructor(_handler) {
        this._handler = _handler;
        this._data = '';
        this._params = EMPTY_PARAMS;
        this._hitLimit = false;
    }
    hook(params) {
        // since we need to preserve params until `unhook`, we have to clone it
        // (only borrowed from parser and spans multiple parser states)
        // perf optimization:
        // clone only, if we have non empty params, otherwise stick with default
        this._params = (params.length > 1 || params.params[0]) ? params.clone() : EMPTY_PARAMS;
        this._data = '';
        this._hitLimit = false;
    }
    put(data, start, end) {
        if (this._hitLimit) {
            return;
        }
        this._data += (0, TextDecoder_1.utf32ToString)(data, start, end);
        if (this._data.length > Constants_1.PAYLOAD_LIMIT) {
            this._data = '';
            this._hitLimit = true;
        }
    }
    unhook(success) {
        let ret = false;
        if (this._hitLimit) {
            ret = false;
        }
        else if (success) {
            ret = this._handler(this._data, this._params);
            if (ret instanceof Promise) {
                // need to hold data and params until `ret` got resolved
                // dont care for errors, data will be freed anyway on next start
                return ret.then(res => {
                    this._params = EMPTY_PARAMS;
                    this._data = '';
                    this._hitLimit = false;
                    return res;
                });
            }
        }
        this._params = EMPTY_PARAMS;
        this._data = '';
        this._hitLimit = false;
        return ret;
    }
}
exports.DcsHandler = DcsHandler;
