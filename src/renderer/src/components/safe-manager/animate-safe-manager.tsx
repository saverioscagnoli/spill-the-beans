import { useSafeManager } from "@renderer/hooks";
import { motion } from "framer-motion";
import React, { ReactNode } from "react";

interface AnimateSafeManagerProps {
  children: ReactNode;
}

const AnimateSafeManager: React.FC<AnimateSafeManagerProps> = ({ children }) => {
  const { animations, isAnimating } = useSafeManager();

  return (
    <motion.div
      variants={{
        animate: { x: 0 },
        ...animations
      }}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.2 }}
      onAnimationStart={isAnimating.toggle}
      onAnimationComplete={isAnimating.toggle}
    >
      {children}
    </motion.div>
  );
};

export { AnimateSafeManager };
