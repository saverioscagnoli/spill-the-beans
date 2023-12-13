import { usePasswordGenerator } from "@renderer/hooks";
import { CopyButton } from "../copy-button";

const PasswordDisplay = () => {
  const { password } = usePasswordGenerator();

  return (
    <div className="w-full h-20 flex items-center justify-center bg-gray-300/50 dark:bg-gray-600/30 rounded-lg mt-4 relative">
      <p className="font-semibold">
        {password.get().length > 0 ? (
          password.get().startsWith("undefined") ? (
            "There's no characters available!"
          ) : (
            password.get()
          )
        ) : (
          <span className="text-gray-500 dark:text-gray-300">
            Click generate to generate a password.
          </span>
        )}
      </p>
      <span className="absolute right-0 mr-2">
        <CopyButton text={password.get()} />
      </span>
    </div>
  );
};

export { PasswordDisplay };
