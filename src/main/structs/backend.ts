import { app, ipcMain } from "electron";
import { generate } from "generate-password";
import { Database } from "./database";
import os from "os";
import { join } from "path";
import { existsSync, mkdirSync } from "fs";

class Backend {
  private static instance: Backend;

  private catalog: Database<"name" | "path" | "created">;

  private constructor() {
    this.catalog = new Database({
      path: join(app.getPath("appData"), "Catalog"),
      fields: ["name", "created", "path"]
    });
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
    let safeFolderPath = join(app.getPath("appData"), "Safes");

    console.log(safeFolderPath);

    if (existsSync(safeFolderPath)) {
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

  private getSafes() {}
}

export { Backend };
