import { useTranslation, Trans } from "react-i18next";
import { Dialog } from "tredici";

const AddEntryDescription = () => {
  const { t } = useTranslation();

  return (
    <>
      <Dialog.Title>{t("create-entry-title")}</Dialog.Title>
      <Dialog.Description>
        <Trans t={t} i18nKey="create-entry-desc" components={{ br: <br /> }} />
      </Dialog.Description>
    </>
  );
};

export { AddEntryDescription };
