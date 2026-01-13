import { memo } from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

const CosmicLoadingText = memo(() => (
  <motion.div
    className="mt-6 text-center"
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.3 }}
  >
    <h3 className="text-lg sm:text-xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 bg-clip-text text-transparent">
      Chargement des données en cours...
    </h3>
    <p className="text-xs sm:text-sm text-gray-600 mt-2">Veuillez patienter</p>

    <div className="mt-4 flex justify-center gap-1.5">
      {[0, 1, 2, 3, 4].map((i) => (
        <motion.div
          key={i}
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 1,
            repeat: Infinity,
            delay: i * 0.15,
          }}
        >
          <Star className="w-3 h-3 text-yellow-400" />
        </motion.div>
      ))}
    </div>
  </motion.div>
));

CosmicLoadingText.displayName = 'CosmicLoadingText';

export default CosmicLoadingText;