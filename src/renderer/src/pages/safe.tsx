import { CreateEntryDialog, Navbar } from "@renderer/components";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

interface SafePageProps {
  username: string;
}

const SafePage: React.FC<SafePageProps> = ({ username }) => {
  const location: { state: { path: string } } = useLocation();
  const { path } = location.state;
  const [entries, setEntries] = useState<any[]>();

  useEffect(() => {
    api.getEntries(path).then(setEntries);
  }, []);

  console.log(entries);

  return (
    <>
      <Navbar username={username} />
      <div className="h-[calc(100%-4rem)] flex flex-col justify-between items-center gap-4">
        {entries && entries.length > 0 ? (
          entries.map(e => <p key={e.id}>{e.id} - {e.password}</p>)
        ) : (
          <div className="flex flex-col items-center gap-4 mt-32">
            <h1 className="text-5xl font-bold select-none ">
              There&apos;s nothing to see here!
            </h1>
            <CreateEntryDialog path={path} />
          </div>
        )}
      </div>
    </>
  );
};

export { SafePage };
