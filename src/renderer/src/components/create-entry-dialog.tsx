import React, { useState } from "react";
import { Button, Dialog, Input, Tooltip } from "tredici";
import { Dices, Plus } from "lucide-react";
import { useBool } from "@renderer/hooks";

interface CreateEntryDialogProps {
  path: string;
}

const CreateEntryDialog: React.FC<CreateEntryDialogProps> = ({ path }) => {
  const [open, { toggle }] = useBool();
  const [name, setName] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  return (
    <Dialog open={open} onOpenChange={toggle}>
      <Tooltip>
        <Tooltip.Trigger>
          <Button.Icon icon={<Plus size={18} />} onClick={toggle} />
        </Tooltip.Trigger>
        <Tooltip.Body side="bottom">
          <p>Create entry</p>
          <Tooltip.Arrow />
        </Tooltip.Body>
      </Tooltip>
      <Dialog.Body>
        <Dialog.Title className="font-bold">Create entry</Dialog.Title>
        <Dialog.Description>
          You can create a new entry here.
        </Dialog.Description>

        <div className="flex gap-2">
          <Input
            placeholder="name"
            value={name}
            onChange={evt => setName(evt.target.value)}
          />
        </div>

        <div className="flex gap-2">
          <Input
            value={password}
            onChange={evt => setPassword(evt.target.value)}
          />
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
            onClick={() => api.createEntry(name, password, path)}
          >
            Create
          </Button>
        </div>
      </Dialog.Body>
    </Dialog>
  );
};

export { CreateEntryDialog };
