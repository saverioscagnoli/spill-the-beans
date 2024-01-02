import { useSettings } from "@renderer/hooks";
import { capitalize } from "@renderer/lib";
import { useTranslation } from "react-i18next";
import { Checkbox, ColorScheme, Select, Tabs, Tooltip, useTheme } from "tredici";

const ThemeTab = () => {
  const { theme, setTheme } = useTheme();
  const { colorScheme } = useSettings();
  const { t } = useTranslation();

  const onCheck = (which: "dark" | "light") => () => {
    setTheme(which);
  };

  return (
    <Tabs.Content value="theme">
      <div className="w-full flex flex-col gap-4">
        <div className="flex gap-8">
          <p className="font-semibold">{t("theme")}</p>
          <div className="flex gap-4">
            <div className="flex gap-2 items-center">
              <Checkbox
                id="light"
                onClick={onCheck("light")}
                checked={theme === "light"}
              />
              <label htmlFor="light">{t("light")}</label>
            </div>

            <div className="flex gap-2 items-center">
              <Checkbox id="dark" onClick={onCheck("dark")} checked={theme === "dark"} />
              <label htmlFor="dark">{t("dark")}</label>
            </div>
          </div>
        </div>

        <div className="flex gap-2 items-center">
          <Tooltip content={t("color-scheme-tooltip")} disableHoverableContent>
            <p>{t("color-scheme")}</p>
          </Tooltip>

          <Select
            onValueChange={v => colorScheme.set(v as ColorScheme)}
            defaultValue={colorScheme.get()}
          >
            <Select.Trigger />
            <Select.Content>
              <Select.Item value="amethyst">{t("amethyst")}</Select.Item>
              <Select.Item value="teal">{t("teal")}</Select.Item>
              <Select.Item value="green">{t("green")}</Select.Item>
              <Select.Item value="crimson">{t("crimson")}</Select.Item>
              <Select.Item value="yellow">{t("yellow")}</Select.Item>
              <Select.Item value="blue">{t("blue")}</Select.Item>
              <Select.Item value="pink">{t("pink")}</Select.Item>
              <Select.Item value="b/w">{t("b/w")}</Select.Item>
            </Select.Content>
          </Select>
        </div>
      </div>
    </Tabs.Content>
  );
};

export { ThemeTab };
