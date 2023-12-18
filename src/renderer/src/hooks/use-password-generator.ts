import { PasswordGeneratorContext } from "@renderer/contexts";
import { useContext } from "react";

const usePasswordGenerator = () => {
  const ctx = useContext(PasswordGeneratorContext);

  if (!ctx) {
    throw new Error(
      "usePasswordGenerator must be used within a PasswordGeneratorContextProvider"
    );
  }

  return ctx;
};

export { usePasswordGenerator };
