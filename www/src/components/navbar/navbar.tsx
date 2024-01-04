import { Button, useTheme } from "tredici";
import { BsGithub, BsMoonFill } from "react-icons/bs";
import { LuSun } from "react-icons/lu";
import { SiKofi } from "react-icons/si";

const Navbar = () => {
  const { theme, toggle } = useTheme();
  const isDark = theme === "dark";

  return (
    <div className="w-full h-16 flex justify-between items-center px-[30%]">
      <a target="_blank" href="https://ko-fi.com/svscagn">
        <Button colorScheme="gray" className="flex gap-2">
          <SiKofi /> Ko-fi
        </Button>
      </a>

      <div className="flex gap-2">
        <a target="_blank" href="https://github.com/saverioscagnoli/spill-the-beans">
          <Button.Icon aria-aria-label="github" icon={<BsGithub />} colorScheme="gray" />
        </a>
        <Button.Icon
          aria-label="change-theme"
          colorScheme="gray"
          icon={isDark ? <LuSun /> : <BsMoonFill />}
          onClick={toggle}
        />
      </div>
    </div>
  );
};

export { Navbar };
