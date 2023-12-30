import { useBoolean, useEntryCreation } from "@renderer/hooks";
import { LuDices } from "react-icons/lu";
import { RxEyeClosed, RxEyeOpen } from "react-icons/rx";
import { Button, Input, Tooltip } from "tredici";

const AddEntryForm = () => {
  const { name, password, email } = useEntryCreation();
  const [type, { toggle }] = useBoolean(true);
  const [tooltipOpen, { on: onTooltip, off: offTooltip }] = useBoolean();

  const onGeneratePassword = () => {
    api
      .generatePassword({
        length: 19,
        numbers: true,
        symbols: true,
        lowercase: true,
        uppercase: true,
        exclude: ""
      })
      .then(password.set);
  };
  return (
    <>
      <div className="w-full flex flex-col mt-2">
        <div className="flex flex-col gap-1">
          <label className="text-sm" htmlFor="name">
            Name <span className="text-red-500">*</span>
          </label>
          <Input
            spellCheck={false}
            className="w-full"
            id="name"
            placeholder="Instagram"
            value={name.get()}
            onChange={name.set as any}
          />
        </div>
      </div>

      <div className="w-full flex flex-col mt-2">
        <div className="flex flex-col gap-1">
          <label className="text-sm" htmlFor="password">
            Password <span className="text-red-500">*</span>
          </label>
          <div className="w-full flex gap-2">
            <Input
              spellCheck={false}
              style={{ width: "calc(100% - 4.5rem)" }}
              type={type ? "password" : "text"}
              id="password"
              placeholder="********"
              value={password.get()}
              onChange={password.set as any}
            />

            <Tooltip content={type ? "show" : "hide"} open={tooltipOpen}>
              <Button.Icon
                onClick={toggle}
                icon={type ? <RxEyeOpen /> : <RxEyeClosed />}
                onMouseEnter={onTooltip}
                onMouseLeave={offTooltip}
              />
            </Tooltip>
            <Tooltip content="Generate password">
              <Button.Icon icon={<LuDices />} onClick={onGeneratePassword} />
            </Tooltip>
          </div>
        </div>
      </div>

      <div className="w-full flex flex-col mt-2">
        <div className="flex flex-col gap-1">
          <label className="text-sm" htmlFor="email">
            Email
          </label>
          <Input
            spellCheck={false}
            className="w-full"
            id="email"
            placeholder="jimmy.mcgill@gmail.com"
            value={email.get()}
            onChange={email.set as any}
          />
        </div>
      </div>
    </>
  );
};

export { AddEntryForm };
