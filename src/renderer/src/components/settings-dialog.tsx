import { Settings } from "lucide-react";
import { Button, Dialog, useTheme } from "tredici";

const SettingsDialog = () => {
  const { toggle } = useTheme();

  return (
    <Dialog>
      <Dialog.Trigger asChild>
        <Button.Icon
          variant="ghost"
          colorScheme="gray"
          icon={<Settings size={20} />}
        />
      </Dialog.Trigger>
      <Dialog.Content>
        <div className="flex justify-between items-center">
          <Dialog.Title className="font-bold">Settings</Dialog.Title>
        </div>
        <Dialog.Description>
          <Button onClick={toggle}> Toggle theme</Button>
        </Dialog.Description>
        <div className="flex gap-4 mt-2 justify-end items-center">
          <Dialog.Close asChild>
            <Button colorScheme="gray">Close</Button>
          </Dialog.Close>
          <Dialog.Close asChild>
            <Button>Save</Button>
          </Dialog.Close>
        </div>
      </Dialog.Content>
    </Dialog>
  );
};

export { SettingsDialog };
