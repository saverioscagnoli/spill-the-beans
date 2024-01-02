import { ChangeEvent } from "react";
import { usePasswordGenerator } from "@renderer/hooks";
import { Input } from "tredici";
import { removeDuplicates } from "@renderer/lib";
import { useTranslation } from "react-i18next";

const ExcludeCharacters = () => {
  const { exclude } = usePasswordGenerator();
  const { t } = useTranslation();

  const onExcludeChange = (evt: ChangeEvent<HTMLInputElement>) => {
    let str = removeDuplicates(evt.target.value);
    exclude.set(str);
  };

  return (
    <div className="w-full flex flex-col mt-2">
      <label className="text-sm">{t("pwgen-to-exclude")}</label>
      <Input
        spellCheck={false}
        className="w-full mt-1"
        value={exclude.get()}
        onChange={onExcludeChange}
      />
    </div>
  );
};

export { ExcludeCharacters };
