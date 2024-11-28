import { useEffect } from "react";
import { customCreate } from ".";

type Theme = "light" | "dark" | "system";
type ConfigState = {
  theme: Theme;
  set: (
    partial:
      | ConfigState
      | Partial<ConfigState>
      | ((state: ConfigState) => ConfigState | Partial<ConfigState>)
  ) => void;
};

export type { ConfigState, Theme };

const useConfig = customCreate<ConfigState>(set => ({
  theme: "system",
  set: partial => set(partial)
}));

export { useConfig };

/**
 * Watch the theme state and apply changes to the DOM
 * by adding/removing the `dark` class to the `documentElement`
 */
function watchTheme() {
  const theme = useConfig(s => s.theme);

  useEffect(() => {
    document.documentElement.classList.remove("dark");

    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    }
  }, [theme]);
}

export { watchTheme };
