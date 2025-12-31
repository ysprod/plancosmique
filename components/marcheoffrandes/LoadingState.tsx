import { motion } from 'framer-motion';

const LoadingState = () => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    className="flex flex-col items-center justify-center py-16 sm:py-20"
  >
    <motion.span
      animate={{ rotate: 360 }}
      transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
      className="text-4xl mb-4"
    >
      🌀
    </motion.span>
    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
      Chargement des offrandes...
    </p>
  </motion.div>
);

export default LoadingState;
