import { ipcMain } from "electron";
import { generatePassword } from "../lib";
import filterWorker from "../workers/filter?nodeWorker";
import { IconType } from "react-icons";

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
    ipcMain.handle(
      "filter-icons",
      async (_, args) => await this.filterIcons(args.searchTerm, args.icons)
    );
  }

  private async filterIcons(searchTerm: string, icons: [string, IconType][]) {
    let worker = filterWorker({ workerData: { searchTerm, icons } });

    return new Promise<string[]>((res, rej) => {
      worker.on("message", res);
      worker.on("error", rej);
    });
  }
}

export { MiscFunctions };
