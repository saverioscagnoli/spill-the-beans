import { useBoolean, useSafeManager } from "@renderer/hooks";
import React, { ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { AlertDialog, Button, Spinner } from "tredici";

interface DeleteEntryProps {
  /**
   * The children of the component.
   * Note: This will be used as the trigger for the dialog.
   */
  children: ReactNode;

  /**
   * The name of the entry
   */
  entryName: string;
}

const DeleteEntry: React.FC<DeleteEntryProps> = ({ children, entryName }) => {
  const { openedSafe } = useSafeManager();
  const { name, password, entries } = openedSafe.get()!;
  const [dialogOpen, { toggle: toggleDialogOpen, off: closeDialog }] = useBoolean();
  const [loading, { on, off }] = useBoolean();

  const onDelete = async () => {
    on();
    let newEntries = await api.deleteEntry(name, password, entryName, entries);

    openedSafe.set({ ...openedSafe.get()!, entries: newEntries });

    off();
    closeDialog();
  };

  console.log("render")

  return (
    <AlertDialog open={dialogOpen} onOpenChange={toggleDialogOpen}>
      <AlertDialog.Trigger asChild>{children}</AlertDialog.Trigger>

      <AlertDialog.Content>
        <AlertDialog.Title>Delete {entryName}</AlertDialog.Title>
        <AlertDialog.Description>
          Are you sure you want to delete this entry?
        </AlertDialog.Description>
        <div className="w-full flex gap-2 justify-end mt-4">
          <AlertDialog.Cancel asChild>
            <Button colorScheme="gray">Cancel</Button>
          </AlertDialog.Cancel>

          <Button colorScheme="crimson" onClick={onDelete} disabled={loading}>
            {loading && (
              <Spinner
                className="mr-2"
                colorScheme="crimson"
                style={{ animationDuration: "400ms" }}
              />
            )}
            Delete
          </Button>
        </div>
      </AlertDialog.Content>
    </AlertDialog>
  );
};

export { DeleteEntry };
