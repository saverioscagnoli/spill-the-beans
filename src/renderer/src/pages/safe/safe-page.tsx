import { useBoolean } from "@renderer/hooks";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Spinner } from "tredici";
import { BackButton } from "./back-button";

const SafePage = () => {
  const location = useLocation();
  const [entries, setEntries] = useState<any[]>([]);
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
      <BackButton />
      {loading ? (
        <Spinner style={{ width: "3rem", height: "3rem", animationDuration: "400ms" }} />
      ) : entries.length > 0 ? (
        entries.map(e => <p>{e.name}</p>)
      ) : (
        <p>empty</p>
      )}
    </div>
  );
};

export { SafePage };
