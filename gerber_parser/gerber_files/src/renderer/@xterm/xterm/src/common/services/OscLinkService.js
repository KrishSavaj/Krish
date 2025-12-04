"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OscLinkService = void 0;
class OscLinkService {
    constructor(_bufferService) {
        this._bufferService = _bufferService;
        this._nextId = 1;
        /**
         * A map of the link key to link entry. This is used to add additional lines to links with ids.
         */
        this._entriesWithId = new Map();
        /**
         * A map of the link id to the link entry. The "link id" (number) which is the numberic
         * representation of a unique link should not be confused with "id" (string) which comes in with
         * `id=` in the OSC link's properties.
         */
        this._dataByLinkId = new Map();
    }
    registerLink(data) {
        const buffer = this._bufferService.buffer;
        // Links with no id will only ever be registered a single time
        if (data.id === undefined) {
            const marker = buffer.addMarker(buffer.ybase + buffer.y);
            const entry = {
                data,
                id: this._nextId++,
                lines: [marker]
            };
            marker.onDispose(() => this._removeMarkerFromLink(entry, marker));
            this._dataByLinkId.set(entry.id, entry);
            return entry.id;
        }
        // Add the line to the link if it already exists
        const castData = data;
        const key = this._getEntryIdKey(castData);
        const match = this._entriesWithId.get(key);
        if (match) {
            this.addLineToLink(match.id, buffer.ybase + buffer.y);
            return match.id;
        }
        // Create the link
        const marker = buffer.addMarker(buffer.ybase + buffer.y);
        const entry = {
            id: this._nextId++,
            key: this._getEntryIdKey(castData),
            data: castData,
            lines: [marker]
        };
        marker.onDispose(() => this._removeMarkerFromLink(entry, marker));
        this._entriesWithId.set(entry.key, entry);
        this._dataByLinkId.set(entry.id, entry);
        return entry.id;
    }
    addLineToLink(linkId, y) {
        const entry = this._dataByLinkId.get(linkId);
        if (!entry) {
            return;
        }
        if (entry.lines.every(e => e.line !== y)) {
            const marker = this._bufferService.buffer.addMarker(y);
            entry.lines.push(marker);
            marker.onDispose(() => this._removeMarkerFromLink(entry, marker));
        }
    }
    getLinkData(linkId) {
        return this._dataByLinkId.get(linkId)?.data;
    }
    _getEntryIdKey(linkData) {
        return `${linkData.id};;${linkData.uri}`;
    }
    _removeMarkerFromLink(entry, marker) {
        const index = entry.lines.indexOf(marker);
        if (index === -1) {
            return;
        }
        entry.lines.splice(index, 1);
        if (entry.lines.length === 0) {
            if (entry.data.id !== undefined) {
                this._entriesWithId.delete(entry.key);
            }
            this._dataByLinkId.delete(entry.id);
        }
    }
}
exports.OscLinkService = OscLinkService;
