import { Button, Dialog } from "tredici";

const ManagerActions = () => {
  return (
    <div className="w-full flex justify-end mt-4">
      <Dialog.Close asChild>
        <Button colorScheme="gray">Close</Button>
      </Dialog.Close>
    </div>
  );
};

export { ManagerActions };
