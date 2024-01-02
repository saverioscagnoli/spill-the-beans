import { InputChangeFunction, useBoolean } from "@renderer/hooks";
import { Input, useTheme } from "tredici";
import React, { useEffect, useRef } from "react";
import { ShowHideButton } from "../show-hide-button";

interface PasswordCheckProps {
  /**
   * The password of the safe (delete / open).
   */
  password: string;
  /**
   * The function to call when the password changes.
   */
  onPasswordChange: InputChangeFunction;
  /**
   * Flag that indicates if the user input the wrong password. (delete / open)
   */
  wrongPassword: boolean;

  /**
   * The label of the input.
   */
  label: string;
}

const PasswordCheck: React.FC<PasswordCheckProps> = ({
  label,
  password,
  onPasswordChange,
  wrongPassword
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [show, { toggle }] = useBoolean(true);

  useEffect(() => {
    if (inputRef.current) inputRef.current.focus({ preventScroll: true });
  }, [wrongPassword]);

  return (
    <div className="flex flex-col mt-2">
      <label htmlFor="password" className="text-sm">
        {label}
      </label>
      <div className="w-full flex gap-2 mt-1">
        <Input
          id="password"
          ref={inputRef}
          colorScheme={wrongPassword ? "crimson" : useTheme().defaultColorScheme}
          style={{ width: "calc(100% - 2.25rem)" }}
          type={show ? "password" : "text"}
          value={password}
          onChange={onPasswordChange}
        />
        <ShowHideButton show={show} toggle={toggle} />
      </div>
    </div>
  );
};

export { PasswordCheck };
