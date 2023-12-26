import { useNavigate } from "react-router-dom";
import { Button, Tooltip } from "tredici";
import { RxArrowLeft } from "react-icons/rx";
import React from "react";
import { LuPlus } from "react-icons/lu";
import { useSafe } from "@renderer/hooks";
import { AddEntry } from "@renderer/components";

interface FooterButtonProps {
  action?: Function;
}

const FooterButton: React.FC<FooterButtonProps> = ({ action }) => {
  const navigate = useNavigate();
  const { entries } = useSafe();

  const onBack = () => {
    action?.();
    navigate("/");
  };

  return (
    <div className="absolute flex gap-4 bottom-0 left-0 m-4">
      <Tooltip content="Back">
        <Button.Icon colorScheme="b/w" icon={<RxArrowLeft />} onClick={onBack} />
      </Tooltip>

      {entries.get().length > 0 && (
        <AddEntry>
          <Button.Icon icon={<LuPlus size={20} />} />
        </AddEntry>
      )}
    </div>
  );
};

export { FooterButton };
