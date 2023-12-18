import { SettingsContext } from "@renderer/contexts";
import { useContext } from "react";

const useSettings = () => {
  const ctx = useContext(SettingsContext);

  if (!ctx) {
    throw new Error(
      "useSettingsContext must be used within a SettingsContextProvider"
    );
  }

  return ctx;
};

export { useSettings };
