import { Api } from "./types";

declare global {
  const ipcRenderer: Electron.IpcRenderer;
  const api: Api;

  interface Window {
    api: Api;
  }
}

// If this file has no import/export statements (i.e. is a script)
// convert it into a module by adding an empty export statement.
export {};
