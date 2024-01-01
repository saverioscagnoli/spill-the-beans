import { app, ipcMain } from "electron";
import { Entry, Safe } from "./safe";
import fs from "fs";
import fsp from "fs/promises";
import path from "path";

class SafeManager {
  private static instance: SafeManager;
  private path: string;

  public safes: Safe[];

  private constructor() {
    this.safes = [];
    this.path = path.join(app.getPath("userData"), "Safes");

    this.init();
  }

  public static build() {
    if (!SafeManager.instance) SafeManager.instance = new SafeManager();
    return SafeManager.instance;
  }

  /**
   * Initializes the safe manager.
   * Reads the safes from disk.
   */
  private init() {
    if (!fs.existsSync(this.path)) {
      fs.mkdirSync(this.path);
    }
    let safes = fs.readdirSync(this.path);

    for (let name of safes) {
      this.safes.push(new Safe({ name }));
    }
  }

  /**
   * Listens for events from the renderer process.
   */
  public listen() {
    ipcMain.handle(
      "create-safe",
      async (_, args) => await this.createSafe(args.name, args.password)
    );
    ipcMain.handle(
      "delete-safe",
      async (_, args) => await this.deleteSafe(args.name, args.password)
    );
    ipcMain.handle("get-safe-names", () => this.getSafeNames());
    ipcMain.handle(
      "open-safe",
      async (_, args) => await this.openSafe(args.name, args.password)
    );
    ipcMain.handle(
      "create-entry",
      async (_, args) =>
        await this.createEntry(
          args.safeName,
          args.safePassword,
          args.name,
          args.password,
          args.email,
          args.icon
        )
    );
    ipcMain.handle(
      "delete-entry",
      async (_, args) =>
        await this.deleteEntry(
          args.safeName,
          args.safePassword,
          args.entryName,
          args.currentEntries
        )
    );
  }

  /**
   * Adds a safe to the safe manager.
   * @param safe The safe to add.
   */
  private addSafe(safe: Safe) {
    this.safes.push(safe);
  }

  /**
   * creates a safe and encrypts it.
   * @param name The name of the safe.
   * @param password The password of the safe.
   */
  private async createSafe(name: string, password: string) {
    let safe = new Safe({ name });

    if (this.safes.find(safe => safe.name === name)) return -1;

    try {
      await safe.write(password, []);
    } catch (err) {
      console.error(err);
      console.log("Failed to encrypt safe.");
      return 0;
    }

    this.addSafe(safe);
    return 1;
  }

  /**
   * Deletes a safe from the safe manager.
   * @param name The name of the safe to delete.
   */
  private async deleteSafe(name: string, password: string) {
    let index = this.safes.findIndex(safe => safe.name === name);
    if (index === -1) return;
    let safe = this.safes[index];

    try {
      await safe.read(password);
    } catch (err) {
      console.error(err);
      console.log("Failed to decrypt safe.");
      return false;
    }

    this.safes.splice(index, 1);
    await fsp.unlink(path.join(this.path, name));
    return true;
  }

  /**
   * Function to display the safes in the renderer process.
   * @returns The names of the safes.
   * @private
   */
  private getSafeNames() {
    return this.safes.map(safe => safe.name);
  }

  /**
   * Opens a safe and returns its entries.
   * @param name The name of the safe to open.
   * @param password The password of the safe to open.
   * @returns entries of the safe.
   * @private
   */
  private async openSafe(name: string, password: string) {
    let safe = this.safes.find(safe => safe.name === name);
    let entries: Entry[] = [];
    if (!safe) return;

    try {
      entries = await safe.read(password);
    } catch (err) {
      console.error(err);
      console.log("Failed to decrypt safe.");
      return false;
    }

    return entries;
  }

  private async createEntry(
    safeName: string,
    safePassword: string,
    name: string,
    password: string,
    email?: string,
    icon?: string
  ) {
    let safe = this.safes.find(safe => safe.name === safeName);
    if (!safe) return;

    let entries = await safe.read(safePassword);

    entries.push({ name, password, email, icon });

    await safe.write(safePassword, entries);

    return entries;
  }

  private async deleteEntry(
    safeName: string,
    safePassword: string,
    entryName: string,
    currentEntries: Entry[]
  ) {
    let safe = this.safes.find(safe => safe.name === safeName);
    let entry = currentEntries.findIndex(entry => entry.name === entryName);
    if (!safe || entry === -1) return;

    let newEntries = currentEntries.filter(entry => entry.name !== entryName);

    await safe.write(safePassword, newEntries);

    return newEntries;
  }
}

export { SafeManager };
