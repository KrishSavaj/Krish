"use strict";
/**
 * Copyright (c) 2018, 2023 The xterm.js authors. All rights reserved.
 * @license MIT
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.DomRendererRowFactory = void 0;
const Constants_1 = require("browser/renderer/shared/Constants");
const Constants_2 = require("common/buffer/Constants");
const CellData_1 = require("common/buffer/CellData");
const Color_1 = require("common/Color");
const CharacterJoinerService_1 = require("browser/services/CharacterJoinerService");
const RendererUtils_1 = require("browser/renderer/shared/RendererUtils");
const AttributeData_1 = require("common/buffer/AttributeData");
class DomRendererRowFactory {
    constructor(_document, _characterJoinerService, _optionsService, _coreBrowserService, _coreService, _decorationService, _themeService) {
        this._document = _document;
        this._characterJoinerService = _characterJoinerService;
        this._optionsService = _optionsService;
        this._coreBrowserService = _coreBrowserService;
        this._coreService = _coreService;
        this._decorationService = _decorationService;
        this._themeService = _themeService;
        this._workCell = new CellData_1.CellData();
        this._columnSelectMode = false;
        this.defaultSpacing = 0;
    }
    handleSelectionChanged(start, end, columnSelectMode) {
        this._selectionStart = start;
        this._selectionEnd = end;
        this._columnSelectMode = columnSelectMode;
    }
    createRow(lineData, row, isCursorRow, cursorStyle, cursorInactiveStyle, cursorX, cursorBlink, cellWidth, widthCache, linkStart, linkEnd) {
        const elements = [];
        const joinedRanges = this._characterJoinerService.getJoinedCharacters(row);
        const colors = this._themeService.colors;
        let lineLength = lineData.getNoBgTrimmedLength();
        if (isCursorRow && lineLength < cursorX + 1) {
            lineLength = cursorX + 1;
        }
        let charElement;
        let cellAmount = 0;
        let text = '';
        let oldBg = 0;
        let oldFg = 0;
        let oldExt = 0;
        let oldLinkHover = false;
        let oldSpacing = 0;
        let oldIsInSelection = false;
        let spacing = 0;
        const classes = [];
        const hasHover = linkStart !== -1 && linkEnd !== -1;
        for (let x = 0; x < lineLength; x++) {
            lineData.loadCell(x, this._workCell);
            let width = this._workCell.getWidth();
            // The character to the left is a wide character, drawing is owned by the char at x-1
            if (width === 0) {
                continue;
            }
            // If true, indicates that the current character(s) to draw were joined.
            let isJoined = false;
            let lastCharX = x;
            // Process any joined character ranges as needed. Because of how the
            // ranges are produced, we know that they are valid for the characters
            // and attributes of our input.
            let cell = this._workCell;
            if (joinedRanges.length > 0 && x === joinedRanges[0][0]) {
                isJoined = true;
                const range = joinedRanges.shift();
                // We already know the exact start and end column of the joined range,
                // so we get the string and width representing it directly
                cell = new CharacterJoinerService_1.JoinedCellData(this._workCell, lineData.translateToString(true, range[0], range[1]), range[1] - range[0]);
                // Skip over the cells occupied by this range in the loop
                lastCharX = range[1] - 1;
                // Recalculate width
                width = cell.getWidth();
            }
            const isInSelection = this._isCellInSelection(x, row);
            const isCursorCell = isCursorRow && x === cursorX;
            const isLinkHover = hasHover && x >= linkStart && x <= linkEnd;
            let isDecorated = false;
            this._decorationService.forEachDecorationAtCell(x, row, undefined, d => {
                isDecorated = true;
            });
            // get chars to render for this cell
            let chars = cell.getChars() || Constants_2.WHITESPACE_CELL_CHAR;
            if (chars === ' ' && (cell.isUnderline() || cell.isOverline())) {
                chars = '\xa0';
            }
            // lookup char render width and calc spacing
            spacing = width * cellWidth - widthCache.get(chars, cell.isBold(), cell.isItalic());
            if (!charElement) {
                charElement = this._document.createElement('span');
            }
            else {
                /**
                 * chars can only be merged on existing span if:
                 * - existing span only contains mergeable chars (cellAmount != 0)
                 * - bg did not change (or both are in selection)
                 * - fg did not change (or both are in selection and selection fg is set)
                 * - ext did not change
                 * - underline from hover state did not change
                 * - cell content renders to same letter-spacing
                 * - cell is not cursor
                 */
                if (cellAmount
                    && ((isInSelection && oldIsInSelection)
                        || (!isInSelection && !oldIsInSelection && cell.bg === oldBg))
                    && ((isInSelection && oldIsInSelection && colors.selectionForeground)
                        || cell.fg === oldFg)
                    && cell.extended.ext === oldExt
                    && isLinkHover === oldLinkHover
                    && spacing === oldSpacing
                    && !isCursorCell
                    && !isJoined
                    && !isDecorated) {
                    // no span alterations, thus only account chars skipping all code below
                    if (cell.isInvisible()) {
                        text += Constants_2.WHITESPACE_CELL_CHAR;
                    }
                    else {
                        text += chars;
                    }
                    cellAmount++;
                    continue;
                }
                else {
                    /**
                     * cannot merge:
                     * - apply left-over text to old span
                     * - create new span, reset state holders cellAmount & text
                     */
                    if (cellAmount) {
                        charElement.textContent = text;
                    }
                    charElement = this._document.createElement('span');
                    cellAmount = 0;
                    text = '';
                }
            }
            // preserve conditions for next merger eval round
            oldBg = cell.bg;
            oldFg = cell.fg;
            oldExt = cell.extended.ext;
            oldLinkHover = isLinkHover;
            oldSpacing = spacing;
            oldIsInSelection = isInSelection;
            if (isJoined) {
                // The DOM renderer colors the background of the cursor but for ligatures all cells are
                // joined. The workaround here is to show a cursor around the whole ligature so it shows up,
                // the cursor looks the same when on any character of the ligature though
                if (cursorX >= x && cursorX <= lastCharX) {
                    cursorX = x;
                }
            }
            if (!this._coreService.isCursorHidden && isCursorCell && this._coreService.isCursorInitialized) {
                classes.push("xterm-cursor" /* RowCss.CURSOR_CLASS */);
                if (this._coreBrowserService.isFocused) {
                    if (cursorBlink) {
                        classes.push("xterm-cursor-blink" /* RowCss.CURSOR_BLINK_CLASS */);
                    }
                    classes.push(cursorStyle === 'bar'
                        ? "xterm-cursor-bar" /* RowCss.CURSOR_STYLE_BAR_CLASS */
                        : cursorStyle === 'underline'
                            ? "xterm-cursor-underline" /* RowCss.CURSOR_STYLE_UNDERLINE_CLASS */
                            : "xterm-cursor-block" /* RowCss.CURSOR_STYLE_BLOCK_CLASS */);
                }
                else {
                    if (cursorInactiveStyle) {
                        switch (cursorInactiveStyle) {
                            case 'outline':
                                classes.push("xterm-cursor-outline" /* RowCss.CURSOR_STYLE_OUTLINE_CLASS */);
                                break;
                            case 'block':
                                classes.push("xterm-cursor-block" /* RowCss.CURSOR_STYLE_BLOCK_CLASS */);
                                break;
                            case 'bar':
                                classes.push("xterm-cursor-bar" /* RowCss.CURSOR_STYLE_BAR_CLASS */);
                                break;
                            case 'underline':
                                classes.push("xterm-cursor-underline" /* RowCss.CURSOR_STYLE_UNDERLINE_CLASS */);
                                break;
                            default:
                                break;
                        }
                    }
                }
            }
            if (cell.isBold()) {
                classes.push("xterm-bold" /* RowCss.BOLD_CLASS */);
            }
            if (cell.isItalic()) {
                classes.push("xterm-italic" /* RowCss.ITALIC_CLASS */);
            }
            if (cell.isDim()) {
                classes.push("xterm-dim" /* RowCss.DIM_CLASS */);
            }
            if (cell.isInvisible()) {
                text = Constants_2.WHITESPACE_CELL_CHAR;
            }
            else {
                text = cell.getChars() || Constants_2.WHITESPACE_CELL_CHAR;
            }
            if (cell.isUnderline()) {
                classes.push(`${"xterm-underline" /* RowCss.UNDERLINE_CLASS */}-${cell.extended.underlineStyle}`);
                if (text === ' ') {
                    text = '\xa0'; // = &nbsp;
                }
                if (!cell.isUnderlineColorDefault()) {
                    if (cell.isUnderlineColorRGB()) {
                        charElement.style.textDecorationColor = `rgb(${AttributeData_1.AttributeData.toColorRGB(cell.getUnderlineColor()).join(',')})`;
                    }
                    else {
                        let fg = cell.getUnderlineColor();
                        if (this._optionsService.rawOptions.drawBoldTextInBrightColors && cell.isBold() && fg < 8) {
                            fg += 8;
                        }
                        charElement.style.textDecorationColor = colors.ansi[fg].css;
                    }
                }
            }
            if (cell.isOverline()) {
                classes.push("xterm-overline" /* RowCss.OVERLINE_CLASS */);
                if (text === ' ') {
                    text = '\xa0'; // = &nbsp;
                }
            }
            if (cell.isStrikethrough()) {
                classes.push("xterm-strikethrough" /* RowCss.STRIKETHROUGH_CLASS */);
            }
            // apply link hover underline late, effectively overrides any previous text-decoration
            // settings
            if (isLinkHover) {
                charElement.style.textDecoration = 'underline';
            }
            let fg = cell.getFgColor();
            let fgColorMode = cell.getFgColorMode();
            let bg = cell.getBgColor();
            let bgColorMode = cell.getBgColorMode();
            const isInverse = !!cell.isInverse();
            if (isInverse) {
                const temp = fg;
                fg = bg;
                bg = temp;
                const temp2 = fgColorMode;
                fgColorMode = bgColorMode;
                bgColorMode = temp2;
            }
            // Apply any decoration foreground/background overrides, this must happen after inverse has
            // been applied
            let bgOverride;
            let fgOverride;
            let isTop = false;
            this._decorationService.forEachDecorationAtCell(x, row, undefined, d => {
                if (d.options.layer !== 'top' && isTop) {
                    return;
                }
                if (d.backgroundColorRGB) {
                    bgColorMode = Constants_2.Attributes.CM_RGB;
                    bg = d.backgroundColorRGB.rgba >> 8 & 0xFFFFFF;
                    bgOverride = d.backgroundColorRGB;
                }
                if (d.foregroundColorRGB) {
                    fgColorMode = Constants_2.Attributes.CM_RGB;
                    fg = d.foregroundColorRGB.rgba >> 8 & 0xFFFFFF;
                    fgOverride = d.foregroundColorRGB;
                }
                isTop = d.options.layer === 'top';
            });
            // Apply selection
            if (!isTop && isInSelection) {
                // If in the selection, force the element to be above the selection to improve contrast and
                // support opaque selections. The applies background is not actually needed here as
                // selection is drawn in a seperate container, the main purpose of this to ensuring minimum
                // contrast ratio
                bgOverride = this._coreBrowserService.isFocused ? colors.selectionBackgroundOpaque : colors.selectionInactiveBackgroundOpaque;
                bg = bgOverride.rgba >> 8 & 0xFFFFFF;
                bgColorMode = Constants_2.Attributes.CM_RGB;
                // Since an opaque selection is being rendered, the selection pretends to be a decoration to
                // ensure text is drawn above the selection.
                isTop = true;
                // Apply selection foreground if applicable
                if (colors.selectionForeground) {
                    fgColorMode = Constants_2.Attributes.CM_RGB;
                    fg = colors.selectionForeground.rgba >> 8 & 0xFFFFFF;
                    fgOverride = colors.selectionForeground;
                }
            }
            // If it's a top decoration, render above the selection
            if (isTop) {
                classes.push('xterm-decoration-top');
            }
            // Background
            let resolvedBg;
            switch (bgColorMode) {
                case Constants_2.Attributes.CM_P16:
                case Constants_2.Attributes.CM_P256:
                    resolvedBg = colors.ansi[bg];
                    classes.push(`xterm-bg-${bg}`);
                    break;
                case Constants_2.Attributes.CM_RGB:
                    resolvedBg = Color_1.channels.toColor(bg >> 16, bg >> 8 & 0xFF, bg & 0xFF);
                    this._addStyle(charElement, `background-color:#${padStart((bg >>> 0).toString(16), '0', 6)}`);
                    break;
                case Constants_2.Attributes.CM_DEFAULT:
                default:
                    if (isInverse) {
                        resolvedBg = colors.foreground;
                        classes.push(`xterm-bg-${Constants_1.INVERTED_DEFAULT_COLOR}`);
                    }
                    else {
                        resolvedBg = colors.background;
                    }
            }
            // If there is no background override by now it's the original color, so apply dim if needed
            if (!bgOverride) {
                if (cell.isDim()) {
                    bgOverride = Color_1.color.multiplyOpacity(resolvedBg, 0.5);
                }
            }
            // Foreground
            switch (fgColorMode) {
                case Constants_2.Attributes.CM_P16:
                case Constants_2.Attributes.CM_P256:
                    if (cell.isBold() && fg < 8 && this._optionsService.rawOptions.drawBoldTextInBrightColors) {
                        fg += 8;
                    }
                    if (!this._applyMinimumContrast(charElement, resolvedBg, colors.ansi[fg], cell, bgOverride, undefined)) {
                        classes.push(`xterm-fg-${fg}`);
                    }
                    break;
                case Constants_2.Attributes.CM_RGB:
                    const color = Color_1.channels.toColor((fg >> 16) & 0xFF, (fg >> 8) & 0xFF, (fg) & 0xFF);
                    if (!this._applyMinimumContrast(charElement, resolvedBg, color, cell, bgOverride, fgOverride)) {
                        this._addStyle(charElement, `color:#${padStart(fg.toString(16), '0', 6)}`);
                    }
                    break;
                case Constants_2.Attributes.CM_DEFAULT:
                default:
                    if (!this._applyMinimumContrast(charElement, resolvedBg, colors.foreground, cell, bgOverride, fgOverride)) {
                        if (isInverse) {
                            classes.push(`xterm-fg-${Constants_1.INVERTED_DEFAULT_COLOR}`);
                        }
                    }
            }
            // apply CSS classes
            // slightly faster than using classList by omitting
            // checks for doubled entries (code above should not have doublets)
            if (classes.length) {
                charElement.className = classes.join(' ');
                classes.length = 0;
            }
            // exclude conditions for cell merging - never merge these
            if (!isCursorCell && !isJoined && !isDecorated) {
                cellAmount++;
            }
            else {
                charElement.textContent = text;
            }
            // apply letter-spacing rule
            if (spacing !== this.defaultSpacing) {
                charElement.style.letterSpacing = `${spacing}px`;
            }
            elements.push(charElement);
            x = lastCharX;
        }
        // postfix text of last merged span
        if (charElement && cellAmount) {
            charElement.textContent = text;
        }
        return elements;
    }
    _applyMinimumContrast(element, bg, fg, cell, bgOverride, fgOverride) {
        if (this._optionsService.rawOptions.minimumContrastRatio === 1 || (0, RendererUtils_1.treatGlyphAsBackgroundColor)(cell.getCode())) {
            return false;
        }
        // Try get from cache first, only use the cache when there are no decoration overrides
        const cache = this._getContrastCache(cell);
        let adjustedColor = undefined;
        if (!bgOverride && !fgOverride) {
            adjustedColor = cache.getColor(bg.rgba, fg.rgba);
        }
        // Calculate and store in cache
        if (adjustedColor === undefined) {
            // Dim cells only require half the contrast, otherwise they wouldn't be distinguishable from
            // non-dim cells
            const ratio = this._optionsService.rawOptions.minimumContrastRatio / (cell.isDim() ? 2 : 1);
            adjustedColor = Color_1.color.ensureContrastRatio(bgOverride || bg, fgOverride || fg, ratio);
            cache.setColor((bgOverride || bg).rgba, (fgOverride || fg).rgba, adjustedColor ?? null);
        }
        if (adjustedColor) {
            this._addStyle(element, `color:${adjustedColor.css}`);
            return true;
        }
        return false;
    }
    _getContrastCache(cell) {
        if (cell.isDim()) {
            return this._themeService.colors.halfContrastCache;
        }
        return this._themeService.colors.contrastCache;
    }
    _addStyle(element, style) {
        element.setAttribute('style', `${element.getAttribute('style') || ''}${style};`);
    }
    _isCellInSelection(x, y) {
        const start = this._selectionStart;
        const end = this._selectionEnd;
        if (!start || !end) {
            return false;
        }
        if (this._columnSelectMode) {
            if (start[0] <= end[0]) {
                return x >= start[0] && y >= start[1] &&
                    x < end[0] && y <= end[1];
            }
            return x < start[0] && y >= start[1] &&
                x >= end[0] && y <= end[1];
        }
        return (y > start[1] && y < end[1]) ||
            (start[1] === end[1] && y === start[1] && x >= start[0] && x < end[0]) ||
            (start[1] < end[1] && y === end[1] && x < end[0]) ||
            (start[1] < end[1] && y === start[1] && x >= start[0]);
    }
}
exports.DomRendererRowFactory = DomRendererRowFactory;
function padStart(text, padChar, length) {
    while (text.length < length) {
        text = padChar + text;
    }
    return text;
}
