import { Button, useTheme } from "tredici";
import { LuBean } from "react-icons/lu";
import { SettingsDialog } from "./components";

function App() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <div
      className="w-screen h-screen"
      style={{
        backgroundImage: `url(${isDark ? "bg-dark.png" : "bg-light.png"})`
      }}
    >
      <nav className="flex justify-between w-full h-12">
        <div className="flex justify-start items-center gap-2 ml-4">
          <LuBean className="text-3xl mt-2" />
        </div>
        <div className="flex justify-end items-center mr-4">
          <SettingsDialog />
        </div>
      </nav>
      <div className="h-[calc(100%-10rem)] flex flex-col justify-center items-center gap-4">
        <h1 className="text-5xl font-bold ">Welcome back!</h1>
        <Button>Open safe</Button>
      </div>
    </div>
  );
}

export default App;
