import { CopyButton } from "@renderer/components";
import { useSafe } from "@renderer/hooks";
import React, { ReactNode } from "react";
import { Button, Dialog } from "tredici";




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

  if (!entry) return null;

  return (
    <Dialog>
      <Dialog.Trigger asChild>{children}</Dialog.Trigger>
      <Dialog.Content>
        <Dialog.Title>Safe info</Dialog.Title>

        <div className="flex flex-col gap-2 mt-4">
          <div className="flex flex-col gap-1">
            <p className="text-sm">Name</p>
            <div className="w-full h-14 rounded-lg flex justify-center items-center bg-gray-300/50 dark:bg-gray-600/30 relative">
              <p className="font-semibold">{entry.name}</p>
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <p className="text-sm">Password</p>
            <div className="w-full h-14 rounded-lg flex justify-center items-center bg-gray-300/50 dark:bg-gray-600/30 relative">
              <p className="font-semibold">{entry.password}</p>

              <span className="absolute right-0 mr-2">
                <CopyButton text={entry.password} />
              </span>
            </div>
          </div>

          {entry.email && (
            <div className="flex flex-col gap-1">
              <p className="text-sm">Email</p>
              <div className="w-full h-14 rounded-lg flex justify-center items-center bg-gray-300/50 dark:bg-gray-600/30 relative">
                <p className="font-semibold">{entry.email}</p>

                <span className="absolute right-0 mr-2">
                  <CopyButton text={entry.email} />
                </span>
              </div>
            </div>
          )}
        </div>

        <div className="w-full flex justify-end mt-4">
          <Dialog.Close asChild>
            <Button colorScheme="gray">Close</Button>
          </Dialog.Close>
        </div>
      </Dialog.Content>
    </Dialog>
  );
};

export { SensitiveDataDisplay };
