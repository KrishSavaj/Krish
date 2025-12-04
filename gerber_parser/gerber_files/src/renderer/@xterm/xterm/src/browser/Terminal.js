"use strict";
/**
 * Copyright (c) 2014 The xterm.js authors. All rights reserved.
 * Copyright (c) 2012-2013, Christopher Jeffrey (MIT License)
 * @license MIT
 *
 * Originally forked from (with the author's permission):
 *   Fabrice Bellard's javascript vt100 for jslinux:
 *   http://bellard.org/jslinux/
 *   Copyright (c) 2011 Fabrice Bellard
 *   The original design remains. The terminal itself
 *   has been extended to include xterm CSI codes, among
 *   other features.
 *
 * Terminal Emulation References:
 *   http://vt100.net/
 *   http://invisible-island.net/xterm/ctlseqs/ctlseqs.txt
 *   http://invisible-island.net/xterm/ctlseqs/ctlseqs.html
 *   http://invisible-island.net/vttest/
 *   http://www.inwap.com/pdp10/ansicode.txt
 *   http://linux.die.net/man/4/console_codes
 *   http://linux.die.net/man/7/urxvt
 */
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.Terminal = void 0;
const Clipboard_1 = require("browser/Clipboard");
const Lifecycle_1 = require("browser/Lifecycle");
const Linkifier_1 = require("./Linkifier");
const Strings = __importStar(require("browser/LocalizableStrings"));
const OscLinkProvider_1 = require("browser/OscLinkProvider");
const Viewport_1 = require("browser/Viewport");
const BufferDecorationRenderer_1 = require("browser/decorations/BufferDecorationRenderer");
const OverviewRulerRenderer_1 = require("browser/decorations/OverviewRulerRenderer");
const CompositionHelper_1 = require("browser/input/CompositionHelper");
const DomRenderer_1 = require("browser/renderer/dom/DomRenderer");
const CharSizeService_1 = require("browser/services/CharSizeService");
const CharacterJoinerService_1 = require("browser/services/CharacterJoinerService");
const CoreBrowserService_1 = require("browser/services/CoreBrowserService");
const MouseService_1 = require("browser/services/MouseService");
const RenderService_1 = require("browser/services/RenderService");
const SelectionService_1 = require("browser/services/SelectionService");
const Services_1 = require("browser/services/Services");
const ThemeService_1 = require("browser/services/ThemeService");
const Color_1 = require("common/Color");
const CoreTerminal_1 = require("common/CoreTerminal");
const EventEmitter_1 = require("common/EventEmitter");
const Lifecycle_2 = require("common/Lifecycle");
const Browser = __importStar(require("common/Platform"));
const Types_1 = require("common/Types");
const BufferLine_1 = require("common/buffer/BufferLine");
const EscapeSequences_1 = require("common/data/EscapeSequences");
const Keyboard_1 = require("common/input/Keyboard");
const XParseColor_1 = require("common/input/XParseColor");
const DecorationService_1 = require("common/services/DecorationService");
const Services_2 = require("common/services/Services");
const InputHandler_1 = require("../common/InputHandler");
const AccessibilityManager_1 = require("./AccessibilityManager");
const LinkProviderService_1 = require("browser/services/LinkProviderService");
class Terminal extends CoreTerminal_1.CoreTerminal {
    get onFocus() { return this._onFocus.event; }
    get onBlur() { return this._onBlur.event; }
    get onA11yChar() { return this._onA11yCharEmitter.event; }
    get onA11yTab() { return this._onA11yTabEmitter.event; }
    get onWillOpen() { return this._onWillOpen.event; }
    constructor(options = {}) {
        super(options);
        this.browser = Browser;
        /**
         * Records whether the keydown event has already been handled and triggered a data event, if so
         * the keypress event should not trigger a data event but should still print to the textarea so
         * screen readers will announce it.
         */
        this._keyDownHandled = false;
        /**
         * Records whether a keydown event has occured since the last keyup event, i.e. whether a key
         * is currently "pressed".
         */
        this._keyDownSeen = false;
        /**
         * Records whether the keypress event has already been handled and triggered a data event, if so
         * the input event should not trigger a data event but should still print to the textarea so
         * screen readers will announce it.
         */
        this._keyPressHandled = false;
        /**
         * Records whether there has been a keydown event for a dead key without a corresponding keydown
         * event for the composed/alternative character. If we cancel the keydown event for the dead key,
         * no events will be emitted for the final character.
         */
        this._unprocessedDeadKey = false;
        this._accessibilityManager = this.register(new Lifecycle_2.MutableDisposable());
        this._onCursorMove = this.register(new EventEmitter_1.EventEmitter());
        this.onCursorMove = this._onCursorMove.event;
        this._onKey = this.register(new EventEmitter_1.EventEmitter());
        this.onKey = this._onKey.event;
        this._onRender = this.register(new EventEmitter_1.EventEmitter());
        this.onRender = this._onRender.event;
        this._onSelectionChange = this.register(new EventEmitter_1.EventEmitter());
        this.onSelectionChange = this._onSelectionChange.event;
        this._onTitleChange = this.register(new EventEmitter_1.EventEmitter());
        this.onTitleChange = this._onTitleChange.event;
        this._onBell = this.register(new EventEmitter_1.EventEmitter());
        this.onBell = this._onBell.event;
        this._onFocus = this.register(new EventEmitter_1.EventEmitter());
        this._onBlur = this.register(new EventEmitter_1.EventEmitter());
        this._onA11yCharEmitter = this.register(new EventEmitter_1.EventEmitter());
        this._onA11yTabEmitter = this.register(new EventEmitter_1.EventEmitter());
        this._onWillOpen = this.register(new EventEmitter_1.EventEmitter());
        this._setup();
        this._decorationService = this._instantiationService.createInstance(DecorationService_1.DecorationService);
        this._instantiationService.setService(Services_2.IDecorationService, this._decorationService);
        this._linkProviderService = this._instantiationService.createInstance(LinkProviderService_1.LinkProviderService);
        this._instantiationService.setService(Services_1.ILinkProviderService, this._linkProviderService);
        this._linkProviderService.registerLinkProvider(this._instantiationService.createInstance(OscLinkProvider_1.OscLinkProvider));
        // Setup InputHandler listeners
        this.register(this._inputHandler.onRequestBell(() => this._onBell.fire()));
        this.register(this._inputHandler.onRequestRefreshRows((start, end) => this.refresh(start, end)));
        this.register(this._inputHandler.onRequestSendFocus(() => this._reportFocus()));
        this.register(this._inputHandler.onRequestReset(() => this.reset()));
        this.register(this._inputHandler.onRequestWindowsOptionsReport(type => this._reportWindowsOptions(type)));
        this.register(this._inputHandler.onColor((event) => this._handleColorEvent(event)));
        this.register((0, EventEmitter_1.forwardEvent)(this._inputHandler.onCursorMove, this._onCursorMove));
        this.register((0, EventEmitter_1.forwardEvent)(this._inputHandler.onTitleChange, this._onTitleChange));
        this.register((0, EventEmitter_1.forwardEvent)(this._inputHandler.onA11yChar, this._onA11yCharEmitter));
        this.register((0, EventEmitter_1.forwardEvent)(this._inputHandler.onA11yTab, this._onA11yTabEmitter));
        // Setup listeners
        this.register(this._bufferService.onResize(e => this._afterResize(e.cols, e.rows)));
        this.register((0, Lifecycle_2.toDisposable)(() => {
            this._customKeyEventHandler = undefined;
            this.element?.parentNode?.removeChild(this.element);
        }));
    }
    /**
     * Handle color event from inputhandler for OSC 4|104 | 10|110 | 11|111 | 12|112.
     * An event from OSC 4|104 may contain multiple set or report requests, and multiple
     * or none restore requests (resetting all),
     * while an event from OSC 10|110 | 11|111 | 12|112 always contains a single request.
     */
    _handleColorEvent(event) {
        if (!this._themeService)
            return;
        for (const req of event) {
            let acc;
            let ident = '';
            switch (req.index) {
                case Types_1.SpecialColorIndex.FOREGROUND: // OSC 10 | 110
                    acc = 'foreground';
                    ident = '10';
                    break;
                case Types_1.SpecialColorIndex.BACKGROUND: // OSC 11 | 111
                    acc = 'background';
                    ident = '11';
                    break;
                case Types_1.SpecialColorIndex.CURSOR: // OSC 12 | 112
                    acc = 'cursor';
                    ident = '12';
                    break;
                default: // OSC 4 | 104
                    // we can skip the [0..255] range check here (already done in inputhandler)
                    acc = 'ansi';
                    ident = '4;' + req.index;
            }
            switch (req.type) {
                case Types_1.ColorRequestType.REPORT:
                    const colorRgb = Color_1.color.toColorRGB(acc === 'ansi'
                        ? this._themeService.colors.ansi[req.index]
                        : this._themeService.colors[acc]);
                    this.coreService.triggerDataEvent(`${EscapeSequences_1.C0.ESC}]${ident};${(0, XParseColor_1.toRgbString)(colorRgb)}${EscapeSequences_1.C1_ESCAPED.ST}`);
                    break;
                case Types_1.ColorRequestType.SET:
                    if (acc === 'ansi') {
                        this._themeService.modifyColors(colors => colors.ansi[req.index] = Color_1.channels.toColor(...req.color));
                    }
                    else {
                        const narrowedAcc = acc;
                        this._themeService.modifyColors(colors => colors[narrowedAcc] = Color_1.channels.toColor(...req.color));
                    }
                    break;
                case Types_1.ColorRequestType.RESTORE:
                    this._themeService.restoreColor(req.index);
                    break;
            }
        }
    }
    _setup() {
        super._setup();
        this._customKeyEventHandler = undefined;
    }
    /**
     * Convenience property to active buffer.
     */
    get buffer() {
        return this.buffers.active;
    }
    /**
     * Focus the terminal. Delegates focus handling to the terminal's DOM element.
     */
    focus() {
        if (this.textarea) {
            this.textarea.focus({ preventScroll: true });
        }
    }
    _handleScreenReaderModeOptionChange(value) {
        if (value) {
            if (!this._accessibilityManager.value && this._renderService) {
                this._accessibilityManager.value = this._instantiationService.createInstance(AccessibilityManager_1.AccessibilityManager, this);
            }
        }
        else {
            this._accessibilityManager.clear();
        }
    }
    /**
     * Binds the desired focus behavior on a given terminal object.
     */
    _handleTextAreaFocus(ev) {
        if (this.coreService.decPrivateModes.sendFocus) {
            this.coreService.triggerDataEvent(EscapeSequences_1.C0.ESC + '[I');
        }
        this.element.classList.add('focus');
        this._showCursor();
        this._onFocus.fire();
    }
    /**
     * Blur the terminal, calling the blur function on the terminal's underlying
     * textarea.
     */
    blur() {
        return this.textarea?.blur();
    }
    /**
     * Binds the desired blur behavior on a given terminal object.
     */
    _handleTextAreaBlur() {
        // Text can safely be removed on blur. Doing it earlier could interfere with
        // screen readers reading it out.
        this.textarea.value = '';
        this.refresh(this.buffer.y, this.buffer.y);
        if (this.coreService.decPrivateModes.sendFocus) {
            this.coreService.triggerDataEvent(EscapeSequences_1.C0.ESC + '[O');
        }
        this.element.classList.remove('focus');
        this._onBlur.fire();
    }
    _syncTextArea() {
        if (!this.textarea || !this.buffer.isCursorInViewport || this._compositionHelper.isComposing || !this._renderService) {
            return;
        }
        const cursorY = this.buffer.ybase + this.buffer.y;
        const bufferLine = this.buffer.lines.get(cursorY);
        if (!bufferLine) {
            return;
        }
        const cursorX = Math.min(this.buffer.x, this.cols - 1);
        const cellHeight = this._renderService.dimensions.css.cell.height;
        const width = bufferLine.getWidth(cursorX);
        const cellWidth = this._renderService.dimensions.css.cell.width * width;
        const cursorTop = this.buffer.y * this._renderService.dimensions.css.cell.height;
        const cursorLeft = cursorX * this._renderService.dimensions.css.cell.width;
        // Sync the textarea to the exact position of the composition view so the IME knows where the
        // text is.
        this.textarea.style.left = cursorLeft + 'px';
        this.textarea.style.top = cursorTop + 'px';
        this.textarea.style.width = cellWidth + 'px';
        this.textarea.style.height = cellHeight + 'px';
        this.textarea.style.lineHeight = cellHeight + 'px';
        this.textarea.style.zIndex = '-5';
    }
    /**
     * Initialize default behavior
     */
    _initGlobal() {
        this._bindKeys();
        // Bind clipboard functionality
        this.register((0, Lifecycle_1.addDisposableDomListener)(this.element, 'copy', (event) => {
            // If mouse events are active it means the selection manager is disabled and
            // copy should be handled by the host program.
            if (!this.hasSelection()) {
                return;
            }
            (0, Clipboard_1.copyHandler)(event, this._selectionService);
        }));
        const pasteHandlerWrapper = (event) => (0, Clipboard_1.handlePasteEvent)(event, this.textarea, this.coreService, this.optionsService);
        this.register((0, Lifecycle_1.addDisposableDomListener)(this.textarea, 'paste', pasteHandlerWrapper));
        this.register((0, Lifecycle_1.addDisposableDomListener)(this.element, 'paste', pasteHandlerWrapper));
        // Handle right click context menus
        if (Browser.isFirefox) {
            // Firefox doesn't appear to fire the contextmenu event on right click
            this.register((0, Lifecycle_1.addDisposableDomListener)(this.element, 'mousedown', (event) => {
                if (event.button === 2) {
                    (0, Clipboard_1.rightClickHandler)(event, this.textarea, this.screenElement, this._selectionService, this.options.rightClickSelectsWord);
                }
            }));
        }
        else {
            this.register((0, Lifecycle_1.addDisposableDomListener)(this.element, 'contextmenu', (event) => {
                (0, Clipboard_1.rightClickHandler)(event, this.textarea, this.screenElement, this._selectionService, this.options.rightClickSelectsWord);
            }));
        }
        // Move the textarea under the cursor when middle clicking on Linux to ensure
        // middle click to paste selection works. This only appears to work in Chrome
        // at the time is writing.
        if (Browser.isLinux) {
            // Use auxclick event over mousedown the latter doesn't seem to work. Note
            // that the regular click event doesn't fire for the middle mouse button.
            this.register((0, Lifecycle_1.addDisposableDomListener)(this.element, 'auxclick', (event) => {
                if (event.button === 1) {
                    (0, Clipboard_1.moveTextAreaUnderMouseCursor)(event, this.textarea, this.screenElement);
                }
            }));
        }
    }
    /**
     * Apply key handling to the terminal
     */
    _bindKeys() {
        this.register((0, Lifecycle_1.addDisposableDomListener)(this.textarea, 'keyup', (ev) => this._keyUp(ev), true));
        this.register((0, Lifecycle_1.addDisposableDomListener)(this.textarea, 'keydown', (ev) => this._keyDown(ev), true));
        this.register((0, Lifecycle_1.addDisposableDomListener)(this.textarea, 'keypress', (ev) => this._keyPress(ev), true));
        this.register((0, Lifecycle_1.addDisposableDomListener)(this.textarea, 'compositionstart', () => this._compositionHelper.compositionstart()));
        this.register((0, Lifecycle_1.addDisposableDomListener)(this.textarea, 'compositionupdate', (e) => this._compositionHelper.compositionupdate(e)));
        this.register((0, Lifecycle_1.addDisposableDomListener)(this.textarea, 'compositionend', () => this._compositionHelper.compositionend()));
        this.register((0, Lifecycle_1.addDisposableDomListener)(this.textarea, 'input', (ev) => this._inputEvent(ev), true));
        this.register(this.onRender(() => this._compositionHelper.updateCompositionElements()));
    }
    /**
     * Opens the terminal within an element.
     *
     * @param parent The element to create the terminal within.
     */
    open(parent) {
        if (!parent) {
            throw new Error('Terminal requires a parent element.');
        }
        if (!parent.isConnected) {
            this._logService.debug('Terminal.open was called on an element that was not attached to the DOM');
        }
        // If the terminal is already opened
        if (this.element?.ownerDocument.defaultView && this._coreBrowserService) {
            // Adjust the window if needed
            if (this.element.ownerDocument.defaultView !== this._coreBrowserService.window) {
                this._coreBrowserService.window = this.element.ownerDocument.defaultView;
            }
            return;
        }
        this._document = parent.ownerDocument;
        if (this.options.documentOverride && this.options.documentOverride instanceof Document) {
            this._document = this.optionsService.rawOptions.documentOverride;
        }
        // Create main element container
        this.element = this._document.createElement('div');
        this.element.dir = 'ltr'; // xterm.css assumes LTR
        this.element.classList.add('terminal');
        this.element.classList.add('xterm');
        parent.appendChild(this.element);
        // Performance: Use a document fragment to build the terminal
        // viewport and helper elements detached from the DOM
        const fragment = this._document.createDocumentFragment();
        this._viewportElement = this._document.createElement('div');
        this._viewportElement.classList.add('xterm-viewport');
        fragment.appendChild(this._viewportElement);
        this._viewportScrollArea = this._document.createElement('div');
        this._viewportScrollArea.classList.add('xterm-scroll-area');
        this._viewportElement.appendChild(this._viewportScrollArea);
        this.screenElement = this._document.createElement('div');
        this.screenElement.classList.add('xterm-screen');
        this.register((0, Lifecycle_1.addDisposableDomListener)(this.screenElement, 'mousemove', (ev) => this.updateCursorStyle(ev)));
        // Create the container that will hold helpers like the textarea for
        // capturing DOM Events. Then produce the helpers.
        this._helperContainer = this._document.createElement('div');
        this._helperContainer.classList.add('xterm-helpers');
        this.screenElement.appendChild(this._helperContainer);
        fragment.appendChild(this.screenElement);
        this.textarea = this._document.createElement('textarea');
        this.textarea.classList.add('xterm-helper-textarea');
        this.textarea.setAttribute('aria-label', Strings.promptLabel);
        if (!Browser.isChromeOS) {
            // ChromeVox on ChromeOS does not like this. See
            // https://issuetracker.google.com/issues/260170397
            this.textarea.setAttribute('aria-multiline', 'false');
        }
        this.textarea.setAttribute('autocorrect', 'off');
        this.textarea.setAttribute('autocapitalize', 'off');
        this.textarea.setAttribute('spellcheck', 'false');
        this.textarea.tabIndex = 0;
        // Register the core browser service before the generic textarea handlers are registered so it
        // handles them first. Otherwise the renderers may use the wrong focus state.
        this._coreBrowserService = this.register(this._instantiationService.createInstance(CoreBrowserService_1.CoreBrowserService, this.textarea, parent.ownerDocument.defaultView ?? window, 
        // Force unsafe null in node.js environment for tests
        (this._document ?? (typeof window !== 'undefined')) ? window.document : null));
        this._instantiationService.setService(Services_1.ICoreBrowserService, this._coreBrowserService);
        this.register((0, Lifecycle_1.addDisposableDomListener)(this.textarea, 'focus', (ev) => this._handleTextAreaFocus(ev)));
        this.register((0, Lifecycle_1.addDisposableDomListener)(this.textarea, 'blur', () => this._handleTextAreaBlur()));
        this._helperContainer.appendChild(this.textarea);
        this._charSizeService = this._instantiationService.createInstance(CharSizeService_1.CharSizeService, this._document, this._helperContainer);
        this._instantiationService.setService(Services_1.ICharSizeService, this._charSizeService);
        this._themeService = this._instantiationService.createInstance(ThemeService_1.ThemeService);
        this._instantiationService.setService(Services_1.IThemeService, this._themeService);
        this._characterJoinerService = this._instantiationService.createInstance(CharacterJoinerService_1.CharacterJoinerService);
        this._instantiationService.setService(Services_1.ICharacterJoinerService, this._characterJoinerService);
        this._renderService = this.register(this._instantiationService.createInstance(RenderService_1.RenderService, this.rows, this.screenElement));
        this._instantiationService.setService(Services_1.IRenderService, this._renderService);
        this.register(this._renderService.onRenderedViewportChange(e => this._onRender.fire(e)));
        this.onResize(e => this._renderService.resize(e.cols, e.rows));
        this._compositionView = this._document.createElement('div');
        this._compositionView.classList.add('composition-view');
        this._compositionHelper = this._instantiationService.createInstance(CompositionHelper_1.CompositionHelper, this.textarea, this._compositionView);
        this._helperContainer.appendChild(this._compositionView);
        this._mouseService = this._instantiationService.createInstance(MouseService_1.MouseService);
        this._instantiationService.setService(Services_1.IMouseService, this._mouseService);
        this.linkifier = this.register(this._instantiationService.createInstance(Linkifier_1.Linkifier, this.screenElement));
        // Performance: Add viewport and helper elements from the fragment
        this.element.appendChild(fragment);
        try {
            this._onWillOpen.fire(this.element);
        }
        catch { /* fails to load addon for some reason */ }
        if (!this._renderService.hasRenderer()) {
            this._renderService.setRenderer(this._createRenderer());
        }
        this.viewport = this._instantiationService.createInstance(Viewport_1.Viewport, this._viewportElement, this._viewportScrollArea);
        this.viewport.onRequestScrollLines(e => this.scrollLines(e.amount, e.suppressScrollEvent, Types_1.ScrollSource.VIEWPORT)),
            this.register(this._inputHandler.onRequestSyncScrollBar(() => this.viewport.syncScrollArea()));
        this.register(this.viewport);
        this.register(this.onCursorMove(() => {
            this._renderService.handleCursorMove();
            this._syncTextArea();
        }));
        this.register(this.onResize(() => this._renderService.handleResize(this.cols, this.rows)));
        this.register(this.onBlur(() => this._renderService.handleBlur()));
        this.register(this.onFocus(() => this._renderService.handleFocus()));
        this.register(this._renderService.onDimensionsChange(() => this.viewport.syncScrollArea()));
        this._selectionService = this.register(this._instantiationService.createInstance(SelectionService_1.SelectionService, this.element, this.screenElement, this.linkifier));
        this._instantiationService.setService(Services_1.ISelectionService, this._selectionService);
        this.register(this._selectionService.onRequestScrollLines(e => this.scrollLines(e.amount, e.suppressScrollEvent)));
        this.register(this._selectionService.onSelectionChange(() => this._onSelectionChange.fire()));
        this.register(this._selectionService.onRequestRedraw(e => this._renderService.handleSelectionChanged(e.start, e.end, e.columnSelectMode)));
        this.register(this._selectionService.onLinuxMouseSelection(text => {
            // If there's a new selection, put it into the textarea, focus and select it
            // in order to register it as a selection on the OS. This event is fired
            // only on Linux to enable middle click to paste selection.
            this.textarea.value = text;
            this.textarea.focus();
            this.textarea.select();
        }));
        this.register(this._onScroll.event(ev => {
            this.viewport.syncScrollArea();
            this._selectionService.refresh();
        }));
        this.register((0, Lifecycle_1.addDisposableDomListener)(this._viewportElement, 'scroll', () => this._selectionService.refresh()));
        this.register(this._instantiationService.createInstance(BufferDecorationRenderer_1.BufferDecorationRenderer, this.screenElement));
        this.register((0, Lifecycle_1.addDisposableDomListener)(this.element, 'mousedown', (e) => this._selectionService.handleMouseDown(e)));
        // apply mouse event classes set by escape codes before terminal was attached
        if (this.coreMouseService.areMouseEventsActive) {
            this._selectionService.disable();
            this.element.classList.add('enable-mouse-events');
        }
        else {
            this._selectionService.enable();
        }
        if (this.options.screenReaderMode) {
            // Note that this must be done *after* the renderer is created in order to
            // ensure the correct order of the dprchange event
            this._accessibilityManager.value = this._instantiationService.createInstance(AccessibilityManager_1.AccessibilityManager, this);
        }
        this.register(this.optionsService.onSpecificOptionChange('screenReaderMode', e => this._handleScreenReaderModeOptionChange(e)));
        if (this.options.overviewRulerWidth) {
            this._overviewRulerRenderer = this.register(this._instantiationService.createInstance(OverviewRulerRenderer_1.OverviewRulerRenderer, this._viewportElement, this.screenElement));
        }
        this.optionsService.onSpecificOptionChange('overviewRulerWidth', value => {
            if (!this._overviewRulerRenderer && value && this._viewportElement && this.screenElement) {
                this._overviewRulerRenderer = this.register(this._instantiationService.createInstance(OverviewRulerRenderer_1.OverviewRulerRenderer, this._viewportElement, this.screenElement));
            }
        });
        // Measure the character size
        this._charSizeService.measure();
        // Setup loop that draws to screen
        this.refresh(0, this.rows - 1);
        // Initialize global actions that need to be taken on the document.
        this._initGlobal();
        // Listen for mouse events and translate
        // them into terminal mouse protocols.
        this.bindMouse();
    }
    _createRenderer() {
        return this._instantiationService.createInstance(DomRenderer_1.DomRenderer, this, this._document, this.element, this.screenElement, this._viewportElement, this._helperContainer, this.linkifier);
    }
    /**
     * Bind certain mouse events to the terminal.
     * By default only 3 button + wheel up/down is ativated. For higher buttons
     * no mouse report will be created. Typically the standard actions will be active.
     *
     * There are several reasons not to enable support for higher buttons/wheel:
     * - Button 4 and 5 are typically used for history back and forward navigation,
     *   there is no straight forward way to supress/intercept those standard actions.
     * - Support for higher buttons does not work in some platform/browser combinations.
     * - Left/right wheel was not tested.
     * - Emulators vary in mouse button support, typically only 3 buttons and
     *   wheel up/down work reliable.
     *
     * TODO: Move mouse event code into its own file.
     */
    bindMouse() {
        const self = this;
        const el = this.element;
        // send event to CoreMouseService
        function sendEvent(ev) {
            // get mouse coordinates
            const pos = self._mouseService.getMouseReportCoords(ev, self.screenElement);
            if (!pos) {
                return false;
            }
            let but;
            let action;
            switch (ev.overrideType || ev.type) {
                case 'mousemove':
                    action = Types_1.CoreMouseAction.MOVE;
                    if (ev.buttons === undefined) {
                        // buttons is not supported on macOS, try to get a value from button instead
                        but = Types_1.CoreMouseButton.NONE;
                        if (ev.button !== undefined) {
                            but = ev.button < 3 ? ev.button : Types_1.CoreMouseButton.NONE;
                        }
                    }
                    else {
                        // according to MDN buttons only reports up to button 5 (AUX2)
                        but = ev.buttons & 1 ? Types_1.CoreMouseButton.LEFT :
                            ev.buttons & 4 ? Types_1.CoreMouseButton.MIDDLE :
                                ev.buttons & 2 ? Types_1.CoreMouseButton.RIGHT :
                                    Types_1.CoreMouseButton.NONE; // fallback to NONE
                    }
                    break;
                case 'mouseup':
                    action = Types_1.CoreMouseAction.UP;
                    but = ev.button < 3 ? ev.button : Types_1.CoreMouseButton.NONE;
                    break;
                case 'mousedown':
                    action = Types_1.CoreMouseAction.DOWN;
                    but = ev.button < 3 ? ev.button : Types_1.CoreMouseButton.NONE;
                    break;
                case 'wheel':
                    if (self._customWheelEventHandler && self._customWheelEventHandler(ev) === false) {
                        return false;
                    }
                    const amount = self.viewport.getLinesScrolled(ev);
                    if (amount === 0) {
                        return false;
                    }
                    action = ev.deltaY < 0 ? Types_1.CoreMouseAction.UP : Types_1.CoreMouseAction.DOWN;
                    but = Types_1.CoreMouseButton.WHEEL;
                    break;
                default:
                    // dont handle other event types by accident
                    return false;
            }
            // exit if we cannot determine valid button/action values
            // do nothing for higher buttons than wheel
            if (action === undefined || but === undefined || but > Types_1.CoreMouseButton.WHEEL) {
                return false;
            }
            return self.coreMouseService.triggerMouseEvent({
                col: pos.col,
                row: pos.row,
                x: pos.x,
                y: pos.y,
                button: but,
                action,
                ctrl: ev.ctrlKey,
                alt: ev.altKey,
                shift: ev.shiftKey
            });
        }
        /**
         * Event listener state handling.
         * We listen to the onProtocolChange event of CoreMouseService and put
         * requested listeners in `requestedEvents`. With this the listeners
         * have all bits to do the event listener juggling.
         * Note: 'mousedown' currently is "always on" and not managed
         * by onProtocolChange.
         */
        const requestedEvents = {
            mouseup: null,
            wheel: null,
            mousedrag: null,
            mousemove: null
        };
        const eventListeners = {
            mouseup: (ev) => {
                sendEvent(ev);
                if (!ev.buttons) {
                    // if no other button is held remove global handlers
                    this._document.removeEventListener('mouseup', requestedEvents.mouseup);
                    if (requestedEvents.mousedrag) {
                        this._document.removeEventListener('mousemove', requestedEvents.mousedrag);
                    }
                }
                return this.cancel(ev);
            },
            wheel: (ev) => {
                sendEvent(ev);
                return this.cancel(ev, true);
            },
            mousedrag: (ev) => {
                // deal only with move while a button is held
                if (ev.buttons) {
                    sendEvent(ev);
                }
            },
            mousemove: (ev) => {
                // deal only with move without any button
                if (!ev.buttons) {
                    sendEvent(ev);
                }
            }
        };
        this.register(this.coreMouseService.onProtocolChange(events => {
            // apply global changes on events
            if (events) {
                if (this.optionsService.rawOptions.logLevel === 'debug') {
                    this._logService.debug('Binding to mouse events:', this.coreMouseService.explainEvents(events));
                }
                this.element.classList.add('enable-mouse-events');
                this._selectionService.disable();
            }
            else {
                this._logService.debug('Unbinding from mouse events.');
                this.element.classList.remove('enable-mouse-events');
                this._selectionService.enable();
            }
            // add/remove handlers from requestedEvents
            if (!(events & Types_1.CoreMouseEventType.MOVE)) {
                el.removeEventListener('mousemove', requestedEvents.mousemove);
                requestedEvents.mousemove = null;
            }
            else if (!requestedEvents.mousemove) {
                el.addEventListener('mousemove', eventListeners.mousemove);
                requestedEvents.mousemove = eventListeners.mousemove;
            }
            if (!(events & Types_1.CoreMouseEventType.WHEEL)) {
                el.removeEventListener('wheel', requestedEvents.wheel);
                requestedEvents.wheel = null;
            }
            else if (!requestedEvents.wheel) {
                el.addEventListener('wheel', eventListeners.wheel, { passive: false });
                requestedEvents.wheel = eventListeners.wheel;
            }
            if (!(events & Types_1.CoreMouseEventType.UP)) {
                this._document.removeEventListener('mouseup', requestedEvents.mouseup);
                requestedEvents.mouseup = null;
            }
            else if (!requestedEvents.mouseup) {
                requestedEvents.mouseup = eventListeners.mouseup;
            }
            if (!(events & Types_1.CoreMouseEventType.DRAG)) {
                this._document.removeEventListener('mousemove', requestedEvents.mousedrag);
                requestedEvents.mousedrag = null;
            }
            else if (!requestedEvents.mousedrag) {
                requestedEvents.mousedrag = eventListeners.mousedrag;
            }
        }));
        // force initial onProtocolChange so we dont miss early mouse requests
        this.coreMouseService.activeProtocol = this.coreMouseService.activeProtocol;
        /**
         * "Always on" event listeners.
         */
        this.register((0, Lifecycle_1.addDisposableDomListener)(el, 'mousedown', (ev) => {
            ev.preventDefault();
            this.focus();
            // Don't send the mouse button to the pty if mouse events are disabled or
            // if the selection manager is having selection forced (ie. a modifier is
            // held).
            if (!this.coreMouseService.areMouseEventsActive || this._selectionService.shouldForceSelection(ev)) {
                return;
            }
            sendEvent(ev);
            // Register additional global handlers which should keep reporting outside
            // of the terminal element.
            // Note: Other emulators also do this for 'mousedown' while a button
            // is held, we currently limit 'mousedown' to the terminal only.
            if (requestedEvents.mouseup) {
                this._document.addEventListener('mouseup', requestedEvents.mouseup);
            }
            if (requestedEvents.mousedrag) {
                this._document.addEventListener('mousemove', requestedEvents.mousedrag);
            }
            return this.cancel(ev);
        }));
        this.register((0, Lifecycle_1.addDisposableDomListener)(el, 'wheel', (ev) => {
            // do nothing, if app side handles wheel itself
            if (requestedEvents.wheel)
                return;
            if (this._customWheelEventHandler && this._customWheelEventHandler(ev) === false) {
                return false;
            }
            if (!this.buffer.hasScrollback) {
                // Convert wheel events into up/down events when the buffer does not have scrollback, this
                // enables scrolling in apps hosted in the alt buffer such as vim or tmux.
                const amount = this.viewport.getLinesScrolled(ev);
                // Do nothing if there's no vertical scroll
                if (amount === 0) {
                    return;
                }
                // Construct and send sequences
                const sequence = EscapeSequences_1.C0.ESC + (this.coreService.decPrivateModes.applicationCursorKeys ? 'O' : '[') + (ev.deltaY < 0 ? 'A' : 'B');
                let data = '';
                for (let i = 0; i < Math.abs(amount); i++) {
                    data += sequence;
                }
                this.coreService.triggerDataEvent(data, true);
                return this.cancel(ev, true);
            }
            // normal viewport scrolling
            // conditionally stop event, if the viewport still had rows to scroll within
            if (this.viewport.handleWheel(ev)) {
                return this.cancel(ev);
            }
        }, { passive: false }));
        this.register((0, Lifecycle_1.addDisposableDomListener)(el, 'touchstart', (ev) => {
            if (this.coreMouseService.areMouseEventsActive)
                return;
            this.viewport.handleTouchStart(ev);
            return this.cancel(ev);
        }, { passive: true }));
        this.register((0, Lifecycle_1.addDisposableDomListener)(el, 'touchmove', (ev) => {
            if (this.coreMouseService.areMouseEventsActive)
                return;
            if (!this.viewport.handleTouchMove(ev)) {
                return this.cancel(ev);
            }
        }, { passive: false }));
    }
    /**
     * Tells the renderer to refresh terminal content between two rows (inclusive) at the next
     * opportunity.
     * @param start The row to start from (between 0 and this.rows - 1).
     * @param end The row to end at (between start and this.rows - 1).
     */
    refresh(start, end) {
        this._renderService?.refreshRows(start, end);
    }
    /**
     * Change the cursor style for different selection modes
     */
    updateCursorStyle(ev) {
        if (this._selectionService?.shouldColumnSelect(ev)) {
            this.element.classList.add('column-select');
        }
        else {
            this.element.classList.remove('column-select');
        }
    }
    /**
     * Display the cursor element
     */
    _showCursor() {
        if (!this.coreService.isCursorInitialized) {
            this.coreService.isCursorInitialized = true;
            this.refresh(this.buffer.y, this.buffer.y);
        }
    }
    scrollLines(disp, suppressScrollEvent, source = Types_1.ScrollSource.TERMINAL) {
        if (source === Types_1.ScrollSource.VIEWPORT) {
            super.scrollLines(disp, suppressScrollEvent, source);
            this.refresh(0, this.rows - 1);
        }
        else {
            this.viewport?.scrollLines(disp);
        }
    }
    paste(data) {
        (0, Clipboard_1.paste)(data, this.textarea, this.coreService, this.optionsService);
    }
    attachCustomKeyEventHandler(customKeyEventHandler) {
        this._customKeyEventHandler = customKeyEventHandler;
    }
    attachCustomWheelEventHandler(customWheelEventHandler) {
        this._customWheelEventHandler = customWheelEventHandler;
    }
    registerLinkProvider(linkProvider) {
        return this._linkProviderService.registerLinkProvider(linkProvider);
    }
    registerCharacterJoiner(handler) {
        if (!this._characterJoinerService) {
            throw new Error('Terminal must be opened first');
        }
        const joinerId = this._characterJoinerService.register(handler);
        this.refresh(0, this.rows - 1);
        return joinerId;
    }
    deregisterCharacterJoiner(joinerId) {
        if (!this._characterJoinerService) {
            throw new Error('Terminal must be opened first');
        }
        if (this._characterJoinerService.deregister(joinerId)) {
            this.refresh(0, this.rows - 1);
        }
    }
    get markers() {
        return this.buffer.markers;
    }
    registerMarker(cursorYOffset) {
        return this.buffer.addMarker(this.buffer.ybase + this.buffer.y + cursorYOffset);
    }
    registerDecoration(decorationOptions) {
        return this._decorationService.registerDecoration(decorationOptions);
    }
    /**
     * Gets whether the terminal has an active selection.
     */
    hasSelection() {
        return this._selectionService ? this._selectionService.hasSelection : false;
    }
    /**
     * Selects text within the terminal.
     * @param column The column the selection starts at..
     * @param row The row the selection starts at.
     * @param length The length of the selection.
     */
    select(column, row, length) {
        this._selectionService.setSelection(column, row, length);
    }
    /**
     * Gets the terminal's current selection, this is useful for implementing copy
     * behavior outside of xterm.js.
     */
    getSelection() {
        return this._selectionService ? this._selectionService.selectionText : '';
    }
    getSelectionPosition() {
        if (!this._selectionService || !this._selectionService.hasSelection) {
            return undefined;
        }
        return {
            start: {
                x: this._selectionService.selectionStart[0],
                y: this._selectionService.selectionStart[1]
            },
            end: {
                x: this._selectionService.selectionEnd[0],
                y: this._selectionService.selectionEnd[1]
            }
        };
    }
    /**
     * Clears the current terminal selection.
     */
    clearSelection() {
        this._selectionService?.clearSelection();
    }
    /**
     * Selects all text within the terminal.
     */
    selectAll() {
        this._selectionService?.selectAll();
    }
    selectLines(start, end) {
        this._selectionService?.selectLines(start, end);
    }
    /**
     * Handle a keydown [KeyboardEvent].
     *
     * [KeyboardEvent]: https://developer.mozilla.org/en-US/docs/DOM/KeyboardEvent
     */
    _keyDown(event) {
        this._keyDownHandled = false;
        this._keyDownSeen = true;
        if (this._customKeyEventHandler && this._customKeyEventHandler(event) === false) {
            return false;
        }
        // Ignore composing with Alt key on Mac when macOptionIsMeta is enabled
        const shouldIgnoreComposition = this.browser.isMac && this.options.macOptionIsMeta && event.altKey;
        if (!shouldIgnoreComposition && !this._compositionHelper.keydown(event)) {
            if (this.options.scrollOnUserInput && this.buffer.ybase !== this.buffer.ydisp) {
                this.scrollToBottom();
            }
            return false;
        }
        if (!shouldIgnoreComposition && (event.key === 'Dead' || event.key === 'AltGraph')) {
            this._unprocessedDeadKey = true;
        }
        const result = (0, Keyboard_1.evaluateKeyboardEvent)(event, this.coreService.decPrivateModes.applicationCursorKeys, this.browser.isMac, this.options.macOptionIsMeta);
        this.updateCursorStyle(event);
        if (result.type === Types_1.KeyboardResultType.PAGE_DOWN || result.type === Types_1.KeyboardResultType.PAGE_UP) {
            const scrollCount = this.rows - 1;
            this.scrollLines(result.type === Types_1.KeyboardResultType.PAGE_UP ? -scrollCount : scrollCount);
            return this.cancel(event, true);
        }
        if (result.type === Types_1.KeyboardResultType.SELECT_ALL) {
            this.selectAll();
        }
        if (this._isThirdLevelShift(this.browser, event)) {
            return true;
        }
        if (result.cancel) {
            // The event is canceled at the end already, is this necessary?
            this.cancel(event, true);
        }
        if (!result.key) {
            return true;
        }
        // HACK: Process A-Z in the keypress event to fix an issue with macOS IMEs where lower case
        // letters cannot be input while caps lock is on.
        if (event.key && !event.ctrlKey && !event.altKey && !event.metaKey && event.key.length === 1) {
            if (event.key.charCodeAt(0) >= 65 && event.key.charCodeAt(0) <= 90) {
                return true;
            }
        }
        if (this._unprocessedDeadKey) {
            this._unprocessedDeadKey = false;
            return true;
        }
        // If ctrl+c or enter is being sent, clear out the textarea. This is done so that screen readers
        // will announce deleted characters. This will not work 100% of the time but it should cover
        // most scenarios.
        if (result.key === EscapeSequences_1.C0.ETX || result.key === EscapeSequences_1.C0.CR) {
            this.textarea.value = '';
        }
        this._onKey.fire({ key: result.key, domEvent: event });
        this._showCursor();
        this.coreService.triggerDataEvent(result.key, true);
        // Cancel events when not in screen reader mode so events don't get bubbled up and handled by
        // other listeners. When screen reader mode is enabled, we don't cancel them (unless ctrl or alt
        // is also depressed) so that the cursor textarea can be updated, which triggers the screen
        // reader to read it.
        if (!this.optionsService.rawOptions.screenReaderMode || event.altKey || event.ctrlKey) {
            return this.cancel(event, true);
        }
        this._keyDownHandled = true;
    }
    _isThirdLevelShift(browser, ev) {
        const thirdLevelKey = (browser.isMac && !this.options.macOptionIsMeta && ev.altKey && !ev.ctrlKey && !ev.metaKey) ||
            (browser.isWindows && ev.altKey && ev.ctrlKey && !ev.metaKey) ||
            (browser.isWindows && ev.getModifierState('AltGraph'));
        if (ev.type === 'keypress') {
            return thirdLevelKey;
        }
        // Don't invoke for arrows, pageDown, home, backspace, etc. (on non-keypress events)
        return thirdLevelKey && (!ev.keyCode || ev.keyCode > 47);
    }
    _keyUp(ev) {
        this._keyDownSeen = false;
        if (this._customKeyEventHandler && this._customKeyEventHandler(ev) === false) {
            return;
        }
        if (!wasModifierKeyOnlyEvent(ev)) {
            this.focus();
        }
        this.updateCursorStyle(ev);
        this._keyPressHandled = false;
    }
    /**
     * Handle a keypress event.
     * Key Resources:
     *   - https://developer.mozilla.org/en-US/docs/DOM/KeyboardEvent
     * @param ev The keypress event to be handled.
     */
    _keyPress(ev) {
        let key;
        this._keyPressHandled = false;
        if (this._keyDownHandled) {
            return false;
        }
        if (this._customKeyEventHandler && this._customKeyEventHandler(ev) === false) {
            return false;
        }
        this.cancel(ev);
        if (ev.charCode) {
            key = ev.charCode;
        }
        else if (ev.which === null || ev.which === undefined) {
            key = ev.keyCode;
        }
        else if (ev.which !== 0 && ev.charCode !== 0) {
            key = ev.which;
        }
        else {
            return false;
        }
        if (!key || ((ev.altKey || ev.ctrlKey || ev.metaKey) && !this._isThirdLevelShift(this.browser, ev))) {
            return false;
        }
        key = String.fromCharCode(key);
        this._onKey.fire({ key, domEvent: ev });
        this._showCursor();
        this.coreService.triggerDataEvent(key, true);
        this._keyPressHandled = true;
        // The key was handled so clear the dead key state, otherwise certain keystrokes like arrow
        // keys could be ignored
        this._unprocessedDeadKey = false;
        return true;
    }
    /**
     * Handle an input event.
     * Key Resources:
     *   - https://developer.mozilla.org/en-US/docs/Web/API/InputEvent
     * @param ev The input event to be handled.
     */
    _inputEvent(ev) {
        // Only support emoji IMEs when screen reader mode is disabled as the event must bubble up to
        // support reading out character input which can doubling up input characters
        // Based on these event traces: https://github.com/xtermjs/xterm.js/issues/3679
        if (ev.data && ev.inputType === 'insertText' && (!ev.composed || !this._keyDownSeen) && !this.optionsService.rawOptions.screenReaderMode) {
            if (this._keyPressHandled) {
                return false;
            }
            // The key was handled so clear the dead key state, otherwise certain keystrokes like arrow
            // keys could be ignored
            this._unprocessedDeadKey = false;
            const text = ev.data;
            this.coreService.triggerDataEvent(text, true);
            this.cancel(ev);
            return true;
        }
        return false;
    }
    /**
     * Resizes the terminal.
     *
     * @param x The number of columns to resize to.
     * @param y The number of rows to resize to.
     */
    resize(x, y) {
        if (x === this.cols && y === this.rows) {
            // Check if we still need to measure the char size (fixes #785).
            if (this._charSizeService && !this._charSizeService.hasValidSize) {
                this._charSizeService.measure();
            }
            return;
        }
        super.resize(x, y);
    }
    _afterResize(x, y) {
        this._charSizeService?.measure();
        // Sync the scroll area to make sure scroll events don't fire and scroll the viewport to an
        // invalid location
        this.viewport?.syncScrollArea(true);
    }
    /**
     * Clear the entire buffer, making the prompt line the new first line.
     */
    clear() {
        if (this.buffer.ybase === 0 && this.buffer.y === 0) {
            // Don't clear if it's already clear
            return;
        }
        this.buffer.clearAllMarkers();
        this.buffer.lines.set(0, this.buffer.lines.get(this.buffer.ybase + this.buffer.y));
        this.buffer.lines.length = 1;
        this.buffer.ydisp = 0;
        this.buffer.ybase = 0;
        this.buffer.y = 0;
        for (let i = 1; i < this.rows; i++) {
            this.buffer.lines.push(this.buffer.getBlankLine(BufferLine_1.DEFAULT_ATTR_DATA));
        }
        // IMPORTANT: Fire scroll event before viewport is reset. This ensures embedders get the clear
        // scroll event and that the viewport's state will be valid for immediate writes.
        this._onScroll.fire({ position: this.buffer.ydisp, source: Types_1.ScrollSource.TERMINAL });
        this.viewport?.reset();
        this.refresh(0, this.rows - 1);
    }
    /**
     * Reset terminal.
     * Note: Calling this directly from JS is synchronous but does not clear
     * input buffers and does not reset the parser, thus the terminal will
     * continue to apply pending input data.
     * If you need in band reset (synchronous with input data) consider
     * using DECSTR (soft reset, CSI ! p) or RIS instead (hard reset, ESC c).
     */
    reset() {
        /**
         * Since _setup handles a full terminal creation, we have to carry forward
         * a few things that should not reset.
         */
        this.options.rows = this.rows;
        this.options.cols = this.cols;
        const customKeyEventHandler = this._customKeyEventHandler;
        this._setup();
        super.reset();
        this._selectionService?.reset();
        this._decorationService.reset();
        this.viewport?.reset();
        // reattach
        this._customKeyEventHandler = customKeyEventHandler;
        // do a full screen refresh
        this.refresh(0, this.rows - 1);
    }
    clearTextureAtlas() {
        this._renderService?.clearTextureAtlas();
    }
    _reportFocus() {
        if (this.element?.classList.contains('focus')) {
            this.coreService.triggerDataEvent(EscapeSequences_1.C0.ESC + '[I');
        }
        else {
            this.coreService.triggerDataEvent(EscapeSequences_1.C0.ESC + '[O');
        }
    }
    _reportWindowsOptions(type) {
        if (!this._renderService) {
            return;
        }
        switch (type) {
            case InputHandler_1.WindowsOptionsReportType.GET_WIN_SIZE_PIXELS:
                const canvasWidth = this._renderService.dimensions.css.canvas.width.toFixed(0);
                const canvasHeight = this._renderService.dimensions.css.canvas.height.toFixed(0);
                this.coreService.triggerDataEvent(`${EscapeSequences_1.C0.ESC}[4;${canvasHeight};${canvasWidth}t`);
                break;
            case InputHandler_1.WindowsOptionsReportType.GET_CELL_SIZE_PIXELS:
                const cellWidth = this._renderService.dimensions.css.cell.width.toFixed(0);
                const cellHeight = this._renderService.dimensions.css.cell.height.toFixed(0);
                this.coreService.triggerDataEvent(`${EscapeSequences_1.C0.ESC}[6;${cellHeight};${cellWidth}t`);
                break;
        }
    }
    // TODO: Remove cancel function and cancelEvents option
    cancel(ev, force) {
        if (!this.options.cancelEvents && !force) {
            return;
        }
        ev.preventDefault();
        ev.stopPropagation();
        return false;
    }
}
exports.Terminal = Terminal;
/**
 * Helpers
 */
function wasModifierKeyOnlyEvent(ev) {
    return ev.keyCode === 16 || // Shift
        ev.keyCode === 17 || // Ctrl
        ev.keyCode === 18; // Alt
}
