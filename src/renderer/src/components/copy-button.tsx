import React, { useEffect } from "react";
import { ClipboardCopy, ClipboardCheck } from "lucide-react";
import { Button, ColorScheme, Tooltip, useTheme } from "tredici";
import { useBool } from "@renderer/hooks";

interface CopyButtonProps {
  text: string;
  variant?: "solid" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  colorScheme?: ColorScheme;
}

const CopyButton: React.FC<CopyButtonProps> = ({
  text,
  colorScheme = useTheme().defaultColorScheme,
  ...props
}) => {
  const [open, { on, off }] = useBool();

  const copy = () => {
    navigator.clipboard.writeText(text);
    on();
  };

  useEffect(() => {
    if (open) {
      const timeout = setTimeout(off, 2000);
      return () => clearTimeout(timeout);
    } else return;
  }, [open]);

  return (
    <Tooltip content="Copied!" open={open}>
      <Button.Icon
        {...props}
        colorScheme={colorScheme}
        onClick={copy}
        icon={open ? <ClipboardCheck size={18} /> : <ClipboardCopy size={18} />}
      />
    </Tooltip>
  );
};

export { CopyButton };
