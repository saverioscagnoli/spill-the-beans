import { useLocation } from "react-router-dom";
import { OpenSafeDescription } from "./open-safe-description";
import { PasswordCheck } from "../password-check";
import { useBoolean, useInput } from "@renderer/hooks";
import { OpenSafeActions } from "./open-safe-actions";

const OpenSafe = () => {
  const { pathname } = useLocation();
  const name = pathname.split("/").at(-1)!;

  const [wrongPassword, { on }] = useBoolean();
  const [password, onPasswordChange] = useInput();

  return (
    <>
      <OpenSafeDescription wrongPassword={wrongPassword} />
      <PasswordCheck
        label="Password"
        password={password}
        onPasswordChange={onPasswordChange}
        wrongPassword={wrongPassword}
      />
      <OpenSafeActions name={name} password={password} toggleWrongPassword={on} />
    </>
  );
};

export { OpenSafe };
