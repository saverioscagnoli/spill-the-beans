import { SettingsContext } from "@renderer/contexts";
import { Settings } from "@renderer/contexts";
import React, { ReactNode, useEffect, useState } from "react";

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
  const [settings, setSettings] = useState<Settings>({ username: "" });

  useEffect(() => {
    setDefaultSettings();
  }, []);

  const setDefaultSettings = async () => {
    let username = await api.getUsername();

    setSettings({ username });
  };

  return (
    <SettingsContext.Provider value={{ settings, setSettings }}>
      {children}
    </SettingsContext.Provider>
  );
};

export { SettingsContextProvider };
