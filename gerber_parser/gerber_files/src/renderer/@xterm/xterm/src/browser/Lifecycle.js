"use strict";
/**
 * Copyright (c) 2018 The xterm.js authors. All rights reserved.
 * @license MIT
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.addDisposableDomListener = addDisposableDomListener;
/**
 * Adds a disposable listener to a node in the DOM, returning the disposable.
 * @param node The node to add a listener to.
 * @param type The event type.
 * @param handler The handler for the listener.
 * @param options The boolean or options object to pass on to the event
 * listener.
 */
function addDisposableDomListener(node, type, handler, options) {
    node.addEventListener(type, handler, options);
    let disposed = false;
    return {
        dispose: () => {
            if (disposed) {
                return;
            }
            disposed = true;
            node.removeEventListener(type, handler, options);
        }
    };
}
