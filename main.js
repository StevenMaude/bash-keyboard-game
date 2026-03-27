const { app, BrowserWindow, Menu } = require('electron');
const path = require('path');

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 900,
    height: 750,
    title: 'Bash Keyboard Game',
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true
    }
  });

  // Disable the default application menu so that browser-level shortcuts
  // (Ctrl+W, Ctrl+T, Ctrl+N, etc.) do not intercept game keybindings.
  Menu.setApplicationMenu(null);

  mainWindow.loadFile('index.html');

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  app.quit();
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
