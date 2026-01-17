'use client';
import { motion } from 'framer-motion';
import { AlertCircle, X } from 'lucide-react';

interface EditUserErrorAlertProps {
  error: string;
  onClose: () => void;
}

export function EditUserErrorAlert({ error, onClose }: EditUserErrorAlertProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="mb-6 bg-red-50 border border-red-200 rounded-xl p-4 flex items-center gap-3"
    >
      <AlertCircle className="w-5 h-5 text-red-600" />
      <div className="flex-1">
        <p className="text-red-900 font-semibold">Erreur</p>
        <p className="text-red-700 text-sm">{error}</p>
      </div>
      <button
        onClick={onClose}
        className="text-red-600 hover:text-red-800"
      >
        <X className="w-5 h-5" />
      </button>
    </motion.div>
  );
}