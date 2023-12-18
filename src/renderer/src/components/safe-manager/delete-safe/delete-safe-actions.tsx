import { useBoolean, useSafeManager } from "@renderer/hooks";
import React from "react";
import { Button, Spinner } from "tredici";

interface DeleteSafeActionProps {
  /**
   * The name of the safe to delete.
   */
  name: string;
  /**
   * The password input from the user, used to check if the user is allowed to delete the safe.
   */
  password: string;

  /**
   * Toggles the wrong password state.
   * Used to warn the user and make the input red.
   */
  toggleWrongPassword: () => void;
}

const DeleteSafeActions: React.FC<DeleteSafeActionProps> = ({
  name,
  password,
  toggleWrongPassword
}) => {
  const { switchToBank } = useSafeManager();
  const [loading, { on, off }] = useBoolean();

  const onDelete = () => {
    on();
    api.deleteSafe(name, password).then(res => {
      off();
      if (res) switchToBank();
      else toggleWrongPassword();
    });
  };

  return (
    <div className="w-full flex justify-end gap-2 mt-4">
      <Button colorScheme="gray" onClick={switchToBank}>
        Cancel
      </Button>

      <Button colorScheme="crimson" onClick={onDelete} disabled={loading}>
        {loading && (
          <Spinner
            className="mr-2"
            colorScheme="crimson"
            style={{ animationDuration: "400ms" }}
          />
        )}
        Delete
      </Button>
    </div>
  );
};

export { DeleteSafeActions };
