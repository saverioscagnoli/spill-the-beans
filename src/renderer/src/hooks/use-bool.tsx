import { useState } from "react";

const useBool = (initialValue?: boolean) => {
  const [bool, setBool] = useState<boolean>(!!initialValue);

  const toggle = () => setBool(p => !p);
  const on = () => setBool(true);
  const off = () => setBool(false);

  return [bool, { toggle, on, off }] as const;
};

export { useBool };
