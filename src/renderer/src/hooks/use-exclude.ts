import { useState, ChangeEvent } from "react";

const useExclude = () => {
  const [excludeString, setExcludeString] = useState<string>("");

  const onExcludeChange = (evt: ChangeEvent<HTMLInputElement>) => {
    let newValue = removeDuplicates(evt.target.value);
    setExcludeString(newValue);
  };

  const removeDuplicates = (value: string): string => {
    let charMap: { [key: string]: boolean } = {};
    let [res, l] = ["", value.length];

    for (let i = 0; i < l; i++) {
      let char = value[i];
      if (charMap[char]) continue;
      charMap[char] = true;
      res += char;
    }
    return res;
  };

  return { excludeString, onExcludeChange };
};

export { useExclude };
