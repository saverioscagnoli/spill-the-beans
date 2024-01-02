import { GeneratePasswordButton, ShowHideButton } from "@renderer/components";
import { useBoolean, useEntryCreation } from "@renderer/hooks";
import React from "react";
import { useTranslation } from "react-i18next";
import { Input } from "tredici";

interface AddEntryFormProps {
  /**
   * Flag to toggle the "already exists" error message.
   */
  alreadyExists: boolean;
}

const AddEntryForm: React.FC<AddEntryFormProps> = ({ alreadyExists }) => {
  const { name, password, email } = useEntryCreation();
  const [show, { toggle }] = useBoolean(true);
  const { t } = useTranslation();

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
              type={show ? "password" : "text"}
              id="password"
              value={password.get()}
              onChange={password.set as any}
            />

            <ShowHideButton show={show} toggle={toggle} />

            <GeneratePasswordButton setPassword={password.set} />
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
            value={email.get()}
            onChange={email.set as any}
          />
        </div>
      </div>
    </>
  );
};

export { AddEntryForm };
