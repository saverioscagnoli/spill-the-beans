import { DeleteSafeActions } from "./delete-safe-actions";
import { DeleteSafeDescription } from "./delete-safe-description";
import { useBoolean, useInput } from "@renderer/hooks";
import { AnimateSafeManager } from "../animate-safe-manager";
import { useLocation } from "react-router-dom";
import { PasswordCheck } from "../password-check";

const DeleteSafe = () => {
  const [password, onPasswordChange] = useInput();
  const [wrongPassword, { toggle }] = useBoolean();

  const { pathname } = useLocation();
  const name = pathname.split("/").at(-1)!;

  return (
    <AnimateSafeManager>
      <DeleteSafeDescription wrongPassword={wrongPassword} />
      <PasswordCheck
        label="Please enter the password of the safe to confirm."
        password={password}
        onPasswordChange={onPasswordChange}
        wrongPassword={wrongPassword}
      />
      <DeleteSafeActions name={name} password={password} toggleWrongPassword={toggle} />
    </AnimateSafeManager>
  );
};

export { DeleteSafe };
