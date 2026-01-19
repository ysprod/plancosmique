import { memo } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Loader2 } from 'lucide-react';

const CategoryLoadingSpinner = memo(() => (
  <div className="fixed inset-0 flex items-center justify-center bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 dark:from-slate-950 dark:via-purple-950/30 dark:to-slate-900 z-50">
    <div className="relative">
      {/* Outer rotating ring */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "linear"
        }}
        className="absolute inset-0 w-28 h-28 sm:w-32 sm:h-32 rounded-full border-4 border-transparent border-t-purple-500 border-r-pink-500 dark:border-t-purple-400 dark:border-r-pink-400 opacity-60"
      />
      
      {/* Middle pulsing glow */}
      <motion.div
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.3, 0.6, 0.3]
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute inset-0 w-28 h-28 sm:w-32 sm:h-32 rounded-full bg-gradient-to-br from-purple-500/30 to-pink-500/30 dark:from-purple-400/20 dark:to-pink-400/20 blur-xl"
      />
      
      {/* Inner rotating ring (opposite direction) */}
      <motion.div
        animate={{ rotate: -360 }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "linear"
        }}
        className="absolute inset-2 sm:inset-3 rounded-full border-3 border-transparent border-l-indigo-500 border-b-purple-500 dark:border-l-indigo-400 dark:border-b-purple-400 opacity-80"
      />
      
      {/* Center icon */}
      <motion.div
        animate={{
          scale: [1, 1.1, 1],
          rotate: [0, 180, 360]
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-full bg-gradient-to-br from-white via-purple-50 to-pink-50 dark:from-slate-800 dark:via-purple-900/50 dark:to-pink-900/50 shadow-2xl flex items-center justify-center border-2 border-purple-200/50 dark:border-purple-700/50"
      >
        <motion.div
          animate={{ rotate: [0, -15, 15, 0] }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <Sparkles className="w-10 h-10 sm:w-12 sm:h-12 text-purple-600 dark:text-purple-400" strokeWidth={2} />
        </motion.div>
      </motion.div>
      
      {/* Floating particles */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          animate={{
            y: [0, -20, 0],
            opacity: [0, 1, 0],
            scale: [0, 1, 0]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            delay: i * 0.25,
            ease: "easeOut"
          }}
          style={{
            position: 'absolute',
            left: '50%',
            top: '50%',
            marginLeft: `${Math.cos(i * Math.PI / 4) * 60}px`,
            marginTop: `${Math.sin(i * Math.PI / 4) * 60}px`
          }}
          className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-gradient-to-r from-purple-400 to-pink-400 dark:from-purple-300 dark:to-pink-300"
        />
      ))}
    </div>
    
    {/* Loading text */}
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="absolute bottom-1/3 left-1/2 -translate-x-1/2 text-center"
    >
      <motion.p
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="text-sm sm:text-base font-bold bg-gradient-to-r from-purple-700 via-pink-600 to-purple-700 bg-clip-text text-transparent dark:from-purple-400 dark:via-pink-400 dark:to-purple-400"
      >
        Chargement...
      </motion.p>
      <motion.div
        className="flex justify-center gap-1.5 mt-2"
      >
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.3, 1, 0.3]
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              delay: i * 0.2,
              ease: "easeInOut"
            }}
            className="w-1.5 h-1.5 rounded-full bg-purple-600 dark:bg-purple-400"
          />
        ))}
      </motion.div>
    </motion.div>
  </div>
));

CategoryLoadingSpinner.displayName = 'CategoryLoadingSpinner';

export default CategoryLoadingSpinner;
