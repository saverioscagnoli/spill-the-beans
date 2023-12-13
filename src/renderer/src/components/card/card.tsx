import React, { ComponentProps } from "react";

const Card: React.FC<ComponentProps<"div">> = ({ className, ...props }) => {
  return (
    <div
      className={[
        "w-56 h-44 rounded-xl flex flex-col gap-1 justify-center items-center bg-[#fafafa] hover:bg-gray-100 border border:gray-300/25 cursor-pointer select-none transition-colors",
        "dark:bg-[#18181b] dark:hover:bg-gray-800 dark:border-gray-700",
        className
      ].join(" ")}
      {...props}
    />
  );
};

export { Card };
