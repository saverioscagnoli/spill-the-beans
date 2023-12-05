import { LuWrench } from "react-icons/lu";
import { Button, Dialog, Tooltip, useTheme } from "tredici";

const SettingsDialog = () => {
  const { toggle } = useTheme();

  return (
    <Dialog>
      <Dialog.Trigger>
        <Tooltip delayDuration={500}>
          <Tooltip.Trigger>
            <Button.Icon icon={<LuWrench />} />
          </Tooltip.Trigger>
          <Tooltip.Body>
            <p>Settings</p>
            <Tooltip.Arrow />
          </Tooltip.Body>
        </Tooltip>
      </Dialog.Trigger>
      <Dialog.Body>
        <div className="flex justify-between items-center">
          <Dialog.Title className="font-bold">Settings</Dialog.Title>
        </div>
        <Dialog.Description>
          <Button onClick={toggle}> Toggle theme</Button>
        </Dialog.Description>
        <div className="flex gap-4 mt-2 justify-end items-center">
          <Dialog.Close>
            <Button colorScheme="gray">Close</Button>
          </Dialog.Close>
          <Dialog.Close>
            <Button>Save</Button>
          </Dialog.Close>
        </div>
      </Dialog.Body>
    </Dialog>
  );
};

export { SettingsDialog };
