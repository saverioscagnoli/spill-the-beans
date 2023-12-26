import { useBoolean, useInput, useSafe } from "@renderer/hooks";
import React, { Dispatch, ReactNode, SetStateAction } from "react";
import { Button, Dialog, Input, Spinner } from "tredici";
import { IconContainer } from "./icon-container";
import { Entry } from "@renderer/pages";

interface AddEntryProps {
  /**
   * The children of the component.
   * Note: This will be used as the trigger for the dialog.
   */
  children?: ReactNode;
}

const AddEntry: React.FC<AddEntryProps> = ({ children }) => {
  const { safe, entries } = useSafe();
  const [name, onNameChange] = useInput();
  const [password, onPasswordChange] = useInput();
  const [email, onEmailChange] = useInput();
  const [loading, { on, off }] = useBoolean();

  const onCreate = async () => {
    on();
    let newEntries = await api.createEntry(
      safe.name,
      safe.password,
      name,
      password,
      email
    );
    entries.set(newEntries as Entry[]);
    off();
  };

  return (
    <Dialog>
      <Dialog.Trigger asChild>{children}</Dialog.Trigger>
      <Dialog.Content>
        <Dialog.Title>Create entry</Dialog.Title>
        <Dialog.Description>
          Here you can create a new entry. <br />
          You can personalize it by adding any information you want.
        </Dialog.Description>

        <div className="w-full flex flex-col mt-2">
          <div className="flex flex-col gap-1">
            <label className="text-sm" htmlFor="name">
              Name <span className="text-red-500">*</span>
            </label>
            <Input
              spellCheck={false}
              className="w-full"
              id="name"
              placeholder="Instagram"
              value={name}
              onChange={onNameChange}
            />
          </div>
        </div>

        <div className="w-full flex flex-col mt-2">
          <div className="flex flex-col gap-1">
            <label className="text-sm" htmlFor="password">
              Password <span className="text-red-500">*</span>
            </label>
            <div className="w-full flex gap-2">
              <Input
                spellCheck={false}
                className="w-full"
                id="password"
                placeholder="********"
                value={password}
                onChange={onPasswordChange}
              />
            </div>
          </div>
        </div>

        <div className="w-full flex flex-col mt-2">
          <div className="flex flex-col gap-1">
            <label className="text-sm" htmlFor="email">
              Email
            </label>
            <Input
              spellCheck={false}
              className="w-full"
              id="email"
              placeholder="jimmy.mcgill@gmail.com"
              value={email}
              onChange={onEmailChange}
            />
          </div>
        </div>

        <IconContainer />

        <div className="w-full flex justify-end gap-2 mt-4">
          <Dialog.Close asChild>
            <Button colorScheme="gray">Close</Button>
          </Dialog.Close>
          <Button
            colorScheme="green"
            disabled={password.length === 0 || name.length === 0 || loading}
            onClick={onCreate}
          >
            {loading && (
              <Spinner
                className="mr-2"
                colorScheme="green"
                style={{ animationDuration: "400ms" }}
              />
            )}
            Create
          </Button>
        </div>
      </Dialog.Content>
    </Dialog>
  );
};

export { AddEntry };
