import { useBoolean, useInput, useSafe } from "@renderer/hooks";
import React, { ReactNode } from "react";
import { Dialog } from "tredici";
import { IconContainer } from "./icon-container";
import { Entry } from "@renderer/pages";
import { Outlet } from "react-router-dom";

interface AddEntryProps {
  /**
   * The children of the component.
   * Note: This will be used as the trigger for the dialog.
   */
  children?: ReactNode;
}

const AddEntry: React.FC<AddEntryProps> = ({ children }) => {
  const [dialogOpen, { off: closeDialog, toggle: toggleDialogOpen }] = useBoolean();

  return (
    <Dialog open={dialogOpen} onOpenChange={toggleDialogOpen}>
      <Dialog.Trigger asChild>{children}</Dialog.Trigger>
      <Dialog.Content>
        <Outlet />
      </Dialog.Content>
    </Dialog>
  );
};

export { AddEntry };
