import { IconContainer } from "./icon-container";
import { AddEntryDescription } from "./add-entry-description";
import { AddEntryActions } from "./add-entry-actions";
import { AddEntryForm } from "./add-entry-form";
import { useBoolean } from "@renderer/hooks";

const AddEntry = () => {
  const [alreadyExists, { on }] = useBoolean();

  return (
    <>
      <AddEntryDescription />
      <AddEntryForm alreadyExists={alreadyExists} />
      <IconContainer />
      <AddEntryActions toggleAlreadyExists={on} />
    </>
  );
};

export { AddEntry };
