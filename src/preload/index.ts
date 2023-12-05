import { contextBridge, ipcRenderer } from "electron";
import { Api } from "./types";

const api: Api = {
  openSafe: () => ipcRenderer.invoke("open-safe"),
  createSafe: () => ipcRenderer.invoke("create-safe")
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
