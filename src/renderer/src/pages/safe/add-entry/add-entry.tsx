import { IconContainer } from "./icon-container";
import { AddEntryDescription } from "./add-entry-description";
import { AddEntryActions } from "./add-entry-actions";
import { AddEntryForm } from "./add-entry-form";

const AddEntry = () => {
  return (
    <>
      <AddEntryDescription />
      <AddEntryForm />
      <IconContainer />
      <AddEntryActions />
    </>
  );
};

export { AddEntry };
