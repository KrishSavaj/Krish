"use strict";
/**
 * Copyright (c) 2016 The xterm.js authors. All rights reserved.
 * @license MIT
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.clone = clone;
/*
 * A simple utility for cloning values
 */
function clone(val, depth = 5) {
    if (typeof val !== 'object') {
        return val;
    }
    // If we're cloning an array, use an array as the base, otherwise use an object
    const clonedObject = Array.isArray(val) ? [] : {};
    for (const key in val) {
        // Recursively clone eack item unless we're at the maximum depth
        clonedObject[key] = depth <= 1 ? val[key] : (val[key] && clone(val[key], depth - 1));
    }
    return clonedObject;
}
