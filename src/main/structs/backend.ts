import { ipcMain } from "electron";
import { generate } from "generate-password";
import os from "os";

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
}

export { Backend };
