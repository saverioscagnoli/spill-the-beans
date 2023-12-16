import { useEffect } from "react";

/**
 * This component is a container for the safes.
 */
const SafeDisplay = () => {
  useEffect(() => {
    api.getSafes().then(console.log);
  }, []);

  return (
    <div className="w-full h-72 mt-4 bg-gray-300/50 dark:bg-gray-600/30 rounded-lg overflow-auto"></div>
  );
};

export { SafeDisplay };
