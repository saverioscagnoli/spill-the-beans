import { Card, PasswordGenerator } from "@renderer/components";
import { useSettings } from "@renderer/hooks";
import { LuKey, LuLock } from "react-icons/lu";

const HomePage = () => {
  const { settings } = useSettings();

  return (
    <>
      <h1 className="text-5xl font-bold">Welcome back, {settings.username}!</h1>
      <h3 className="text-xl font-semibold">What do you want to do?</h3>
      <div className="flex gap-4 mt-4">
        <PasswordGenerator>
          <Card>
            <LuKey size={24} />
            <h2 className="text-lg font-semibold">Password generator</h2>
            <p className="text-center">
              Generate a strong random password, based on arbitrary parameters.
            </p>
          </Card>
        </PasswordGenerator>
        <Card>
          <LuLock size={24} />
          <h2 className="text-lg font-semibold">Manage safes</h2>
          <p className="text-center">
            Safes are encrypted containers that contain your passwords.
          </p>
        </Card>
      </div>
    </>
  );
};

export { HomePage };
