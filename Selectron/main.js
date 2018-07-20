'use strict';
const {app, BrowserWindow, globalShortcut} = require('electron');
let win;

function createWindow () {
  win = new BrowserWindow({ width: 1000, height: 800, frame: true })
  win.setContentProtection(false);
  win.setMenu(null);
  win.loadURL(`file://${__dirname}/index.html`);
  //win.webContents.openDevTools();

  win.once('closed', () => {
    win = null;
  });
}

app.once('ready', createWindow);

app.on('window-all-closed', () => {
   if (process.platform === 'darwin')
      return;
   app.quit()
})

app.on('activate', () => {
  if (win === null) {
    createWindow()
  }
})