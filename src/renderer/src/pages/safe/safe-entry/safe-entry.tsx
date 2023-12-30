import React, { createElement } from "react";
import { RxInfoCircled } from "react-icons/rx";
import { Button } from "tredici";
import { SensitiveDataDisplay } from "./sensitive-data-display";
import { LuKey, LuTrash2 } from "react-icons/lu";
import { DeleteEntry } from "../delete-entry";
import { iconMap } from "@renderer/lib";
import { useSafeManager } from "@renderer/hooks";

interface SafeEntryProps {
  /**
   * The name of the entry.
   */
  name: string;
}

const SafeEntry: React.FC<SafeEntryProps> = ({ name }) => {
  const { openedSafe } = useSafeManager();
  const { entries } = openedSafe.get()!;

  const entry = entries.find(e => e.name === name)!;

  console.log(entry);

  return (
    <div className="w-80 h-12 flex bg-[#fafafa] dark:bg-[#18181b] border border-gray-400/25 rounded-lg">
      <div className="w-1/6 flex items-center justify-center">
        {entry.icon && iconMap.has(entry.icon) ? (
          createElement(iconMap.get(entry.icon))
        ) : (
          <LuKey />
        )}
      </div>

      <div className="w-5/6 flex justify-between items-center pl-2 border-l border-l-gray-400/25">
        <p className="font-semibold">{name}</p>

        <div className="flex items-center gap-2 pr-1">
          <DeleteEntry entryName={name}>
            <Button.Icon colorScheme="crimson" icon={<LuTrash2 size={20} />} />
          </DeleteEntry>

          <SensitiveDataDisplay entryName={name}>
            <Button.Icon icon={<RxInfoCircled size={20} />} />
          </SensitiveDataDisplay>
        </div>
      </div>
    </div>
  );
};

export { SafeEntry };
