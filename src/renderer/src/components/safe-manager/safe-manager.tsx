import React, { ReactNode } from "react";
import { Dialog } from "tredici";
import { ManagerActions } from "./manager-actions";
import { Bank } from "./bank";

interface SafeManagerProps {
  /**
   * The children of the component.
   * Note: this will be used as the trigger for the dialog.
   */
  children: ReactNode;
}

const SafeManager: React.FC<SafeManagerProps> = ({ children }) => {
  return (
    <Dialog>
      <Dialog.Trigger>{children}</Dialog.Trigger>
      <Dialog.Content>
        <Dialog.Title>Manage safes</Dialog.Title>
        <Dialog.Description>
          You can open, add or remove safes from here.
        </Dialog.Description>

        <Bank />

        <ManagerActions />
      </Dialog.Content>
    </Dialog>
  );
};

export { SafeManager };
