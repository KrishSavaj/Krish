"use strict";
/**
 * Copyright (c) 2022 The xterm.js authors. All rights reserved.
 * @license MIT
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.SortedList = void 0;
// Work variables to avoid garbage collection.
let i = 0;
/**
 * A generic list that is maintained in sorted order and allows values with duplicate keys. This
 * list is based on binary search and as such locating a key will take O(log n) amortized, this
 * includes the by key iterator.
 */
class SortedList {
    constructor(_getKey) {
        this._getKey = _getKey;
        this._array = [];
    }
    clear() {
        this._array.length = 0;
    }
    insert(value) {
        if (this._array.length === 0) {
            this._array.push(value);
            return;
        }
        i = this._search(this._getKey(value));
        this._array.splice(i, 0, value);
    }
    delete(value) {
        if (this._array.length === 0) {
            return false;
        }
        const key = this._getKey(value);
        if (key === undefined) {
            return false;
        }
        i = this._search(key);
        if (i === -1) {
            return false;
        }
        if (this._getKey(this._array[i]) !== key) {
            return false;
        }
        do {
            if (this._array[i] === value) {
                this._array.splice(i, 1);
                return true;
            }
        } while (++i < this._array.length && this._getKey(this._array[i]) === key);
        return false;
    }
    *getKeyIterator(key) {
        if (this._array.length === 0) {
            return;
        }
        i = this._search(key);
        if (i < 0 || i >= this._array.length) {
            return;
        }
        if (this._getKey(this._array[i]) !== key) {
            return;
        }
        do {
            yield this._array[i];
        } while (++i < this._array.length && this._getKey(this._array[i]) === key);
    }
    forEachByKey(key, callback) {
        if (this._array.length === 0) {
            return;
        }
        i = this._search(key);
        if (i < 0 || i >= this._array.length) {
            return;
        }
        if (this._getKey(this._array[i]) !== key) {
            return;
        }
        do {
            callback(this._array[i]);
        } while (++i < this._array.length && this._getKey(this._array[i]) === key);
    }
    values() {
        // Duplicate the array to avoid issues when _array changes while iterating
        return [...this._array].values();
    }
    _search(key) {
        let min = 0;
        let max = this._array.length - 1;
        while (max >= min) {
            let mid = (min + max) >> 1;
            const midKey = this._getKey(this._array[mid]);
            if (midKey > key) {
                max = mid - 1;
            }
            else if (midKey < key) {
                min = mid + 1;
            }
            else {
                // key in list, walk to lowest duplicate
                while (mid > 0 && this._getKey(this._array[mid - 1]) === key) {
                    mid--;
                }
                return mid;
            }
        }
        // key not in list
        // still return closest min (also used as insert position)
        return min;
    }
}
exports.SortedList = SortedList;
