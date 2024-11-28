import { create, StateCreator } from "zustand";
import { useShallow } from "zustand/react/shallow";

/**
 * Need to create a custom hook that uses the `useShallow` hook from zustand
 * because the default hook craeted with `crate` if used like this:
 * const [foo, bar] = useStore(state => [state.foo, state.bar]);
 * causes infinite re-renders (i dont know why)
 */
const customCreate = <T>(storeInitializer: StateCreator<T, [], []>) => {
  const store = create(storeInitializer);

  // Create a custom hook that automatically applies shallow comparison
  const useStoreWithShallow = <K>(selector: (state: T) => K): K => {
    return store(useShallow(selector));
  };

  return useStoreWithShallow;
};

export { customCreate };
