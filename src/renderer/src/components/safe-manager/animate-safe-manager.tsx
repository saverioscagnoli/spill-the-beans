import { useSafeManager } from "@renderer/hooks";
import { motion } from "framer-motion";
import React, { ReactNode, useEffect, useRef, useState } from "react";

interface AnimateSafeManagerProps {
  children: ReactNode;
}

const AnimateSafeManager: React.FC<AnimateSafeManagerProps> = ({ children }) => {
  const { animations, isAnimating } = useSafeManager();
  const [height, setHeight] = useState<number>(0);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (contentRef.current) {
      // Calculate the content height
      const contentHeight = contentRef.current.offsetHeight;

      console.log(contentHeight);
      setHeight(contentHeight);
    }
  }, [children]);

  return (
    <motion.div
      layout
      style={{ height: "auto" }}
      variants={{
        animate: { x: 0, height: "auto" },
        ...animations
      }}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{
        duration: 0.2,
        height: { duration: 0.2 }
      }}
      onAnimationStart={isAnimating.toggle}
      onAnimationComplete={isAnimating.toggle}
    >
      <div ref={contentRef}>{children}</div>
    </motion.div>
  );
};

export { AnimateSafeManager };
