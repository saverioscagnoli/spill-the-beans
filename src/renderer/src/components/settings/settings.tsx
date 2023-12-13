import React, { ReactNode } from "react";
import { Button, Dialog, useTheme } from "tredici";

interface SettingsProps {
  /**
   * The children of the component.
   * Note: this will be used as the trigger for the dialog.
   */
  children: ReactNode;
}

const Settings: React.FC<SettingsProps> = ({ children }) => {
  const { toggle } = useTheme();

  return (
    <Dialog>
      <Dialog.Trigger asChild>{children}</Dialog.Trigger>
      <Dialog.Content>
        <Dialog.Title>Settings</Dialog.Title>
        <Button onClick={toggle}>Toggle theme</Button>
      </Dialog.Content>
    </Dialog>
  );
};

export { Settings };
