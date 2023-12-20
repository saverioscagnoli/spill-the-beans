import { Card, PasswordGenerator, SafeManager } from "@renderer/components";
import { SafeManagerContextProvider } from "@renderer/components/providers/safe-manager-context-provider";
import { useSettings } from "@renderer/hooks";
import { LuKey, LuLock } from "react-icons/lu";

const HomePage = () => {
  const { username } = useSettings();

  return (
    <div className="w-full h-full flex flex-col justify-center items-center">
      <h1 className="text-5xl font-bold">Welcome back, {username.get()}!</h1>
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

        <SafeManagerContextProvider>
          <SafeManager>
            <Card>
              <LuLock size={24} />
              <h2 className="text-lg font-semibold">Manage safes</h2>
              <p className="text-center">
                Safes are encrypted containers that contain your passwords.
              </p>
            </Card>
          </SafeManager>
        </SafeManagerContextProvider>
      </div>
    </div>
  );
};

export { HomePage };
