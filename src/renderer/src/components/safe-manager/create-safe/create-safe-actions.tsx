import { useBoolean, useSafeManager } from "@renderer/hooks";
import { Button, Spinner } from "tredici";

const CreateSafeActions = () => {
  const { name, password, switchToBank } = useSafeManager();
  const [loading, { on, off }] = useBoolean(false);

  const onCreate = () => {
    on();
    api.createSafe(name.get(), password.get()).then(off);
  };

  return (
    <div className="w-full flex justify-end gap-2 mt-4">
      <Button colorScheme="gray" onClick={switchToBank}>
        Cancel
      </Button>
      <Button
        colorScheme="green"
        disabled={name.get().length == 0 || password.get().length < 6 || loading}
        onClick={onCreate}
      >
        {loading && (
          <Spinner
            colorScheme="green"
            className="mr-2"
            style={{ animationDuration: "400ms" }}
          />
        )}
        Create
      </Button>
    </div>
  );
};

export { CreateSafeActions };
