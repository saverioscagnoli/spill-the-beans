import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { Tredici } from "tredici";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Tredici>
    <App />
  </Tredici>
);

// Remove Preload scripts loading
postMessage({ payload: "removeLoading" }, "*");

// Use contextBridge
window.ipcRenderer.on("main-process-message", (_event, message) => {
  console.log(message);
});
