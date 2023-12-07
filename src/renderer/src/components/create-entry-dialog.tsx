import React from "react";
import { Button, Dialog, Input, Tooltip } from "tredici";
import { Dices, Plus } from "lucide-react";

interface CreateEntryDialogProps {
  path: string;
}

const CreateEntryDialog: React.FC<CreateEntryDialogProps> = ({ path }) => {
  return (
    <Dialog>
      <Dialog.Trigger>
        <Tooltip>
          <Tooltip.Trigger>
            <Button.Icon icon={<Plus size={18} />} />
          </Tooltip.Trigger>
          <Tooltip.Body side="bottom">
            <p>Create entry</p>
            <Tooltip.Arrow />
          </Tooltip.Body>
        </Tooltip>
      </Dialog.Trigger>
      <Dialog.Body>
        <Dialog.Title className="font-bold">Create entry</Dialog.Title>
        <Dialog.Description>
          You can create a new entry here.
        </Dialog.Description>
        <div className="flex gap-2">
          <Input />
          <Tooltip>
            <Tooltip.Trigger>
              <Button.Icon colorScheme="gray" icon={<Dices />} />
            </Tooltip.Trigger>
            <Tooltip.Body side="bottom">
              <p>Generate password</p>
              <Tooltip.Arrow />
            </Tooltip.Body>
          </Tooltip>
        </div>

        <div className="w-full flex justify-end gap-2">
          <Button
            colorScheme="green"
            onClick={() => api.createEntry("spotify", "ziopera11", path)}
          >
            Create
          </Button>
        </div>
      </Dialog.Body>
    </Dialog>
  );
};

export { CreateEntryDialog };
