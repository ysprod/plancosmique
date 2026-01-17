'use client';
import { memo } from 'react';
import { motion } from 'framer-motion';
import { UserCog } from 'lucide-react';

const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.6, 0.05, 0.01, 0.9],
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.4, ease: 'easeOut' },
  },
};

const UsersLoadingState = memo(() => (
  <div className="flex items-center justify-center min-h-[200px] relative overflow-hidden bg-gradient-to-br from-slate-50 via-indigo-50/40 to-purple-50/40 dark:from-slate-900 dark:via-indigo-950/30 dark:to-purple-950/30">
    {/* Animated gradient background */}
    <motion.div
      animate={{
        rotate: [0, 180, 360],
        scale: [1, 1.1, 1],
        opacity: [0.3, 0.5, 0.3],
      }}
      transition={{
        duration: 10,
        repeat: Infinity,
        ease: 'linear',
      }}
      className="absolute inset-0 bg-gradient-to-tr from-indigo-400/20 via-purple-400/20 to-pink-400/20 dark:from-indigo-600/10 dark:via-purple-600/10 dark:to-pink-600/10 blur-3xl"
    />

    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="relative z-10 text-center px-4"
    >
      {/* Icon with rotating border */}
      <motion.div
        variants={itemVariants}
        className="relative inline-flex items-center justify-center mb-4"
      >
        {/* Rotating border gradient */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'linear',
          }}
          className="absolute inset-0 w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 opacity-50 blur-md"
        />
        
        <motion.div
          animate={{ rotate: -360 }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: 'linear',
          }}
          className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-[2px] shadow-lg"
        >
          <div className="w-full h-full rounded-full bg-white dark:bg-slate-900 flex items-center justify-center">
            <motion.div
              animate={{
                rotate: 360,
                scale: [1, 1.15, 1],
              }}
              transition={{
                rotate: { duration: 4, repeat: Infinity, ease: 'linear' },
                scale: { duration: 2, repeat: Infinity, ease: 'easeInOut' },
              }}
            >
              <UserCog className="w-7 h-7 sm:w-8 sm:h-8 text-indigo-600 dark:text-indigo-400" />
            </motion.div>
          </div>
        </motion.div>

        {/* Pulsing rings */}
        {[0, 1].map((i) => (
          <motion.div
            key={i}
            animate={{
              scale: [1, 1.5, 2],
              opacity: [0.6, 0.3, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: i * 1,
              ease: 'easeOut',
            }}
            className="absolute inset-0 w-14 h-14 sm:w-16 sm:h-16 rounded-full border-2 border-indigo-500/50 dark:border-indigo-400/50"
          />
        ))}
      </motion.div>

      {/* Text content with glassmorphism */}
      <motion.div
        variants={itemVariants}
        className="backdrop-blur-md bg-white/60 dark:bg-slate-900/60 rounded-2xl px-6 py-4 shadow-xl border border-white/30 dark:border-slate-700/30 max-w-xs mx-auto"
      >
        <motion.p
          variants={itemVariants}
          className="text-sm sm:text-base font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 dark:from-indigo-400 dark:via-purple-400 dark:to-pink-400 bg-clip-text text-transparent mb-1"
        >
          Chargement des utilisateurs...
        </motion.p>
        
        <motion.p
          variants={itemVariants}
          className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 font-medium"
        >
          Veuillez patienter
        </motion.p>

        {/* Animated progress dots */}
        <motion.div
          variants={itemVariants}
          className="flex justify-center gap-1.5 mt-3"
        >
          {[0, 1, 2, 3].map((i) => (
            <motion.div
              key={i}
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.4, 1, 0.4],
              }}
              transition={{
                duration: 1.2,
                repeat: Infinity,
                delay: i * 0.15,
                ease: 'easeInOut',
              }}
              className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500"
            />
          ))}
        </motion.div>
      </motion.div>
    </motion.div>
  </div>
));

UsersLoadingState.displayName = 'UsersLoadingState';

export default UsersLoadingState;