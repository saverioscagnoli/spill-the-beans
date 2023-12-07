import {
  Card,
  GeneratePasswordDialog,
  ManageSafesDialog,
  Navbar
} from "@renderer/components";
import { TrafficCone } from "lucide-react";
import React from "react";

interface HomePageProps {
  username: string;
}

const HomePage: React.FC<HomePageProps> = ({ username }) => {
  return (
    <>
      <Navbar username={username} />
      <div className="h-[calc(100%-4rem)] flex flex-col justify-between items-center gap-4">
        <h1 className="text-5xl font-bold select-none mt-32">
          Welcome back, {username}!
        </h1>
        <div className="flex gap-4 justify-between mb-24">
          <GeneratePasswordDialog />
          <ManageSafesDialog />

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

export { HomePage };
