import { Dispatch, SetStateAction, createContext } from "react";

export interface Settings {
  /**
   * The username of the user.
   * The default username is the name of the User's OS account.
   */
  username: string;

  /**
   * The path to the user's profile picture.
   */
  propic?: string;
}

export interface SettingsContextProps {
  settings: Settings;
  setSettings: Dispatch<SetStateAction<Settings>>;
}

const SettingsContext = createContext<SettingsContextProps | null>(null);

export { SettingsContext };
