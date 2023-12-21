import { contextBridge, ipcRenderer } from "electron";
import { Api } from "./types";

const api: Api = {
  getUsername: () => ipcRenderer.invoke("get-username"),
  setUsername: username => ipcRenderer.invoke("set-username", username),
  openSafe: (name, password) => ipcRenderer.invoke("open-safe", { name, password }),
  createSafe: (name, password) => ipcRenderer.invoke("create-safe", { name, password }),
  getSafes: () => ipcRenderer.invoke("get-safes"),
  generatePassword: (length, numbers, symbols, lowercase, uppercase, exclude) =>
    ipcRenderer.invoke("generate-password", {
      length,
      numbers,
      symbols,
      lowercase,
      uppercase,
      exclude
    }),
  deleteSafe: (name, password) => ipcRenderer.invoke("delete-safe", { name, password }),
  getEntries: (name, password) => ipcRenderer.invoke("get-entries", { name, password }),
  createEntry: (safeName, safePassword, name, password, email, notes) =>
    ipcRenderer.invoke("create-entry", {
      safeName,
      safePassword,
      name,
      password,
      email,
      notes
    }),
  editPropic: () => ipcRenderer.invoke("edit-propic"),
  getDefaultPropic: () => ipcRenderer.invoke("get-default-propic"),
  resetPropic: () => ipcRenderer.invoke("reset-propic"),
  getSafeNames: () => ipcRenderer.invoke("get-safe-names"),

  getPropic: () => ipcRenderer.invoke("get-propic"),
  setPropic: reset => ipcRenderer.invoke("set-propic", { reset }),

  getDefaultTheme: () => ipcRenderer.invoke("get-default-theme"),
  setDefaultTheme: theme => ipcRenderer.invoke("set-default-theme", theme)
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
