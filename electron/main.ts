import { app, BrowserWindow} from 'electron'
import path from 'path'

const isDevelopment = process.env.NODE_ENV !== 'production';

async function createWindow () {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })

  if ( isDevelopment ) {
    // Load the url of the dev server if in development mode
    await win.loadURL('http://localhost:5173/')
    if (!process.env.IS_TEST) win.webContents.openDevTools()

  } else {
    // Load the index.html when not in development
    win.loadURL('file://' + __dirname + '/index.html')
  }
}

app.whenReady().then(() => {
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})
app.on('ready', async () => {
    if (isDevelopment && !process.env.IS_TEST) {
      const installExtension = (await import('electron-devtools-installer')).default;
      const VUEJS3_DEVTOOLS = (await import('electron-devtools-installer')).VUEJS_DEVTOOLS;

      // Install Vue Devtools
      try {
        await installExtension(VUEJS3_DEVTOOLS)
      } catch (e) {
        console.error('Vue Devtools failed to install:')
      }
    }
    createWindow()
})
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
   }
})

// Exit cleanly on request from parent process in development mode.
if (isDevelopment) {
    if (process.platform === 'win32') {
        process.on('message', (data) => {
            if (data === 'graceful-exit') {
                app.quit()
            }
        })
    } else {
        process.on('SIGTERM', () => {
        app.quit()
        })
    }
}
