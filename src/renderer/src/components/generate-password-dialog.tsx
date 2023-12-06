import { Button, Checkbox, Dialog, Tooltip } from "tredici";
import { Card } from "./card";
import { Key, ChevronLeft, ChevronRight, ClipboardCopy } from "lucide-react";
import { useEffect, useState } from "react";

const GeneratePasswordDialog = () => {
  const [numbers, setNumbers] = useState<boolean | "indeterminate">(true);
  const [symbols, setSymbols] = useState<boolean | "indeterminate">(true);
  const [lowercase, setLowercase] = useState<boolean | "indeterminate">(true);
  const [uppercase, setUppercase] = useState<boolean | "indeterminate">(true);

  const [open, setOpen] = useState<boolean>(false);
  const [length, setLength] = useState<number>(16);

  const [minLength, maxLength] = [6, 32];

  const decrement = () => setLength(p => (p > minLength ? p - 1 : p));
  const increment = () => setLength(p => (p < maxLength ? p + 1 : p));

  const [password, setPassword] = useState<string>("");

  const gen = () => {
    api
      .genPassword(length, numbers, symbols, lowercase, uppercase)
      .then(setPassword);
  };

  const [tooltipOpen, setTooltipOpen] = useState<boolean>(false);

  useEffect(() => {
    setTimeout(() => setTooltipOpen(false), 2500);
  }, [tooltipOpen]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
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
        <Dialog.Title className="font-bold">Password generator</Dialog.Title>
        <Dialog.Description>
          Select the attributes you want your password to have.
        </Dialog.Description>

        <div className="flex flex-col gap-2 mt-4">
          <div className="w-full flex justify-between">
            <div className="flex items-center gap-1">
              <Checkbox
                checked={numbers}
                onCheckedChange={setNumbers}
                id="numbers"
              />
              <label
                htmlFor="numbers"
                className="select-none cursor-pointer font-semibold"
              >
                Numbers
              </label>
            </div>

            <div className="flex items-center gap-1">
              <Checkbox
                checked={symbols}
                onCheckedChange={setSymbols}
                id="symbols"
              />
              <label
                htmlFor="symbols"
                className="select-none cursor-pointer font-semibold"
              >
                Symbols
              </label>
            </div>

            <div className="flex items-center gap-1">
              <Checkbox
                checked={lowercase}
                onCheckedChange={setLowercase}
                id="lowercase"
              />
              <label
                htmlFor="lowercase"
                className="select-none cursor-pointer font-semibold"
              >
                Lowercase
              </label>
            </div>

            <div className="flex items-center gap-1">
              <Checkbox
                checked={uppercase}
                onCheckedChange={setUppercase}
                id="uppercase"
              />
              <label
                htmlFor="uppercase"
                className="select-none cursor-pointer font-semibold"
              >
                Uppercase
              </label>
            </div>
          </div>

          <div className="flex flex-col gap-2 items-center">
            <p className="text-sm">Password length</p>
            <div className="w-full flex justify-center items-center gap-2">
              <Button.Icon
                colorScheme="gray"
                icon={<ChevronLeft size={20} />}
                onClick={decrement}
              />
              <p className="w-8 text-center select-none font-semibold">
                {length}
              </p>
              <Button.Icon
                colorScheme="gray"
                icon={<ChevronRight size={20} />}
                onClick={increment}
              />
            </div>
          </div>

          <div className="w-full h-16 bg-gray-400/25 rounded-xl mt-4 flex justify-center items-center relative">
            <p className="font-semibold">{password.length === 0 ? "Nothing." : password}</p>
            <div className="absolute right-0 mr-4">
              <Tooltip open={tooltipOpen}>
                <Tooltip.Trigger>
                  <Button.Icon
                    colorScheme="gray"
                    icon={<ClipboardCopy size={18} />}
                    onClick={() => {
                      navigator.clipboard.writeText(password);
                      setTooltipOpen(true);
                    }}
                  />
                </Tooltip.Trigger>
                <Tooltip.Body>
                  <p>Copied!</p>
                  <Tooltip.Arrow />
                </Tooltip.Body>
              </Tooltip>
            </div>
          </div>

          <div className="w-full flex items-center justify-end gap-2 mt-4">
            <Dialog.Close>
              <Button colorScheme="gray">Close</Button>
            </Dialog.Close>
            <Button colorScheme="green" onClick={gen}>
              Generate
            </Button>
          </div>
        </div>
      </Dialog.Body>
    </Dialog>
  );
};

export { GeneratePasswordDialog };
