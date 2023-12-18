import React, { ReactNode } from "react";
import { Dialog } from "tredici";
import { useSafeManager } from "@renderer/hooks";
import { Outlet } from "react-router-dom";
import { cn } from "@renderer/lib";

interface SafeManagerProps {
  children: ReactNode;
}

const SafeManager: React.FC<SafeManagerProps> = ({ children }) => {
  const { isAnimating } = useSafeManager();

  console.log(isAnimating.get());

  return (
    <Dialog>
      <Dialog.Trigger>{children}</Dialog.Trigger>
      <Dialog.Content className={cn(isAnimating.get() && "overflow-hidden")}>
        <Outlet />
      </Dialog.Content>
    </Dialog>
  );
};

export { SafeManager };
