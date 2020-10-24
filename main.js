const { app, BrowserWindow, ipcMain } = require('electron')

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function createWindow () {
    // const win = new BrowserWindow({
    //     show: false,
    //     webPreferences: {
    //         nodeIntegration: true
    //     }
    // })
    // win.maximize();
    // win.show();

    const win = new BrowserWindow({
        width: 800,
        height: 400,
        webPreferences: {
            nodeIntegration: true
        },
        icon:'assets/logo.png'
    })
    win.loadFile('Load/index.html')
    // win.webContents.openDevTools()
    await sleep(1000)
    win.loadFile('Home/home.html')
}

app.whenReady().then(createWindow)

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow()
    }
})

ipcMain.on('online-status-changed', (event, status) => {
    if (status === "online") {
        console.log("Go U");
    } else if (status === "offline") {
        console.log("That is an oof");
    }
})