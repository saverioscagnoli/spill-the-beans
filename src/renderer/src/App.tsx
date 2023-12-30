import { Tredici, useTheme } from "tredici";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import { HomePage, SafePage } from "./pages";
import { IconSelector, AddEntry, Navbar, SafeManagerContextProvider } from "./components";
import { Bank, CreateSafe, DeleteSafe, OpenSafe } from "./components/safe-manager";
import { useSettings } from "./hooks";

const App = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

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
