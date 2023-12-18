type CheckboxValue = boolean | "indeterminate";

interface Api {
  getUsername: () => Promise<string>;
  openSafe: (
    name: string,
    password: stirng
  ) => Promise<Electron.OpenDialogReturnValue>;
  createSafe: (
    name: string,
    password: string
  ) => Promise<Electron.SaveDialogReturnValue>;
  getSafes: () => Promise<{ name: string; created: string; path: string }[]>;
  generatePassword: (
    length: number,
    numbers: CheckboxValue,
    symbols: CheckboxValue,
    lowercase: CheckboxValue,
    uppercase: CheckboxValue,
    exclude: string
  ) => Promise<string>;
  deleteSafe: (name: string, password: string) => Promise<boolean>;
  getEntries: (path: string) => Promise<any>;
  createEntry: (name: string, password: string, path: string) => Promise<void>;
}

export { type Api };
