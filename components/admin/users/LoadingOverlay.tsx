import { memo, useMemo } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { RefreshCw } from 'lucide-react';

interface LoadingOverlayProps {
  loading: boolean;
  users: any;
}

export const LoadingOverlay = memo(function LoadingOverlay({ loading, users }: LoadingOverlayProps) {
  const overlayVariants = useMemo(() => ({
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1, transition: { type: 'spring', stiffness: 300, damping: 25 } },
    exit: { opacity: 0, scale: 0.95, transition: { duration: 0.15 } }
  }), []);

  return (
    <AnimatePresence>
      {loading && users && (
        <motion.div
          variants={overlayVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="absolute inset-0 bg-white/60 dark:bg-gray-900/60 backdrop-blur-md z-10 rounded-2xl flex items-center justify-center"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 300 }}
            className="relative bg-gradient-to-br from-white to-purple-50/80 dark:from-gray-800 dark:to-purple-950/40 rounded-2xl shadow-2xl border border-purple-200/50 dark:border-purple-700/50 p-6 flex flex-col items-center gap-3"
          >
            <motion.div
              className="relative"
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
            >
              <RefreshCw className="w-8 h-8 text-purple-600 dark:text-purple-400" />
              <motion.div
                className="absolute inset-0 bg-purple-500/30 rounded-full blur-lg"
                animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
            </motion.div>
            
            <div className="text-center">
              <p className="text-sm font-bold bg-gradient-to-r from-purple-600 to-blue-600 dark:from-purple-400 dark:to-blue-400 bg-clip-text text-transparent">
                Chargement en cours...
              </p>
              <motion.div
                className="flex gap-1 justify-center mt-2"
                initial="hidden"
                animate="visible"
              >
                {[0, 1, 2].map((i) => (
                  <motion.div
                    key={i}
                    className="w-1.5 h-1.5 bg-purple-600 dark:bg-purple-400 rounded-full"
                    animate={{ y: [0, -8, 0], opacity: [0.3, 1, 0.3] }}
                    transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.15 }}
                  />
                ))}
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
});
