import React from "react";
import { SettingsDialog } from "./settings-dialog";
import { Avatar, Button } from "tredici";
import { useLocation, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

interface NavbarProps {
  username: string;
}

const Navbar: React.FC<NavbarProps> = ({ username }) => {
  //const [avatarHover, setAvatarHover] = useState<boolean>(false);
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <nav className="flex justify-between w-full h-16">
      <div className="flex justify-start items-center gap-6 ml-4">
        <Avatar
          colorScheme="b/w"
          fallback={username[0] && username[0].toUpperCase()}
          /*         className="cursor-pointer"
          onMouseEnter={() => setAvatarHover(true)}
          onMouseLeave={() => setAvatarHover(false)} */
        />

        {location.pathname === "/safe" && (
          <Button.Icon
            onClick={() => navigate("/", { replace: true })}
            icon={<ArrowLeft size={20} />}
          />
        )}
      </div>
      <div className="flex justify-end items-center mr-4">
        <SettingsDialog />
      </div>
    </nav>
  );
};

export { Navbar };
