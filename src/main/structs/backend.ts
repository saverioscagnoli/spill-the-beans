import { app, ipcMain } from "electron";
import { generate } from "generate-password";
import os from "os";
import { join } from "path";
import { existsSync, mkdirSync, readdirSync } from "fs";
import { checkPassword, decrypt, encrypt } from "./crypter";
import { deleteFile } from "../lib";
import { CSV } from "csv-rw";

class Backend {
  private static instance: Backend;

  private constructor() {}

  /**
   * @returns The singleton instance of the Backend class.
   * @see https://en.wikipedia.org/wiki/Singleton_pattern
   */
  public static build() {
    if (!Backend.instance) {
      Backend.instance = new Backend();
    }

    return Backend.instance;
  }

  /**
   * Initializes the Backend class.
   * Must be called only once.
   */
  public init() {
    let safeFolderPath = join(app.getPath("userData"), "Safes");

    if (!existsSync(safeFolderPath)) {
      mkdirSync(safeFolderPath);
    }
  }

  /**
   * Listens to IPC events.
   * Must be called only once.
   */
  public listen() {
    ipcMain.handle("get-username", this.getUsername.bind(this));
    ipcMain.handle("generate-password", this.generatePassword.bind(this));
    ipcMain.handle("get-safes", this.getSafes.bind(this));
    ipcMain.handle("create-safe", this.createSafe.bind(this));
    ipcMain.handle("delete-safe", this.deleteSafe.bind(this));
    ipcMain.handle("open-safe", this.openSafe.bind(this));
    ipcMain.handle("get-entries", this.getEntries.bind(this));
  }

  /**
   * @returns The username of the current machine user.
   */
  private getUsername(): string {
    return os.userInfo().username;
  }

  /**
   * @returns A randomly generated password.
   */
  private generatePassword(
    _,
    args: {
      length: number;
      numbers: boolean;
      symbols: boolean;
      lowercase: boolean;
      uppercase: boolean;
      exclude: string;
    }
  ): string {
    return generate({ ...args });
  }

  /**
   * @returns The list of safes.
   */
  private async getSafes() {
    let safes = readdirSync(join(app.getPath("userData"), "Safes"));

    return safes
      .map(safe => {
        return {
          name: safe,
          created: new Date().toISOString(),
          path: join(app.getPath("userData"), "Safes", safe)
        };
      })
      .filter(safe => !safe.name.endsWith(".tmp"));
  }

  private async createSafe(_, args: { name: string; password: string }): Promise<void> {
    let safePath = join(app.getPath("userData"), "Safes", args.name);
    let { name, password } = args;

    let csv = new CSV({ path: safePath, headers: ["index", "name", "password"] });

    await csv.write({ index: 0, name, password });
    await encrypt(safePath, password);
  }

  private async deleteSafe(
    _,
    args: { name: string; password: string }
  ): Promise<boolean> {
    let safePath = join(app.getPath("userData"), "Safes", args.name);

    if (!existsSync(safePath)) return false;

    let isCorrect = await checkPassword(safePath, args.password);

    if (!isCorrect) return false;

    await deleteFile(safePath);

    return true;
  }

  private async openSafe(_, args: { name: string; password: string }) {
    let safePath = join(app.getPath("userData"), "Safes", args.name);

    if (!existsSync(safePath)) return false;

    let isCorrect = await checkPassword(safePath, args.password);
    if (!isCorrect) return false;

    return true;
  }

  private async getEntries(_, args: { name: string; password: string }) {
    let safePath = join(app.getPath("userData"), "Safes", args.name);

    if (!existsSync(safePath)) return false;

    await decrypt(safePath, args.password);

    let csv = new CSV({ path: safePath, headers: ["index", "name", "password"] });
    let entries = await csv.read();

    await encrypt(safePath, args.password);

    return entries;
  }
}

export { Backend };
