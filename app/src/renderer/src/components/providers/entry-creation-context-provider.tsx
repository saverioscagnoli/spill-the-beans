import { EntryCreationContext } from "@renderer/contexts";
import { useInput } from "@renderer/hooks";
import React, { Dispatch, ReactNode, SetStateAction, useState } from "react";

interface EntryCreationContextProviderProps {
  children: ReactNode;
}

type DispatchFunction = Dispatch<SetStateAction<string>>;

const EntryCreationContextProvider: React.FC<EntryCreationContextProviderProps> = ({
  children
}) => {
  const [name, onNameChange] = useInput("");
  const [password, onPasswordChange] = useInput("");
  const [email, onEmailChange] = useInput("");
  const [iconName, setIconName] = useState<string>("");

  return (
    <EntryCreationContext.Provider
      value={{
        name: { get: () => name, set: onNameChange as DispatchFunction },
        password: { get: () => password, set: onPasswordChange as DispatchFunction },
        email: { get: () => email, set: onEmailChange as DispatchFunction },
        iconName: { get: () => iconName, set: setIconName }
      }}
    >
      {children}
    </EntryCreationContext.Provider>
  );
};

export { EntryCreationContextProvider };
