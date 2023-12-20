import { createContext } from "react";
import { Attribute } from "./types";

export interface SettingsContextProps {
  /**
   * The username of the user.
   * The default username is the name of the User's OS account.
   */
  username: Attribute<string>;

  /**
   * The path to the user's profile picture.
   */
  propic: Attribute<string>;
}

const SettingsContext = createContext<SettingsContextProps | null>(null);

export { SettingsContext };
