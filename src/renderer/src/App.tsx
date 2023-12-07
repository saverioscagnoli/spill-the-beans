import { useTheme } from "tredici";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { HomePage, SafePage } from "./pages";
import { useEffect, useState } from "react";

const App = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const [username, setUsername] = useState<string>("");

  useEffect(() => {
    api.getUsername().then(u => setUsername(u));
  }, []);

  return (
    <div
      className="w-screen h-screen"
      style={{
        backgroundImage: `url(${isDark ? "bg-dark.png" : "bg-light.png"})`
      }}
    >
      <Router>
        <Routes>
          <Route path="/" element={<HomePage username={username} />} />
          <Route path="/safe" element={<SafePage username={username} />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
