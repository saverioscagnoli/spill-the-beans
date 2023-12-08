import { Dialog, Slider } from "tredici";
import { Card } from "../card";
import { Key } from "lucide-react";
import { useBool, usePasswordGeneratorAttributes } from "@renderer/hooks";
import { Attributes } from "./attributes";

const GeneratePasswordDialog = () => {
  const [open, { toggle }] = useBool();
  const attributes = usePasswordGeneratorAttributes();

  return (
    <Dialog open={open} onOpenChange={toggle}>
      <Dialog.Trigger>
        <Card>
          <Key />
          <h2 className="text-lg font-semibold">Generate password</h2>
          <p className="text-center ">
            Generate a strong random password, based on arbitrary parameters.
          </p>
        </Card>
      </Dialog.Trigger>
      <Dialog.Body>
        <Dialog.Title>Generate a password</Dialog.Title>
        <Dialog.Description>
          Select the attributes you want your password to have.
        </Dialog.Description>

        <div className="flex flex-col justify-center items-center">
          <Attributes {...attributes} />

          <div className="flex flex-col gap-1 mt-2">
            <p className="text-sm">Password length</p>
            <Slider defaultValue={[16]} min={6} max={36} />
          </div>
        </div>
      </Dialog.Body>
    </Dialog>
  );
};

export { GeneratePasswordDialog };
