import { Tredici, useTheme } from "tredici";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import { HomePage, SafePage } from "./pages";
import { IconSelector, AddEntry, Navbar, SafeManagerContextProvider } from "./components";
import { Bank, CreateSafe, DeleteSafe, OpenSafe } from "./components/safe-manager";
import { useBoolean, useSettings } from "./hooks";
import { useEffect } from "react";
import { initReactI18next } from "react-i18next";
import i18n from "i18next";
import HttpApi from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";

// Initialize i18n outside of the component
i18n
  .use(initReactI18next)
  .use(LanguageDetector)
  .use(HttpApi)
  .init({
    fallbackLng: "en",
    detection: {
      order: ["htmlTag"]
    },
    backend: {
      loadPath: "/locales/{{lng}}/translations.json"
    }
  });

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
