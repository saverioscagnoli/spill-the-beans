import { Entry, SafeContext } from "@renderer/contexts";
import React, { ReactNode, useState } from "react";

interface SafeContextProviderProps {
  children: ReactNode;
  safe: { name: string; password: string };
  initialEntries: Entry[];
}

const SafeContextProvider: React.FC<SafeContextProviderProps> = ({
  children,
  safe,
  initialEntries
}) => {
  const [entries, setEntries] = useState<Entry[]>(initialEntries);

  return (
    <SafeContext.Provider
      value={{
        entries: { get: () => entries, set: setEntries },
        safe
      }}
    >
      {children}
    </SafeContext.Provider>
  );
};

export { SafeContextProvider };
