import { ChangeEvent, useState } from "react";

type InputChangeFunction = (arg: ChangeEvent<HTMLInputElement> | string) => void;

const useInput = (initialValue: string = "") => {
  const [value, setValue] = useState<string>(initialValue);

  const onChange: InputChangeFunction = arg => {
    if (typeof arg === "string") {
      setValue(arg);
    } else {
      setValue(arg.target.value);
    }
  };

  return [value, onChange] as const;
};

export { useInput, type InputChangeFunction };
