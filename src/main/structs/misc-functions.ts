import { ipcMain } from "electron";
import { generatePassword } from "../lib";

class MiscFunctions {
  private static instance: MiscFunctions;

  private constructor() {}

  public static build(): MiscFunctions {
    if (!MiscFunctions.instance) {
      MiscFunctions.instance = new MiscFunctions();
    }

    return MiscFunctions.instance;
  }

  public listen() {
    ipcMain.handle("generate-password", (_, flags) => generatePassword(flags));
  }
}

export { MiscFunctions };
