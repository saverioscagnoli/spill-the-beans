import { createContext } from "react";
import { Attribute } from "./types";

export type Entry = {
  name: string;
  password: string;
  email?: string;
  icon?: string;
};

export type SafeInfo = {
  name: string;
  password: string;
  entries: Entry[];
};

interface SafeManagerContextProps {
  switchToBank: () => void;
  switchToCreateSafe: () => void;
  switchToDeleteSafe: (name: string) => void;
  switchToOpenSafe: (name: string) => void;

  switchToIcons: (name: string) => void;

  openedSafe: Attribute<SafeInfo | null>;

  name: Attribute<string>;
  password: Attribute<string>;
}

const SafeManagerContext = createContext<SafeManagerContextProps | null>(null);

export { SafeManagerContext, type SafeManagerContextProps };
