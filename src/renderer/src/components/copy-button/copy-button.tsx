import React, { useEffect } from "react";
import { Button, ButtonProps, Tooltip } from "tredici";
import { LuClipboardCopy } from "react-icons/lu";
import { RxCheck } from "react-icons/rx";
import { useBoolean } from "@renderer/hooks";
import { useTranslation } from "react-i18next";

interface CopyButtonProps extends ButtonProps {
  /**
   * The text to copy to the clipboard.
   */
  text: string;
}

const CopyButton: React.FC<CopyButtonProps> = ({ text, colorScheme, ...props }) => {
  const [copied, { on, off }] = useBoolean();
  const { t } = useTranslation();

  useEffect(() => {
    if (copied) setTimeout(off, 2000);
  }, [copied]);

  const onCopy = () => {
    navigator.clipboard.writeText(text);
    on();
  };

  return (
    <Tooltip content={t("copied")} open={copied}>
      <Button.Icon
        {...props}
        className="disabled:cursor-default"
        colorScheme={copied ? "green" : colorScheme}
        icon={copied ? <RxCheck size={20} /> : <LuClipboardCopy size={20} />}
        disabled={copied}
        onClick={onCopy}
      />
    </Tooltip>
  );
};

export { CopyButton };
