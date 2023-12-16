import React from "react";
import { DeleteSafeActions } from "./delete-safe-actions";
import { DeleteSafeDescription } from "./delete-safe-description";
import { useInput } from "@renderer/hooks";

interface DeleteSafeProps {
  /**
   * The name of the safe to delete.
   */
  name: string;
}

const DeleteSafe: React.FC<DeleteSafeProps> = ({ name }) => {
  const [password, onPasswordChange] = useInput();

  return (
    <>
      <DeleteSafeDescription />
      <DeleteSafeActions name={name} password={password} />
    </>
  );
};

export { DeleteSafe };
