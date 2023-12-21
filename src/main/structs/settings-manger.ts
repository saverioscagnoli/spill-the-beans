import { app, dialog, ipcMain, nativeImage } from "electron";
import path from "path";
import fsp from "fs/promises";
import fs from "fs";
import os from "os";
import { readFileWithWorker } from "../lib";

interface Settings {
  /**
   * Username of the user.
   */
  username: string;

  /**
   * The profile picture.
   */
  propic: string | null;

  /**
   * The default theme.
   */
  theme: "light" | "dark";
}

class SettingsManager {
  public static readonly file = path.join(app.getPath("userData"), "Settings.json");
  private static instance: SettingsManager;

  private constructor() {
    this.init();
  }

  public static build() {
    if (!SettingsManager.instance) SettingsManager.instance = new SettingsManager();
    return SettingsManager.instance;
  }

  /**
   * Initializes the settings manager.
   * Creates the json file if it doesn't exist.
   */
  private async init() {
    if (!fs.existsSync(SettingsManager.file)) {
      await fsp.writeFile(
        SettingsManager.file,
        JSON.stringify({ username: "", propic: null, theme: "light" })
      );
    }
  }

  /**
   * Listens for events from the renderer process.
   */
  public listen() {
    ipcMain.handle("read-settings", async () => await this.readSettings());
    ipcMain.handle("get-username", async () => await this.getUsername());
    ipcMain.handle(
      "set-username",
      async (_, username) => await this.setUsername(username)
    );
    ipcMain.handle("get-propic", async () => await this.getPropic());
    ipcMain.handle("set-propic", async () => await this.setPropic());
    ipcMain.handle("reset-propic", async () => await this.resetPropic());
    ipcMain.handle("get-default-theme", async () => await this.getDefaultTheme());
    ipcMain.handle(
      "set-default-theme",
      async (_, theme) => await this.setDefaultTheme(theme)
    );
  }

  /**
   * Reads the settings from the json file.
   * @returns {Settings} The settings
   */
  private async readSettings(): Promise<Settings> {
    if (!fs.existsSync(SettingsManager.file)) {
      await fsp.writeFile(
        SettingsManager.file,
        JSON.stringify({ username: "", propic: null, theme: "light" })
      );
    }
    let json = await fsp.readFile(SettingsManager.file, "utf-8");
    return JSON.parse(json);
  }

  /**
   * Writes the settings to the json file.
   * @param settings The settings to write.
   */
  private async writeSettings(settings: Settings) {
    await fsp.writeFile(SettingsManager.file, JSON.stringify(settings));
  }

  /**
   * Gets the username of the user.
   * If the username is not set, it will return the username of the os.
   * @returns The username of the user.
   */
  private async getUsername() {
    let { username } = await this.readSettings();

    if (username.length > 0) return username;
    else {
      let username = os.userInfo().username;
      await this.setUsername(username);
      return username;
    }
  }

  /**
   * Sets the username of the user.
   * @param username The username to set.
   */
  private async setUsername(username: string) {
    let settings = await this.readSettings();
    settings.username = username;
    await this.writeSettings(settings);
  }

  /**
   * Gets the profile picture of the user.
   * @returns The src profile picture of the user.
   */
  private async getPropic() {
    let { propic } = await this.readSettings();
    return propic;
  }

  /**
   * Set the profile picture of the user.
   */
  private async setPropic() {
    let settings = await this.readSettings();

    let dialogRes = await dialog.showOpenDialog({
      properties: ["openFile"],
      filters: [{ name: "Images", extensions: ["jpg", "png", "gif"] }]
    });

    if (dialogRes.canceled) return false;

    let path = dialogRes.filePaths[0];
    let rawData = await readFileWithWorker(path);
    let rawDa = Buffer.from(rawData).toString("base64");
    let image = `data:image/${path.split(".").pop()};base64,${rawDa}`;

    console.log(image);

    settings.propic = image;

    await this.writeSettings(settings);
    return settings.propic;
  }

  /**
   * Resets the profile picture of the user.
   */
  private async resetPropic() {
    let settings = await this.readSettings();
    settings.propic = null;
    await this.writeSettings(settings);
  }

  private async getDefaultTheme() {
    let { theme } = await this.readSettings();
    return theme;
  }

  public async setDefaultTheme(theme: "light" | "dark") {
    let settings = await this.readSettings();
    settings.theme = theme;
    await this.writeSettings(settings);
  }
}

export { SettingsManager };
