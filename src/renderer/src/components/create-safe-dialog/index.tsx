import { Button, Dialog, Input } from "tredici";
import { PasswordInput } from "../password-input";
import { useBool } from "@renderer/hooks";
import { useState, ChangeEvent } from "react";

const CreateSafeDialog = () => {
  const [open, { toggle, off }] = useBool();
  const [name, setName] = useState<string>("");

  const onNameChange = (evt: ChangeEvent<HTMLInputElement>) => {
    setName(evt.target.value);
  };

  return (
    <Dialog open={open} onOpenChange={toggle}>
      <Dialog.Trigger asChild>
        <Button colorScheme="green">Create</Button>
      </Dialog.Trigger>
      <Dialog.Body>
        <Dialog.Title className="font-bold">Create safe</Dialog.Title>
        <Dialog.Description>Here you can create a safe.</Dialog.Description>

        <div className="p-2">
          <div className="w-full !h-[0.5px] bg-gray-400/50" />
        </div>

        <div className="flex flex-col gap-1 justify-center mb-3">
          <label htmlFor="name">Name</label>
          <Input
            id="name"
            className="w-full"
            placeholder="cool safe"
            spellCheck={false}
            value={name}
            onChange={onNameChange}
          />
        </div>

        <div className="flex flex-col gap-1 justify-center my-3">
          <label htmlFor="password">
            Password <span className="font-bold text-red-500">*</span>
          </label>
          <PasswordInput id="password" />
        </div>

        <p className="font-bold">
          <span className="text-red-500">*</span> Do not lose / forget the
          password! If you do, you will never be able to retrieve your data!
        </p>

        <div className="w-full flex justify-end gap-2 mt-8">
          <Button colorScheme="gray" onClick={off}>
            Cancel
          </Button>
          <Button colorScheme="green" disabled={name.length === 0}>
            Create
          </Button>
        </div>
      </Dialog.Body>
    </Dialog>
  );
};

export { CreateSafeDialog };
