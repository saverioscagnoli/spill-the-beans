import React, { ReactNode } from "react";
import { Dialog } from "tredici";
import { Bank } from "./bank";
import { useSafeManager } from "@renderer/hooks";
import { CreateSafe } from "./create-safe";
import { motion } from "framer-motion";
import { DeleteSafe } from "./delete-safe";

interface SafeManagerProps {
  /**
   * The children of the component.
   * Note: this will be used as the trigger for the dialog.
   */
  children: ReactNode;
}

const SafeManager: React.FC<SafeManagerProps> = ({ children }) => {
  const { content, animations, isAnimating } = useSafeManager();

  //TODO: remove animation when first opening the dialog

  return (
    <Dialog>
      <Dialog.Trigger>{children}</Dialog.Trigger>
      <Dialog.Content className={isAnimating.get() ? "overflow-hidden" : ""}>
        <motion.div
          key={content}
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
          {
            {
              bank: <Bank />,
              "create-safe": <CreateSafe />,
              "delete-safe": <DeleteSafe />
            }[content]
          }
        </motion.div>
      </Dialog.Content>
    </Dialog>
  );
};

export { SafeManager };
