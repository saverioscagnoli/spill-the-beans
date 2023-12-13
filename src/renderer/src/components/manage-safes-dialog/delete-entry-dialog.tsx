import React, { Dispatch, SetStateAction } from "react";
import { Trash2 } from "lucide-react";
import { Tooltip, Dialog, Button } from "tredici";
import { Safe } from ".";
import { useBool } from "@renderer/hooks";

interface DeleteSafeDialogProps {
  safeName: string;
  setSafes: Dispatch<SetStateAction<Safe[]>>;
}

const DeleteSafeDialog: React.FC<DeleteSafeDialogProps> = ({
  safeName,
  setSafes
}) => {
  const [tooltipOpen, { on, off }] = useBool();

  const deleteSafe = () => {
    api
      .deleteSafe(safeName)
      .then(() => api.getSafes())
      .then(setSafes);
  };

  return (
    <Dialog>
      <Tooltip content="Delete" open={tooltipOpen}>
        <Dialog.Trigger asChild>
          <Button.Icon
            colorScheme="crimson"
            icon={<Trash2 size={20} />}
            onMouseEnter={on}
            onMouseLeave={off}
          />
        </Dialog.Trigger>
      </Tooltip>
      <Dialog.Content>
        <Dialog.Title className="font-bold">
          Delete {safeName.replace(/.safe/g, "")}?
        </Dialog.Title>
        <Dialog.Description className="my-2 text-xl">
          Are you sure you want to delete this safe? <br />
          <strong className="mt-2">
            This cannot be undone! You will lose all your data!
          </strong>
        </Dialog.Description>

        <div className="w-full flex justify-end gap-2 mt-4">
          <Dialog.Close asChild>
            <Button colorScheme="gray">Cancel</Button>
          </Dialog.Close>
          <Button colorScheme="crimson" onClick={deleteSafe}>
            Delete
          </Button>
        </div>
      </Dialog.Content>
    </Dialog>
  );
};

export { DeleteSafeDialog };
