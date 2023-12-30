import { PasswordGeneratorContext } from "@renderer/contexts";
import { createContextHook } from "./create-context-hook";

const usePasswordGenerator = createContextHook(PasswordGeneratorContext);

export { usePasswordGenerator };
