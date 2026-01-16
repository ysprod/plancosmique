'use client';
import { motion } from "framer-motion";
import React from "react";

interface AdminBooksErrorAlertProps {
  error: string | null;
  onClose: () => void;
}

export const AdminBooksErrorAlert: React.FC<AdminBooksErrorAlertProps> = ({ error, onClose }) => (
  <>
    {error && (
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        className="mb-6 bg-red-50 border-2 border-red-200 rounded-xl p-4"
      >
        <div className="flex items-center justify-between">
          <p className="text-red-700 font-semibold">{error}</p>
          <button onClick={onClose} className="text-red-500 hover:text-red-700">
            ×
          </button>
        </div>
      </motion.div>
    )}
  </>
);