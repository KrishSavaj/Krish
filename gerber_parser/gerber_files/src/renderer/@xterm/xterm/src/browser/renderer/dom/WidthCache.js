"use strict";
/**
 * Copyright (c) 2023 The xterm.js authors. All rights reserved.
 * @license MIT
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.WidthCache = void 0;
class WidthCache {
    constructor(_document, _helperContainer) {
        // flat cache for regular variant up to CacheSettings.FLAT_SIZE
        // NOTE: ~4x faster access than holey (serving >>80% of terminal content)
        //       It has a small memory footprint (only 1MB for full BMP caching),
        //       still the sweet spot is not reached before touching 32k different codepoints,
        //       thus we store the remaining <<20% of terminal data in a holey structure.
        this._flat = new Float32Array(256 /* WidthCacheSettings.FLAT_SIZE */);
        this._font = '';
        this._fontSize = 0;
        this._weight = 'normal';
        this._weightBold = 'bold';
        this._measureElements = [];
        this._container = _document.createElement('div');
        this._container.classList.add('xterm-width-cache-measure-container');
        this._container.setAttribute('aria-hidden', 'true');
        // SP should stack in spans
        this._container.style.whiteSpace = 'pre';
        // avoid undercuts in non-monospace fonts from kerning
        this._container.style.fontKerning = 'none';
        const regular = _document.createElement('span');
        regular.classList.add('xterm-char-measure-element');
        const bold = _document.createElement('span');
        bold.classList.add('xterm-char-measure-element');
        bold.style.fontWeight = 'bold';
        const italic = _document.createElement('span');
        italic.classList.add('xterm-char-measure-element');
        italic.style.fontStyle = 'italic';
        const boldItalic = _document.createElement('span');
        boldItalic.classList.add('xterm-char-measure-element');
        boldItalic.style.fontWeight = 'bold';
        boldItalic.style.fontStyle = 'italic';
        // NOTE: must be in order of FontVariant
        this._measureElements = [regular, bold, italic, boldItalic];
        this._container.appendChild(regular);
        this._container.appendChild(bold);
        this._container.appendChild(italic);
        this._container.appendChild(boldItalic);
        _helperContainer.appendChild(this._container);
        this.clear();
    }
    dispose() {
        this._container.remove(); // remove elements from DOM
        this._measureElements.length = 0; // release element refs
        this._holey = undefined; // free cache memory via GC
    }
    /**
     * Clear the width cache.
     */
    clear() {
        this._flat.fill(-9999 /* WidthCacheSettings.FLAT_UNSET */);
        // .clear() has some overhead, re-assign instead (>3 times faster)
        this._holey = new Map();
    }
    /**
     * Set the font for measuring.
     * Must be called for any changes on font settings.
     * Also clears the cache.
     */
    setFont(font, fontSize, weight, weightBold) {
        // skip if nothing changed
        if (font === this._font
            && fontSize === this._fontSize
            && weight === this._weight
            && weightBold === this._weightBold) {
            return;
        }
        this._font = font;
        this._fontSize = fontSize;
        this._weight = weight;
        this._weightBold = weightBold;
        this._container.style.fontFamily = this._font;
        this._container.style.fontSize = `${this._fontSize}px`;
        this._measureElements[0 /* FontVariant.REGULAR */].style.fontWeight = `${weight}`;
        this._measureElements[1 /* FontVariant.BOLD */].style.fontWeight = `${weightBold}`;
        this._measureElements[2 /* FontVariant.ITALIC */].style.fontWeight = `${weight}`;
        this._measureElements[3 /* FontVariant.BOLD_ITALIC */].style.fontWeight = `${weightBold}`;
        this.clear();
    }
    /**
     * Get the render width for cell content `c` with current font settings.
     * `variant` denotes the font variant to be used.
     */
    get(c, bold, italic) {
        let cp = 0;
        if (!bold && !italic && c.length === 1 && (cp = c.charCodeAt(0)) < 256 /* WidthCacheSettings.FLAT_SIZE */) {
            if (this._flat[cp] !== -9999 /* WidthCacheSettings.FLAT_UNSET */) {
                return this._flat[cp];
            }
            const width = this._measure(c, 0);
            if (width > 0) {
                this._flat[cp] = width;
            }
            return width;
        }
        let key = c;
        if (bold)
            key += 'B';
        if (italic)
            key += 'I';
        let width = this._holey.get(key);
        if (width === undefined) {
            let variant = 0;
            if (bold)
                variant |= 1 /* FontVariant.BOLD */;
            if (italic)
                variant |= 2 /* FontVariant.ITALIC */;
            width = this._measure(c, variant);
            if (width > 0) {
                this._holey.set(key, width);
            }
        }
        return width;
    }
    _measure(c, variant) {
        const el = this._measureElements[variant];
        el.textContent = c.repeat(32 /* WidthCacheSettings.REPEAT */);
        return el.offsetWidth / 32 /* WidthCacheSettings.REPEAT */;
    }
}
exports.WidthCache = WidthCache;
