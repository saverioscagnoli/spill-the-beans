import React from "react";
import { Dialog } from "tredici";

interface DeleteSafeDescriptionProps {
  /**
   * Flag that indicates if the user input the wrong password.
   */
  wrongPassword: boolean;
}

const DeleteSafeDescription: React.FC<DeleteSafeDescriptionProps> = ({
  wrongPassword
}) => {
  return (
    <>
      <Dialog.Title>Delete safe</Dialog.Title>
      <Dialog.Description>
        Are you sure that you want to delete this safe? <br />
        <strong>This action cannot be undone.</strong>
        {wrongPassword && (
          <>
            <br />
            <strong className="text-red-500">The password you entered is wrong.</strong>
          </>
        )}
      </Dialog.Description>
    </>
  );
};

export { DeleteSafeDescription };
