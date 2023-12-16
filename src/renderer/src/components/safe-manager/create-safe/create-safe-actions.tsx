import { useSafeManager } from "@renderer/hooks";
import { Button } from "tredici";

const CreateSafeActions = () => {
  const { name, password, switchToBank } = useSafeManager();

  const onCreate = () => {
    api.createSafe(name.get(), password.get()).then(() => {});
  };

  return (
    <div className="w-full flex justify-end gap-2 mt-4">
      <Button colorScheme="gray" onClick={switchToBank}>
        Cancel
      </Button>
      <Button
        colorScheme="green"
        disabled={name.get().length == 0 || password.get().length < 6}
        onClick={onCreate}
      >
        Create
      </Button>
    </div>
  );
};

export { CreateSafeActions };
