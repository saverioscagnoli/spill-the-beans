type CheckboxValue = boolean | "indeterminate";

interface Api {
  getUsername: () => Promise<string>;
  setUsername: (username: string) => Promise<void>;
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

  getSafeNames: () => Promise<string[]>;
  getPropic: () => Promise<string>;
  setPropic: (reset?: boolean) => Promise<false | string>;
  resetPropic: () => Promise<void>;

  getDefaultTheme: () => Promise<"light" | "dark">;
  setDefaultTheme: (theme: "light" | "dark") => Promise<void>;
}

export { type Api };
