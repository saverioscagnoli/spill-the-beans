import { useNavigate } from "react-router-dom";
import { Button, Tooltip } from "tredici";
import { RxArrowLeft } from "react-icons/rx";
import React from "react";

interface BackButtonProps {
  action?: Function;
}

const BackButton: React.FC<BackButtonProps> = ({ action }) => {
  const navigate = useNavigate();

  const onBack = () => {
    action?.();
    navigate("/");
  };

  return (
    <Tooltip content="Back">
      <Button.Icon
        className="absolute bottom-0 left-0 m-4"
        colorScheme="b/w"
        icon={<RxArrowLeft />}
        onClick={onBack}
      />
    </Tooltip>
  );
};

export { BackButton };
