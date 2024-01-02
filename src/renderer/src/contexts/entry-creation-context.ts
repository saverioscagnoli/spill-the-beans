import { createContext } from "react";
import { Attribute } from "./types";

interface EntryCreationContextProps {
  /**
   * The name of the entry to be created.
   */
  name: Attribute<string>;

  /**
   * The password of the entry to be created.
   */
  password: Attribute<string>;

  /**
   * The email of the entry to be created.
   */
  email?: Attribute<string>;

  /**
   * If selected, the name of the icon to represent the entry.
   */
  iconName?: Attribute<string>;
}

const EntryCreationContext = createContext<EntryCreationContextProps | null>(null);

export { EntryCreationContext };
export { type EntryCreationContextProps };
