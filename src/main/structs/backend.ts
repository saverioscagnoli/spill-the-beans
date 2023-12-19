import { app, ipcMain } from "electron";
import pwgen from "generate-password";
import os from "os";
import path from "path";
import fs from "fs";
import { checkPassword, decrypt, deleteFile, encrypt, readDir } from "../lib";
import { CSV } from "csv-rw";

class Backend {
  private static instance: Backend;

  private safesPath: string;

  private constructor() {
    this.safesPath = path.join(app.getPath("userData"), "Safes");
  }

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
    if (!fs.existsSync(this.safesPath)) fs.mkdirSync(this.safesPath);
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

  private getSafePath(name: string): string {
    return path.join(this.safesPath, name);
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
    return pwgen.generate({ ...args });
  }

  /**
   * @returns The list of safes.
   */
  private async getSafes() {
    let safes = await readDir(this.safesPath);

    return safes.map(safe => ({
      name: safe,
      path: this.getSafePath(safe)
    }));
  }

  private async createSafe(_, args: { name: string; password: string }): Promise<void> {
    let { name, password } = args;
    let safePath = this.getSafePath(name);

    new CSV({ path: safePath, headers: ["index", "name", "password"] });

    await encrypt(safePath, password);
  }

  private async deleteSafe(
    _,
    args: { name: string; password: string }
  ): Promise<boolean> {
    let safePath = this.getSafePath(args.name);

    if (!fs.existsSync(safePath)) return false;

    let isCorrect = await checkPassword(safePath, args.password);
    if (!isCorrect) return false;

    await deleteFile(safePath);

    return true;
  }

  private async openSafe(_, args: { name: string; password: string }) {
    let safePath = this.getSafePath(args.name);

    if (!fs.existsSync(safePath)) return false;
    return await checkPassword(safePath, args.password);
  }

  private async getEntries(_, args: { name: string; password: string }) {
    let safePath = this.getSafePath(args.name);

    if (!fs.existsSync(safePath)) return false;

    await decrypt(safePath, args.password);

    let csv = new CSV({ path: safePath, headers: ["index", "name", "password"] });
    let entries = await csv.read();

    await encrypt(safePath, args.password);

    return entries;
  }
}

export { Backend };
