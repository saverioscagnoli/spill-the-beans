import { SettingsContext } from "@renderer/contexts";
import { ReactNode, useEffect, useState } from "react";

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

  useEffect(() => {
    api.getUsername().then(setUsername);
    api.getDefaultPropic().then(res => void (typeof res !== "boolean" && setPropic(res)));
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
        }
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
};

export { SettingsContextProvider };
