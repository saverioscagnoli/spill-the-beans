import React from "react";
import { RxInfoCircled } from "react-icons/rx";
import { Button } from "tredici";
import { SensitiveDataDisplay } from "./sensitive-data-display";
import { LuTrash2 } from "react-icons/lu";
import { DeleteEntry } from "../delete-entry";

interface SafeEntryProps {
  /**
   * The name of the entry.
   */
  name: string;
}

const SafeEntry: React.FC<SafeEntryProps> = ({ name }) => {
  return (
    <div className="w-80 h-12 flex justify-between items-center border border-gray-400/25 bg-[#fafafa] dark:bg-[#18181b] rounded-lg px-2">
      <p className="font-semibold">{name}</p>

      <div className="flex items-center gap-2">
        <DeleteEntry entryName={name}>
          <Button.Icon colorScheme="crimson" icon={<LuTrash2 size={20} />} />
        </DeleteEntry>

        <SensitiveDataDisplay entryName={name}>
          <Button.Icon icon={<RxInfoCircled size={20} />} />
        </SensitiveDataDisplay>
      </div>
    </div>
  );
};

export { SafeEntry };
