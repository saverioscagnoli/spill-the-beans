import React, { useState, ComponentProps, ChangeEvent } from "react";
import { Button, Input, Tooltip } from "tredici";
import { Eye, EyeOff, Dices } from "lucide-react";
import { useBool } from "@renderer/hooks";

type PasswordInputProps = ComponentProps<"div">;

const PasswordInput: React.FC<PasswordInputProps> = ({
  className,
  ...props
}) => {
  const [password, setPassword] = useState<string>("");
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
    <div className={className + "w-full flex gap-2 items-center"} {...props}>
      <Input
        type={type}
        className="w-[calc(100%-5.5rem)]"
        value={password}
        onChange={onPasswordChange}
      />

      <Tooltip open={open} content={isPassword ? "Show" : "Hide"} side="bottom">
        <Button.Icon
          icon={isPassword ? <Eye size={18} /> : <EyeOff size={18} />}
          onClick={toggleType}
          onMouseEnter={on}
          onMouseLeave={off}
        />
      </Tooltip>

      <Tooltip content="Generate password" side="bottom">
        <Button.Icon colorScheme="gray" icon={<Dices />} onClick={generate} />
      </Tooltip>
    </div>
  );
};

export { PasswordInput };
