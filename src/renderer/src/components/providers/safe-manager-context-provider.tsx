import { SafeManagerContext } from "@renderer/contexts";
import React, { useState } from "react";

interface SafeManagerContextProviderProps {
  children: React.ReactNode;
}

const SafeManagerContextProvider: React.FC<SafeManagerContextProviderProps> = ({
  children
}) => {
  const [content, setContent] = useState<"bank" | "create-safe">("bank");
  const [name, setName] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const switchToBank = () => setContent("bank");
  const switchToCreateSafe = () => setContent("create-safe");

  return (
    <SafeManagerContext.Provider
      value={{
        content,
        switchToBank,
        switchToCreateSafe,

        name: { get: () => name, set: setName },
        password: { get: () => password, set: setPassword }
      }}
    >
      {children}
    </SafeManagerContext.Provider>
  );
};

export { SafeManagerContextProvider };
