import { useSafeManager } from "@renderer/hooks";
import { useTranslation } from "react-i18next";
import { Button, Dialog } from "tredici";

const BankActions = () => {
  const { switchToCreateSafe } = useSafeManager();
  const { t } = useTranslation();

  return (
    <div className="w-full flex gap-2 justify-end mt-4">
      <Dialog.Close asChild>
        <Button colorScheme="gray">{t("close")}</Button>
      </Dialog.Close>
      <Button colorScheme="green" onClick={switchToCreateSafe}>
        {t("create")}
      </Button>
    </div>
  );
};

export { BankActions };
