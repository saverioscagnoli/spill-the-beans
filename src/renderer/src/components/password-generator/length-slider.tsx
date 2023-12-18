import { usePasswordGenerator } from "@renderer/hooks";
import { Slider } from "tredici";

const LengthSlider = () => {
  const { length } = usePasswordGenerator();

  const onCommit = ([v]: [number]) => {
    length.set(v);
  };

  return (
      <div className="flex flex-col mt-4">
        <p className="text-sm">Password length</p>
        <Slider defaultValue={[16]} min={6} max={32} onValueCommit={onCommit} />
      </div>
  );
};

export { LengthSlider };
