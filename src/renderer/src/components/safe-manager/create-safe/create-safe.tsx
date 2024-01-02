import { CreateSafeDescription } from "./create-safe-description";
import { CreateSafeActions } from "./create-safe-actions";
import { CreateSafeForm } from "./create-safe-form";

const CreateSafe = () => {
  return (
    <>
      <CreateSafeDescription />
      <CreateSafeForm />
      <CreateSafeActions />
    </>
  );
};

export { CreateSafe };