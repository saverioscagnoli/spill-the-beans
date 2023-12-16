import { useBoolean, useSafeManager } from "@renderer/hooks";
import { Button, Input, Tooltip } from "tredici";
import { RxEyeOpen, RxEyeClosed } from "react-icons/rx";
import { LuDices } from "react-icons/lu";
import { ChangeEvent } from "react";

const CreateSafeForm = () => {
  const [type, { toggle }] = useBoolean(true);
  const [tooltipOpen, { on, off }] = useBoolean();

  const { name, password } = useSafeManager();

  const onNameChange = (evt: ChangeEvent<HTMLInputElement>) => name.set(evt.target.value);
  const onPasswordChange = (evt: ChangeEvent<HTMLInputElement>) =>
    password.set(evt.target.value);

  const onGeneratePassword = () => {
    api.generatePassword(19, true, true, true, true, "").then(password.set);
  };

  return (
    <div className="w-full flex flex-col">
      <div className=" flex flex-col mt-2">
        <label htmlFor="safe-name" className="text-sm">
          Name
        </label>
        <Input
          spellCheck={false}
          className="w-full"
          value={name.get()}
          onChange={onNameChange}
        />
      </div>

      <div className=" flex flex-col mt-2">
        <label htmlFor="safe-password" className="text-sm">
          Password
        </label>
        <div className="flex gap-1">
          <Input
            spellCheck={false}
            style={{ width: "calc(100% - 4.5rem)" }}
            type={type ? "password" : "text"}
            value={password.get()}
            onChange={onPasswordChange}
          />
          <Tooltip content={type ? "show" : "hide"} open={tooltipOpen} withArrow>
            <Button.Icon
              onClick={toggle}
              icon={type ? <RxEyeOpen /> : <RxEyeClosed />}
              onMouseEnter={on}
              onMouseLeave={off}
            />
          </Tooltip>
          <Tooltip content="Generate password" withArrow>
            <Button.Icon icon={<LuDices />} onClick={onGeneratePassword} />
          </Tooltip>
        </div>
        <div />
      </div>
    </div>
  );
};

export { CreateSafeForm };
