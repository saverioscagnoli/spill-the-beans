import { SafeInfo, SafeManagerContext } from "@renderer/contexts";
import React, { ReactNode, useState } from "react";
import { useNavigate } from "react-router-dom";

interface SafeManagerContextProviderProps {
  children: ReactNode;
}

const SafeManagerContextProvider: React.FC<SafeManagerContextProviderProps> = ({
  children
}) => {
  const navigate = useNavigate();
  const [name, setName] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const [openedSafe, setOpenedSafe] = useState<SafeInfo | null>(null);

  const switchToBank = () => {
    navigate("/", { replace: true });
    setName("");
    setPassword("");
  };

  const switchToCreateSafe = () => {
    navigate("manage/create", { replace: true });
  };

  /**
   * @param name The name of the safe to delete.
   */
  const switchToDeleteSafe = (name: string) => {
    navigate(`manage/delete/${name}`, { replace: true });
  };

  const switchToOpenSafe = (name: string) => {
    navigate(`manage/open/${name}`, { replace: true });
  };

  const switchToIcons = (name: string) => navigate(`/${name}/icons`);

  return (
    <SafeManagerContext.Provider
      value={{
        switchToBank,
        switchToCreateSafe,
        switchToDeleteSafe,
        switchToOpenSafe,

        switchToIcons,

        openedSafe: { get: () => openedSafe, set: setOpenedSafe },

        name: { get: () => name, set: setName },
        password: { get: () => password, set: setPassword }
      }}
    >
      {children}
    </SafeManagerContext.Provider>
  );
};

export { SafeManagerContextProvider };
