import { app, shell, BrowserWindow, ipcMain, dialog } from "electron";
import { join } from "path";
import { electronApp, optimizer, is } from "@electron-toolkit/utils";
import icon from "../../resources/icon.png?asset";
import { QuickDB } from "quick.db";
import { existsSync, mkdirSync, readdirSync, statSync } from "fs";
import os from "os";
import { generate } from "generate-password";

function createWindow(): void {
  // Create the browser window.
  const win = new BrowserWindow({
    autoHideMenuBar: true,
    maxWidth: 800,
    maxHeight: 600,
    minWidth: 800,
    minHeight: 600,
    ...(process.platform === "linux" ? { icon } : {}),
    webPreferences: {
      preload: join(__dirname, "../preload/index.js"),
      sandbox: false
    }
  });

  win.webContents.openDevTools();

  ipcMain.handle("get-username", () => {
    return os.userInfo().username;
  });

  ipcMain.handle("open-safe", () => {
    return dialog.showOpenDialog({
      properties: ["openFile"],
      filters: [{ name: "Safe", extensions: ["safe"] }]
    });
  });

  ipcMain.handle("create-safe", async (_, args) => {
    if (!existsSync(app.getPath("userData"))) {
      mkdirSync(app.getPath("userData"));
    }

    let safesPath = join(app.getPath("userData"), "safes");

    if (!existsSync(safesPath)) {
      mkdirSync(safesPath);
    }

    new QuickDB({
      filePath: join(
        safesPath,
        args.name.endsWith(".safe") ? args.name : `${args.name}.safe`
      )
    });
  });

  ipcMain.handle("get-safes", async () => {
    let safesPath = join(app.getPath("userData"), "safes");

    if (!existsSync(safesPath)) {
      return [];
    }

    let safes = readdirSync(safesPath).filter(s => s.endsWith(".safe"));

    return safes.map(name => {
      let date = statSync(join(safesPath, name)).birthtime;
      return {
        name,
        created:
          date.getDate() + "/" + date.getMonth() + "/" + date.getFullYear()
      };
    });
  });

  ipcMain.handle("gen-password", async (_, args) => {
    return generate({
      length: args.length,
      numbers: args.numbers,
      symbols: args.symbols,
      lowercase: args.lowercase,
      uppercase: args.uppercase
    });
  });

  win.on("ready-to-show", () => {
    win.show();
  });

  win.webContents.setWindowOpenHandler(details => {
    shell.openExternal(details.url);
    return { action: "deny" };
  });

  // HMR for renderer base on electron-vite cli.
  // Load the remote URL for development or the local html file for production.
  if (is.dev && process.env["ELECTRON_RENDERER_URL"]) {
    win.loadURL(process.env["ELECTRON_RENDERER_URL"]);
  } else {
    win.loadFile(join(__dirname, "../renderer/index.html"));
  }
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  // Set app user model id for windows
  electronApp.setAppUserModelId("com.electron");

  // Default open or close DevTools by F12 in development
  // and ignore CommandOrControl + R in production.
  // see https://github.com/alex8088/electron-toolkit/tree/master/packages/utils
  app.on("browser-window-created", (_, window) => {
    optimizer.watchWindowShortcuts(window);
  });

  createWindow();

  app.on("activate", function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

// In this file you can include the rest of your app"s specific main process
// code. You can also put them in separate files and require them here.
