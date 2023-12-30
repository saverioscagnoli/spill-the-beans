import { SettingsContext } from "@renderer/contexts";
import { createContextHook } from "./create-context-hook";

const useSettings = createContextHook(SettingsContext);

export { useSettings };
