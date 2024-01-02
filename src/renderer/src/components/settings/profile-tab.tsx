import { useSettings } from "@renderer/hooks";
import { ChangeEvent, useEffect, useState } from "react";
import { Input, Select, Tabs, Tooltip } from "tredici";
import { UserAvatar } from "../user-avatar";
import { useTranslation } from "react-i18next";
import i18next from "i18next";

type Language = "en" | "it";

const langMap = {
  en: "English",
  it: "Italiano"
};

const ProfileTab = () => {
  const { username, propic } = useSettings();
  const { t } = useTranslation();
  const [language, setLanguage] = useState<string>("English");

  const onUsernameChange = (evt: ChangeEvent<HTMLInputElement>) => {
    username.set(evt.target.value);
  };

  const onPropicChange = async () => {
    let res = await api.setPropic();
    if (!res) await api.resetPropic();
    propic.set(res as string);
  };

  const onLanguageChange = async (v: Language) => {
    i18next.changeLanguage(v);
    await api.setLanguage(v);
    setLanguage(langMap[v]);
  };

  return (
    <Tabs.Content value="profile">
      <div className="flex flex-col gap-8">
        <div className="flex gap-4 items-center">
          <Tooltip content={t("click-to-edit")}>
            <UserAvatar
              className="w-20 h-20 cursor-pointer"
              colorScheme="b/w"
              // @ts-ignore
              fallback={<p className="text-3xl">{username.get()[0]}</p>}
              onClick={onPropicChange}
            />
          </Tooltip>

          <Input
            spellCheck={false}
            className="w-40 text-3xl font-bold !outline-none border-none shadow-none cursor-pointer"
            value={username.get()}
            onChange={onUsernameChange}
          />
        </div>

        <div className="flex gap-4 items center">
          <p>Language</p>
          <Select onValueChange={onLanguageChange} defaultValue={i18next.language}>
            <Select.Trigger />
            <Select.Content>
              <Select.Item value="en">English</Select.Item>
              <Select.Item value="it">Italiano </Select.Item>
            </Select.Content>
          </Select>
        </div>
      </div>
    </Tabs.Content>
  );
};

export { ProfileTab };
