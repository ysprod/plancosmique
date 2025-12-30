
import Toast from "@/components/admin/rubriques/Toast";
import { AnimatePresence } from "framer-motion";
 
import React from "react";

interface RubriquesToastProps {
  toast: any;
  onClose: () => void;
}

export function RubriquesToast({ toast, onClose }: RubriquesToastProps) {
  return (
    <AnimatePresence>
      {toast && (
        <Toast
          type={toast.type}
          message={toast.message}
          onClose={onClose}
        />
      )}
    </AnimatePresence>
  );
}
