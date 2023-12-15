import { Button, Dialog } from "tredici";

const ManagerActions = () => {
  return (
    <div className="w-full flex gap-2 justify-end mt-4">
      <Dialog.Close asChild>
        <Button colorScheme="gray">Close</Button>
      </Dialog.Close>
      <Button colorScheme="green" onClick={() => api.createSafe("ss", "aa")}>
        Create
      </Button>
    </div>
  );
};

export { ManagerActions };
