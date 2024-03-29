import { Avatar, Button } from "tredici";
import { LuSettings } from "react-icons/lu";
import { Settings } from "../settings";
import { useSettings } from "@renderer/hooks";

const Navbar = () => {
  const { username, propic } = useSettings();

  return (
    <div className="w-full h-16 flex justify-between">
      <div className="h-full flex items-center">
        <Avatar
          className="ml-3"
          colorScheme="b/w"
          imageSrc={propic.get()}
          fallback={username.get()[0]}
        />
      </div>

      <div className="h-full flex items-center">
        <Settings>
          <Button.Icon
            className="mr-3"
            colorScheme="gray"
            variant="ghost"
            icon={<LuSettings size={20} />}
          />
        </Settings>
      </div>
    </div>
  );
};

export { Navbar };
