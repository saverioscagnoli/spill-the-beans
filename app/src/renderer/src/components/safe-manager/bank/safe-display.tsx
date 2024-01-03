import { useEffect, useState } from "react";
import { Button, Tooltip } from "tredici";
import { LuDoorOpen, LuTrash2 } from "react-icons/lu";
import { cn } from "@renderer/lib";
import { useSafeManager } from "@renderer/hooks";
import { useTranslation } from "react-i18next";

/**
 * This component is a container for the safes.
 */
const SafeDisplay = () => {
  const { switchToDeleteSafe, switchToOpenSafe } = useSafeManager();
  const [safeNames, setSafeNames] = useState<string[]>([]);
  const { t } = useTranslation();

  useEffect(() => {
    api.getSafeNames().then(setSafeNames);

    ipcRenderer.on("forced-delete", () => {
      api.getSafeNames().then(setSafeNames);
    });
  }, []);

  const onDelete = (name: string) => () => switchToDeleteSafe(name);
  const onOpen = (name: string) => () => switchToOpenSafe(name);

  return (
    <div className="w-full h-72 flex flex-col mt-4 gap-2 p-2 bg-gray-300/50 dark:bg-gray-600/30 rounded-lg overflow-auto">
      {safeNames.map(name => (
        <div
          key={name}
          className={cn(
            "w-full h-12 flex justify-between items-center p-2",
            "safe-display"
          )}
        >
          <p>{name}</p>
          <div className="flex gap-2">
            <Tooltip content={t("delete")} disableHoverableContent>
              <Button.Icon
                colorScheme="crimson"
                icon={<LuTrash2 size={20} />}
                onClick={onDelete(name)}
              />
            </Tooltip>
            <Tooltip content={t("open")} disableHoverableContent>
              <Button.Icon icon={<LuDoorOpen size={20} />} onClick={onOpen(name)} />
            </Tooltip>
          </div>
        </div>
      ))}
    </div>
  );
};

export { SafeDisplay };
