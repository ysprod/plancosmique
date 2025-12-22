import { motion } from 'framer-motion';
import { AlertCircle, ArrowLeft } from 'lucide-react';
import { memo } from 'react';

interface ErrorStateProps {
  title: string;
  message: string;
  onBack: () => void;
}

const ErrorState = memo(({ title, message, onBack }: ErrorStateProps) => (
  <div className="min-h-screen flex items-center justify-center p-4
                bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 
                dark:from-gray-950 dark:via-purple-950/20 dark:to-gray-900">
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl p-6 max-w-md 
                border border-gray-200 dark:border-gray-800"
    >
      <div className="flex items-center justify-center w-12 h-12 mx-auto mb-4 
                    rounded-full bg-red-100 dark:bg-red-900/30">
        <AlertCircle className="w-6 h-6 text-red-600 dark:text-red-400" />
      </div>
      <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-2 text-center">
        {title}
      </h2>
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-6 text-center">
        {message}
      </p>
      <button
        onClick={onBack}
        className="w-full flex items-center justify-center gap-2 px-4 py-2.5 
                 bg-purple-600 hover:bg-purple-700 text-white font-semibold 
                 rounded-xl transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Retour
      </button>
    </motion.div>
  </div>
));

ErrorState.displayName = 'ErrorState';

export default ErrorState;
