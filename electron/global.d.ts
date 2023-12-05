declare global {
  const ipcRenderer: Electron.IpcRenderer;
  const backend: {
    openSafe: () => Promise<Electron.OpenDialogReturnValue>;
  };
}

// If this file has no import/export statements (i.e. is a script)
// convert it into a module by adding an empty export statement.
export {};
