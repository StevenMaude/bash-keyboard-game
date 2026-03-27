/**
 * electron/main.js — Electron main process.
 *
 * Creates the BrowserWindow and loads the renderer.
 * In development, loads from the Vite dev server.
 * In production, loads the built renderer from disk.
 *
 * Key advantages over the browser version:
 *   - ALL GNU Readline shortcuts work: Ctrl+W, Ctrl+T, Ctrl+D, etc.
 *   - No browser tab/find-bar/bookmark interference.
 *   - Menu bar is minimal (File → Quit, View → DevTools).
 */

import { app, BrowserWindow, Menu } from 'electron';
import { fileURLToPath } from 'url';
import path from 'path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// ── Window creation ───────────────────────────────────────────────────────────
function createWindow() {
  const win = new BrowserWindow({
    width: 1050,
    height: 800,
    minWidth: 640,
    minHeight: 520,
    title: 'Bash Keyboard Game',
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false,
      // Disable spell-check so it doesn't interfere with command strings
      spellcheck: false,
    },
  });

  // ── Load content ────────────────────────────────────────────────────────────
  const devServerUrl = process.env.VITE_DEV_SERVER_URL;
  if (devServerUrl) {
    win.loadURL(devServerUrl);
  } else {
    win.loadFile(path.join(__dirname, '../dist/renderer/index.html'));
  }

  // ── Minimal menu (removes browser-like shortcuts from the menu bar) ─────────
  const menu = Menu.buildFromTemplate([
    {
      label: 'File',
      submenu: [
        { role: 'quit', accelerator: 'CmdOrCtrl+Q' },
      ],
    },
    {
      label: 'View',
      submenu: [
        { role: 'reload', accelerator: 'CmdOrCtrl+R' },
        { role: 'forceReload', accelerator: 'CmdOrCtrl+Shift+R' },
        { role: 'toggleDevTools', accelerator: 'F12' },
        { type: 'separator' },
        { role: 'togglefullscreen', accelerator: 'F11' },
      ],
    },
  ]);
  Menu.setApplicationMenu(menu);
}

// ── App lifecycle ─────────────────────────────────────────────────────────────
app.whenReady().then(() => {
  createWindow();
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
