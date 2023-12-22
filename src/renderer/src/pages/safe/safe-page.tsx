import { useBoolean } from "@renderer/hooks";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Button, Spinner } from "tredici";
import { BackButton } from "./back-button";
import { LuPlus } from "react-icons/lu";
import { AddEntry } from "@renderer/components";
import { SafeEntry } from "@renderer/components/safe-entry/safe-entry";

export interface Entry {
  name: string;
  password: string;
  email?: string;
  notes?: string;
}

const SafePage = () => {
  const location = useLocation();
  const [entries, setEntries] = useState<Entry[]>([]);

  useEffect(() => {
    let { entries } = location.state;

    setEntries(entries);
  }, []);

  const onClose = async () => {
    let { name, password } = location.state;
    await api.closeSafe(name, password);
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-center relative">
      {entries.length > 0 ? (
        entries.map(e => <SafeEntry key={e.name} {...e} />)
      ) : (
        <div className="flex flex-col gap-1 justify-center items-center">
          <h1 className="text-5xl font-bold">This safe is empty!</h1>
          <h3 className="text-xl font-semibold">Click the + button to add an entry.</h3>
          <AddEntry safeName={location.state.name} safePassword={location.state.password}>
            <Button.Icon icon={<LuPlus size={20} />} />
          </AddEntry>
        </div>
      )}
      <BackButton action={onClose} />
    </div>
  );
};

export { SafePage };
