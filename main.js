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

    win = new BrowserWindow({
        width: 800,
        height: 400,
        frame: false,
        webPreferences: {
            nodeIntegration: true,
            enableRemoteModule: true
        },
        icon:'assets/logo.png'
    })
    win.loadFile('load/index.html')
    win.webContents.openDevTools()
    await sleep(3000)
    win.loadFile('blank.html')
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

let statusUpdate = ""

ipcMain.on('online-status-changed', (event, status) => {
    console.log(status)
    if (status === "online" && statusUpdate !== "online") {
        win.loadFile('home/home_online.html')
        statusUpdate = "online"
    } else if (status === "offline" && statusUpdate !== "offline") {
        win.loadFile('home/home_offline.html')
        statusUpdate = "offline"
    }
})