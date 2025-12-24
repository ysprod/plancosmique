import { memo } from 'react';
import { motion } from 'framer-motion';
import { AlertCircle, ArrowLeft } from 'lucide-react';

const ErrorState = memo(({
  error,
  onRetry
}: {
  error: string;
  onRetry: () => void;
}) => (
  <div className="min-h-screen bg-gradient-to-br from-red-900 via-rose-900 to-pink-900 flex items-center justify-center p-3">
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ type: 'spring', stiffness: 200, damping: 20 }}
      className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 sm:p-10 max-w-md w-full text-center border border-white/20 shadow-2xl"
    >
      <motion.div
        animate={{ scale: [1, 1.05, 1], rotate: [0, 5, -5, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        className="relative w-16 h-16 mx-auto mb-4"
      >
        <div className="absolute inset-0 bg-red-400/30 rounded-full blur-xl" />
        <AlertCircle className="w-full h-full text-red-300 relative z-10" strokeWidth={2} />
      </motion.div>
      <motion.h2
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="text-xl sm:text-2xl font-bold text-white mb-2"
      >
        Erreur de chargement
      </motion.h2>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="text-red-200 text-sm mb-6 leading-relaxed"
      >
        {error || 'Analyse non disponible'}
      </motion.p>
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={onRetry}
        className="w-full px-6 py-3 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-xl font-semibold text-white transition-all border border-white/30 shadow-lg flex items-center justify-center gap-2"
      >
        <ArrowLeft className="w-4 h-4" />
        Retour aux consultations
      </motion.button>
    </motion.div>
  </div>
));
ErrorState.displayName = 'ErrorState';

export default ErrorState;
