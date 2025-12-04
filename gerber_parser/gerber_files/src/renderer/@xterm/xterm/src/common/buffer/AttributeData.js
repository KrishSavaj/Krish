"use strict";
/**
 * Copyright (c) 2018 The xterm.js authors. All rights reserved.
 * @license MIT
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExtendedAttrs = exports.AttributeData = void 0;
const Constants_1 = require("common/buffer/Constants");
class AttributeData {
    constructor() {
        // data
        this.fg = 0;
        this.bg = 0;
        this.extended = new ExtendedAttrs();
    }
    static toColorRGB(value) {
        return [
            value >>> Constants_1.Attributes.RED_SHIFT & 255,
            value >>> Constants_1.Attributes.GREEN_SHIFT & 255,
            value & 255
        ];
    }
    static fromColorRGB(value) {
        return (value[0] & 255) << Constants_1.Attributes.RED_SHIFT | (value[1] & 255) << Constants_1.Attributes.GREEN_SHIFT | value[2] & 255;
    }
    clone() {
        const newObj = new AttributeData();
        newObj.fg = this.fg;
        newObj.bg = this.bg;
        newObj.extended = this.extended.clone();
        return newObj;
    }
    // flags
    isInverse() { return this.fg & Constants_1.FgFlags.INVERSE; }
    isBold() { return this.fg & Constants_1.FgFlags.BOLD; }
    isUnderline() {
        if (this.hasExtendedAttrs() && this.extended.underlineStyle !== Constants_1.UnderlineStyle.NONE) {
            return 1;
        }
        return this.fg & Constants_1.FgFlags.UNDERLINE;
    }
    isBlink() { return this.fg & Constants_1.FgFlags.BLINK; }
    isInvisible() { return this.fg & Constants_1.FgFlags.INVISIBLE; }
    isItalic() { return this.bg & Constants_1.BgFlags.ITALIC; }
    isDim() { return this.bg & Constants_1.BgFlags.DIM; }
    isStrikethrough() { return this.fg & Constants_1.FgFlags.STRIKETHROUGH; }
    isProtected() { return this.bg & Constants_1.BgFlags.PROTECTED; }
    isOverline() { return this.bg & Constants_1.BgFlags.OVERLINE; }
    // color modes
    getFgColorMode() { return this.fg & Constants_1.Attributes.CM_MASK; }
    getBgColorMode() { return this.bg & Constants_1.Attributes.CM_MASK; }
    isFgRGB() { return (this.fg & Constants_1.Attributes.CM_MASK) === Constants_1.Attributes.CM_RGB; }
    isBgRGB() { return (this.bg & Constants_1.Attributes.CM_MASK) === Constants_1.Attributes.CM_RGB; }
    isFgPalette() { return (this.fg & Constants_1.Attributes.CM_MASK) === Constants_1.Attributes.CM_P16 || (this.fg & Constants_1.Attributes.CM_MASK) === Constants_1.Attributes.CM_P256; }
    isBgPalette() { return (this.bg & Constants_1.Attributes.CM_MASK) === Constants_1.Attributes.CM_P16 || (this.bg & Constants_1.Attributes.CM_MASK) === Constants_1.Attributes.CM_P256; }
    isFgDefault() { return (this.fg & Constants_1.Attributes.CM_MASK) === 0; }
    isBgDefault() { return (this.bg & Constants_1.Attributes.CM_MASK) === 0; }
    isAttributeDefault() { return this.fg === 0 && this.bg === 0; }
    // colors
    getFgColor() {
        switch (this.fg & Constants_1.Attributes.CM_MASK) {
            case Constants_1.Attributes.CM_P16:
            case Constants_1.Attributes.CM_P256: return this.fg & Constants_1.Attributes.PCOLOR_MASK;
            case Constants_1.Attributes.CM_RGB: return this.fg & Constants_1.Attributes.RGB_MASK;
            default: return -1; // CM_DEFAULT defaults to -1
        }
    }
    getBgColor() {
        switch (this.bg & Constants_1.Attributes.CM_MASK) {
            case Constants_1.Attributes.CM_P16:
            case Constants_1.Attributes.CM_P256: return this.bg & Constants_1.Attributes.PCOLOR_MASK;
            case Constants_1.Attributes.CM_RGB: return this.bg & Constants_1.Attributes.RGB_MASK;
            default: return -1; // CM_DEFAULT defaults to -1
        }
    }
    // extended attrs
    hasExtendedAttrs() {
        return this.bg & Constants_1.BgFlags.HAS_EXTENDED;
    }
    updateExtended() {
        if (this.extended.isEmpty()) {
            this.bg &= ~Constants_1.BgFlags.HAS_EXTENDED;
        }
        else {
            this.bg |= Constants_1.BgFlags.HAS_EXTENDED;
        }
    }
    getUnderlineColor() {
        if ((this.bg & Constants_1.BgFlags.HAS_EXTENDED) && ~this.extended.underlineColor) {
            switch (this.extended.underlineColor & Constants_1.Attributes.CM_MASK) {
                case Constants_1.Attributes.CM_P16:
                case Constants_1.Attributes.CM_P256: return this.extended.underlineColor & Constants_1.Attributes.PCOLOR_MASK;
                case Constants_1.Attributes.CM_RGB: return this.extended.underlineColor & Constants_1.Attributes.RGB_MASK;
                default: return this.getFgColor();
            }
        }
        return this.getFgColor();
    }
    getUnderlineColorMode() {
        return (this.bg & Constants_1.BgFlags.HAS_EXTENDED) && ~this.extended.underlineColor
            ? this.extended.underlineColor & Constants_1.Attributes.CM_MASK
            : this.getFgColorMode();
    }
    isUnderlineColorRGB() {
        return (this.bg & Constants_1.BgFlags.HAS_EXTENDED) && ~this.extended.underlineColor
            ? (this.extended.underlineColor & Constants_1.Attributes.CM_MASK) === Constants_1.Attributes.CM_RGB
            : this.isFgRGB();
    }
    isUnderlineColorPalette() {
        return (this.bg & Constants_1.BgFlags.HAS_EXTENDED) && ~this.extended.underlineColor
            ? (this.extended.underlineColor & Constants_1.Attributes.CM_MASK) === Constants_1.Attributes.CM_P16
                || (this.extended.underlineColor & Constants_1.Attributes.CM_MASK) === Constants_1.Attributes.CM_P256
            : this.isFgPalette();
    }
    isUnderlineColorDefault() {
        return (this.bg & Constants_1.BgFlags.HAS_EXTENDED) && ~this.extended.underlineColor
            ? (this.extended.underlineColor & Constants_1.Attributes.CM_MASK) === 0
            : this.isFgDefault();
    }
    getUnderlineStyle() {
        return this.fg & Constants_1.FgFlags.UNDERLINE
            ? (this.bg & Constants_1.BgFlags.HAS_EXTENDED ? this.extended.underlineStyle : Constants_1.UnderlineStyle.SINGLE)
            : Constants_1.UnderlineStyle.NONE;
    }
    getUnderlineVariantOffset() {
        return this.extended.underlineVariantOffset;
    }
}
exports.AttributeData = AttributeData;
/**
 * Extended attributes for a cell.
 * Holds information about different underline styles and color.
 */
