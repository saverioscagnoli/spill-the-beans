import { Bean } from "lucide-react";
import { SettingsDialog } from "./settings-dialog";

const Navbar = (): JSX.Element => {
  return (
    <nav className="flex justify-between w-full h-12">
      <div className="flex justify-start items-center gap-2 ml-4">
        <Bean className="text-3xl mt-2" />
      </div>
      <div className="flex justify-end items-center mr-4">
        <SettingsDialog />
      </div>
    </nav>
  );
};

export { Navbar };
