import { ColorScheme } from "tredici";

interface PasswordFlags {
  length: number;
  numbers: boolean;
  symbols: boolean;
  uppercase: boolean;
  lowercase: boolean;
  exclude: string;
}

interface Api {
  getUsername: () => Promise<string>;
  setUsername: (username: string) => Promise<void>;
  generatePassword: (flags: PasswordFlags) => Promise<string>;
  getEntries: (name: string, password: string) => Promise<any>;
  createEntry: (
    safeName: string,
    safePassword: string,
    name: string,
    password: string,
    email?: string,
    notes?: string
  ) => Promise<void>;

  createSafe: (name: string, password: string) => Promise<void>;
  deleteSafe: (name: string, password: string) => Promise<boolean>;
  openSafe: (name: string, password: string) => Promise<boolean>;
  closeSafe: (name: string, password: string) => Promise<void>;

  editPropic: () => Promise<string>;
  getDefaultPropic: () => Promise<boolean | string>;

  getSafeNames: () => Promise<string[]>;
  getPropic: () => Promise<string>;
  setPropic: (reset?: boolean) => Promise<false | string>;
  resetPropic: () => Promise<void>;

  getDefaultTheme: () => Promise<"light" | "dark">;
  setDefaultTheme: (theme: "light" | "dark") => Promise<void>;

  getColorScheme: () => Promise<ColorScheme>;
  setColorScheme: (scheme: ColorScheme) => Promise<void>;
}

export { type Api };
