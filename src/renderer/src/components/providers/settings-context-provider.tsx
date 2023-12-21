import { SettingsContext } from "@renderer/contexts";
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
  const [defaultTheme, setDefaultTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    api.getUsername().then(setUsername);
    api.getPropic().then(setPropic);
    api.getDefaultTheme().then(setDefaultTheme);
    api.getColorScheme().then(setColorScheme);
  }, []);

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
        },

        //@ts-ignore
        defaultTheme
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
};

export { SettingsContextProvider };
