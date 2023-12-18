import { CreateSafeDescription } from "./create-safe-description";
import { CreateSafeActions } from "./create-safe-actions";
import { CreateSafeForm } from "./create-safe-form";
import { AnimateSafeManager } from "../animate-safe-manager";

const CreateSafe = () => {
  return (
    <AnimateSafeManager>
      <CreateSafeDescription />
      <CreateSafeForm />
      <CreateSafeActions />
    </AnimateSafeManager>
  );
};

export { CreateSafe };
