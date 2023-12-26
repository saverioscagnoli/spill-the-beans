import { Attribute } from "@renderer/contexts/types";
import React, { ReactNode, useState } from "react";
import { Button } from "tredici";
import {
  BsGithub,
  BsSpotify,
  BsInstagram,
  BsFacebook,
  BsTwitterX,
  BsGoogle,
  BsAmazon,
  BsSteam,
  BsDiscord
} from "react-icons/bs";
import { LuPiggyBank } from "react-icons/lu";
import { TbPlanet } from "react-icons/tb";

const IconContainer = () => {
  const [selectedIcon, setSelectedIcon] = useState<string>("");
  const attribute = { get: () => selectedIcon, set: setSelectedIcon };

  return (
    <div className="w-full flex flex-col mt-2">
      <div className="flex flex-col gap-1">
        <p className="text-sm">Icon</p>
        <div className="w-full flex justify-between items-center gap-2 h-12 px-1 rounded-lg">
          <ButtonIcon icon={<BsGoogle />} label="google" selectedIcon={attribute} />
          <ButtonIcon icon={<BsAmazon />} label="amazon" selectedIcon={attribute} />
          <ButtonIcon icon={<BsInstagram />} label="instagram" selectedIcon={attribute} />
          <ButtonIcon icon={<BsFacebook />} label="facebook" selectedIcon={attribute} />
          <ButtonIcon icon={<BsTwitterX />} label="x" selectedIcon={attribute} />
          <ButtonIcon icon={<BsSpotify />} label="spotify" selectedIcon={attribute} />
          <ButtonIcon icon={<BsSteam />} label="steam" selectedIcon={attribute} />
          <ButtonIcon icon={<BsDiscord />} label="discord" selectedIcon={attribute} />
          <ButtonIcon
            icon={<LuPiggyBank />}
            label="piggy-bank"
            selectedIcon={attribute}
          />
          <ButtonIcon icon={<BsGithub />} label="github" selectedIcon={attribute} />
          <ButtonIcon icon={<TbPlanet />} label="planet" selectedIcon={attribute} />
        </div>
      </div>
    </div>
  );
};

interface ButtonIconProps {
  icon: ReactNode;
  label: string;
  selectedIcon: Attribute<string>;
}

const ButtonIcon: React.FC<ButtonIconProps> = ({ icon, label, selectedIcon }) => {
  const selected = label === selectedIcon.get();
  const onClick = (label: string) => () => {
    if (selected) selectedIcon.set("");
    else selectedIcon.set(label);
  };

  return (
    <Button.Icon
      icon={icon}
      colorScheme={selected ? "green" : "gray"}
      onClick={onClick(label)}
    />
  );
};

export { IconContainer };
