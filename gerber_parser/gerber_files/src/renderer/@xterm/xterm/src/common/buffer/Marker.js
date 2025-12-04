"use strict";
/**
 * Copyright (c) 2018 The xterm.js authors. All rights reserved.
 * @license MIT
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.Marker = void 0;
const EventEmitter_1 = require("common/EventEmitter");
const Lifecycle_1 = require("common/Lifecycle");
class Marker {
    get id() { return this._id; }
    constructor(line) {
        this.line = line;
        this.isDisposed = false;
        this._disposables = [];
        this._id = Marker._nextId++;
        this._onDispose = this.register(new EventEmitter_1.EventEmitter());
        this.onDispose = this._onDispose.event;
    }
    dispose() {
        if (this.isDisposed) {
            return;
        }
        this.isDisposed = true;
        this.line = -1;
        // Emit before super.dispose such that dispose listeners get a change to react
        this._onDispose.fire();
        (0, Lifecycle_1.disposeArray)(this._disposables);
        this._disposables.length = 0;
    }
    register(disposable) {
        this._disposables.push(disposable);
        return disposable;
    }
}
exports.Marker = Marker;
Marker._nextId = 1;
