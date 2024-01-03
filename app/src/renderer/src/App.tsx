import { Tredici, useTheme } from "tredici";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import {
  Navbar,
  SafeManagerContextProvider,
  Bank,
  CreateSafe,
  DeleteSafe,
  OpenSafe
} from "@renderer/components";
import { IconSelector, AddEntry, HomePage, SafePage } from "@renderer/pages";
import { useBoolean, useSettings } from "@renderer/hooks";
import { useEffect } from "react";

const App = () => {
  const { theme, setTheme } = useTheme();
  const isDark = theme === "dark";
  const [started, { on }] = useBoolean();

  useEffect(() => {
    if (started) {
      api.setDefaultTheme(theme);
    }
  }, [theme]);

  useEffect(() => {
    api.getDefaultTheme().then(t => {
      setTheme(t);
      on();
    });
  }, []);

  return (
    <div
      className="w-screen h-screen"
      style={{
        backgroundImage: `url(${isDark ? "bg-dark.png" : "bg-light.png"})`
      }}
    >
      <Navbar />
      <div className="w-full h-[calc(100%-4rem)]">
        <Router>
          <SafeManagerContextProvider>
            <Routes>
              <Route path="/" element={<HomePage />}>
                <Route index element={<Bank />} />
                <Route path="/manage/create" element={<CreateSafe />} />
                <Route path="/manage/delete/:name" element={<DeleteSafe />} />
                <Route path="/manage/open/:name" element={<OpenSafe />} />
              </Route>
              <Route path="/:name" element={<SafePage />}>
                <Route index element={<AddEntry />} />
                <Route path="/:name/icons" element={<IconSelector />} />
              </Route>
            </Routes>
          </SafeManagerContextProvider>
        </Router>
      </div>
    </div>
  );
};

const AppWrapper = () => {
  const { colorScheme } = useSettings();

  return (
    <Tredici defaultColorScheme={colorScheme.get()}>
      <App />
    </Tredici>
  );
};

export { AppWrapper as App };
