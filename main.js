const { app, BrowserWindow, ipcMain, shell } = require('electron');
const path = require('node:path');
const electron = require('electron/main');

function createWindow() {
  const display = electron.screen.getPrimaryDisplay();
  const screenWidth = display.bounds.width;
  const screenHeight = display.bounds.height;
  const win = new BrowserWindow({
    width: 545,
    height: 208,
    resizable: false,
    y: screenHeight - 280,
    x: screenWidth - 545 - 8,
    alwaysOnTop: true,
    autoHideMenuBar: true,
    useContentSize: true,
    enableRemoteModule: true,
    icon: './images/icon.png',
    // preload.js bridge
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
  });

  win.loadFile('index.html');
}

app.whenReady().then(() => {
  // Funciona apenas no index.html (processo principal)
  ipcMain.handle('fazerBarulhinho', (arg) => {
    shell.beep();
  });

  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
