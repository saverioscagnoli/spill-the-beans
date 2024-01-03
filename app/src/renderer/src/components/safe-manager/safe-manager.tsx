import React, { ReactNode } from "react";
import { Dialog } from "tredici";
import { Outlet } from "react-router-dom";

interface SafeManagerProps {
  children: ReactNode;
}

const SafeManager: React.FC<SafeManagerProps> = ({ children }) => {
  return (
    <Dialog>
      <Dialog.Trigger>{children}</Dialog.Trigger>
      <Dialog.Content>
        <Outlet />
      </Dialog.Content>
    </Dialog>
  );
};

export { SafeManager };
