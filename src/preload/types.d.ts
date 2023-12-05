interface Api {
  openSafe: () => Promise<Electron.OpenDialogReturnValue>;
  createSafe: () => Promise<Electron.SaveDialogReturnValue>;
}

export { type Api };
