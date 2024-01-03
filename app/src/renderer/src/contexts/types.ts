import { Dispatch, SetStateAction } from "react";

type Attribute<T> = {
  get: () => T;
  set: Dispatch<SetStateAction<T>>;
} & (T extends boolean ? { toggle: () => void } : {});

export { type Attribute };
