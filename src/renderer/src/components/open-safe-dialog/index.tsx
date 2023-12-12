import React, { useState, ChangeEvent, useEffect } from "react";
import { DoorOpen } from "lucide-react";
import { Button, Dialog, Input, Tooltip } from "tredici";
import { useNavigate } from "react-router-dom";
import { useBool } from "@renderer/hooks";

interface OpenSafeDialogProps {
  safeName: string;
  safePath: string;
}

const OpenSafeDialog: React.FC<OpenSafeDialogProps> = ({
  safeName,
  safePath
}) => {
  safeName = safeName.replace(/.safe/g, "");
  const navigate = useNavigate();
  const [unlocked, setUnlocked] = useState<boolean>(false);
  const [password, setPassword] = useState<string>("");
  const [loading, { on, off }] = useBool();

  const onPasswordChange = (evt: ChangeEvent<HTMLInputElement>) => {
    setPassword(evt.target.value);
  };

  const openSafe = () => {
    on();
    api.openSafe(safeName, password).then(res => {
      setUnlocked(res);
      off();
    });
  };

  useEffect(() => {
    if (unlocked) {
      navigate("/safe", {
        state: { path: safePath },
        replace: true
      });
    }
  }, [unlocked]);

  return (
    <Dialog>
      <Tooltip content="Open">
        <Dialog.Trigger asChild>
          <Button.Icon icon={<DoorOpen size={20} />} />
        </Dialog.Trigger>
      </Tooltip>
      <Dialog.Content>
        <Dialog.Title>Open {safeName}</Dialog.Title>
        <Dialog.Description>
          Please enter the password for {safeName}.
        </Dialog.Description>

        <Input value={password} onChange={onPasswordChange} />

        <div className="w-full flex justify-end gap-2 mt-2">
          <Dialog.Close asChild>
            <Button colorScheme="gray">Cancel</Button>
          </Dialog.Close>
          <Button colorScheme="green" onClick={openSafe} disabled={loading}>
            Open
          </Button>
        </div>
      </Dialog.Content>
    </Dialog>
  );
};

export { OpenSafeDialog };
