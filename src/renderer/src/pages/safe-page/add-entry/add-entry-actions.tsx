import { useBoolean, useEntryCreation, useSafeManager } from "@renderer/hooks";
import React, { useRef } from "react";
import { useTranslation } from "react-i18next";
import { Dialog, Button, Spinner } from "tredici";

interface AddEntryActionsProps {
  toggleAlreadyExists: () => void;
}

const AddEntryActions: React.FC<AddEntryActionsProps> = ({ toggleAlreadyExists }) => {
  const { openedSafe } = useSafeManager();
  const { name, password, email, iconName } = useEntryCreation();
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const { t } = useTranslation();

  const [loading, { on, off }] = useBoolean();

  const onCreate = async () => {
    if (openedSafe.get().entries.find(entry => entry.name === name.get())) {
      toggleAlreadyExists();
      return;
    }

    on();
    let newEntries = await api.createEntry(
      openedSafe.get()!.name,
      openedSafe.get()!.password,
      name.get(),
      password.get(),
      email.get(),
      iconName.get()
    );

    openedSafe.set({ ...openedSafe.get()!, entries: newEntries });
    off();

    closeButtonRef.current?.click();
  };

  return (
    <div className="w-full flex justify-end gap-2 mt-4">
      <Dialog.Close asChild>
        <Button ref={closeButtonRef} colorScheme="gray">
          {t("close")}
        </Button>
      </Dialog.Close>
      <Button
        colorScheme="green"
        disabled={password.get().length === 0 || name.get().length === 0 || loading}
        onClick={onCreate}
      >
        {loading && (
          <Spinner
            className="mr-2"
            colorScheme="green"
            style={{ animationDuration: "400ms" }}
          />
        )}
        {t("create")}
      </Button>
    </div>
  );
};

export { AddEntryActions };
