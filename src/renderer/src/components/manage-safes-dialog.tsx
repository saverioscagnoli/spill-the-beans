import { useEffect, useState } from "react";
import { Button, Dialog, Tooltip } from "tredici";
import { useNavigate } from "react-router-dom";
import { Card } from "./card";
import { Lock, DoorOpen, Trash } from "lucide-react";

const ManageSafesDialog = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [safes, setSafes] = useState<
    { name: string; created: string; path: string }[]
  >([]);

  useEffect(() => {
    api.getSafes().then(setSafes);
  }, []);

  const navigate = useNavigate();

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <Dialog.Trigger>
        <Card>
          <Lock />
          <h2 className="text-lg font-semibold">Manage safes</h2>
          <p className="text-center">
            Safes are encrypted containers that contain your passwords.
          </p>
        </Card>
      </Dialog.Trigger>
      <Dialog.Body>
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

                <Tooltip>
                  <Tooltip.Trigger>
                    <Button.Icon
                      icon={<DoorOpen size={20} />}
                      onClick={() =>
                        navigate("/safe", {
                          state: { path: s.path },
                          replace: true
                        })
                      }
                    />
                  </Tooltip.Trigger>
                  <Tooltip.Body>
                    <p>Open safe</p>
                    <Tooltip.Arrow />
                  </Tooltip.Body>
                </Tooltip>
              </div>
            </div>
          ))}
        </div>

        <div className="w-full flex gap-2 justify-end items-center">
          <Button colorScheme="gray" onClick={() => setOpen(false)}>
            Close
          </Button>
          <Button
            colorScheme="green"
            onClick={() => api.createSafe(Math.random().toString())}
          >
            Create
          </Button>
        </div>
      </Dialog.Body>
    </Dialog>
  );
};

export { ManageSafesDialog };
