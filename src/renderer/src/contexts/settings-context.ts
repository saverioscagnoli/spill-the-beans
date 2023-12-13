import { Dispatch, SetStateAction, createContext } from "react";

export interface Settings {
  username: string;
}

export interface SettingsContextProps {
  settings: Settings;
  setSettings: Dispatch<SetStateAction<Settings>>;
}

const SettingsContext = createContext<SettingsContextProps | null>(null);

export { SettingsContext };
