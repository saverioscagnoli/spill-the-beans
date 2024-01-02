import { DeleteSafeActions } from "./delete-safe-actions";
import { DeleteSafeDescription } from "./delete-safe-description";
import { useBoolean, useInput } from "@renderer/hooks";
import { useLocation } from "react-router-dom";
import { PasswordCheck } from "../password-check";
import { useTranslation } from "react-i18next";

const DeleteSafe = () => {
  const [password, onPasswordChange] = useInput();
  const [wrongPassword, { on }] = useBoolean();
  const { t } = useTranslation();

  const { pathname } = useLocation();
  const name = pathname.split("/").at(-1)!;

  return (
    <>
      <DeleteSafeDescription wrongPassword={wrongPassword} />
      <PasswordCheck
        label={t("safe-man-delete-confirm")}
        password={password}
        onPasswordChange={onPasswordChange}
        wrongPassword={wrongPassword}
      />
      <DeleteSafeActions name={name} password={password} toggleWrongPassword={on} />
    </>
  );
};

export { DeleteSafe };
