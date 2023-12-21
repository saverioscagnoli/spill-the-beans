import { Button } from "tredici";
import { LuSettings } from "react-icons/lu";
import { Settings } from "../settings";
import { UserAvatar } from "../user-avatar";

const Navbar = () => {
  return (
    <div className="w-full h-16 flex justify-between">
      <div className="h-full flex items-center">
        <UserAvatar className="ml-3" colorScheme="b/w" />
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
