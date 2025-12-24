import { motion } from 'framer-motion';
import { AlertCircle } from 'lucide-react';
import { memo } from 'react';

interface ErrorAlertProps {
  message: string;
}

const ErrorAlert = memo(({ message }: ErrorAlertProps) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="mt-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 
             rounded-xl flex items-start gap-2"
  >
    <AlertCircle className="w-4 h-4 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
    <p className="text-xs text-red-700 dark:text-red-300 leading-relaxed">
      {message}
    </p>
  </motion.div>
));

ErrorAlert.displayName = 'ErrorAlert';

export default ErrorAlert;