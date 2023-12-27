import { useSafe } from "@renderer/hooks";
import React, { ReactNode } from "react";
import { Dialog } from "tredici";

interface SensitiveDataDisplayProps {
  /**
   * The children of the component.
   * Note: This will be used as the trigger for the dialog.
   */
  children: ReactNode;

  /**
   * The name of the entry.
   */
  entryName: string;
}

const SensitiveDataDisplay: React.FC<SensitiveDataDisplayProps> = ({
  children,
  entryName
}) => {
  const { entries } = useSafe();
  const entry = entries.get().find(e => e.name === entryName);

  return (
    <Dialog>
      <Dialog.Trigger asChild>{children}</Dialog.Trigger>
      <Dialog.Content>
        <Dialog.Title>Safe info</Dialog.Title>
        <Dialog.Description>
          Here you can see the information of the safe.
          <br />
          <br />
          <b>Name:</b> {entry?.name}
          <br />
          <b>Password:</b> {entry?.password}
        </Dialog.Description>
      </Dialog.Content>
    </Dialog>
  );
};

export { SensitiveDataDisplay };
