import { Navbar } from "@renderer/components";
import { Button } from "tredici";

const Home = (): JSX.Element => {
  const open = async (): Promise<void> => {
    await api.openSafe();
  };

  const create = async (): Promise<void> => {
    await api.createSafe();
  };

  return (
    <>
      <Navbar />
      <div className="h-[calc(100%-10rem)] flex flex-col justify-center items-center gap-4">
        <h1 className="text-5xl font-bold select-none">Welcome back!</h1>
        <div className="flex gap-4">
          <Button onClick={open}>Open safe</Button>
          <Button onClick={create}>Create safe</Button>
        </div>
      </div>
    </>
  );
};

export { Home };
