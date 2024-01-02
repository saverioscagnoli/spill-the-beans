import React, { ReactNode } from "react";
import { Button, Dialog, Tabs } from "tredici";
import { ProfileTab } from "./profile-tab";
import { ThemeTab } from "./theme-tab";
import { useTranslation } from "react-i18next";

interface SettingsProps {
  /**
   * The children of the component.
   * Note: this will be used as the trigger for the dialog.
   */
  children: ReactNode;
}

const Settings: React.FC<SettingsProps> = ({ children }) => {
  const { t } = useTranslation();

  return (
    <Dialog>
      <Dialog.Trigger asChild>{children}</Dialog.Trigger>
      <Dialog.Content className="w-full h-5/6">
        <Dialog.Title>{t("settings")}</Dialog.Title>
        <Tabs defaultValue="profile">
          <div className="flex gap-4">
            <Tabs.List className="h-fit flex-col py-2 font-semibold mt-4">
              <Tabs.Trigger value="profile">{t("profile")}</Tabs.Trigger>
              <Tabs.Trigger value="theme">{t("theme")}</Tabs.Trigger>
            </Tabs.List>

            <ProfileTab />
            <ThemeTab />
          </div>
        </Tabs>

        <div className="w-full flex justify-end absolute bottom-2 right-4">
          <Dialog.Close asChild>
            <Button>{t("close")}</Button>
          </Dialog.Close>
        </div>
      </Dialog.Content>
    </Dialog>
  );
};

export { Settings };
