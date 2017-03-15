const electron = require('electron');

const app = electron.app;
const BrowserWindow = electron.BrowserWindow;

const path = require('path');
const url = require('url');
const execFile = require("child_process").execFile;

let mainWindow;

function createWindow () {
	mainWindow = new BrowserWindow({width: 800, height: 600});

	mainWindow.loadURL(url.format({
		pathname: path.join(__dirname, 'index.html'),
		protocol: 'file:',
		slashes: true
	}));

	mainWindow.webContents.openDevTools();

	mainWindow.on('closed', function () {
		mainWindow = null
	});
}

app.on('ready', createWindow)

app.on('window-all-closed', function () {
	if (process.platform !== 'darwin') {
		app.quit()
	}
})

app.on('activate', function () {
	if (mainWindow === null) {
		createWindow()
	}
})

// This is my custom video server
exports.openVideoServer = function(videoPath) {
	execFile("ffmpeg", [
        "-y",
        "-i", videoPath, 
        "-c:v", "libx264", 
		"-movflags", "faststart",
        "-f", "mp4", 
        "output.mp4"
    ]);
	execFile("node", ["video_server.js", "output.mp4"], function(error, stdout, stderr) {
		console.log("openVideoServer error", error);
		console.log("openVideoServer stderr", stderr);
		console.log("openVideoServer stdout", stdout);
	});
};