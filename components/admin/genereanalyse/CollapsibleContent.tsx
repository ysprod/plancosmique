"use client";
import { AnimatePresence, motion } from "framer-motion";
import { ReactNode } from "react";

interface CollapsibleContentProps {
  isOpen: boolean;
  children: ReactNode;
}

export default function CollapsibleContent({ isOpen, children }: CollapsibleContentProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="overflow-hidden"
        >
          <div className="p-4 pt-0 space-y-2 max-h-[500px] overflow-y-auto">
            {children}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}