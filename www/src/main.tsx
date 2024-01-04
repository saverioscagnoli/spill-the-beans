import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { Tredici } from "tredici";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Tredici defaultTheme="dark">
    <App />
  </Tredici>
);
