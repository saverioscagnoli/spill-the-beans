import { useSettings } from "@renderer/hooks";
import { capitalize } from "@renderer/lib";
import { Checkbox, ColorScheme, Select, Tabs, Tooltip, useTheme } from "tredici";

const ThemeTab = () => {
  const { theme, setTheme } = useTheme();
  const { colorScheme } = useSettings();

  const onCheck = (which: "dark" | "light") => () => {
    setTheme(which);
  };

  return (
    <Tabs.Content value="theme">
      <div className="w-full flex flex-col gap-4">
        <div className="flex gap-8">
          <p className="font-semibold">Theme</p>
          <div className="flex gap-4">
            <div className="flex gap-2 items-center">
              <Checkbox
                id="light"
                onClick={onCheck("light")}
                checked={theme === "light"}
              />
              <label htmlFor="light">Light</label>
            </div>

            <div className="flex gap-2 items-center">
              <Checkbox id="dark" onClick={onCheck("dark")} checked={theme === "dark"} />
              <label htmlFor="dark">Dark</label>
            </div>
          </div>
        </div>

        <div className="flex gap-2 items-center">
          <Tooltip content="determines the color of each non black and white component.">
            <p>Color scheme</p>
          </Tooltip>

          <Select onValueChange={v => colorScheme.set(v as ColorScheme)} defaultValue="amethyst">
            <Select.Trigger>
              {colorScheme.get() === "b/w"
                ? "Black and white"
                : capitalize(colorScheme.get())}
            </Select.Trigger>
            <Select.Content>
              <Select.Item value="amethyst">Amethyst</Select.Item>
              <Select.Item value="teal">Teal</Select.Item>
              <Select.Item value="green">Green</Select.Item>
              <Select.Item value="crimson">Crimson</Select.Item>
              <Select.Item value="yellow">Yellow</Select.Item>
              <Select.Item value="blue">Blue</Select.Item>
              <Select.Item value="pink">Pink</Select.Item>
              <Select.Item value="b/w">Black and white</Select.Item>
            </Select.Content>
          </Select>
        </div>
      </div>
    </Tabs.Content>
  );
};

export { ThemeTab };
