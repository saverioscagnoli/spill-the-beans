import { useBoolean, useSafeManager } from "@renderer/hooks";
import { Input } from "tredici";
import React, { ChangeEvent } from "react";
import { useTranslation } from "react-i18next";
import { ShowHideButton } from "@renderer/components/show-hide-button";
import { GeneratePasswordButton } from "@renderer/components/generate-password-button";

interface CreateSafeFormProps {
  alreadyExists: boolean;
}

const CreateSafeForm: React.FC<CreateSafeFormProps> = ({ alreadyExists }) => {
  const [show, { toggle }] = useBoolean(true);
  const { t } = useTranslation();

  const { name, password } = useSafeManager();

  const onNameChange = (evt: ChangeEvent<HTMLInputElement>) => name.set(evt.target.value);
  const onPasswordChange = (evt: ChangeEvent<HTMLInputElement>) =>
    password.set(evt.target.value);

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
            type={show ? "password" : "text"}
            value={password.get()}
            onChange={onPasswordChange}
          />
          <ShowHideButton show={show} toggle={toggle} />
          <GeneratePasswordButton setPassword={password.set} />
        </div>
        <div />
      </div>
    </div>
  );
};

export { CreateSafeForm };
