import { useState } from "react";

const usePasswordGeneratorAttributes = () => {
  const useCheckbox = () => {
    const [checked, setChecked] = useState<boolean | "indeterminate">(true);
    return [checked, setChecked] as const;
  };

  const [numbers, setNumbers] = useCheckbox();
  const [symbols, setSymbols] = useCheckbox();
  const [lowercase, setLowercase] = useCheckbox();
  const [uppercase, setUppercase] = useCheckbox();

  return {
    numbers: { get: numbers, set: setNumbers },
    symbols: { get: symbols, set: setSymbols },
    lowercase: { get: lowercase, set: setLowercase },
    uppercase: { get: uppercase, set: setUppercase }
  };
};

export { usePasswordGeneratorAttributes };
