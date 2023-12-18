import { createContext } from "react";
import { Attribute } from "./types";
import { Variants } from "framer-motion";

interface SafeManagerContextProps {
  switchToBank: () => void;
  switchToCreateSafe: () => void;
  switchToDeleteSafe: (name: string) => void;

  name: Attribute<string>;
  password: Attribute<string>;

  animations: Variants;
  isAnimating: Attribute<boolean>;

  
}

const SafeManagerContext = createContext<SafeManagerContextProps | null>(null);

export { SafeManagerContext, type SafeManagerContextProps };
