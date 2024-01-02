import { useNavigate } from "react-router-dom";
import { Button, Tooltip } from "tredici";
import { RxArrowLeft } from "react-icons/rx";
import React from "react";
import { LuPlus } from "react-icons/lu";
import { AddEntryDialog } from "@renderer/pages";
import { useSafeManager } from "@renderer/hooks";
import { EntryCreationContextProvider } from "@renderer/components";
import { useTranslation } from "react-i18next";

interface FooterButtonsProps {
  action?: Function;
}

const FooterButtons: React.FC<FooterButtonsProps> = ({ action }) => {
  const navigate = useNavigate();
  const { openedSafe } = useSafeManager();
  const { entries } = openedSafe.get()!;
  const { t } = useTranslation();

  const isMaxEntries = entries.length >= 12;

  const onBack = () => {
    action?.();
    navigate("/");
  };

  return (
    <div className="absolute flex gap-4 bottom-0 left-0 m-4">
      <Tooltip content={t("back")}>
        <Button.Icon colorScheme="b/w" icon={<RxArrowLeft />} onClick={onBack} />
      </Tooltip>

      {entries.length > 0 &&
        (isMaxEntries ? (
          <Tooltip content={t("max-entries-reached")}>
            <Button.Icon icon={<LuPlus size={20} />} disabled />
          </Tooltip>
        ) : (
          <EntryCreationContextProvider>
            <AddEntryDialog>
              <Button.Icon icon={<LuPlus size={20} />} disabled={entries.length >= 12} />
            </AddEntryDialog>
          </EntryCreationContextProvider>
        ))}
    </div>
  );
};

export { FooterButtons };
