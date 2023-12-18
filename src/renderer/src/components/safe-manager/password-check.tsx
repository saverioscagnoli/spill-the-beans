import { InputChangeFunction, useBoolean } from "@renderer/hooks";
import { Button, Input, Tooltip } from "tredici";
import { LuEye, LuEyeOff } from "react-icons/lu";
import React, { useEffect, useRef } from "react";

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
  const [type, { toggle }] = useBoolean(true);
  const [tooltipOpen, { on, off }] = useBoolean();

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
          colorScheme={wrongPassword ? "crimson" : "amethyst"}
          style={{ width: "calc(100% - 2.25rem)" }}
          type={type ? "password" : "text"}
          value={password}
          onChange={onPasswordChange}
        />
        <Tooltip content={type ? "Show" : "hide"} open={tooltipOpen}>
          <Button.Icon
            icon={type ? <LuEye size={18} /> : <LuEyeOff size={18} />}
            onClick={toggle}
            onMouseEnter={on}
            onMouseLeave={off}
          />
        </Tooltip>
      </div>
    </div>
  );
};

export { PasswordCheck };
