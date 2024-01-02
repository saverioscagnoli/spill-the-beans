import React, { ReactNode } from "react";
import { Dialog } from "tredici";
import { PasswordGeneratorContextProvider } from "../providers/password-generator-context-provider";
import { Checkboxes } from "./checkboxes";
import { PasswordDisplay } from "./password-display";
import { LengthSlider } from "./length-slider";
import { PasswordActions } from "./password-actions";
import { ExcludeCharacters } from "./exclude-characters";
import { useTranslation } from "react-i18next";

interface PasswordGeneratorProps {
  /**
   * The children of the component.
   * Note: this will be used as the trigger of the dialog.
   */
  children: ReactNode;
}

const PasswordGenerator: React.FC<PasswordGeneratorProps> = ({ children }) => {
  const { t } = useTranslation();

  return (
    <PasswordGeneratorContextProvider>
      <Dialog>
        <Dialog.Trigger>{children}</Dialog.Trigger>
        <Dialog.Content className="flex flex-col  items-center">
          <Dialog.Title className="self-start">{t("pwgen-title")}</Dialog.Title>

          <Dialog.Description>{t("pwgen-desc")}</Dialog.Description>

          <Checkboxes />

          <LengthSlider />

          <ExcludeCharacters />

          <PasswordDisplay />

          <PasswordActions />
        </Dialog.Content>
      </Dialog>
    </PasswordGeneratorContextProvider>
  );
};

export { PasswordGenerator };
