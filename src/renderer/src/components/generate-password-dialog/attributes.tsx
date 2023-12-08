import React, { Dispatch, SetStateAction } from "react";
import { Checkbox } from "tredici";

type Attribute = {
  get: boolean | "indeterminate";
  set: Dispatch<SetStateAction<boolean | "indeterminate">>;
};

interface AttributesProps {
  numbers: Attribute;
  symbols: Attribute;
  lowercase: Attribute;
  uppercase: Attribute;
}

const Attributes: React.FC<AttributesProps> = props => {
  const { numbers, symbols, lowercase, uppercase } = props;

  return (
    <div className="w-full flex justify-between mt-2">
      <div className="flex items-center gap-1">
        <Checkbox
          id="numbers"
          checked={numbers.get}
          onCheckedChange={numbers.set}
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
          id="symbols"
          checked={symbols.get}
          onCheckedChange={symbols.set}
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
          id="lowercase"
          checked={lowercase.get}
          onCheckedChange={lowercase.set}
        />
        <label
          htmlFor="lowercase"
          className="select-none cursor-pointer font-semibold"
        >
          lowercase
        </label>
      </div>

      <div className="flex items-center gap-1">
        <Checkbox
          id="uppercase"
          checked={uppercase.get}
          onCheckedChange={uppercase.set}
        />
        <label
          htmlFor="uppercase"
          className="select-none cursor-pointer font-semibold"
        >
          Uppercase
        </label>
      </div>
    </div>
  );
};

export { Attributes };
