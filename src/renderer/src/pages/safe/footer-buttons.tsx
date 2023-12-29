import { useNavigate } from "react-router-dom";
import { Button, Tooltip } from "tredici";
import { RxArrowLeft } from "react-icons/rx";
import React from "react";
import { LuPlus } from "react-icons/lu";
import { AddEntry } from "@renderer/components";
import { useSafeManager } from "@renderer/hooks";

interface FooterButtonsProps {
  action?: Function;
}

const FooterButtons: React.FC<FooterButtonsProps> = ({ action }) => {
  const navigate = useNavigate();
  const { openedSafe } = useSafeManager();
  const { entries } = openedSafe.get()!;

  const isMaxEntries = entries.length >= 12;

  const onBack = () => {
    action?.();
    navigate("/");
  };

  return (
    <div className="absolute flex gap-4 bottom-0 left-0 m-4">
      <Tooltip content="Back">
        <Button.Icon colorScheme="b/w" icon={<RxArrowLeft />} onClick={onBack} />
      </Tooltip>

      {entries.length > 0 &&
        (isMaxEntries ? (
          <Tooltip content="Max number of entries reached for this safe.">
            <Button.Icon icon={<LuPlus size={20} />} disabled />
          </Tooltip>
        ) : (
          <AddEntry>
            <Button.Icon
              icon={<LuPlus size={20} />}
              disabled={entries.length >= 12}
            />
          </AddEntry>
        ))}
    </div>
  );
};

export { FooterButtons };
