import { Api } from "./types";
import { IpcRenderer } from "electron";

declare global {
  const ipcRenderer: IpcRenderer;
  const api: Api;

  interface Window {
    api: Api;
  }
}

// If this file has no import/export statements (i.e. is a script)
// convert it into a module by adding an empty export statement.
export {};
