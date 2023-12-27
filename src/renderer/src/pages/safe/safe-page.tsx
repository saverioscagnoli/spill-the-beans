import { useLocation } from "react-router-dom";
import { Button } from "tredici";
import { FooterButtons } from "./footer-buttons";
import { LuPlus } from "react-icons/lu";
import { AddEntry, SafeContextProvider } from "@renderer/components";
import { SafeEntry } from "@renderer/pages/safe/safe-entry/safe-entry";
import { useSafe } from "@renderer/hooks";

export interface Entry {
  name: string;
  password: string;
  email?: string;
  notes?: string;
}

const SafePage = () => {
  const { entries } = useSafe();

  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-2 relative">
      {entries.get().length > 0 ? (
        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              entries.get().length > 6 ? "repeat(2, 1fr)" : "repeat(1, 1fr)",
            gap: "0.5rem"
          }}
        >
          {entries.get().map(e => (
            <SafeEntry key={e.name} name={e.name} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col gap-1 justify-center items-center">
          <h1 className="text-5xl font-bold">This safe is empty!</h1>
          <h3 className="text-xl font-semibold">Click the + button to add an entry.</h3>
          <AddEntry>
            <Button.Icon icon={<LuPlus size={20} />} />
          </AddEntry>
        </div>
      )}
      <FooterButtons />
    </div>
  );
};

const SafePageWrapper = () => {
  const location = useLocation();
  const { name, password, entries: entries } = location.state;

  return (
    <SafeContextProvider safe={{ name, password }} initialEntries={entries}>
      <SafePage />
    </SafeContextProvider>
  );
};

export { SafePageWrapper as SafePage };
