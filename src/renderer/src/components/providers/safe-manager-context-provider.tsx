import { SafeManagerContext } from "@renderer/contexts";
import { useBoolean } from "@renderer/hooks";
import { Variants } from "framer-motion";
import React, { useState } from "react";

interface SafeManagerContextProviderProps {
  children: React.ReactNode;
}

const SafeManagerContextProvider: React.FC<SafeManagerContextProviderProps> = ({
  children
}) => {
  const [content, setContent] = useState<"bank" | "create-safe" | "delete-safe">("bank");
  const [name, setName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [animations, setAnimations] = useState<Variants>({
    initial: { x: 400 },
    exit: { x: -400 }
  });
  const [isAnimating, { set, toggle }] = useBoolean();

  const switchToBank = () => {
    setContent("bank");
    setName("");
    setPassword("");
    setAnimations({
      initial: { x: -400, width: "100%", height: "100%" },
      exit: { x: 400, width: "100%", height: "100%" }
    });
  };

  const switchToCreateSafe = () => {
    setContent("create-safe");
    setAnimations({
      initial: { x: 400 },
      exit: { x: -400 }
    });
  };

  const switchToDeleteSafe = () => {
    setContent("delete-safe");
    setAnimations({
      initial: { x: 400 },
      exit: { x: -400 }
    });
  };

  return (
    <SafeManagerContext.Provider
      value={{
        content,
        switchToBank,
        switchToCreateSafe,
        switchToDeleteSafe,

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
