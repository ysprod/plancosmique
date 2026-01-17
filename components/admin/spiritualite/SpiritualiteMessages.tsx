'use client';
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AlertCircle, Check } from "lucide-react";

interface SpiritualiteMessagesProps {
  error?: string;
  success?: string;
}

export function SpiritualiteMessages({ error, success }: SpiritualiteMessagesProps) {
  return (
    <AnimatePresence>
      {error && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="mb-4 p-3 sm:p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3"
        >
          <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
          <div className="flex-1 min-w-0">
            <h4 className="font-bold text-red-700 text-sm sm:text-base">Erreur</h4>
            <p className="text-xs sm:text-sm text-red-600">{error}</p>
          </div>
        </motion.div>
      )}
      {success && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="mb-4 p-3 sm:p-4 bg-green-50 border border-green-200 rounded-lg flex items-start gap-3"
        >
          <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
          <div className="flex-1 min-w-0">
            <h4 className="font-bold text-green-700 text-sm sm:text-base">Succès</h4>
            <p className="text-xs sm:text-sm text-green-600">{success}</p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}