class ExtendedAttrs {
    get ext() {
        if (this._urlId) {
            return ((this._ext & ~Constants_1.ExtFlags.UNDERLINE_STYLE) |
                (this.underlineStyle << 26));
        }
        return this._ext;
    }
    set ext(value) { this._ext = value; }
    get underlineStyle() {
        // Always return the URL style if it has one
        if (this._urlId) {
            return Constants_1.UnderlineStyle.DASHED;
        }
        return (this._ext & Constants_1.ExtFlags.UNDERLINE_STYLE) >> 26;
    }
    set underlineStyle(value) {
        this._ext &= ~Constants_1.ExtFlags.UNDERLINE_STYLE;
        this._ext |= (value << 26) & Constants_1.ExtFlags.UNDERLINE_STYLE;
    }
    get underlineColor() {
        return this._ext & (Constants_1.Attributes.CM_MASK | Constants_1.Attributes.RGB_MASK);
    }
    set underlineColor(value) {
        this._ext &= ~(Constants_1.Attributes.CM_MASK | Constants_1.Attributes.RGB_MASK);
        this._ext |= value & (Constants_1.Attributes.CM_MASK | Constants_1.Attributes.RGB_MASK);
    }
    get urlId() {
        return this._urlId;
    }
    set urlId(value) {
        this._urlId = value;
    }
    get underlineVariantOffset() {
        const val = (this._ext & Constants_1.ExtFlags.VARIANT_OFFSET) >> 29;
        if (val < 0) {
            return val ^ 0xFFFFFFF8;
        }
        return val;
    }
    set underlineVariantOffset(value) {
        this._ext &= ~Constants_1.ExtFlags.VARIANT_OFFSET;
        this._ext |= (value << 29) & Constants_1.ExtFlags.VARIANT_OFFSET;
    }
    constructor(ext = 0, urlId = 0) {
        this._ext = 0;
        this._urlId = 0;
        this._ext = ext;
        this._urlId = urlId;
    }
    clone() {
        return new ExtendedAttrs(this._ext, this._urlId);
    }
    /**
     * Convenient method to indicate whether the object holds no additional information,
     * that needs to be persistant in the buffer.
     */
    isEmpty() {
        return this.underlineStyle === Constants_1.UnderlineStyle.NONE && this._urlId === 0;
    }
}
exports.ExtendedAttrs = ExtendedAttrs;
