import { ipcMain } from "electron";
import { RandomPasswordRange, generatePassword, rng } from "../lib";

class MiscFunctions {
  private static instance: MiscFunctions;

  private constructor() {}

  public static build(): MiscFunctions {
    if (!MiscFunctions.instance) {
      MiscFunctions.instance = new MiscFunctions();
    }

    return MiscFunctions.instance;
  }

  /**
   * Listens for the events in the renderer process.
   */
  public listen() {
    ipcMain.handle("generate-password", (_, flags) =>
      generatePassword(
        flags ?? {
          numbers: true,
          symbols: true,
          uppercase: true,
          lowercase: true,
          length: rng({ min: RandomPasswordRange.Min, max: RandomPasswordRange.Max }),
          exclude: ""
        }
      )
    );
  }
}

export { MiscFunctions };
