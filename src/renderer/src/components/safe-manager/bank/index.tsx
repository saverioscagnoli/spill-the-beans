import { SafeDisplay } from "./safe-display";
import { BankActions } from "./bank-actions";
import { BankDescription } from "./bank-description";
import { AnimateSafeManager } from "../animate-safe-manager";

const Bank = () => {
  return (
    <AnimateSafeManager>
      <BankDescription />
      <SafeDisplay />
      <BankActions />
    </AnimateSafeManager>
  );
};

export { Bank };
