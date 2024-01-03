import { useTranslation } from "react-i18next";
import { Dialog } from "tredici";

interface OpenSafeDescriptionProps {
  /**
   * Flag that indicates if the user input the wrong password.
   */
  wrongPassword: boolean;
}

const OpenSafeDescription: React.FC<OpenSafeDescriptionProps> = ({ wrongPassword }) => {
  const { t } = useTranslation();

  return (
    <>
      <Dialog.Title>{t("safe-man-open-title")}</Dialog.Title>
      <Dialog.Description>
        {t("safe-man-open-desc")}
        {wrongPassword && (
          <>
            <br />
            <strong className="text-red-500">{t("safe-man-err-wrong-password")}</strong>
          </>
        )}
      </Dialog.Description>
    </>
  );
};

export { OpenSafeDescription };
