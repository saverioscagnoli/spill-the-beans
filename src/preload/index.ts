import { contextBridge, ipcRenderer } from "electron";
import { Api } from "./types";

const api: Api = {
  getUsername: () => ipcRenderer.invoke("get-username"),
  setUsername: username => ipcRenderer.invoke("set-username", username),
  getSafes: () => ipcRenderer.invoke("get-safes"),
  generatePassword: flags => ipcRenderer.invoke("generate-password", flags),
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
  setPropic: () => ipcRenderer.invoke("set-propic"),

  getDefaultTheme: () => ipcRenderer.invoke("get-default-theme"),
  setDefaultTheme: theme => ipcRenderer.invoke("set-default-theme", theme),

  getColorScheme: () => ipcRenderer.invoke("get-color-scheme"),
  setColorScheme: scheme => ipcRenderer.invoke("set-color-scheme", scheme)
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
