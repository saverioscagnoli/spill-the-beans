import { useBoolean, useInput } from "@renderer/hooks";
import React, { ReactNode } from "react";
import { Dialog } from "tredici";
import { IconContainer } from "./icon-container";
import { Entry } from "@renderer/pages";
import { Outlet } from "react-router-dom";

interface AddEntryDialogProps {
  /**
   * The children of the component.
   * Note: This will be used as the trigger for the dialog.
   */
  children?: ReactNode;
}

const AddEntryDialog: React.FC<AddEntryDialogProps> = ({ children }) => {
  return (
    <Dialog>
      <Dialog.Trigger asChild>{children}</Dialog.Trigger>
      <Dialog.Content>
        <Outlet />
      </Dialog.Content>
    </Dialog>
  );
};

export { AddEntryDialog };
