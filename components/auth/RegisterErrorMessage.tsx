import { motion } from "framer-motion";
import { AlertCircle, X } from "lucide-react";
import React, { memo } from "react";

interface ErrorMessageProps {
  error: string;
  onClose: () => void;
}

const RegisterErrorMessage = memo<ErrorMessageProps>(({ error, onClose }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.95 }}
    animate={{ opacity: 1, scale: 1 }}
    exit={{ opacity: 0, scale: 0.95 }}
    className="mb-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 
               rounded-xl flex items-start gap-2"
  >
    <AlertCircle className="w-4 h-4 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
    <p className="flex-1 text-red-700 dark:text-red-300 text-xs leading-relaxed whitespace-pre-line">
      {error}
    </p>
    <button
      onClick={onClose}
      className="text-red-500 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 
                 transition-colors p-0.5"
    >
      <X className="w-4 h-4" />
    </button>
  </motion.div>
));

RegisterErrorMessage.displayName = 'RegisterErrorMessage';

export default RegisterErrorMessage;
