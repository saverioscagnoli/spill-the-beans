import { useSafeManager } from "@renderer/hooks";
import React from "react";
import { Button } from "tredici";

interface DeleteSafeActionProps {
  /**
   * The name of the safe to delete.
   */
  name: string;
  /**
   * The password input from the user, used to check if the user is allowed to delete the safe.
   */
  password: string;
}

const DeleteSafeActions: React.FC<DeleteSafeActionProps> = ({ name }) => {
  const { switchToBank } = useSafeManager();

  const onDelete = () => {
    api.deleteSafe(name).then(switchToBank);
  };

  return (
    <div className="w-full flex justify-end gap-2">
      <Button colorScheme="gray" onClick={switchToBank}>
        Cancel
      </Button>

      <Button colorScheme="crimson" onClick={onDelete}>
        Delete
      </Button>
    </div>
  );
};

export { DeleteSafeActions };
