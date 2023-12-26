import { createContext } from "react";
import { Attribute } from "./types";

interface Entry {
  name: string;
  password: string;
  email?: string;
  icon?: string;
}

interface SafeContextProps {
  safe: { name: string; password: string };
  entries: Attribute<Entry[]>;
}

const SafeContext = createContext<SafeContextProps | null>(null);

export { SafeContext };
export type { Entry, SafeContextProps };
