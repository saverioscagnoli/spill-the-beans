import { PasswordGeneratorContext } from "@renderer/contexts";
import { useBoolean } from "@renderer/hooks";
import React, { ReactNode, useState } from "react";

interface PasswordGeneratorContextProviderProps {
  children: ReactNode;
}

const PasswordGeneratorContextProvider: React.FC<
  PasswordGeneratorContextProviderProps
> = ({ children }) => {
  const [password, setPassword] = useState<string>("");
  const [length, setLength] = useState<number>(16);
  const [numbers, { set: setNumbers, toggle: toggleNumbers }] = useBoolean(true);
  const [symbols, { set: setSymbols, toggle: toggleSymbols }] = useBoolean(true);
  const [lowercase, { set: setLowercase, toggle: toggleLowercase }] = useBoolean(true);
  const [uppercase, { set: setUppercase, toggle: toggleUppercase }] = useBoolean(true);
  const [exclude, setExclude] = useState<string>("");

  return (
    <PasswordGeneratorContext.Provider
      value={{
        password: { get: () => password, set: setPassword },
        length: { get: () => length, set: setLength },
        numbers: { get: () => numbers, set: setNumbers, toggle: toggleNumbers },
        symbols: { get: () => symbols, set: setSymbols, toggle: toggleSymbols },
        lowercase: { get: () => lowercase, set: setLowercase, toggle: toggleLowercase },
        uppercase: { get: () => uppercase, set: setUppercase, toggle: toggleUppercase },
        exclude: { get: () => exclude, set: setExclude }
      }}
    >
      {children}
    </PasswordGeneratorContext.Provider>
  );
};

export { PasswordGeneratorContextProvider };
