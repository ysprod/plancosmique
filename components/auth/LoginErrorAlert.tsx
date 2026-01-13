import { motion } from "framer-motion";
import { AlertCircle } from "lucide-react";
import React, { memo } from "react";

const LoginErrorAlert = memo(({ message }: { message: string }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.95 }}
    animate={{ opacity: 1, scale: 1 }}
    exit={{ opacity: 0, scale: 0.95 }}
    className="mb-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 
               rounded-xl flex items-start gap-2"
  >
    <AlertCircle className="w-4 h-4 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
    <p className="text-red-700 dark:text-red-300 text-xs leading-relaxed">{message}</p>
  </motion.div>
));

LoginErrorAlert.displayName = 'LoginErrorAlert';

export default LoginErrorAlert;
