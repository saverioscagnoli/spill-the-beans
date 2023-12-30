import { SafeManagerContext } from "@renderer/contexts";
import { createContextHook } from "./create-context-hook";

const useSafeManager = createContextHook(SafeManagerContext);

export { useSafeManager };
