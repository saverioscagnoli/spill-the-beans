import { useSettings } from "@renderer/hooks";
import { forwardRef } from "react";
import { Avatar, AvatarProps } from "tredici";

const UserAvatar = forwardRef<HTMLSpanElement, AvatarProps>((props, ref) => {
  const { propic, username } = useSettings();

  return (
    <Avatar imageSrc={propic.get()} fallback={username.get()[0]} ref={ref} {...props} />
  );
});

export { UserAvatar };
