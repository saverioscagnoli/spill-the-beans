import React, { useState, useEffect } from "react";
import { Button, Dialog, Spinner, Tooltip } from "tredici";
import { useNavigate } from "react-router-dom";
import { useBool } from "@renderer/hooks";
import { PasswordInput } from "../password-input";
import { DoorOpen } from "lucide-react";

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
  const [failed, setFailed] = useState<boolean>(false);
  const [password, setPassword] = useState<string>("");
  const [loading, { on, off }] = useBool();

  const openSafe = () => {
    on();
    api.openSafe(safeName, password).then(res => {
      if (res) {
        setUnlocked(res);
      } else {
        setFailed(true);
      }
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
          <Button.Icon  icon={<DoorOpen size={20} />} />
        </Dialog.Trigger>
      </Tooltip>
      <Dialog.Content>
        <Dialog.Title className="font-bold">Open {safeName}</Dialog.Title>
        <Dialog.Description>
          Please enter the password for {safeName}.
        </Dialog.Description>

        <PasswordInput
          password={password}
          setPassword={setPassword}
          inputClassName={failed ? "outline outline-[2px] outline-red-500" : ""}
          className="w-full"
          withRandomGenerator={false}
        />

        {failed && (
          <div className="text-red-500 text-sm mt-2">
            The password you entered is incorrect.
          </div>
        )}

        <div className="w-full flex justify-end gap-2 mt-2">
          <Dialog.Close asChild>
            <Button colorScheme="gray">Cancel</Button>
          </Dialog.Close>
          <Button colorScheme="green" onClick={openSafe} disabled={loading}>
            {loading && (
              <Spinner
                colorScheme="green"
                size="sm"
                className="mr-2"
                style={{ animationDuration: "400ms" }}
              />
            )}
            Open
          </Button>
        </div>
      </Dialog.Content>
    </Dialog>
  );
};

export { OpenSafeDialog };
