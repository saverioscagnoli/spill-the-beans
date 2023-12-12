import { useEffect, useState } from "react";
import { Button, Dialog } from "tredici";
import { Card } from "./card";
import { Lock, Trash } from "lucide-react";
import { CreateSafeDialog } from "./create-safe-dialog";
import { OpenSafeDialog } from "./open-safe-dialog";

const ManageSafesDialog = () => {
  const [safes, setSafes] = useState<
    { name: string; created: string; path: string }[]
  >([]);

  useEffect(() => {
    api.getSafes().then(setSafes);
  }, []);

  return (
    <Dialog>
      <Dialog.Trigger>
        <Card>
          <Lock />
          <h2 className="text-lg font-semibold">Manage safes</h2>
          <p className="text-center">
            Safes are encrypted containers that contain your passwords.
          </p>
        </Card>
      </Dialog.Trigger>
      <Dialog.Content>
        <Dialog.Title className="font-bold">Manage safes</Dialog.Title>
        <Dialog.Description>
          You can open, create and delete safes here.
        </Dialog.Description>

        <div className="p-2">
          <div className="w-full !h-[0.5px] bg-gray-400/50" />
        </div>

        <div className="flex justify-between items-center">
          <p>Name</p>
          <p>Created at</p>
          <p>Actions</p>
        </div>

        <div className="w-full h-72 flex flex-col overflow-auto gap-2 p-2 mt-2 mb-6 bg-gray-400/25 rounded-xl">
          {safes.map(s => (
            <div
              key={s.name}
              className="w-full flex justify-between items-center"
            >
              <p>{s.name.replace(/.safe/g, "")}</p>
              <p>{s.created}</p>
              <div className="flex items-center gap-1">
                <Button.Icon
                  colorScheme="crimson"
                  icon={<Trash size={20} />}
                  onClick={() =>
                    api
                      .deleteSafe(s.name)
                      .then(() => api.getSafes())
                      .then(setSafes)
                  }
                />

                <OpenSafeDialog safeName={s.name} safePath={s.path} />
              </div>
            </div>
          ))}
        </div>

        <div className="w-full flex gap-2 justify-end items-center">
          <Dialog.Close asChild>
            <Button colorScheme="gray">Close</Button>
          </Dialog.Close>
          <CreateSafeDialog />
        </div>
      </Dialog.Content>
    </Dialog>
  );
};

export { ManageSafesDialog };
