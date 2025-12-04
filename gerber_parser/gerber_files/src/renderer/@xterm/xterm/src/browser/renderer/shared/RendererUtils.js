"use strict";
/**
 * Copyright (c) 2019 The xterm.js authors. All rights reserved.
 * @license MIT
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.throwIfFalsy = throwIfFalsy;
exports.isPowerlineGlyph = isPowerlineGlyph;
exports.isRestrictedPowerlineGlyph = isRestrictedPowerlineGlyph;
exports.isEmoji = isEmoji;
exports.allowRescaling = allowRescaling;
exports.treatGlyphAsBackgroundColor = treatGlyphAsBackgroundColor;
exports.createRenderDimensions = createRenderDimensions;
exports.computeNextVariantOffset = computeNextVariantOffset;
function throwIfFalsy(value) {
    if (!value) {
        throw new Error('value must not be falsy');
    }
    return value;
}
function isPowerlineGlyph(codepoint) {
    // Only return true for Powerline symbols which require
    // different padding and should be excluded from minimum contrast
    // ratio standards
    return 0xE0A4 <= codepoint && codepoint <= 0xE0D6;
}
function isRestrictedPowerlineGlyph(codepoint) {
    return 0xE0B0 <= codepoint && codepoint <= 0xE0B7;
}
function isNerdFontGlyph(codepoint) {
    return 0xE000 <= codepoint && codepoint <= 0xF8FF;
}
function isBoxOrBlockGlyph(codepoint) {
    return 0x2500 <= codepoint && codepoint <= 0x259F;
}
function isEmoji(codepoint) {
    return (codepoint >= 0x1F600 && codepoint <= 0x1F64F || // Emoticons
        codepoint >= 0x1F300 && codepoint <= 0x1F5FF || // Misc Symbols and Pictographs
        codepoint >= 0x1F680 && codepoint <= 0x1F6FF || // Transport and Map
        codepoint >= 0x2600 && codepoint <= 0x26FF || // Misc symbols
        codepoint >= 0x2700 && codepoint <= 0x27BF || // Dingbats
        codepoint >= 0xFE00 && codepoint <= 0xFE0F || // Variation Selectors
        codepoint >= 0x1F900 && codepoint <= 0x1F9FF || // Supplemental Symbols and Pictographs
        codepoint >= 0x1F1E6 && codepoint <= 0x1F1FF);
}
function allowRescaling(codepoint, width, glyphSizeX, deviceCellWidth) {
    return (
    // Is single cell width
    width === 1 &&
        // Glyph exceeds cell bounds, add 50% to avoid hurting readability by rescaling glyphs that
        // barely overlap
        glyphSizeX > Math.ceil(deviceCellWidth * 1.5) &&
        // Never rescale ascii
        codepoint !== undefined && codepoint > 0xFF &&
        // Never rescale emoji
        !isEmoji(codepoint) &&
        // Never rescale powerline or nerd fonts
        !isPowerlineGlyph(codepoint) && !isNerdFontGlyph(codepoint));
}
function treatGlyphAsBackgroundColor(codepoint) {
    return isPowerlineGlyph(codepoint) || isBoxOrBlockGlyph(codepoint);
}
function createRenderDimensions() {
    return {
        css: {
            canvas: createDimension(),
            cell: createDimension()
        },
        device: {
            canvas: createDimension(),
            cell: createDimension(),
            char: {
                width: 0,
                height: 0,
                left: 0,
                top: 0
            }
        }
    };
}
function createDimension() {
    return {
        width: 0,
        height: 0
    };
}
function computeNextVariantOffset(cellWidth, lineWidth, currentOffset = 0) {
    return (cellWidth - (Math.round(lineWidth) * 2 - currentOffset)) % (Math.round(lineWidth) * 2);
}
