'use client';
import { memo } from "react";
import { motion } from "framer-motion";
import { Sparkles, Stars, Moon } from "lucide-react";

const containerVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut",
      staggerChildren: 0.15,
      delayChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 200,
      damping: 20
    }
  }
};

const floatVariants = {
  float: {
    y: [-10, 10, -10],
    rotate: [-5, 5, -5],
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
};

const CategoryEmptyState = memo(() => (
  <motion.div
    variants={containerVariants}
    initial="hidden"
    animate="visible"
    className="flex items-center justify-center min-h-[400px] sm:min-h-[500px] px-4 py-12"
  >
    <div className="relative max-w-lg w-full">
      {/* Background decoration */}
      <motion.div
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.3, 0.5, 0.3]
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute inset-0 bg-gradient-to-br from-purple-200/40 via-pink-200/40 to-orange-200/40 dark:from-purple-900/20 dark:via-pink-900/20 dark:to-orange-900/20 rounded-3xl blur-3xl"
      />

      {/* Main card */}
      <motion.div
        variants={itemVariants}
        className="relative bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-3xl sm:rounded-[2rem] p-8 sm:p-12 border-2 border-dashed border-purple-300/50 dark:border-purple-700/50 shadow-2xl overflow-hidden"
      >
        {/* Floating icons */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            variants={floatVariants}
            animate="float"
            className="absolute top-8 right-8"
          >
            <Stars className="w-8 h-8 sm:w-10 sm:h-10 text-purple-400/30 dark:text-purple-500/30" />
          </motion.div>
          <motion.div
            variants={floatVariants}
            animate="float"
            transition={{ delay: 0.5 }}
            className="absolute bottom-8 left-8"
          >
            <Moon className="w-6 h-6 sm:w-8 sm:h-8 text-pink-400/30 dark:text-pink-500/30" />
          </motion.div>
          <motion.div
            variants={floatVariants}
            animate="float"
            transition={{ delay: 1 }}
            className="absolute top-1/2 left-1/4"
          >
            <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 text-orange-400/30 dark:text-orange-500/30" />
          </motion.div>
        </div>

        {/* Content */}
        <div className="relative text-center space-y-4 sm:space-y-6">
          {/* Icon */}
          <motion.div
            variants={itemVariants}
            className="flex justify-center"
          >
            <motion.div
              animate={{
                rotate: [0, 360],
                scale: [1, 1.1, 1]
              }}
              transition={{
                rotate: {
                  duration: 20,
                  repeat: Infinity,
                  ease: "linear"
                },
                scale: {
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }
              }}
              className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-to-br from-purple-400 via-pink-400 to-orange-400 dark:from-purple-600 dark:via-pink-600 dark:to-orange-600 flex items-center justify-center shadow-xl"
            >
              <Sparkles className="w-10 h-10 sm:w-12 sm:h-12 text-white" strokeWidth={2.5} />
              
              {/* Orbit ring */}
              <motion.div
                animate={{ rotate: -360 }}
                transition={{
                  duration: 15,
                  repeat: Infinity,
                  ease: "linear"
                }}
                className="absolute inset-0 border-2 border-dashed border-purple-300/50 dark:border-purple-600/50 rounded-full -m-8"
              >
                <div className="absolute -top-1 left-1/2 -ml-1 w-2 h-2 rounded-full bg-purple-500 dark:bg-purple-400" />
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Title */}
          <motion.h3
            variants={itemVariants}
            className="text-xl sm:text-2xl lg:text-3xl font-bold bg-gradient-to-r from-purple-700 via-pink-600 to-orange-600 bg-clip-text text-transparent dark:from-purple-400 dark:via-pink-400 dark:to-orange-400"
          >
            Aucune rubrique disponible
          </motion.h3>

          {/* Description */}
          <motion.p
            variants={itemVariants}
            className="text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed max-w-md mx-auto"
          >
            Cette catégorie ne contient pas encore de rubriques. Revenez plus tard pour découvrir de nouvelles consultations spirituelles.
          </motion.p>

          {/* Decorative line */}
          <motion.div
            variants={itemVariants}
            className="flex items-center justify-center gap-2 pt-4"
          >
            <motion.div
              animate={{ scaleX: [0, 1, 0] }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="h-px w-16 sm:w-24 bg-gradient-to-r from-transparent via-purple-400 to-transparent dark:from-transparent dark:via-purple-600 dark:to-transparent"
            />
            <Sparkles className="w-4 h-4 text-purple-400 dark:text-purple-500" />
            <motion.div
              animate={{ scaleX: [0, 1, 0] }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1.5
              }}
              className="h-px w-16 sm:w-24 bg-gradient-to-r from-transparent via-purple-400 to-transparent dark:from-transparent dark:via-purple-600 dark:to-transparent"
            />
          </motion.div>
        </div>
      </motion.div>
    </div>
  </motion.div>
));

CategoryEmptyState.displayName = 'CategoryEmptyState';

export default CategoryEmptyState;