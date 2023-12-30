import {  SafeInfo, SafeManagerContext } from "@renderer/contexts";
import { useBoolean } from "@renderer/hooks";
import { Variants } from "framer-motion";
import React, { ReactNode, useEffect, useState } from "react";
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
  const [animations, setAnimations] = useState<Variants>({
    initial: { x: 400 },
    exit: { x: -400 }
  });

  const [isAnimating, { set, toggle }] = useBoolean();

  const [openedSafe, setOpenedSafe] = useState<SafeInfo | null>(null);

  useEffect(() => {
    if (!isAnimating) {
      setAnimations({
        initial: { x: 0 },
        exit: { x: 0 }
      });
    }
  }, [isAnimating]);

  const switchToBank = () => {
    navigate("/", { replace: true });
    setName("");
    setPassword("");
    setAnimations({
      initial: { x: -400, width: "100%", height: "100%" },
      exit: { x: 400, width: "100%", height: "100%" }
    });
  };

  const switchToCreateSafe = () => {
    navigate("manage/create", { replace: true });
    setAnimations({
      initial: { x: 400 },
      exit: { x: -400 }
    });
  };

  /**
   * @param name The name of the safe to delete.
   */
  const switchToDeleteSafe = (name: string) => {
    navigate(`manage/delete/${name}`, { replace: true });
    setAnimations({
      initial: { x: 400 },
      exit: { x: -400 }
    });
  };

  const switchToOpenSafe = (name: string) => {
    navigate(`manage/open/${name}`, { replace: true });
    setAnimations({
      initial: { x: 400 },
      exit: { x: -400 }
    });
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
        password: { get: () => password, set: setPassword },
        animations,
        isAnimating: { get: () => isAnimating, set, toggle }
      }}
    >
      {children}
    </SafeManagerContext.Provider>
  );
};

export { SafeManagerContextProvider };
