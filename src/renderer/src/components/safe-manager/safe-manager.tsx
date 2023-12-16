import React, { ReactNode } from "react";
import { Dialog } from "tredici";
import { Bank } from "./bank";
import { useSafeManager } from "@renderer/hooks";
import { CreateSafe } from "./create-safe";
import { motion } from "framer-motion";

interface SafeManagerProps {
  /**
   * The children of the component.
   * Note: this will be used as the trigger for the dialog.
   */
  children: ReactNode;
}

const SafeManager: React.FC<SafeManagerProps> = ({ children }) => {
  const { content } = useSafeManager();
  const animations = {
    initial: { opacity: 0, y: 100 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -100 }
  };


  return (
    <Dialog>
      <Dialog.Trigger>{children}</Dialog.Trigger>
      <motion.div
        variants={animations}
        initial="initial"
        animate="animate"
        exit="exit"
        transition={{ duration: 0.25 }}
      >
        <Dialog.Content className="transition-all">
          {
            {
              bank: <Bank />,
              "create-safe": <CreateSafe />
            }[content]
          }
        </Dialog.Content>
      </motion.div>
    </Dialog>
  );
};

export { SafeManager };
