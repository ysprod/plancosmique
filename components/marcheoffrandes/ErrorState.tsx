import { motion } from 'framer-motion';

const ErrorState = ({ error, onRetry }: { error: string; onRetry?: () => void }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.95 }}
    animate={{ opacity: 1, scale: 1 }}
    className="flex flex-col items-center justify-center py-16 sm:py-20"
  >
    <div className="w-16 h-16 bg-red-100 dark:bg-red-950/30 rounded-full flex items-center justify-center mb-4">
      <span className="text-3xl">❌</span>
    </div>
    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
      Erreur de chargement
    </h3>
    <p className="text-sm text-red-600 dark:text-red-400 text-center max-w-md mb-4">
      {error}
    </p>
    {onRetry && (
      <button
        onClick={onRetry}
        className="px-5 py-2.5 bg-red-500 hover:bg-red-600 text-white font-bold rounded-xl transition-colors active:scale-95"
      >
        Réessayer
      </button>
    )}
  </motion.div>
);

export default ErrorState;
