import { useBoolean, useSafeManager } from "@renderer/hooks";
import React from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { Button, Spinner } from "tredici";

interface OpenSafeActionProps {
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

const OpenSafeActions: React.FC<OpenSafeActionProps> = ({
  name,
  password,
  toggleWrongPassword
}) => {
  const navigate = useNavigate();
  const { switchToBank, openedSafe } = useSafeManager();
  const [loading, { on, off }] = useBoolean();
  const { t } = useTranslation();

  const onOpen = async () => {
    on();
    let res = await api.openSafe(name, password);
    off();

    if (res) {
      openedSafe.set({ name, password, entries: res });
      navigate(`/${name}`, { replace: true });
    } else toggleWrongPassword();
  };

  return (
    <div className="w-full flex justify-end gap-2 mt-4">
      <Button colorScheme="gray" onClick={switchToBank}>
        {t("cancel")}
      </Button>

      <Button colorScheme="green" onClick={onOpen} disabled={loading}>
        {loading && (
          <Spinner
            className="mr-2"
            colorScheme="green"
            style={{ animationDuration: "400ms" }}
          />
        )}
        {t("open")}
      </Button>
    </div>
  );
};

export { OpenSafeActions };
