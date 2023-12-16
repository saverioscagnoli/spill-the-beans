import { SafeManagerContext } from "@renderer/contexts";
import { useContext } from "react";

const useSafeManager = () => {
  const ctx = useContext(SafeManagerContext);

  if (!ctx) {
    throw new Error("useSafeManager must be used within a SafeManagerContextProvider");
  }

  return ctx;
};

export { useSafeManager };
