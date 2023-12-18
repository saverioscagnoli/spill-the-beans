import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const SafePage = () => {
  const location = useLocation();
  const [entries, setEntries] = useState([]);

  useEffect(() => {
    let { name, password } = location.state;
    console.log(name, password);

    api.getEntries(name, password).then(setEntries);
  }, []);

  return <>{entries.length > 0 ? entries.map(() => <h1>zioper</h1>) : <h1> empty</h1>}</>;
};

export { SafePage };
