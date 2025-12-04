"use strict";
/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
Object.defineProperty(exports, "__esModule", { value: true });
exports.ColorZoneStore = void 0;
class ColorZoneStore {
    constructor() {
        this._zones = [];
        // The zone pool is used to keep zone objects from being freed between clearing the color zone
        // store and fetching the zones. This helps reduce GC pressure since the color zones are
        // accumulated on potentially every scroll event.
        this._zonePool = [];
        this._zonePoolIndex = 0;
        this._linePadding = {
            full: 0,
            left: 0,
            center: 0,
            right: 0
        };
    }
    get zones() {
        // Trim the zone pool to free unused memory
        this._zonePool.length = Math.min(this._zonePool.length, this._zones.length);
        return this._zones;
    }
    clear() {
        this._zones.length = 0;
        this._zonePoolIndex = 0;
    }
    addDecoration(decoration) {
        if (!decoration.options.overviewRulerOptions) {
            return;
        }
        for (const z of this._zones) {
            if (z.color === decoration.options.overviewRulerOptions.color &&
                z.position === decoration.options.overviewRulerOptions.position) {
                if (this._lineIntersectsZone(z, decoration.marker.line)) {
                    return;
                }
                if (this._lineAdjacentToZone(z, decoration.marker.line, decoration.options.overviewRulerOptions.position)) {
                    this._addLineToZone(z, decoration.marker.line);
                    return;
                }
            }
        }
        // Create using zone pool if possible
        if (this._zonePoolIndex < this._zonePool.length) {
            this._zonePool[this._zonePoolIndex].color = decoration.options.overviewRulerOptions.color;
            this._zonePool[this._zonePoolIndex].position = decoration.options.overviewRulerOptions.position;
            this._zonePool[this._zonePoolIndex].startBufferLine = decoration.marker.line;
            this._zonePool[this._zonePoolIndex].endBufferLine = decoration.marker.line;
            this._zones.push(this._zonePool[this._zonePoolIndex++]);
            return;
        }
        // Create
        this._zones.push({
            color: decoration.options.overviewRulerOptions.color,
            position: decoration.options.overviewRulerOptions.position,
            startBufferLine: decoration.marker.line,
            endBufferLine: decoration.marker.line
        });
        this._zonePool.push(this._zones[this._zones.length - 1]);
        this._zonePoolIndex++;
    }
    setPadding(padding) {
        this._linePadding = padding;
    }
    _lineIntersectsZone(zone, line) {
        return (line >= zone.startBufferLine &&
            line <= zone.endBufferLine);
    }
    _lineAdjacentToZone(zone, line, position) {
        return ((line >= zone.startBufferLine - this._linePadding[position || 'full']) &&
            (line <= zone.endBufferLine + this._linePadding[position || 'full']));
    }
    _addLineToZone(zone, line) {
        zone.startBufferLine = Math.min(zone.startBufferLine, line);
        zone.endBufferLine = Math.max(zone.endBufferLine, line);
    }
}
exports.ColorZoneStore = ColorZoneStore;
