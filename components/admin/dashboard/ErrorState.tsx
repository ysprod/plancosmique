import { motion } from 'framer-motion';
import { AlertCircle, RefreshCw } from 'lucide-react';

interface ErrorStateProps {
  error: string | null;
  isRefreshing: boolean;
  onRetry: () => void;
}

export default function ErrorState({ error, isRefreshing, onRetry }: ErrorStateProps) {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center max-w-md w-full bg-white rounded-2xl shadow-xl border border-gray-200 p-8"
      >
        <motion.div
          animate={{ rotate: [0, 10, -10, 10, 0], transition: { duration: 0.5, repeat: Infinity, repeatDelay: 2 } }}
        >
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
        </motion.div>
        <h2 className="text-xl font-bold text-gray-900 mb-2">Erreur de chargement</h2>
        <p className="text-gray-600 mb-6 text-sm leading-relaxed">{error || 'Impossible de charger les statistiques'}</p>
        <button
          onClick={onRetry}
          disabled={isRefreshing}
          className="w-full px-6 py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-xl font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <RefreshCw className={`w-5 h-5 ${isRefreshing ? 'animate-spin' : ''}`} />
          {isRefreshing ? 'Chargement...' : 'Réessayer'}
        </button>
      </motion.div>
    </div>
  );
}
