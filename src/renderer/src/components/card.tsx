import React, { ComponentProps } from "react";

const Card: React.FC<ComponentProps<"div">> = ({ children }) => {
  return (
    <div className="w-56 h-44 border border-gray-400/25 rounded-xl dark:bg-[#18181b] bg-[#fafafa] flex flex-col justify-center items-center hover:bg-gray-100 cursor-pointer transition-colors select-none">
      {children}
    </div>
  );
};

export { Card };
