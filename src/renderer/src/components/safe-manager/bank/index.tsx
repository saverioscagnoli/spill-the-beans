import { SafeDisplay } from "./safe-display";
import { BankActions } from "./bank-actions";
import { BankDescription } from "./bank-description";

const Bank = () => {
  return (
    <>
      <BankDescription />
      <SafeDisplay />
      <BankActions />
    </>
  );
};

export { Bank };
