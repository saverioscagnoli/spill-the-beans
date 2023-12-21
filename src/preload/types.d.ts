type CheckboxValue = boolean | "indeterminate";

interface Api {
  getUsername: () => Promise<string>;
  openSafe: (name: string, password: stirng) => Promise<Electron.OpenDialogReturnValue>;
  createSafe: (name: string, password: string) => Promise<Electron.SaveDialogReturnValue>;
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
  getEntries: (name: string, password: string) => Promise<any>;
  createEntry: (
    safeName: string,
    safePassword: string,
    name: string,
    password: string,
    email?: string,
    notes?: string
  ) => Promise<void>;
  editPropic: () => Promise<string>;
  getDefaultPropic: () => Promise<boolean | string>;
  resetPropic: () => Promise<void>;
}

export { type Api };
