import React from "react";
import { Trans, useTranslation } from "react-i18next";
import { Dialog } from "tredici";

interface DeleteSafeDescriptionProps {
  /**
   * Flag that indicates if the user input the wrong password.
   */
  wrongPassword: boolean;
}

const DeleteSafeDescription: React.FC<DeleteSafeDescriptionProps> = ({
  wrongPassword
}) => {
  const { t } = useTranslation();

  return (
    <>
      <Dialog.Title>{t("safe-man-delete-title")}</Dialog.Title>
      <Dialog.Description>
        <Trans
          i18nKey="safe-man-delete-desc"
          components={{ strong: <strong />, br: <br /> }}
        />
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

export { DeleteSafeDescription };
