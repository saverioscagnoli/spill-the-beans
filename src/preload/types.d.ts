type CheckboxValue = boolean | "indeterminate";

interface Api {
  getUsername: () => Promise<string>;
  openSafe: () => Promise<Electron.OpenDialogReturnValue>;
  createSafe: (name: string) => Promise<Electron.SaveDialogReturnValue>;
  getSafes: () => Promise<{ name: string; created: string }[]>;
  genPassword: (
    length: number,
    numbers: CheckboxValue,
    symbols: CheckboxValue,
    lowercase: CheckboxValue,
    uppercase: CheckboxValue
  ) => Promise<string>;
}

export { type Api };
