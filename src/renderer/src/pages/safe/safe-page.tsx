import { useLocation } from "react-router-dom";
import { Button } from "tredici";
import { FooterButton } from "./footer-buttons";
import { LuPlus } from "react-icons/lu";
import { AddEntry, SafeContextProvider } from "@renderer/components";
import { SafeEntry } from "@renderer/pages/safe/safe-entry/safe-entry";

export interface Entry {
  name: string;
  password: string;
  email?: string;
  notes?: string;
}

const SafePage = () => {
  const location = useLocation();
  const { name, password, entries } = location.state;

  return (
    <SafeContextProvider safe={{ name, password }} initialEntries={entries}>
      <div className="w-full h-full flex flex-col items-center justify-center relative">
        {entries.length > 0 ? (
          entries.map(e => <SafeEntry key={e.name} {...e} />)
        ) : (
          <div className="flex flex-col gap-1 justify-center items-center">
            <h1 className="text-5xl font-bold">This safe is empty!</h1>
            <h3 className="text-xl font-semibold">Click the + button to add an entry.</h3>
            <AddEntry>
              <Button.Icon icon={<LuPlus size={20} />} />
            </AddEntry>
          </div>
        )}
        <FooterButton />
      </div>
    </SafeContextProvider>
  );
};

export { SafePage };
