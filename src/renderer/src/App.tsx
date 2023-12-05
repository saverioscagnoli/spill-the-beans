import { Button, useTheme } from "tredici";
import { Bean } from "lucide-react";
import { SettingsDialog } from "./components";

function App(): JSX.Element {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const open = async (): Promise<void> => {
    await api.openSafe();
  };

  const create = async (): Promise<void> => {
    await api.createSafe();
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
          <Bean className="text-3xl mt-2" />
        </div>
        <div className="flex justify-end items-center mr-4">
          <SettingsDialog />
        </div>
      </nav>
      <div className="h-[calc(100%-10rem)] flex flex-col justify-center items-center gap-4">
        <h1 className="text-5xl font-bold select-none">Welcome back!</h1>
        <div className="flex gap-4">
          <Button onClick={open}>Open safe</Button>
          <Button onClick={create}>Create safe</Button>
        </div>
      </div>
    </div>
  );
}

export default App;
