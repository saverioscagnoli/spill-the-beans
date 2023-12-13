import ReactDOM from "react-dom/client";
import { App } from "./App";
import { Tredici } from "tredici";
import "./index.css";
import { SettingsContextProvider } from "./components";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <SettingsContextProvider>
    <Tredici>
      <App />
    </Tredici>
  </SettingsContextProvider>
);
