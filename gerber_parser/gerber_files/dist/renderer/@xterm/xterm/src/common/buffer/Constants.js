"use strict";
/**
 * Copyright (c) 2019 The xterm.js authors. All rights reserved.
 * @license MIT
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.WHITESPACE_CELL_CODE = exports.WHITESPACE_CELL_WIDTH = exports.WHITESPACE_CELL_CHAR = exports.NULL_CELL_CODE = exports.NULL_CELL_WIDTH = exports.NULL_CELL_CHAR = exports.CHAR_DATA_CODE_INDEX = exports.CHAR_DATA_WIDTH_INDEX = exports.CHAR_DATA_CHAR_INDEX = exports.CHAR_DATA_ATTR_INDEX = exports.DEFAULT_EXT = exports.DEFAULT_ATTR = exports.DEFAULT_COLOR = void 0;
exports.DEFAULT_COLOR = 0;
exports.DEFAULT_ATTR = (0 << 18) | (exports.DEFAULT_COLOR << 9) | (256 << 0);
exports.DEFAULT_EXT = 0;
exports.CHAR_DATA_ATTR_INDEX = 0;
exports.CHAR_DATA_CHAR_INDEX = 1;
exports.CHAR_DATA_WIDTH_INDEX = 2;
exports.CHAR_DATA_CODE_INDEX = 3;
/**
 * Null cell - a real empty cell (containing nothing).
 * Note that code should always be 0 for a null cell as
 * several test condition of the buffer line rely on this.
 */
exports.NULL_CELL_CHAR = '';
exports.NULL_CELL_WIDTH = 1;
exports.NULL_CELL_CODE = 0;
/**
 * Whitespace cell.
 * This is meant as a replacement for empty cells when needed
 * during rendering lines to preserve correct aligment.
 */
exports.WHITESPACE_CELL_CHAR = ' ';
exports.WHITESPACE_CELL_WIDTH = 1;
exports.WHITESPACE_CELL_CODE = 32;
