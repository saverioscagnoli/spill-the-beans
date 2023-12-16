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

  //TODO: remove animation when first opening the dialog

  return (
    <Dialog>
      <Dialog.Trigger>{children}</Dialog.Trigger>
      <Dialog.Content className="overflow-hidden">
        <motion.div
          key={content}
          variants={{
            initial: { opacity: 0, x: 100 },
            animate: { opacity: 1, x: 0 },
            exit: { opacity: 0, x: -100 }
          }}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={{ duration: 0.1 }}
        >
          {
            {
              bank: <Bank />,
              "create-safe": <CreateSafe />
            }[content]
          }
        </motion.div>
      </Dialog.Content>
    </Dialog>
  );
};

export { SafeManager };
