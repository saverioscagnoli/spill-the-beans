import { useSettings } from "@renderer/hooks";
import { ChangeEvent } from "react";
import { Avatar, Input, Tabs, Tooltip } from "tredici";

const ProfileTab = () => {
  const { username, propic } = useSettings();

  const onUsernameChange = (evt: ChangeEvent<HTMLInputElement>) => {
    username.set(evt.target.value);
  };

  const onPropicChange = async () => {
    let res = await api.editPropic();
    if (!res) await api.resetPropic();
    propic.set(res);
  };

  return (
    <Tabs.Content value="profile">
      <div className="flex gap-4 items-center">
        <Tooltip content="Click to edit!">
          <Avatar
            className="w-20 h-20 cursor-pointer"
            colorScheme="b/w"
            imageSrc={propic.get()}
            // @ts-ignore
            fallback={<p className="text-3xl">{username.get()[0]}</p>}
            onClick={onPropicChange}
          />
        </Tooltip>

        <Input
          spellCheck={false}
          className="w-40 text-3xl font-bold !outline-none border-none shadow-none cursor-pointer"
          value={username.get()}
          onChange={onUsernameChange}
        />
      </div>
    </Tabs.Content>
  );
};

export { ProfileTab };
