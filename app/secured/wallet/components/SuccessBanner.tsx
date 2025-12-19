"use client";
import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

export default function SuccessBanner({ onDismiss }: { onDismiss: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 \
                 rounded-xl p-4 flex items-start gap-3"
    >
      <div className="w-10 h-10 rounded-lg bg-green-100 dark:bg-green-900/30 \
                   flex items-center justify-center flex-shrink-0">
        <CheckCircle2 className="w-5 h-5 text-green-600 dark:text-green-400" />
      </div>
      <div className="flex-1">
        <h3 className="text-sm font-bold text-green-800 dark:text-green-200 mb-1">
          Transaction réussie !
        </h3>
        <p className="text-xs text-green-600 dark:text-green-300">
          Votre commande <strong>simulée</strong> a été enregistrée avec succès dans votre wallet.
        </p>
      </div>
      <button
        onClick={onDismiss}
        className="text-green-600 dark:text-green-400 hover:text-green-800 dark:hover:text-green-200\
                   text-lg font-bold leading-none"
      >
        ✕
      </button>
    </motion.div>
  );
}
