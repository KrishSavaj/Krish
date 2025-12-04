"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CellColorResolver = void 0;
const Constants_1 = require("common/buffer/Constants");
const Color_1 = require("common/Color");
const RendererUtils_1 = require("browser/renderer/shared/RendererUtils");
// Work variables to avoid garbage collection
let $fg = 0;
let $bg = 0;
let $hasFg = false;
let $hasBg = false;
let $isSelected = false;
let $colors;
let $variantOffset = 0;
class CellColorResolver {
    constructor(_terminal, _optionService, _selectionRenderModel, _decorationService, _coreBrowserService, _themeService) {
        this._terminal = _terminal;
        this._optionService = _optionService;
        this._selectionRenderModel = _selectionRenderModel;
        this._decorationService = _decorationService;
        this._coreBrowserService = _coreBrowserService;
        this._themeService = _themeService;
        /**
         * The shared result of the {@link resolve} call. This is only safe to use immediately after as
         * any other calls will share object.
         */
        this.result = {
            fg: 0,
            bg: 0,
            ext: 0
        };
    }
    /**
     * Resolves colors for the cell, putting the result into the shared {@link result}. This resolves
     * overrides, inverse and selection for the cell which can then be used to feed into the renderer.
     */
    resolve(cell, x, y, deviceCellWidth) {
        this.result.bg = cell.bg;
        this.result.fg = cell.fg;
        this.result.ext = cell.bg & Constants_1.BgFlags.HAS_EXTENDED ? cell.extended.ext : 0;
        // Get any foreground/background overrides, this happens on the model to avoid spreading
        // override logic throughout the different sub-renderers
        // Reset overrides work variables
        $bg = 0;
        $fg = 0;
        $hasBg = false;
        $hasFg = false;
        $isSelected = false;
        $colors = this._themeService.colors;
        $variantOffset = 0;
        const code = cell.getCode();
        if (code !== Constants_1.NULL_CELL_CODE && cell.extended.underlineStyle === Constants_1.UnderlineStyle.DOTTED) {
            const lineWidth = Math.max(1, Math.floor(this._optionService.rawOptions.fontSize * this._coreBrowserService.dpr / 15));
            $variantOffset = x * deviceCellWidth % (Math.round(lineWidth) * 2);
        }
        // Apply decorations on the bottom layer
        this._decorationService.forEachDecorationAtCell(x, y, 'bottom', d => {
            if (d.backgroundColorRGB) {
                $bg = d.backgroundColorRGB.rgba >> 8 & Constants_1.Attributes.RGB_MASK;
                $hasBg = true;
            }
            if (d.foregroundColorRGB) {
                $fg = d.foregroundColorRGB.rgba >> 8 & Constants_1.Attributes.RGB_MASK;
                $hasFg = true;
            }
        });
        // Apply the selection color if needed
        $isSelected = this._selectionRenderModel.isCellSelected(this._terminal, x, y);
        if ($isSelected) {
            // If the cell has a bg color, retain the color by blending it with the selection color
            if ((this.result.fg & Constants_1.FgFlags.INVERSE) ||
                (this.result.bg & Constants_1.Attributes.CM_MASK) !== Constants_1.Attributes.CM_DEFAULT) {
                // Resolve the standard bg color
                if (this.result.fg & Constants_1.FgFlags.INVERSE) {
                    switch (this.result.fg & Constants_1.Attributes.CM_MASK) {
                        case Constants_1.Attributes.CM_P16:
                        case Constants_1.Attributes.CM_P256:
                            $bg = this._themeService.colors.ansi[this.result.fg & Constants_1.Attributes.PCOLOR_MASK].rgba;
                            break;
                        case Constants_1.Attributes.CM_RGB:
                            $bg = ((this.result.fg & Constants_1.Attributes.RGB_MASK) << 8) | 0xFF;
                            break;
                        case Constants_1.Attributes.CM_DEFAULT:
                        default:
                            $bg = this._themeService.colors.foreground.rgba;
                    }
                }
                else {
                    switch (this.result.bg & Constants_1.Attributes.CM_MASK) {
                        case Constants_1.Attributes.CM_P16:
                        case Constants_1.Attributes.CM_P256:
                            $bg = this._themeService.colors.ansi[this.result.bg & Constants_1.Attributes.PCOLOR_MASK].rgba;
                            break;
                        case Constants_1.Attributes.CM_RGB:
                            $bg = ((this.result.bg & Constants_1.Attributes.RGB_MASK) << 8) | 0xFF;
                            break;
                        // No need to consider default bg color here as it's not possible
                    }
                }
                // Blend with selection bg color
                $bg = Color_1.rgba.blend($bg, ((this._coreBrowserService.isFocused ? $colors.selectionBackgroundOpaque : $colors.selectionInactiveBackgroundOpaque).rgba & 0xFFFFFF00) | 0x80) >> 8 & Constants_1.Attributes.RGB_MASK;
            }
            else {
                $bg = (this._coreBrowserService.isFocused ? $colors.selectionBackgroundOpaque : $colors.selectionInactiveBackgroundOpaque).rgba >> 8 & Constants_1.Attributes.RGB_MASK;
            }
            $hasBg = true;
            // Apply explicit selection foreground if present
            if ($colors.selectionForeground) {
                $fg = $colors.selectionForeground.rgba >> 8 & Constants_1.Attributes.RGB_MASK;
                $hasFg = true;
            }
            // Overwrite fg as bg if it's a special decorative glyph (eg. powerline)
            if ((0, RendererUtils_1.treatGlyphAsBackgroundColor)(cell.getCode())) {
                // Inverse default background should be treated as transparent
                if ((this.result.fg & Constants_1.FgFlags.INVERSE) &&
                    (this.result.bg & Constants_1.Attributes.CM_MASK) === Constants_1.Attributes.CM_DEFAULT) {
                    $fg = (this._coreBrowserService.isFocused ? $colors.selectionBackgroundOpaque : $colors.selectionInactiveBackgroundOpaque).rgba >> 8 & Constants_1.Attributes.RGB_MASK;
                }
                else {
                    if (this.result.fg & Constants_1.FgFlags.INVERSE) {
                        switch (this.result.bg & Constants_1.Attributes.CM_MASK) {
                            case Constants_1.Attributes.CM_P16:
                            case Constants_1.Attributes.CM_P256:
                                $fg = this._themeService.colors.ansi[this.result.bg & Constants_1.Attributes.PCOLOR_MASK].rgba;
                                break;
                            case Constants_1.Attributes.CM_RGB:
                                $fg = ((this.result.bg & Constants_1.Attributes.RGB_MASK) << 8) | 0xFF;
                                break;
                            // No need to consider default bg color here as it's not possible
                        }
                    }
                    else {
                        switch (this.result.fg & Constants_1.Attributes.CM_MASK) {
                            case Constants_1.Attributes.CM_P16:
                            case Constants_1.Attributes.CM_P256:
                                $fg = this._themeService.colors.ansi[this.result.fg & Constants_1.Attributes.PCOLOR_MASK].rgba;
                                break;
                            case Constants_1.Attributes.CM_RGB:
                                $fg = ((this.result.fg & Constants_1.Attributes.RGB_MASK) << 8) | 0xFF;
                                break;
                            case Constants_1.Attributes.CM_DEFAULT:
                            default:
                                $fg = this._themeService.colors.foreground.rgba;
                        }
                    }
                    $fg = Color_1.rgba.blend($fg, ((this._coreBrowserService.isFocused ? $colors.selectionBackgroundOpaque : $colors.selectionInactiveBackgroundOpaque).rgba & 0xFFFFFF00) | 0x80) >> 8 & Constants_1.Attributes.RGB_MASK;
                }
                $hasFg = true;
            }
        }
        // Apply decorations on the top layer
        this._decorationService.forEachDecorationAtCell(x, y, 'top', d => {
            if (d.backgroundColorRGB) {
                $bg = d.backgroundColorRGB.rgba >> 8 & Constants_1.Attributes.RGB_MASK;
                $hasBg = true;
            }
            if (d.foregroundColorRGB) {
                $fg = d.foregroundColorRGB.rgba >> 8 & Constants_1.Attributes.RGB_MASK;
                $hasFg = true;
            }
        });
        // Convert any overrides from rgba to the fg/bg packed format. This resolves the inverse flag
        // ahead of time in order to use the correct cache key
        if ($hasBg) {
            if ($isSelected) {
                // Non-RGB attributes from model + force non-dim + override + force RGB color mode
                $bg = (cell.bg & ~Constants_1.Attributes.RGB_MASK & ~Constants_1.BgFlags.DIM) | $bg | Constants_1.Attributes.CM_RGB;
            }
            else {
                // Non-RGB attributes from model + override + force RGB color mode
                $bg = (cell.bg & ~Constants_1.Attributes.RGB_MASK) | $bg | Constants_1.Attributes.CM_RGB;
            }
        }
        if ($hasFg) {
            // Non-RGB attributes from model + force disable inverse + override + force RGB color mode
            $fg = (cell.fg & ~Constants_1.Attributes.RGB_MASK & ~Constants_1.FgFlags.INVERSE) | $fg | Constants_1.Attributes.CM_RGB;
        }
        // Handle case where inverse was specified by only one of bg override or fg override was set,
        // resolving the other inverse color and setting the inverse flag if needed.
        if (this.result.fg & Constants_1.FgFlags.INVERSE) {
            if ($hasBg && !$hasFg) {
                // Resolve bg color type (default color has a different meaning in fg vs bg)
                if ((this.result.bg & Constants_1.Attributes.CM_MASK) === Constants_1.Attributes.CM_DEFAULT) {
                    $fg = (this.result.fg & ~(Constants_1.Attributes.RGB_MASK | Constants_1.FgFlags.INVERSE | Constants_1.Attributes.CM_MASK)) | (($colors.background.rgba >> 8 & Constants_1.Attributes.RGB_MASK) & Constants_1.Attributes.RGB_MASK) | Constants_1.Attributes.CM_RGB;
                }
                else {
                    $fg = (this.result.fg & ~(Constants_1.Attributes.RGB_MASK | Constants_1.FgFlags.INVERSE | Constants_1.Attributes.CM_MASK)) | this.result.bg & (Constants_1.Attributes.RGB_MASK | Constants_1.Attributes.CM_MASK);
                }
                $hasFg = true;
            }
            if (!$hasBg && $hasFg) {
                // Resolve bg color type (default color has a different meaning in fg vs bg)
                if ((this.result.fg & Constants_1.Attributes.CM_MASK) === Constants_1.Attributes.CM_DEFAULT) {
                    $bg = (this.result.bg & ~(Constants_1.Attributes.RGB_MASK | Constants_1.Attributes.CM_MASK)) | (($colors.foreground.rgba >> 8 & Constants_1.Attributes.RGB_MASK) & Constants_1.Attributes.RGB_MASK) | Constants_1.Attributes.CM_RGB;
                }
                else {
                    $bg = (this.result.bg & ~(Constants_1.Attributes.RGB_MASK | Constants_1.Attributes.CM_MASK)) | this.result.fg & (Constants_1.Attributes.RGB_MASK | Constants_1.Attributes.CM_MASK);
                }
                $hasBg = true;
            }
        }
        // Release object
        $colors = undefined;
        // Use the override if it exists
        this.result.bg = $hasBg ? $bg : this.result.bg;
        this.result.fg = $hasFg ? $fg : this.result.fg;
        // Reset overrides variantOffset
        this.result.ext &= ~Constants_1.ExtFlags.VARIANT_OFFSET;
        this.result.ext |= ($variantOffset << 29) & Constants_1.ExtFlags.VARIANT_OFFSET;
    }
}
exports.CellColorResolver = CellColorResolver;
