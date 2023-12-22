import { ipcMain } from "electron";
import { Safe } from "./safe";
import fs from "fs";
import fsp from "fs/promises";
import path from "path";

class SafeManager {
  private static instance: SafeManager;

  public safes: Safe[];
  public open: { safe: Safe; password: string } | null;

  private constructor() {
    this.safes = [];
    this.open = null;
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
    let safes = fs.readdirSync(Safe.folder);

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
      "close-safe",
      async (_, args) => await this.closeSafe(args.name, args.password)
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
      await safe.decrypt(password, false);
    } catch (err) {
      console.error(err);
      console.log("Failed to decrypt safe.");
      return false;
    }

    this.safes.splice(index, 1);
    await fsp.unlink(path.join(Safe.folder, name));
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
    if (!safe) return;

    try {
      await safe.decrypt(password);
    } catch (err) {
      console.error(err);
      console.log("Failed to decrypt safe.");
      return false;
    }

    this.open = { safe, password };
    return await safe.read();
  }

  /**
   * Close a safe and encrypts it.
   * @param name The name of the safe to close.
   * @param password The password of the safe to close.
   * @returns A boolean indicating whether the safe was closed successfully.
   */
  private async closeSafe(name: string, password: string) {
    let safe = this.safes.find(safe => safe.name === name);
    if (!safe) return;

    try {
      await safe.encrypt(password);
    } catch (err) {
      console.error(err);
      console.log("Failed to encrypt safe.");
      return false;
    }

    this.open = null;
    return true;
  }
}

export { SafeManager };
