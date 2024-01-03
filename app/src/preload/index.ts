import { contextBridge, ipcRenderer } from "electron";
import { Api } from "./types";

const api: Api = {
  getUsername: () => ipcRenderer.invoke("get-username"),
  setUsername: username => ipcRenderer.invoke("set-username", username),
  generatePassword: flags => ipcRenderer.invoke("generate-password", flags),
  getEntries: (name, password) => ipcRenderer.invoke("get-entries", { name, password }),
  createEntry: (safeName, safePassword, name, password, email, icon) =>
    ipcRenderer.invoke("create-entry", {
      safeName,
      safePassword,
      name,
      password,
      email,
      icon
    }),

  deleteEntry: (safeName, safePassword, entryName, currentEntries) =>
    ipcRenderer.invoke("delete-entry", {
      safeName,
      safePassword,
      entryName,
      currentEntries
    }),

  createSafe: (name, password) => ipcRenderer.invoke("create-safe", { name, password }),
  deleteSafe: (name, password) => ipcRenderer.invoke("delete-safe", { name, password }),
  openSafe: (name, password) => ipcRenderer.invoke("open-safe", { name, password }),
  closeSafe: (name, password) => ipcRenderer.invoke("close-safe", { name, password }),

  getSafeNames: () => ipcRenderer.invoke("get-safe-names"),

  getPropic: () => ipcRenderer.invoke("get-propic"),
  setPropic: () => ipcRenderer.invoke("set-propic"),
  resetPropic: () => ipcRenderer.invoke("reset-propic"),

  getDefaultTheme: () => ipcRenderer.invoke("get-default-theme"),
  setDefaultTheme: theme => ipcRenderer.invoke("set-default-theme", theme),

  getColorScheme: () => ipcRenderer.invoke("get-color-scheme"),
  setColorScheme: scheme => ipcRenderer.invoke("set-color-scheme", scheme),

  getLanguage: () => ipcRenderer.invoke("get-language"),
  setLanguage: language => ipcRenderer.invoke("set-language", language)
};

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld("ipcRenderer", {
      ...ipcRenderer,
      on: ipcRenderer.on.bind(ipcRenderer)
    });
    contextBridge.exposeInMainWorld("api", api);
  } catch (error) {
    console.error(error);
  }
} else {
  window.api = api;
}
