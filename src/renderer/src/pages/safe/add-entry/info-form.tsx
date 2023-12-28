import { Button, Dialog, Input, Spinner, Tooltip } from "tredici";
import { IconContainer } from "./icon-container";
import { RxEyeClosed, RxEyeOpen } from "react-icons/rx";
import { LuDices } from "react-icons/lu";
import { Entry } from "../safe-page";
import { useBoolean, useInput, useSafe } from "@renderer/hooks";

const InfoForm = () => {
  const { safe, entries } = useSafe();
  const [name, onNameChange] = useInput();
  const [password, onPasswordChange] = useInput();
  const [email, onEmailChange] = useInput();
  const [loading, { on, off }] = useBoolean();

  const [type, { toggle }] = useBoolean(true);
  const [tooltipOpen, { on: onTooltip, off: offTooltip }] = useBoolean();

  const onCreate = async () => {
    on();
    let newEntries = await api.createEntry(
      safe.name,
      safe.password,
      name,
      password,
      email
    );
    entries.set(newEntries as Entry[]);
    off();
  };

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
      .then(onPasswordChange);
  };


  return (
    <>
      <Dialog.Title>Create entry</Dialog.Title>
      <Dialog.Description>
        Here you can create a new entry. <br />
        You can personalize it by adding any information you want.
      </Dialog.Description>

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
            value={name}
            onChange={onNameChange}
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
              value={password}
              onChange={onPasswordChange}
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
            value={email}
            onChange={onEmailChange}
          />
        </div>
      </div>

      <IconContainer />

      <div className="w-full flex justify-end gap-2 mt-4">
        <Dialog.Close asChild>
          <Button colorScheme="gray">Close</Button>
        </Dialog.Close>
        <Button
          colorScheme="green"
          disabled={password.length === 0 || name.length === 0 || loading}
          onClick={onCreate}
        >
          {loading && (
            <Spinner
              className="mr-2"
              colorScheme="green"
              style={{ animationDuration: "400ms" }}
            />
          )}
          Create
        </Button>
      </div>
    </>
  );
};

export { InfoForm };
