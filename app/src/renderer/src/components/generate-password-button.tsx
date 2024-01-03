import React, { Dispatch, SetStateAction, MouseEvent } from "react";
import { useTranslation } from "react-i18next";
import { Button, type ButtonProps, Tooltip } from "tredici";
import { LuDices } from "react-icons/lu";
import { useBoolean } from "@renderer/hooks";

interface GeneratePasswordButtonProps extends ButtonProps {
  setPassword: Dispatch<SetStateAction<string>>;
}

const GeneratePasswordButton: React.FC<GeneratePasswordButtonProps> = ({
  setPassword,
  onClick,
  onMouseEnter,
  onMouseLeave,
  ...props
}) => {
  const { t } = useTranslation();
  const [open, { on, off }] = useBoolean();

  const generatePassword = async (evt: MouseEvent<HTMLButtonElement>) => {
    let pw = await api.generatePassword();
    setPassword(pw);

    onClick?.(evt);
  };

  const onEnter = (evt: MouseEvent<HTMLButtonElement>) => {
    on();
    onMouseEnter?.(evt);
  };

  const onLeave = (evt: MouseEvent<HTMLButtonElement>) => {
    off();
    onMouseLeave?.(evt);
  };

  return (
    <Tooltip open={open} content={`${t("generate")} Password`}>
      <Button.Icon
        {...props}
        icon={<LuDices size={20} />}
        onClick={generatePassword}
        onMouseEnter={onEnter}
        onMouseLeave={onLeave}
      />
    </Tooltip>
  );
};

export { GeneratePasswordButton };
