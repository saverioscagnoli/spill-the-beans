import { ipcMain } from "electron";
import { Safe } from "./safe";
import fs from "fs";
import fsp from "fs/promises";
import path from "path";

class SafeManager {
  private static instance: SafeManager;
  private safes: Safe[];

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
    ipcMain.handle("delete-safe", async (_, args) => await this.deleteSafe(args.name));
    ipcMain.handle("get-safe-names", () => this.getSafeNames());
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
  private async deleteSafe(name: string) {
    let index = this.safes.findIndex(safe => safe.name === name);
    if (index === -1) return;
    this.safes.splice(index, 1);
    await fsp.unlink(path.join(Safe.folder, name));
  }

  /**
   * Function to display the safes in the renderer process.
   * @returns The names of the safes.
   */
  private getSafeNames() {
    return this.safes.map(safe => safe.name);
  }
}

export { SafeManager };
