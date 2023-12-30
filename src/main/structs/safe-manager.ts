import { app, ipcMain } from "electron";
import { Entry, Safe } from "./safe";
import fs from "fs";
import fsp from "fs/promises";
import path from "path";

class SafeManager {
  public static readonly SafesFolder = path.join(app.getPath("userData"), "Safes");
  private static instance: SafeManager;

  public safes: Safe[];

  private constructor() {
    this.safes = [];
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
    if (!fs.existsSync(SafeManager.SafesFolder)) {
      fs.mkdirSync(SafeManager.SafesFolder);
    }
    let safes = fs.readdirSync(SafeManager.SafesFolder);

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

    try {
      await safe.encrypt(password);
    } catch (err) {
      console.error(err);
      console.log("Failed to encrypt safe.");
      return false;
    }

    this.addSafe(safe);
    return true;
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
    await fsp.unlink(path.join(SafeManager.SafesFolder, name));
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
    let entries: any[] = [];
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

    let csv = entries.map(e => Object.values(e).join(safe!.getDelimiter())).join("\n");

    await safe.encrypt(safePassword, Buffer.from("\n" + csv));

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

    currentEntries.splice(entry, 1);

    let csv = currentEntries
      .map(e => Object.values(e).join(safe!.getDelimiter()))
      .join("\n");

    await safe.encrypt(safePassword, Buffer.from("\n" + csv));
    return currentEntries;
  }
}

export { SafeManager };
