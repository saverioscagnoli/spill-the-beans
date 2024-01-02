import { useBoolean, useEntryCreation } from "@renderer/hooks";
import React from "react";
import { useTranslation } from "react-i18next";
import { LuDices } from "react-icons/lu";
import { RxEyeClosed, RxEyeOpen } from "react-icons/rx";
import { Button, Input, Tooltip } from "tredici";

interface AddEntryFormProps {
  alreadyExists: boolean;
}

const AddEntryForm: React.FC<AddEntryFormProps> = ({ alreadyExists }) => {
  const { name, password, email } = useEntryCreation();
  const [type, { toggle }] = useBoolean(true);
  const [tooltipOpen, { on: onTooltip, off: offTooltip }] = useBoolean();
  const { t } = useTranslation();

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
          {alreadyExists && (
            <strong className="text-red-500">
              {t("create-entry-err-already-exists")}
            </strong>
          )}

          <label className="text-sm" htmlFor="name">
            {t("name")} <span className="text-red-500">*</span>
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

            <Tooltip content={type ? t("show") : t("hide")} open={tooltipOpen}>
              <Button.Icon
                onClick={toggle}
                icon={type ? <RxEyeOpen /> : <RxEyeClosed />}
                onMouseEnter={onTooltip}
                onMouseLeave={offTooltip}
              />
            </Tooltip>
            <Tooltip content={`${t("generate")} Password`}>
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
