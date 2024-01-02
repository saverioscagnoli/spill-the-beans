import { useTranslation } from "react-i18next";
import { Dialog } from "tredici";

const BankDescription = () => {
  const { t } = useTranslation();

  return (
    <>
      <Dialog.Title>{t("safe-man-bank-title")}</Dialog.Title>
      <Dialog.Description>{t("safe-man-bank-desc")}</Dialog.Description>
    </>
  );
};

export { BankDescription };
