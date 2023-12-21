import { Entry } from "@renderer/pages";
import React from "react";
import { RxInfoCircled } from "react-icons/rx";
import { Button, Tooltip } from "tredici";

const SafeEntry: React.FC<Entry> = ({ name, password, email, notes }) => {
  return (
    <div className="w-80 h-12 flex justify-between items-center border bg-[#fafafa] dark:bg-[#18181b] rounded-lg px-2">
      <p className="font-semibold">{name}</p>
      <Tooltip content="See entry info">
        <Button.Icon icon={<RxInfoCircled size={20} />} />
      </Tooltip>
    </div>
  );
};

export { SafeEntry };
