import { motion } from 'framer-motion';

const EmptyState = ({ onReset }: { onReset: () => void }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.95 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.3 }}
    className="flex flex-col items-center justify-center py-16 sm:py-20"
  >
    <div className="w-20 h-20 bg-gray-100 dark:bg-slate-800 rounded-full flex items-center justify-center mb-4">
      <span className="text-4xl">🔍</span>
    </div>
    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
      Aucune offrande trouvée
    </h3>
    <p className="text-sm text-gray-600 dark:text-gray-400 text-center max-w-sm mb-4 px-4">
      Essayez une autre catégorie ou consultez toutes les offrandes disponibles
    </p>
    <button
      onClick={onReset}
      className="px-5 py-2.5 bg-amber-500 hover:bg-amber-600 dark:bg-amber-600 dark:hover:bg-amber-700 text-white font-bold rounded-xl transition-colors shadow-lg hover:shadow-xl active:scale-95"
    >
      Voir toutes les offrandes
    </button>
  </motion.div>
);

export default EmptyState;
