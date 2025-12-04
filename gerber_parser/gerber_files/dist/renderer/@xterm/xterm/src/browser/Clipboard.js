"use strict";
/**
 * Copyright (c) 2016 The xterm.js authors. All rights reserved.
 * @license MIT
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.prepareTextForTerminal = prepareTextForTerminal;
exports.bracketTextForPaste = bracketTextForPaste;
exports.copyHandler = copyHandler;
exports.handlePasteEvent = handlePasteEvent;
exports.paste = paste;
exports.moveTextAreaUnderMouseCursor = moveTextAreaUnderMouseCursor;
exports.rightClickHandler = rightClickHandler;
/**
 * Prepares text to be pasted into the terminal by normalizing the line endings
 * @param text The pasted text that needs processing before inserting into the terminal
 */
function prepareTextForTerminal(text) {
    return text.replace(/\r?\n/g, '\r');
}
/**
 * Bracket text for paste, if necessary, as per https://cirw.in/blog/bracketed-paste
 * @param text The pasted text to bracket
 */
function bracketTextForPaste(text, bracketedPasteMode) {
    if (bracketedPasteMode) {
        return '\x1b[200~' + text + '\x1b[201~';
    }
    return text;
}
/**
 * Binds copy functionality to the given terminal.
 * @param ev The original copy event to be handled
 */
function copyHandler(ev, selectionService) {
    if (ev.clipboardData) {
        ev.clipboardData.setData('text/plain', selectionService.selectionText);
    }
    // Prevent or the original text will be copied.
    ev.preventDefault();
}
/**
 * Redirect the clipboard's data to the terminal's input handler.
 */
function handlePasteEvent(ev, textarea, coreService, optionsService) {
    ev.stopPropagation();
    if (ev.clipboardData) {
        const text = ev.clipboardData.getData('text/plain');
        paste(text, textarea, coreService, optionsService);
    }
}
function paste(text, textarea, coreService, optionsService) {
    text = prepareTextForTerminal(text);
    text = bracketTextForPaste(text, coreService.decPrivateModes.bracketedPasteMode && optionsService.rawOptions.ignoreBracketedPasteMode !== true);
    coreService.triggerDataEvent(text, true);
    textarea.value = '';
}
/**
 * Moves the textarea under the mouse cursor and focuses it.
 * @param ev The original right click event to be handled.
 * @param textarea The terminal's textarea.
 */
function moveTextAreaUnderMouseCursor(ev, textarea, screenElement) {
    // Calculate textarea position relative to the screen element
    const pos = screenElement.getBoundingClientRect();
    const left = ev.clientX - pos.left - 10;
    const top = ev.clientY - pos.top - 10;
    // Bring textarea at the cursor position
    textarea.style.width = '20px';
    textarea.style.height = '20px';
    textarea.style.left = `${left}px`;
    textarea.style.top = `${top}px`;
    textarea.style.zIndex = '1000';
    textarea.focus();
}
/**
 * Bind to right-click event and allow right-click copy and paste.
 */
function rightClickHandler(ev, textarea, screenElement, selectionService, shouldSelectWord) {
    moveTextAreaUnderMouseCursor(ev, textarea, screenElement);
    if (shouldSelectWord) {
        selectionService.rightClickSelect(ev);
    }
    // Get textarea ready to copy from the context menu
    textarea.value = selectionService.selectionText;
    textarea.select();
}
