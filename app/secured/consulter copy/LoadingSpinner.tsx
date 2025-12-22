import { motion } from 'framer-motion';
import { memo } from 'react';

interface LoadingSpinnerProps {
  message: string;
  subMessage?: string;
}

const LoadingSpinner = memo(({ message, subMessage }: LoadingSpinnerProps) => (
  <div className="min-h-screen flex items-center justify-center p-4 
                bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 
                dark:from-gray-950 dark:via-purple-950/20 dark:to-gray-900">
    <div className="text-center">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
        className="w-12 h-12 mx-auto mb-3 rounded-full border-4 
                 border-purple-200 dark:border-purple-800 
                 border-t-purple-600 dark:border-t-purple-400"
      />
      <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
        {message}
      </p>
      {subMessage && (
        <p className="text-xs text-gray-500 dark:text-gray-400">
          {subMessage}
        </p>
      )}
    </div>
  </div>
));

LoadingSpinner.displayName = 'LoadingSpinner';

export default LoadingSpinner;
