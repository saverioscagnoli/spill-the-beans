import React, { useState } from "react";
import { Button, Dialog, Input, Tooltip } from "tredici";
import { Dices, Plus } from "lucide-react";

interface CreateEntryDialogProps {
  path: string;
}

const CreateEntryDialog: React.FC<CreateEntryDialogProps> = ({ path }) => {
  const [name, setName] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  return (
    <Dialog>
      <Tooltip content="Create entry" side="bottom">
        <Dialog.Trigger asChild>
          <Button.Icon colorScheme="green" icon={<Plus />} />
        </Dialog.Trigger>
      </Tooltip>
      <Dialog.Content>
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
          <Tooltip content="Generate password" side="bottom">
            <Button.Icon colorScheme="gray" icon={<Dices />} />
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
      </Dialog.Content>
    </Dialog>
  );
};

export { CreateEntryDialog };
