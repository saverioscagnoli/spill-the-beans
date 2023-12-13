import { Dispatch, SetStateAction, createContext } from "react";

export type Attribute<T> = {
  get: () => T;
  set: Dispatch<SetStateAction<T>>;
} & (T extends boolean ? { toggle: () => void } : {});

export interface PasswordGeneratorContextProps {
  /**
   * The password to be generated.
   */
  password: Attribute<string>;

  /**
   * The length of the password to be generated.
   */
  length: Attribute<number>;

  /**
   * Whether or not the password should contain numbers.
   */
  numbers: Attribute<boolean>;

  /**
   * Whether or not the password should contain symbols.
   */
  symbols: Attribute<boolean>;

  /**
   * Whether or not the password should contain uppercase letters.
   */
  uppercase: Attribute<boolean>;

  /**
   * Whether or not the password should contain lowercase letters.
   */
  lowercase: Attribute<boolean>;

  /**
   * The characters to exclude from the password.
   */
  exclude: Attribute<string>;
}

const PasswordGeneratorContext = createContext<PasswordGeneratorContextProps | null>(
  null
);

export { PasswordGeneratorContext };
