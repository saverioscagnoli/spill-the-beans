type CheckboxValue = boolean | "indeterminate";

interface Api {
  getUsername: () => Promise<string>;
  openSafe: () => Promise<Electron.OpenDialogReturnValue>;
  createSafe: (name: string) => Promise<Electron.SaveDialogReturnValue>;
  getSafes: () => Promise<{ name: string; created: string; path: string }[]>;
  genPassword: (
    length: number,
    numbers: CheckboxValue,
    symbols: CheckboxValue,
    lowercase: CheckboxValue,
    uppercase: CheckboxValue,
    exclude: string
  ) => Promise<string>;
  deleteSafe: (name: string) => Promise<void>;
  getEntries: (path: string) => Promise<any>;
  createEntry: (name: string, password: string, path: string) => Promise<void>;
}

export { type Api };
