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
  const [loading, { on, off }] = useBoolean();

  useEffect(() => {
    let { name, password } = location.state;

    on();
    api
      .getEntries(name, password)
      .then(e => {
        setEntries(e);
        off();
      })
      .catch(err => {
        off();
        console.log(err);
      });
  }, []);

  return (
    <div className="w-full h-full flex flex-col items-center justify-center relative">
      {loading ? (
        <Spinner style={{ width: "3rem", height: "3rem", animationDuration: "400ms" }} />
      ) : entries.length > 0 ? (
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
      <BackButton />
    </div>
  );
};

export { SafePage };
