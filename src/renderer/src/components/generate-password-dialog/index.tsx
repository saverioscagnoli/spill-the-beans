import { Dialog, Slider, Input, Button } from "tredici";
import { Card } from "../card";
import { Key } from "lucide-react";
import {
  useBool,
  useExclude,
  usePasswordGeneratorAttributes
} from "@renderer/hooks";
import { Attributes } from "./attributes";
import { useState } from "react";
import { CopyButton } from "../copy-button";

const GeneratePasswordDialog = () => {
  const [open, { toggle }] = useBool();
  const attributes = usePasswordGeneratorAttributes();
  const [length, setLength] = useState<number>(16);
  const { excludeString, onExcludeChange } = useExclude();
  const [result, setResult] = useState<string>("");

  const generate = () => {
    api
      .genPassword(
        length,
        attributes.numbers.get,
        attributes.symbols.get,
        attributes.lowercase.get,
        attributes.uppercase.get,
        excludeString
      )
      .then(setResult);
  };

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
        <Dialog.Title className="font-bold">Generate a password</Dialog.Title>
        <Dialog.Description>
          Select the attributes you want your password to have.
        </Dialog.Description>

        <div className="flex flex-col justify-center items-center">
          <Attributes {...attributes} />

          <div className="flex flex-col gap-1 my-4">
            <p className="text-sm">Password length</p>
            <Slider
              defaultValue={[16]}
              min={6}
              max={36}
              onValueCommit={v => setLength(v[0])}
            />
          </div>
        </div>

        <div className="flex flex-col justify-center">
          <label htmlFor="exclude">Characters to exclude</label>
          <Input
            id="exclude"
            className="w-full"
            spellCheck={false}
            value={excludeString}
            onChange={onExcludeChange}
          />
        </div>

        <div className="w-full h-20 flex items-center rounded-lg dark:bg-gray-600/50 bg-gray-300/50 my-4 relative">
          <div className="w-full flex justify-center items-center">
            {result.length > 0 ? (
              <p className="font-semibold">{result}</p>
            ) : (
              <p className="font-semibold opacity-50">
                No password generated yet.
              </p>
            )}
          </div>
          <div className="absolute right-0 mr-2">
            <CopyButton text={result} />
          </div>
        </div>

        <div className="w-full flex gap-2 justify-end">
          <Button colorScheme="gray" onClick={toggle}>
            Close
          </Button>
          <Button colorScheme="green" onClick={generate}>
            Generate
          </Button>
        </div>
      </Dialog.Body>
    </Dialog>
  );
};

export { GeneratePasswordDialog };
