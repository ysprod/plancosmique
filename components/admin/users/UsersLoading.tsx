import { memo } from 'react';
import { motion } from 'framer-motion';
import { Users } from 'lucide-react';

const containerVariants = {
  hidden: { opacity: 0, scale: 0.85 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.4,
      ease: [0.6, 0.05, 0.01, 0.9],
      staggerChildren: 0.12,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: 'easeOut' },
  },
};

const UsersLoading = memo(() => (
  <div className="flex items-center justify-center min-h-[300px] relative overflow-hidden bg-gradient-to-br from-gray-50 via-blue-50/30 to-indigo-50/30 dark:from-gray-900 dark:via-blue-950/20 dark:to-indigo-950/20 rounded-xl">
    {/* Animated background orbs */}
    <motion.div
      animate={{
        scale: [1, 1.15, 1],
        rotate: [0, 90, 180],
        opacity: [0.2, 0.4, 0.2],
      }}
      transition={{
        duration: 6,
        repeat: Infinity,
        ease: 'linear',
      }}
      className="absolute inset-0 bg-gradient-to-br from-blue-400/20 via-indigo-400/20 to-purple-400/20 dark:from-blue-600/10 dark:via-indigo-600/10 dark:to-purple-600/10 blur-2xl"
    />

    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="relative z-10 flex flex-col items-center justify-center px-4"
    >
      {/* Icon container with pulse effect */}
      <motion.div
        variants={itemVariants}
        className="relative mb-6"
      >
        {/* Outer ring */}
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.4, 0.7, 0.4],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 blur-lg opacity-40"
        />

        {/* Main icon circle */}
        <motion.div
          animate={{
            rotate: [0, 360],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'linear',
          }}
          className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-500 p-[2px] shadow-xl"
        >
          <div className="w-full h-full rounded-full bg-white dark:bg-gray-900 flex items-center justify-center">
            <motion.div
              animate={{
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            >
              <Users className="w-8 h-8 sm:w-10 sm:h-10 text-indigo-600 dark:text-indigo-400" />
            </motion.div>
          </div>
        </motion.div>

        {/* Orbiting dots */}
        {[0, 120, 240].map((rotate, index) => (
          <motion.div
            key={index}
            animate={{
              rotate: [rotate, rotate + 360],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: 'linear',
              delay: index * 0.1,
            }}
            className="absolute inset-0 flex items-start justify-center"
          >
            <motion.div
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.6, 1, 0.6],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: index * 0.2,
              }}
              className="w-2 h-2 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500"
            />
          </motion.div>
        ))}
      </motion.div>

      {/* Text content */}
      <motion.div
        variants={itemVariants}
        className="backdrop-blur-sm bg-white/50 dark:bg-gray-900/50 rounded-xl px-6 py-3 border border-white/20 dark:border-gray-700/30"
      >
        <motion.p
          variants={itemVariants}
          className="text-base sm:text-lg font-semibold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 dark:from-blue-400 dark:via-indigo-400 dark:to-purple-400 bg-clip-text text-transparent"
        >
          Chargement des utilisateurs...
        </motion.p>

        {/* Loading bar */}
        <motion.div
          variants={itemVariants}
          className="mt-3 h-1 w-32 sm:w-40 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden"
        >
          <motion.div
            animate={{
              x: ['-100%', '100%'],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="h-full w-1/2 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 rounded-full"
          />
        </motion.div>
      </motion.div>
    </motion.div>
  </div>
));

UsersLoading.displayName = 'UsersLoading';

export default UsersLoading;
