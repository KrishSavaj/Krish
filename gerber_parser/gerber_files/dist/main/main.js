"use strict";
// import { ipcMain } from 'electron';
// import { PCBBaseline } from '../external/PCBBaseline';
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
// import paper from 'paper';
// type PaperScope = typeof paper;
// ipcMain.handle('get-canonical-shapes', async () => {
//   const baseline = new PCBBaseline();
//   return await baseline.getCanonicalShapes(); // returns CanonicalShape[]
// });
// src/main/main.ts
const electron_1 = require("electron");
const path = __importStar(require("path"));
const PCBBaseline_1 = require("../external/PCBBaseline");
let mainWin;
async function createWindow() {
    mainWin = new electron_1.BrowserWindow({
        width: 1024,
        height: 768,
        webPreferences: {
            contextIsolation: false,
            nodeIntegration: true, // ✅ change this to true
        }
    });
    mainWin.loadFile(path.join(__dirname, '../external/editor.html'));
    mainWin.webContents.once('did-finish-load', async () => {
        console.log("Editor loaded — sending shape");
        const shapes = await new PCBBaseline_1.PCBBaseline().getCanonicalShapes();
        for (const s of shapes) {
            if (s.type === 'circle') {
                mainWin.webContents.send('shape', {
                    type: 'circle',
                    circle: {
                        center: s.center,
                        radius: s.radius
                    }
                });
            }
        }
    });
}
electron_1.app.whenReady().then(createWindow);
