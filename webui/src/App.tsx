import { Key, Modifier, useHotkey } from "@util-hooks/use-hotkey";
import { useConfig, watchTheme } from "~/stores/config";

const App = () => {
  const setConfig = useConfig(s => s.set);

  useHotkey([Modifier.Ctrl], Key.T, e => {
    e.preventDefault();
    setConfig(c => ({ theme: c.theme === "dark" ? "light" : "dark" }));
  });

  watchTheme();

  return <div>a</div>;
};

export { App };
