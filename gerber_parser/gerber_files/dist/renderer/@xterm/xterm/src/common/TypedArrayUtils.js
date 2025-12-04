"use strict";
/**
 * Copyright (c) 2018 The xterm.js authors. All rights reserved.
 * @license MIT
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.concat = concat;
/**
 * Concat two typed arrays `a` and `b`.
 * Returns a new typed array.
 */
function concat(a, b) {
    const result = new a.constructor(a.length + b.length);
    result.set(a);
    result.set(b, a.length);
    return result;
}
