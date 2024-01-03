import { useState, useRef, Dispatch, SetStateAction } from "react";

const useBoolean = (
  initialValue: boolean = false
): [
  boolean,
  {
    toggle: () => void;
    on: () => void;
    off: () => void;
    set: Dispatch<SetStateAction<boolean>>;
  }
] => {
  const [value, setValue] = useState<boolean>(initialValue);

  const actions = useRef({
    toggle: () => setValue(v => !v),
    on: () => setValue(true),
    off: () => setValue(false),
    set: setValue
  });

  return [value, actions.current];
};

export { useBoolean };
