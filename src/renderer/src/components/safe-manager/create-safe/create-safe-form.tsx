import { useBoolean, useSafeManager } from "@renderer/hooks";
import { Button, Input, Tooltip } from "tredici";
import { RxEyeOpen, RxEyeClosed } from "react-icons/rx";
import { LuDices } from "react-icons/lu";
import React, { ChangeEvent } from "react";
import { useTranslation } from "react-i18next";

interface CreateSafeFormProps {
  alreadyExists: boolean;
}

const CreateSafeForm: React.FC<CreateSafeFormProps> = ({ alreadyExists }) => {
  const [type, { toggle }] = useBoolean(true);
  const [tooltipOpen, { on, off }] = useBoolean();
  const { t } = useTranslation();

  const { name, password } = useSafeManager();

  const onNameChange = (evt: ChangeEvent<HTMLInputElement>) => name.set(evt.target.value);
  const onPasswordChange = (evt: ChangeEvent<HTMLInputElement>) =>
    password.set(evt.target.value);

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
    <div className="w-full flex flex-col">
      <div className=" flex flex-col mt-2">
        {alreadyExists && (
          <strong className="text-red-500">{t("safe-man-err-already-exists")}</strong>
        )}
        <label htmlFor="safe-name" className="text-sm">
          {t("name")} <span className="text-red-500">*</span>
        </label>
        <Input
          spellCheck={false}
          className="w-full mt-1"
          value={name.get()}
          onChange={onNameChange}
        />
      </div>

      <div className=" flex flex-col mt-2">
        <label htmlFor="safe-password" className="text-sm">
          Password <span className="text-red-500">*</span>
        </label>
        <div className="flex gap-1 mt-1">
          <Input
            spellCheck={false}
            style={{ width: "calc(100% - 4.5rem)" }}
            type={type ? "password" : "text"}
            value={password.get()}
            onChange={onPasswordChange}
          />
          <Tooltip content={type ? t("show") : t("hide")} open={tooltipOpen} withArrow>
            <Button.Icon
              onClick={toggle}
              icon={type ? <RxEyeOpen /> : <RxEyeClosed />}
              onMouseEnter={on}
              onMouseLeave={off}
            />
          </Tooltip>
          <Tooltip content={`${t("generate")} Password`} withArrow>
            <Button.Icon icon={<LuDices />} onClick={onGeneratePassword} />
          </Tooltip>
        </div>
        <div />
      </div>
    </div>
  );
};

export { CreateSafeForm };
