import { Context, useContext } from "react";

function createContextHook<T>(context: Context<T>) {
  const useHook = () => {
    const ctx = useContext(context);

    if (ctx === null) {
      throw new Error(
        `${context.displayName} must be used within a ${context.displayName}Provider`
      );
    }

    return ctx;
  };

  return useHook;
}

export { createContextHook };
