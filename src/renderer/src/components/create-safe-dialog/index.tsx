import { Button, Dialog, Input } from "tredici";
import { PasswordInput } from "../password-input";
import { useState, ChangeEvent } from "react";

const CreateSafeDialog = () => {
  const [name, setName] = useState<string>("");

  const onNameChange = (evt: ChangeEvent<HTMLInputElement>) => {
    setName(evt.target.value);
  };

  return (
    <Dialog>
      <Dialog.Trigger asChild>
        <Button colorScheme="green">Create</Button>
      </Dialog.Trigger>
      <Dialog.Content>
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
          <Dialog.Close asChild>
            <Button colorScheme="gray">Cancel</Button>
          </Dialog.Close>
          <Button
            colorScheme="green"
            disabled={name.length === 0}
            onClick={() => api.createSafe("sasa")}
          >
            Create
          </Button>
        </div>
      </Dialog.Content>
    </Dialog>
  );
};

export { CreateSafeDialog };
