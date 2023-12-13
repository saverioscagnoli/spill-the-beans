import { useTheme } from "tredici";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import { HomePage } from "./pages";
import { Navbar } from "./components";

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
      <div className="w-full h-[calc(100%-4rem)] flex flex-col justify-center items-center">
        <Router>
          <Routes>
            <Route path="/" element={<HomePage />} />
          </Routes>
        </Router>
      </div>
    </div>
  );
};

export { App };
