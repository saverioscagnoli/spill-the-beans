import React, { ReactNode } from "react";
import { Button, Dialog, Tabs } from "tredici";
import { ProfileTab } from "./profile-tab";
import { ThemeTab } from "./theme-tab";

interface SettingsProps {
  /**
   * The children of the component.
   * Note: this will be used as the trigger for the dialog.
   */
  children: ReactNode;
}

const Settings: React.FC<SettingsProps> = ({ children }) => {
  return (
    <Dialog>
      <Dialog.Trigger asChild>{children}</Dialog.Trigger>
      <Dialog.Content className="w-full">
        <Dialog.Title>Settings</Dialog.Title>
        <Tabs defaultValue="profile">
          <div className="flex gap-4">
            <Tabs.List className="h-fit flex-col py-2 font-semibold mt-4">
              <Tabs.Trigger value="profile">Profile</Tabs.Trigger>
              <Tabs.Trigger value="theme">Theme</Tabs.Trigger>
            </Tabs.List>

            <ProfileTab />
            <ThemeTab />
          </div>
        </Tabs>

        <div className="w-full flex justify-end">
          <Dialog.Close asChild>
            <Button>Close</Button>
          </Dialog.Close>
        </div>
      </Dialog.Content>
    </Dialog>
  );
};

export { Settings };
