import { CreateSafeDescription } from "./create-safe-description";
import { CreateSafeActions } from "./create-safe-actions";
import { CreateSafeForm } from "./create-safe-form";
import { useBoolean } from "@renderer/hooks";

const CreateSafe = () => {
  const [alreadyExist, { on }] = useBoolean();

  return (
    <>
      <CreateSafeDescription />
      <CreateSafeForm alreadyExists={alreadyExist} />
      <CreateSafeActions toggleAlreadyExists={on} />
    </>
  );
};

export { CreateSafe };
