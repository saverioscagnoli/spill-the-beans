import { Card, PasswordGenerator, SafeManager } from "@renderer/components";
import { useSettings } from "@renderer/hooks";
import { useTranslation } from "react-i18next";
import { LuKey, LuLock } from "react-icons/lu";

const HomePage = () => {
  const { username } = useSettings();
  const { t } = useTranslation();

  return (
    <div className="w-full h-full flex flex-col justify-center items-center">
      <h1 className="text-5xl font-bold">
        {t("home-greeting")}, {username.get()}!
      </h1>
      <h3 className="text-xl font-semibold">{t("home-what-do")}</h3>
      <div className="flex gap-4 mt-4">
        <PasswordGenerator>
          <Card>
            <LuKey size={24} />
            <h2 className="text-lg font-semibold">{t("pwgen")}</h2>
            <p className="text-center">{t("pwgen-home-desc")}</p>
          </Card>
        </PasswordGenerator>

        <SafeManager>
          <Card>
            <LuLock size={24} />
            <h2 className="text-lg font-semibold">{t("safe-manager")}</h2>
            <p className="text-center">
              {t("safe-manager-home-desc")}
            </p>
          </Card>
        </SafeManager>
      </div>
    </div>
  );
};

export { HomePage };
