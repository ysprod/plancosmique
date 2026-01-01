import { memo } from 'react';
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';

const LoadingSkeleton = memo(() => (
  <div className=" bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900 flex items-center justify-center p-3">
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: 'spring', stiffness: 200, damping: 20 }}
      className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 sm:p-10 max-w-md w-full text-center border border-white/20 shadow-2xl"
    >
      <motion.div
        animate={{ rotate: 360, scale: [1, 1.1, 1] }}
        transition={{ rotate: { duration: 2, repeat: Infinity, ease: 'linear' }, scale: { duration: 1.5, repeat: Infinity, ease: 'easeInOut' } }}
        className="w-16 h-16 mx-auto mb-6 relative"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full opacity-30 blur-xl" />
        <Loader2 className="w-full h-full text-white relative z-10" strokeWidth={2.5} />
      </motion.div>
      <motion.h2
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-xl sm:text-2xl font-bold text-white mb-2"
      >
        Chargement de l'analyse
      </motion.h2>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="text-purple-200 text-sm mb-4"
      >
        Préparation de votre thème  ...
      </motion.p>
      <div className="flex items-center justify-center gap-1.5">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            animate={{ scale: [1, 1.5, 1], opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.2 }}
            className="w-2 h-2 bg-purple-300 rounded-full"
          />
        ))}
      </div>
    </motion.div>
  </div>
));
LoadingSkeleton.displayName = 'LoadingSkeleton';

export default LoadingSkeleton;