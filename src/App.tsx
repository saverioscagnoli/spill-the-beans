import { Button, useTheme } from "tredici";
import { LuBean } from "react-icons/lu";
import { SettingsDialog } from "./components";

function App() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const open = async () => {
    await backend.openSafe();
  };

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
        <h1 className="text-5xl font-bold select-none">Welcome back!</h1>
        <div className="flex gap-4">
          <Button onClick={open}>Open safe</Button>
          <Button>Create safe</Button>
        </div>
      </div>
    </div>
  );
}

export default App;
