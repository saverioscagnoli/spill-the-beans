import { SafeContext } from "@renderer/contexts";
import { useContext } from "react";

const useSafe = () => {
  const ctx = useContext(SafeContext);

  if (!ctx) {
    throw new Error("useSafe must be used within a SafeProvider.");
  }

  return ctx;
};

export { useSafe };
