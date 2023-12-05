import { useTheme } from "tredici";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home } from "./pages";

function App(): JSX.Element {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <div
      className="w-screen h-screen"
      style={{
        backgroundImage: `url(${isDark ? "bg-dark.png" : "bg-light.png"})`
      }}
    >
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
