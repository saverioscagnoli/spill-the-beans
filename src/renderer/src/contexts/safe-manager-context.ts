import { createContext } from "react";
import { Attribute } from "./types";

interface SafeManagerContextProps {
  switchToBank: () => void;
  switchToCreateSafe: () => void;
  content: "bank" | "create-safe";

  name: Attribute<string>;
  password: Attribute<string>;
}

const SafeManagerContext = createContext<SafeManagerContextProps | null>(null);

export { SafeManagerContext, type SafeManagerContextProps };
