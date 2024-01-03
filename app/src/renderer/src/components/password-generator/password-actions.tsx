import { usePasswordGenerator } from "@renderer/hooks";
import { useTranslation } from "react-i18next";
import { Button, Dialog } from "tredici";

const PasswordActions = () => {
  const { password, length, numbers, symbols, lowercase, uppercase, exclude } =
    usePasswordGenerator();

  const { t } = useTranslation();

  const onGenerate = async () => {
    let pw = await api.generatePassword({
      length: length.get(),
      numbers: numbers.get(),
      symbols: symbols.get(),
      lowercase: lowercase.get(),
      uppercase: uppercase.get(),
      exclude: exclude.get()
    });

    password.set(pw);
  };

  return (
    <div className="w-full flex gap-2 justify-end items-center mt-4">
      <Dialog.Close asChild>
        <Button colorScheme="gray">{t("close")}</Button>
      </Dialog.Close>
      <Button colorScheme="green" onClick={onGenerate}>
        {t("generate")}
      </Button>
    </div>
  );
};

export { PasswordActions };
