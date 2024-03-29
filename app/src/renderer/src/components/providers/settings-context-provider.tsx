import { SettingsContext } from "@renderer/contexts";
import i18next from "i18next";
import { ReactNode, useEffect, useState } from "react";
import { ColorScheme } from "tredici";

interface SettingsContextProviderProps {
  children: ReactNode;
}

/**
 * Provides the settings context to the application.
 * This means that the useSettings hook can be used anywhere in the application.
 */
const SettingsContextProvider: React.FC<SettingsContextProviderProps> = ({
  children
}) => {
  const [username, setUsername] = useState<string>("");
  const [propic, setPropic] = useState<string>("");
  const [colorScheme, setColorScheme] = useState<ColorScheme>("amethyst");

  useEffect(() => {
    api.getUsername().then(setUsername);
    api.getPropic().then(res => void (typeof res !== "boolean" && setPropic(res)));
    api.getColorScheme().then(setColorScheme);

    api.getLanguage().then(i18next.changeLanguage)
  }, []);

  useEffect(() => {
    api.setColorScheme(colorScheme);
  }, [colorScheme]);

  useEffect(() => {
    api.setUsername(username);
  }, [username]);
  

  return (
    <SettingsContext.Provider
      value={{
        username: {
          get: () => username,
          set: setUsername
        },
        propic: {
          get: () => propic,
          set: setPropic
        },
        colorScheme: {
          get: () => colorScheme,
          set: setColorScheme
        }
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
};

export { SettingsContextProvider };
