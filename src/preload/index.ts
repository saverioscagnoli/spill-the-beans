import { contextBridge, ipcRenderer } from "electron";
import { Api } from "./types";

type CheckboxValue = boolean | "indeterminate";

const api: Api = {
  getUsername: () => ipcRenderer.invoke("get-username"),
  openSafe: () => ipcRenderer.invoke("open-safe"),
  createSafe: (name: string) => ipcRenderer.invoke("create-safe", { name }),
  getSafes: () => ipcRenderer.invoke("get-safes"),
  genPassword: (
    length: number,
    numbers: CheckboxValue,
    symbols: CheckboxValue,
    lowercase: CheckboxValue,
    uppercase: CheckboxValue
  ) =>
    ipcRenderer.invoke("gen-password", {
      length,
      numbers,
      symbols,
      lowercase,
      uppercase
    })
};

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld("ipcRenderer", ipcRenderer);
    contextBridge.exposeInMainWorld("api", api);
  } catch (error) {
    console.error(error);
  }
} else {
  window.api = api;
}
