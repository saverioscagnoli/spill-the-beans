import ReactDOM from "react-dom/client";
import { App } from "./App";
import { SettingsContextProvider } from "./components";
import { initReactI18next } from "react-i18next";
import i18n from "i18next";
import { Suspense } from "react";
import en from "./assets/locales/en/translations.json";
import it from "./assets/locales/it/translations.json";
import "./index.css";

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: en
      },
      it: {
        translation: it
      }
    },
    fallbackLng: "en",
    debug: false,
  });

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Suspense>
    <SettingsContextProvider>
      <App />
    </SettingsContextProvider>
  </Suspense>
);
