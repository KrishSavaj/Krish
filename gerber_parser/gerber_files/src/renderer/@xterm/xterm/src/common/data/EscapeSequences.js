"use strict";
/**
 * Copyright (c) 2017 The xterm.js authors. All rights reserved.
 * @license MIT
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.C1_ESCAPED = exports.C1 = exports.C0 = void 0;
/**
 * C0 control codes
 * See = https://en.wikipedia.org/wiki/C0_and_C1_control_codes
 */
var C0;
(function (C0) {
    /** Null (Caret = ^@, C = \0) */
    C0.NUL = '\x00';
    /** Start of Heading (Caret = ^A) */
    C0.SOH = '\x01';
    /** Start of Text (Caret = ^B) */
    C0.STX = '\x02';
    /** End of Text (Caret = ^C) */
    C0.ETX = '\x03';
    /** End of Transmission (Caret = ^D) */
    C0.EOT = '\x04';
    /** Enquiry (Caret = ^E) */
    C0.ENQ = '\x05';
    /** Acknowledge (Caret = ^F) */
    C0.ACK = '\x06';
    /** Bell (Caret = ^G, C = \a) */
    C0.BEL = '\x07';
    /** Backspace (Caret = ^H, C = \b) */
    C0.BS = '\x08';
    /** Character Tabulation, Horizontal Tabulation (Caret = ^I, C = \t) */
    C0.HT = '\x09';
    /** Line Feed (Caret = ^J, C = \n) */
    C0.LF = '\x0a';
    /** Line Tabulation, Vertical Tabulation (Caret = ^K, C = \v) */
    C0.VT = '\x0b';
    /** Form Feed (Caret = ^L, C = \f) */
    C0.FF = '\x0c';
    /** Carriage Return (Caret = ^M, C = \r) */
    C0.CR = '\x0d';
    /** Shift Out (Caret = ^N) */
    C0.SO = '\x0e';
    /** Shift In (Caret = ^O) */
    C0.SI = '\x0f';
    /** Data Link Escape (Caret = ^P) */
    C0.DLE = '\x10';
    /** Device Control One (XON) (Caret = ^Q) */
    C0.DC1 = '\x11';
    /** Device Control Two (Caret = ^R) */
    C0.DC2 = '\x12';
    /** Device Control Three (XOFF) (Caret = ^S) */
    C0.DC3 = '\x13';
    /** Device Control Four (Caret = ^T) */
    C0.DC4 = '\x14';
    /** Negative Acknowledge (Caret = ^U) */
    C0.NAK = '\x15';
    /** Synchronous Idle (Caret = ^V) */
    C0.SYN = '\x16';
    /** End of Transmission Block (Caret = ^W) */
    C0.ETB = '\x17';
    /** Cancel (Caret = ^X) */
    C0.CAN = '\x18';
    /** End of Medium (Caret = ^Y) */
    C0.EM = '\x19';
    /** Substitute (Caret = ^Z) */
    C0.SUB = '\x1a';
    /** Escape (Caret = ^[, C = \e) */
    C0.ESC = '\x1b';
    /** File Separator (Caret = ^\) */
    C0.FS = '\x1c';
    /** Group Separator (Caret = ^]) */
    C0.GS = '\x1d';
    /** Record Separator (Caret = ^^) */
    C0.RS = '\x1e';
    /** Unit Separator (Caret = ^_) */
    C0.US = '\x1f';
    /** Space */
    C0.SP = '\x20';
    /** Delete (Caret = ^?) */
    C0.DEL = '\x7f';
})(C0 || (exports.C0 = C0 = {}));
/**
 * C1 control codes
 * See = https://en.wikipedia.org/wiki/C0_and_C1_control_codes
 */
var C1;
(function (C1) {
    /** padding character */
    C1.PAD = '\x80';
    /** High Octet Preset */
    C1.HOP = '\x81';
    /** Break Permitted Here */
    C1.BPH = '\x82';
    /** No Break Here */
    C1.NBH = '\x83';
    /** Index */
    C1.IND = '\x84';
    /** Next Line */
    C1.NEL = '\x85';
    /** Start of Selected Area */
    C1.SSA = '\x86';
    /** End of Selected Area */
    C1.ESA = '\x87';
    /** Horizontal Tabulation Set */
    C1.HTS = '\x88';
    /** Horizontal Tabulation With Justification */
    C1.HTJ = '\x89';
    /** Vertical Tabulation Set */
    C1.VTS = '\x8a';
    /** Partial Line Down */
    C1.PLD = '\x8b';
    /** Partial Line Up */
    C1.PLU = '\x8c';
    /** Reverse Index */
    C1.RI = '\x8d';
    /** Single-Shift 2 */
    C1.SS2 = '\x8e';
    /** Single-Shift 3 */
    C1.SS3 = '\x8f';
    /** Device Control String */
    C1.DCS = '\x90';
    /** Private Use 1 */
    C1.PU1 = '\x91';
    /** Private Use 2 */
    C1.PU2 = '\x92';
    /** Set Transmit State */
    C1.STS = '\x93';
    /** Destructive backspace, intended to eliminate ambiguity about meaning of BS. */
    C1.CCH = '\x94';
    /** Message Waiting */
    C1.MW = '\x95';
    /** Start of Protected Area */
    C1.SPA = '\x96';
    /** End of Protected Area */
    C1.EPA = '\x97';
    /** Start of String */
    C1.SOS = '\x98';
    /** Single Graphic Character Introducer */
    C1.SGCI = '\x99';
    /** Single Character Introducer */
    C1.SCI = '\x9a';
    /** Control Sequence Introducer */
    C1.CSI = '\x9b';
    /** String Terminator */
    C1.ST = '\x9c';
    /** Operating System Command */
    C1.OSC = '\x9d';
    /** Privacy Message */
    C1.PM = '\x9e';
    /** Application Program Command */
    C1.APC = '\x9f';
})(C1 || (exports.C1 = C1 = {}));
var C1_ESCAPED;
(function (C1_ESCAPED) {
    C1_ESCAPED.ST = `${C0.ESC}\\`;
})(C1_ESCAPED || (exports.C1_ESCAPED = C1_ESCAPED = {}));
