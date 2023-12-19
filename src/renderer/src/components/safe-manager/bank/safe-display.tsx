import { useEffect, useState } from "react";
import { Button, Tooltip } from "tredici";
import { LuDoorOpen, LuTrash2 } from "react-icons/lu";
import { cn } from "@renderer/lib";
import { useSafeManager } from "@renderer/hooks";

interface Safe {
  name: string;
  path: string;
}

/**
 * This component is a container for the safes.
 */
const SafeDisplay = () => {
  const { switchToDeleteSafe, switchToOpenSafe } = useSafeManager();
  const [safes, setSafes] = useState<Safe[]>([]);

  console.log(safes);

  useEffect(() => {
    api.getSafes().then(setSafes);
  }, []);

  const onDelete = (name: string) => () => switchToDeleteSafe(name);
  const onOpen = (name: string) => () => switchToOpenSafe(name);

  return (
    <div className="w-full h-72 flex flex-col mt-4 gap-2 p-2 bg-gray-300/50 dark:bg-gray-600/30 rounded-lg overflow-auto">
      {safes.map(safe => (
        <div
          key={safe.path}
          className={cn(
            "w-full h-12 flex justify-between items-center p-2",
            "safe-display"
          )}
        >
          <p>{safe.name}</p>
          <div className="flex gap-2">
            <Tooltip content="Delete" disableHoverableContent>
              <Button.Icon
                colorScheme="crimson"
                icon={<LuTrash2 size={20} />}
                onClick={onDelete(safe.name)}
              />
            </Tooltip>
            <Tooltip content="Open" disableHoverableContent>
              <Button.Icon icon={<LuDoorOpen size={20} />} onClick={onOpen(safe.name)} />
            </Tooltip>
          </div>
        </div>
      ))}
    </div>
  );
};

export { SafeDisplay };
