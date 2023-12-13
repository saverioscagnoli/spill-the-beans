import { usePasswordGenerator } from "@renderer/hooks";
import { Button, Dialog } from "tredici";

const PasswordActions = () => {
  const { password, length, numbers, symbols, lowercase, uppercase, exclude } =
    usePasswordGenerator();

  const onGenerate = () => {
    api
      .generatePassword(
        length.get(),
        numbers.get(),
        symbols.get(),
        lowercase.get(),
        uppercase.get(),
        exclude.get()
      )
      .then(password.set);
  };

  return (
    <div className="w-full flex gap-2 justify-end items-center mt-4">
      <Dialog.Close asChild>
        <Button colorScheme="gray">Close</Button>
      </Dialog.Close>
      <Button colorScheme="green" onClick={onGenerate}>
        Generate
      </Button>
    </div>
  );
};

export { PasswordActions };
