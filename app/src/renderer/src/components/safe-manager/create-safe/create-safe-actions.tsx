import { useBoolean, useSafeManager } from "@renderer/hooks";
import React from "react";
import { useTranslation } from "react-i18next";
import { Button, Spinner } from "tredici";

interface CreateSafeActionsProps {
  toggleAlreadyExists: () => void;
}

const CreateSafeActions: React.FC<CreateSafeActionsProps> = ({ toggleAlreadyExists }) => {
  const { name, password, switchToBank } = useSafeManager();
  const [loading, { on, off }] = useBoolean(false);
  const { t } = useTranslation();

  const onCreate = async () => {
    on();

    let res = await api.createSafe(
      // Remove illegal characters from the filename
      name.get().replace(/[/\\?%*:|"<>]/g, ""),
      password.get()
    );

    off();

    if (res === -1) {
      toggleAlreadyExists();
      return;
    }

    switchToBank();
  };

  return (
    <div className="w-full flex justify-end gap-2 mt-4">
      <Button colorScheme="gray" onClick={switchToBank}>
        {t("cancel")}
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
        {t("create")}
      </Button>
    </div>
  );
};

export { CreateSafeActions };
