import { ChangeEvent, useState } from "react";

type InputChangeFunction = (arg: ChangeEvent<HTMLInputElement> | string) => void;

const useInput = (initialValue: string = "", lowercase?: boolean) => {
  const [value, setValue] = useState<string>(initialValue);

  const onChange: InputChangeFunction = arg => {
    if (typeof arg === "string") {
      setValue(lowercase ? arg.toLowerCase() : arg);
    } else {
      setValue(lowercase ? arg.target.value.toLowerCase() : arg.target.value);
    }
  };

  return [value, onChange] as const;
};

export { useInput, type InputChangeFunction };
