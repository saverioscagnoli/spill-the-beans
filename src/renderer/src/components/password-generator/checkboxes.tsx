import { Attribute } from "@renderer/contexts";
import { useBoolean, usePasswordGenerator } from "@renderer/hooks";
import { Attributes, useEffect } from "react";
import { Checkbox, Tooltip } from "tredici";

interface AttributeFormProps {
  /**
   * The children of the component.
   * Note: this will be used as the label of the checkbox, id and htmlFor.
   */
  children: string;

  /**
   * Whether the checkbox is checked or not.
   */
  checked: boolean;

  /**
   * The callback that is called when the checkbox is checked or unchecked.
   */
  onCheckedChange: () => void;
}

const AttributeForm: React.FC<AttributeFormProps> = ({
  children,
  checked,
  onCheckedChange
}) => {
  return (
    <div className="flex gap-1 items-center">
      <Checkbox id={children} checked={checked} onCheckedChange={onCheckedChange} />
      <label className="font-semibold select-none cursor-pointer" htmlFor={children}>
        {children}
      </label>
    </div>
  );
};

const Checkboxes = () => {
  const { numbers, symbols, lowercase, uppercase } = usePasswordGenerator();
  const [tooltipOpen, { on, off }] = useBoolean();

  /**
   * This function is called when a checkbox is checked or unchecked,
   * and it prevents the user to uncheck all the checkboxes.
   */
  const onCheckedChange = (attribute: Attribute<boolean>) => () => {
    const isLastChecked =
      [numbers, symbols, lowercase, uppercase].filter(attr => attr.get()).length === 1 &&
      attribute.get();

    if (!isLastChecked) {
      attribute.toggle();
      off();
    } else on();
  };

  /**
   * This effect closes the tooltip after 2 seconds.
   */
  useEffect(() => {
    if (tooltipOpen) setTimeout(off, 3000);
  }, [tooltipOpen]);

  return (
    <Tooltip
      content="At least one checkbox must always be checked!"
      open={tooltipOpen}
      withArrow={false}
      side="bottom"
    >
      <div className="w-full flex justify-between mt-2">
        <AttributeForm checked={numbers.get()} onCheckedChange={onCheckedChange(numbers)}>
          Numbers
        </AttributeForm>
        <AttributeForm checked={symbols.get()} onCheckedChange={onCheckedChange(symbols)}>
          Symbols
        </AttributeForm>
        <AttributeForm
          checked={lowercase.get()}
          onCheckedChange={onCheckedChange(lowercase)}
        >
          Lowercase
        </AttributeForm>
        <AttributeForm
          checked={uppercase.get()}
          onCheckedChange={onCheckedChange(uppercase)}
        >
          Uppercase
        </AttributeForm>
      </div>
    </Tooltip>
  );
};

export { Checkboxes };
