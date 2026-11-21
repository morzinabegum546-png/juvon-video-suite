const { app, BrowserWindow, session } = require('electron');
const path = require('path');

function createWindow() {
  const win = new BrowserWindow({
    width: 1400,
    height: 900,
    backgroundColor: '#09090d',
    icon: path.join(__dirname, 'public', 'icon-512.png'),
    autoHideMenuBar: true,
    webPreferences: { contextIsolation: true, nodeIntegration: false }
  });
  win.loadFile(path.join(__dirname, 'public', 'index.html'));
}

app.commandLine.appendSwitch('ignore-gpu-blocklist');

app.whenReady().then(() => {
  session.defaultSession.setPermissionRequestHandler((wc, p, cb) => cb(p === 'media' || p === 'microphone'));
  createWindow();
});

app.on('window-all-closed', () => { if (process.platform !== 'darwin') app.quit(); });
