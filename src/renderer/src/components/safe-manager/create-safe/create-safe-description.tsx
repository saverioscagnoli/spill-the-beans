import { Trans, useTranslation } from "react-i18next";
import { Dialog } from "tredici";

const CreateSafeDescription = () => {
  const { t } = useTranslation();

  return (
    <>
      <Dialog.Title>{t("safe-man-create-title")}</Dialog.Title>
      <Dialog.Description>
        <Trans t={t} i18nKey="safe-man-create-desc" components={{ br: <br /> }} />
      </Dialog.Description>
    </>
  );
};

export { CreateSafeDescription };
