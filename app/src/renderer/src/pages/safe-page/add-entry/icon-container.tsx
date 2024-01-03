import { createElement } from "react";
import { Button, Tooltip } from "tredici";
import { RxDotsHorizontal } from "react-icons/rx";
import { useNavigate } from "react-router-dom";
import { useEntryCreation, useSafeManager } from "@renderer/hooks";
import { iconMap } from "@renderer/lib";
import { useTranslation } from "react-i18next";

const basicIcons = [
  "BsGoogle",
  "BsAmazon",
  "BsInstagram",
  "BsFacebook",
  "BsTwitterX",
  "BsSpotify",
  "BsSteam",
  "BsDiscord",
  "LuPiggyBank",
  "BsGithub"
];

const IconContainer = () => {
  const { openedSafe } = useSafeManager();
  const { iconName } = useEntryCreation();
  const { t } = useTranslation();

  const navigate = useNavigate();

  const switchToIcons = () => navigate(`/${openedSafe.get()!.name}/icons`);

  const onClick = (name: string) => () => {
    if (iconName.get() === name) iconName.set("");
    else iconName.set(name);
  };

  const renderer = () => {
    if (iconName.get() === "" || basicIcons.includes(iconName.get()))
      return (
        <Tooltip content={t("create-entry-other-icons")}>
          <Button.Icon
            variant="ghost"
            colorScheme="gray"
            icon={<RxDotsHorizontal size={20} />}
            onClick={switchToIcons}
          />
        </Tooltip>
      );
    else
      return (
        <Tooltip content={t("create-entry-other-icons")}>
          <Button.Icon
            colorScheme="green"
            icon={createElement(iconMap.get(iconName.get()))}
            onClick={switchToIcons}
          />
        </Tooltip>
      );
  };

  return (
    <div className="w-full flex flex-col mt-2">
      <div className="flex flex-col gap-1">
        <p className="text-sm">{t("icon")}</p>
        <div className="w-full flex justify-between items-center gap-2 h-12 px-1 rounded-lg">
          {basicIcons.map(icon => (
            <Button.Icon
              key={icon}
              colorScheme={iconName.get() === icon ? "green" : "gray"}
              icon={createElement(iconMap.get(icon))}
              onClick={onClick(icon)}
            />
          ))}

          {renderer()}
        </div>
      </div>
    </div>
  );
};

export { IconContainer };
