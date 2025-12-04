"use strict";
/**
 * Copyright (c) 2017 The xterm.js authors. All rights reserved.
 * @license MIT
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.TEXT_BASELINE = exports.DIM_OPACITY = exports.INVERTED_DEFAULT_COLOR = void 0;
const Platform_1 = require("common/Platform");
exports.INVERTED_DEFAULT_COLOR = 257;
exports.DIM_OPACITY = 0.5;
// The text baseline is set conditionally by browser. Using 'ideographic' for Firefox or Legacy Edge
// would result in truncated text (Issue 3353). Using 'bottom' for Chrome would result in slightly
// unaligned Powerline fonts (PR 3356#issuecomment-850928179).
exports.TEXT_BASELINE = Platform_1.isFirefox || Platform_1.isLegacyEdge ? 'bottom' : 'ideographic';
