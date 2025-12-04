// import { ipcMain } from 'electron';
// import { PCBBaseline } from '../external/PCBBaseline';

// import paper from 'paper';
// type PaperScope = typeof paper;

// ipcMain.handle('get-canonical-shapes', async () => {
//   const baseline = new PCBBaseline();
//   return await baseline.getCanonicalShapes(); // returns CanonicalShape[]
// });
// src/main/main.ts
import { app, BrowserWindow } from 'electron';
import * as path from 'path';
import { PCBBaseline } from '../external/PCBBaseline';

let mainWin: BrowserWindow;

async function createWindow() {
  mainWin = new BrowserWindow({
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

    const shapes = await new PCBBaseline().getCanonicalShapes();
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

app.whenReady().then(createWindow);
