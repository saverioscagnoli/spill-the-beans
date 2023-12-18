import { DeleteSafeActions } from "./delete-safe-actions";
import { DeleteSafeDescription } from "./delete-safe-description";
import { useBoolean, useInput } from "@renderer/hooks";
import { AnimateSafeManager } from "../animate-safe-manager";
import { DeleteSafePasswordCheck } from "./delete-safe-password-check";
import { useLocation } from "react-router-dom";

const DeleteSafe = () => {
  const [password, onPasswordChange] = useInput();
  const [wrongPassword, { toggle }] = useBoolean();

  const { pathname } = useLocation();
  const name = pathname.split("/").at(-1)!;

  return (
    <AnimateSafeManager>
      <DeleteSafeDescription wrongPassword={wrongPassword} />
      <DeleteSafePasswordCheck
        password={password}
        onPasswordChange={onPasswordChange}
        wrongPassword={wrongPassword}
      />
      <DeleteSafeActions name={name} password={password} toggleWrongPassword={toggle} />
    </AnimateSafeManager>
  );
};

export { DeleteSafe };
