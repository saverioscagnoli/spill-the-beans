import { Card, GeneratePasswordDialog, Navbar } from "@renderer/components";
import { Lock, TrafficCone } from "lucide-react";
import { useEffect, useState } from "react";

const Home = (): JSX.Element => {
  const [username, setUsername] = useState<string>("");

  useEffect(() => {
    api.getUsername().then(u => setUsername(u));
  }, []);

  return (
    <>
      <Navbar />
      <div className="h-[calc(100%-3rem)] flex flex-col justify-between items-center gap-4">
        <h1 className="text-5xl font-bold select-none mt-32">
          Welcome back, {username}!
        </h1>
        <div className="flex gap-4 justify-between mb-24">
          <GeneratePasswordDialog />
          <Card>
            <Lock />
            <h2 className="text-lg font-semibold">Manage safes</h2>
            <p className="text-center">
              Safes are encrypted containers that contain your passwords.
            </p>
          </Card>

          <Card>
            <TrafficCone />
            <h2 className="text-lg font-semibold">Check breaches</h2>
            <p className="text-center">
              Check if your passwords have been leaked in any data breach.
            </p>
          </Card>
        </div>
      </div>
    </>
  );
};

export { Home };
