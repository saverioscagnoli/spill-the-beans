import { EntryCreationContext } from "@renderer/contexts";
import { createContextHook } from "./create-context-hook";

const useEntryCreation = createContextHook(EntryCreationContext);

export { useEntryCreation };
