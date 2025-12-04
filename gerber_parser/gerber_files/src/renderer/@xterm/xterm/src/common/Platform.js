"use strict";
/**
 * Copyright (c) 2016 The xterm.js authors. All rights reserved.
 * @license MIT
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.isChromeOS = exports.isLinux = exports.isWindows = exports.isIphone = exports.isIpad = exports.isMac = exports.isSafari = exports.isLegacyEdge = exports.isFirefox = exports.isNode = void 0;
exports.getSafariVersion = getSafariVersion;
exports.isNode = (typeof process !== 'undefined' && 'title' in process) ? true : false;
const userAgent = (exports.isNode) ? 'node' : navigator.userAgent;
const platform = (exports.isNode) ? 'node' : navigator.platform;
exports.isFirefox = userAgent.includes('Firefox');
exports.isLegacyEdge = userAgent.includes('Edge');
exports.isSafari = /^((?!chrome|android).)*safari/i.test(userAgent);
function getSafariVersion() {
    if (!exports.isSafari) {
        return 0;
    }
    const majorVersion = userAgent.match(/Version\/(\d+)/);
    if (majorVersion === null || majorVersion.length < 2) {
        return 0;
    }
    return parseInt(majorVersion[1]);
}
// Find the users platform. We use this to interpret the meta key
// and ISO third level shifts.
// http://stackoverflow.com/q/19877924/577598
exports.isMac = ['Macintosh', 'MacIntel', 'MacPPC', 'Mac68K'].includes(platform);
exports.isIpad = platform === 'iPad';
exports.isIphone = platform === 'iPhone';
exports.isWindows = ['Windows', 'Win16', 'Win32', 'WinCE'].includes(platform);
exports.isLinux = platform.indexOf('Linux') >= 0;
// Note that when this is true, isLinux will also be true.
exports.isChromeOS = /\bCrOS\b/.test(userAgent);
