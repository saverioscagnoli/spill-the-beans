import { useBoolean } from "@renderer/hooks";
import React, { MouseEvent, ReactNode } from "react";
import { useTranslation } from "react-i18next";
import { RxEyeClosed, RxEyeOpen } from "react-icons/rx";
import { Button, Tooltip, type ButtonProps } from "tredici";

interface ShowHideButtonProps extends ButtonProps {
  /**
   * Wheter the button should show or hide the content.
   */
  show: boolean;

  /**
   * The function to call when the button is clicked.
   */
  toggle: () => void;

  /**
   * The icon to show when the content is hidden.
   */
  showIcon?: ReactNode;

  /**
   * The icon to show when the content is revealed.
   */
  hideIcon?: ReactNode;
}

const ShowHideButton: React.FC<ShowHideButtonProps> = ({
  show,
  showIcon = <RxEyeOpen size={19} />,
  hideIcon = <RxEyeClosed size={19} />,
  toggle,
  onClick,
  onMouseEnter,
  onMouseLeave,
  ...props
}) => {
  const [open, { on, off }] = useBoolean();
  const { t } = useTranslation();

  const onToggle = (evt: MouseEvent<HTMLButtonElement>) => {
    toggle();
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
    <Tooltip open={open} content={show ? t("show") : t("hide")}>
      <Button.Icon
        {...props}
        onClick={onToggle}
        icon={show ? showIcon : hideIcon}
        onMouseEnter={onEnter}
        onMouseLeave={onLeave}
      />
    </Tooltip>
  );
};

export { ShowHideButton };
