"use strict";
/**
 * Copyright (c) 2018 The xterm.js authors. All rights reserved.
 * @license MIT
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.CellData = void 0;
const TextDecoder_1 = require("common/input/TextDecoder");
const Constants_1 = require("common/buffer/Constants");
const AttributeData_1 = require("common/buffer/AttributeData");
/**
 * CellData - represents a single Cell in the terminal buffer.
 */
class CellData extends AttributeData_1.AttributeData {
    constructor() {
        super(...arguments);
        /** Primitives from terminal buffer. */
        this.content = 0;
        this.fg = 0;
        this.bg = 0;
        this.extended = new AttributeData_1.ExtendedAttrs();
        this.combinedData = '';
    }
    /** Helper to create CellData from CharData. */
    static fromCharData(value) {
        const obj = new CellData();
        obj.setFromCharData(value);
        return obj;
    }
    /** Whether cell contains a combined string. */
    isCombined() {
        return this.content & Constants_1.Content.IS_COMBINED_MASK;
    }
    /** Width of the cell. */
    getWidth() {
        return this.content >> Constants_1.Content.WIDTH_SHIFT;
    }
    /** JS string of the content. */
    getChars() {
        if (this.content & Constants_1.Content.IS_COMBINED_MASK) {
            return this.combinedData;
        }
        if (this.content & Constants_1.Content.CODEPOINT_MASK) {
            return (0, TextDecoder_1.stringFromCodePoint)(this.content & Constants_1.Content.CODEPOINT_MASK);
        }
        return '';
    }
    /**
     * Codepoint of cell
     * Note this returns the UTF32 codepoint of single chars,
     * if content is a combined string it returns the codepoint
     * of the last char in string to be in line with code in CharData.
     */
    getCode() {
        return (this.isCombined())
            ? this.combinedData.charCodeAt(this.combinedData.length - 1)
            : this.content & Constants_1.Content.CODEPOINT_MASK;
    }
    /** Set data from CharData */
    setFromCharData(value) {
        this.fg = value[Constants_1.CHAR_DATA_ATTR_INDEX];
        this.bg = 0;
        let combined = false;
        // surrogates and combined strings need special treatment
        if (value[Constants_1.CHAR_DATA_CHAR_INDEX].length > 2) {
            combined = true;
        }
        else if (value[Constants_1.CHAR_DATA_CHAR_INDEX].length === 2) {
            const code = value[Constants_1.CHAR_DATA_CHAR_INDEX].charCodeAt(0);
            // if the 2-char string is a surrogate create single codepoint
            // everything else is combined
            if (0xD800 <= code && code <= 0xDBFF) {
                const second = value[Constants_1.CHAR_DATA_CHAR_INDEX].charCodeAt(1);
                if (0xDC00 <= second && second <= 0xDFFF) {
                    this.content = ((code - 0xD800) * 0x400 + second - 0xDC00 + 0x10000) | (value[Constants_1.CHAR_DATA_WIDTH_INDEX] << Constants_1.Content.WIDTH_SHIFT);
                }
                else {
                    combined = true;
                }
            }
            else {
                combined = true;
            }
        }
        else {
            this.content = value[Constants_1.CHAR_DATA_CHAR_INDEX].charCodeAt(0) | (value[Constants_1.CHAR_DATA_WIDTH_INDEX] << Constants_1.Content.WIDTH_SHIFT);
        }
        if (combined) {
            this.combinedData = value[Constants_1.CHAR_DATA_CHAR_INDEX];
            this.content = Constants_1.Content.IS_COMBINED_MASK | (value[Constants_1.CHAR_DATA_WIDTH_INDEX] << Constants_1.Content.WIDTH_SHIFT);
        }
    }
    /** Get data as CharData. */
    getAsCharData() {
        return [this.fg, this.getChars(), this.getWidth(), this.getCode()];
    }
}
exports.CellData = CellData;
