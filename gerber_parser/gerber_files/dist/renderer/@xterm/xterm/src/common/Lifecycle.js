"use strict";
/**
 * Copyright (c) 2018 The xterm.js authors. All rights reserved.
 * @license MIT
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.MutableDisposable = exports.Disposable = void 0;
exports.toDisposable = toDisposable;
exports.disposeArray = disposeArray;
exports.getDisposeArrayDisposable = getDisposeArrayDisposable;
/**
 * A base class that can be extended to provide convenience methods for managing the lifecycle of an
 * object and its components.
 */
class Disposable {
    constructor() {
        this._disposables = [];
        this._isDisposed = false;
    }
    /**
     * Disposes the object, triggering the `dispose` method on all registered IDisposables.
     */
    dispose() {
        this._isDisposed = true;
        for (const d of this._disposables) {
            d.dispose();
        }
        this._disposables.length = 0;
    }
    /**
     * Registers a disposable object.
     * @param d The disposable to register.
     * @returns The disposable.
     */
    register(d) {
        this._disposables.push(d);
        return d;
    }
    /**
     * Unregisters a disposable object if it has been registered, if not do
     * nothing.
     * @param d The disposable to unregister.
     */
    unregister(d) {
        const index = this._disposables.indexOf(d);
        if (index !== -1) {
            this._disposables.splice(index, 1);
        }
    }
}
exports.Disposable = Disposable;
class MutableDisposable {
    constructor() {
        this._isDisposed = false;
    }
    /**
     * Gets the value if it exists.
     */
    get value() {
        return this._isDisposed ? undefined : this._value;
    }
    /**
     * Sets the value, disposing of the old value if it exists.
     */
    set value(value) {
        if (this._isDisposed || value === this._value) {
            return;
        }
        this._value?.dispose();
        this._value = value;
    }
    /**
     * Resets the stored value and disposes of the previously stored value.
     */
    clear() {
        this.value = undefined;
    }
    dispose() {
        this._isDisposed = true;
        this._value?.dispose();
        this._value = undefined;
    }
}
exports.MutableDisposable = MutableDisposable;
/**
 * Wrap a function in a disposable.
 */
function toDisposable(f) {
    return { dispose: f };
}
/**
 * Dispose of all disposables in an array and set its length to 0.
 */
function disposeArray(disposables) {
    for (const d of disposables) {
        d.dispose();
    }
    disposables.length = 0;
}
/**
 * Creates a disposable that will dispose of an array of disposables when disposed.
 */
function getDisposeArrayDisposable(array) {
    return { dispose: () => disposeArray(array) };
}
