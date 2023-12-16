import { useSafeManager } from "@renderer/hooks";
import { Button, Dialog } from "tredici";

const BankActions = () => {
  const { switchToCreateSafe } = useSafeManager();

  return (
    <div className="w-full flex gap-2 justify-end mt-4">
      <Dialog.Close asChild>
        <Button colorScheme="gray">Close</Button>
      </Dialog.Close>
      <Button colorScheme="green" onClick={switchToCreateSafe}>
        Create
      </Button>
    </div>
  );
};

export { BankActions };
