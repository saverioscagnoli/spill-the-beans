import { app, dialog, ipcMain } from "electron";
import path from "path";
import fsp from "fs/promises";
import fs from "fs";
import os from "os";
import { RESIZED_DIMS, getImageUrl, readFileWithWorker } from "../lib";
import sharp from "sharp";
import { fileTypeFromBuffer } from "file-type";
import { ColorScheme } from "tredici";

interface Settings {
  /**
   * Username of the user.
   */
  username: string;

  /**
   * The default theme.
   */
  theme: "light" | "dark";

  /**
   * The colorscheme of the ui components.
   */
  colorScheme: ColorScheme;
}

class SettingsManager {
  public static readonly file = path.join(app.getPath("userData"), "Settings.json");
  public static readonly propicPath = path.join(app.getPath("userData"), "propic");

  private static instance: SettingsManager;

  private cached: Settings;

  private constructor() {
    this.init();
    this.cached = { theme: "light", username: "", colorScheme: "amethyst" };
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
        JSON.stringify(this.getDefaultSettings(), null, 2)
      );
    }

    this.cached = await this.readSettings();
  }

  private getDefaultSettings(): Settings {
    return { username: os.userInfo().username, theme: "light", colorScheme: "amethyst" };
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
    ipcMain.handle("get-default-theme", async () => this.getDefaultTheme());
    ipcMain.handle("set-default-theme", async (_, theme) => this.setDefaultTheme(theme));
    ipcMain.handle("get-color-scheme", async () => this.getColorScheme());
    ipcMain.handle("set-color-scheme", async (_, colorScheme) =>
      this.setColorScheme(colorScheme)
    );
  }

  /**
   * @param key The key to get.
   * @returns The cached value of the key.
   */
  private getCached(key: keyof Settings) {
    return this.cached[key];
  }

  /**
   * @param key The key to set.
   * @param value The value to set.
   * @returns The cached value of the key.
   * @private
   */
  private setCached<K extends keyof Settings>(key: K, value: Settings[K]) {
    this.cached[key] = value;
  }

  /**
   * Reads the settings from the json file.
   * @returns {Settings} The settings
   */
  private async readSettings(): Promise<Settings> {
    if (!fs.existsSync(SettingsManager.file)) {
      await fsp.writeFile(
        SettingsManager.file,
        JSON.stringify(this.getDefaultSettings(), null, 2)
      );
    }
    let json = await fsp.readFile(SettingsManager.file, "utf-8");
    return JSON.parse(json);
  }

  /**
   * Writes the settings to the json file.
   * @param settings The settings to write.
   */
  public async saveSettings() {
    await fsp.writeFile(SettingsManager.file, JSON.stringify(this.cached, null, 2));
  }

  /**
   * Gets the username of the user.
   * If the username is not set, it will return the username of the os.
   * @returns The username of the user.
   */
  private async getUsername() {
    let { username } = this.cached;

    if (username.length > 0) return username;
    else {
      let defaultUsername = os.userInfo().username;
      this.setCached("username", defaultUsername);
      return defaultUsername;
    }
  }

  /**
   * Sets the username of the user.
   * @param username The username to set.
   */
  private async setUsername(username: string) {
    this.setCached("username", username);
  }

  /**
   * Gets the profile picture of the user.
   * @returns The src profile picture of the user.
   */
  private async getPropic() {
    if (!fs.existsSync(SettingsManager.propicPath)) return null;
    let rawData = await readFileWithWorker(SettingsManager.propicPath);
    let { ext } = (await fileTypeFromBuffer(rawData))!;
    return getImageUrl(ext, Buffer.from(rawData).toString("base64"));
  }

  /**
   * Set the profile picture of the user.
   */
  private async setPropic() {
    let dialogRes = await dialog.showOpenDialog({
      properties: ["openFile"],
      filters: [{ name: "Images", extensions: ["jpg", "png", "gif"] }]
    });

    if (dialogRes.canceled) return false;

    let path = dialogRes.filePaths[0];
    let rawData = await readFileWithWorker(path);
    let { ext } = (await fileTypeFromBuffer(rawData))!;

    let resized = await sharp(rawData, ext === "gif" ? { pages: -1 } : {})
      .resize(...RESIZED_DIMS)
      .toBuffer();

    let src = getImageUrl(ext, resized.toString("base64"));

    await fsp.writeFile(SettingsManager.propicPath, resized);

    return src;
  }

  /**
   * Resets the profile picture of the user.
   */
  private async resetPropic() {
    if (fs.existsSync(SettingsManager.propicPath)) {
      await fsp.unlink(SettingsManager.propicPath);
    }
  }

  private getDefaultTheme() {
    return this.getCached("theme");
  }

  public setDefaultTheme(theme: "light" | "dark") {
    this.setCached("theme", theme);
  }

  public getColorScheme() {
    return this.getCached("colorScheme");
  }

  public setColorScheme(colorScheme: ColorScheme) {
    this.setCached("colorScheme", colorScheme);
  }
}

export { SettingsManager };
