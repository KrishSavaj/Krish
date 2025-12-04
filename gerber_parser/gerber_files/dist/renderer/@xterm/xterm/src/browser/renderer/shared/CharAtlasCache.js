"use strict";
/**
 * Copyright (c) 2017 The xterm.js authors. All rights reserved.
 * @license MIT
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.acquireTextureAtlas = acquireTextureAtlas;
exports.removeTerminalFromCache = removeTerminalFromCache;
const TextureAtlas_1 = require("browser/renderer/shared/TextureAtlas");
const CharAtlasUtils_1 = require("browser/renderer/shared/CharAtlasUtils");
const charAtlasCache = [];
/**
 * Acquires a char atlas, either generating a new one or returning an existing
 * one that is in use by another terminal.
 */
function acquireTextureAtlas(terminal, options, colors, deviceCellWidth, deviceCellHeight, deviceCharWidth, deviceCharHeight, devicePixelRatio) {
    const newConfig = (0, CharAtlasUtils_1.generateConfig)(deviceCellWidth, deviceCellHeight, deviceCharWidth, deviceCharHeight, options, colors, devicePixelRatio);
    // Check to see if the terminal already owns this config
    for (let i = 0; i < charAtlasCache.length; i++) {
        const entry = charAtlasCache[i];
        const ownedByIndex = entry.ownedBy.indexOf(terminal);
        if (ownedByIndex >= 0) {
            if ((0, CharAtlasUtils_1.configEquals)(entry.config, newConfig)) {
                return entry.atlas;
            }
            // The configs differ, release the terminal from the entry
            if (entry.ownedBy.length === 1) {
                entry.atlas.dispose();
                charAtlasCache.splice(i, 1);
            }
            else {
                entry.ownedBy.splice(ownedByIndex, 1);
            }
            break;
        }
    }
    // Try match a char atlas from the cache
    for (let i = 0; i < charAtlasCache.length; i++) {
        const entry = charAtlasCache[i];
        if ((0, CharAtlasUtils_1.configEquals)(entry.config, newConfig)) {
            // Add the terminal to the cache entry and return
            entry.ownedBy.push(terminal);
            return entry.atlas;
        }
    }
    const core = terminal._core;
    const newEntry = {
        atlas: new TextureAtlas_1.TextureAtlas(document, newConfig, core.unicodeService),
        config: newConfig,
        ownedBy: [terminal]
    };
    charAtlasCache.push(newEntry);
    return newEntry.atlas;
}
/**
 * Removes a terminal reference from the cache, allowing its memory to be freed.
 * @param terminal The terminal to remove.
 */
function removeTerminalFromCache(terminal) {
    for (let i = 0; i < charAtlasCache.length; i++) {
        const index = charAtlasCache[i].ownedBy.indexOf(terminal);
        if (index !== -1) {
            if (charAtlasCache[i].ownedBy.length === 1) {
                // Remove the cache entry if it's the only terminal
                charAtlasCache[i].atlas.dispose();
                charAtlasCache.splice(i, 1);
            }
            else {
                // Remove the reference from the cache entry
                charAtlasCache[i].ownedBy.splice(index, 1);
            }
            break;
        }
    }
}
