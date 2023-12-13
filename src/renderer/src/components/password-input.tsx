import React, {
  useState,
  ComponentProps,
  ChangeEvent,
  Dispatch,
  SetStateAction
} from "react";
import { Button, Input, Tooltip } from "tredici";
import { Eye, EyeOff, Dices } from "lucide-react";
import { useBool } from "@renderer/hooks";

interface PasswordInputProps extends ComponentProps<"div"> {
  inputId?: string;
  password: string;
  setPassword: Dispatch<SetStateAction<string>>;
  inputClassName?: string;
  withRandomGenerator?: boolean;
}

const PasswordInput: React.FC<PasswordInputProps> = ({
  className = "",
  inputClassName = "",
  inputId = "",
  password,
  setPassword,
  withRandomGenerator = true,
  ...props
}) => {
  const [open, { on, off }] = useBool();
  const [type, setType] = useState<"password" | "text">("password");
  const isPassword = type === "password";
  const toggleType = () => setType(isPassword ? "text" : "password");

  const onPasswordChange = (evt: ChangeEvent<HTMLInputElement>) => {
    setPassword(evt.target.value);
  };

  const generate = () => {
    api
      .genPassword(
        [16, 17, 18][Math.floor(Math.random() * 3)],
        true,
        true,
        true,
        true,
        ""
      )
      .then(setPassword);
  };

  return (
    <div
      className={className + " w-full flex justify-between items-center gap-2"}
      {...props}
    >
      <Input
        type={type}
        className={inputClassName + " flex-grow"}
        value={password}
        onChange={onPasswordChange}
        id={inputId}
      />

      <div className="flex items-center gap-2">
        <Tooltip
          open={open}
          content={isPassword ? "Show" : "Hide"}
          side="bottom"
        >
          <Button.Icon
            icon={isPassword ? <Eye size={18} /> : <EyeOff size={18} />}
            onClick={toggleType}
            onMouseEnter={on}
            onMouseLeave={off}
          />
        </Tooltip>

        {withRandomGenerator && (
          <Tooltip content="Generate password" side="bottom">
            <Button.Icon
              colorScheme="gray"
              icon={<Dices />}
              onClick={generate}
            />
          </Tooltip>
        )}
      </div>
    </div>
  );
};

export { PasswordInput };
