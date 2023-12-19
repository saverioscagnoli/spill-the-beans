import { useNavigate } from "react-router-dom";
import { Button, Tooltip } from "tredici";
import { RxArrowLeft } from "react-icons/rx";

const BackButton = () => {
  const navigate = useNavigate();

  const onBack = () => navigate("/");

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
