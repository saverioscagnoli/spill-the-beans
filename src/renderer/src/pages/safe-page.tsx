import { useBoolean } from "@renderer/hooks";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Spinner } from "tredici";

const SafePage = () => {
  const location = useLocation();
  const [entries, setEntries] = useState<any[]>([]);
  const [loading, { on, off }] = useBoolean();

  useEffect(() => {
    let { name, password } = location.state;
    console.log(name, password);

    on();
    api.getEntries(name, password).then(e => {
      setEntries(e);
      off();
    }).catch((err) => {
      off();
      console.log(err);
    })
  }, []);

  return (
    <>
      {loading ? (
        <Spinner size="xl" />
      ) : entries.length > 0 ? (
        entries.map(e => <p>{e.name}</p>)
      ) : (
        <p>empty</p>
      )}
    </>
  );
};

export { SafePage };
