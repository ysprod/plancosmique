import React, { memo } from "react";
import { motion } from "framer-motion";
import { Loader2, Sparkles } from "lucide-react";

// ============================================================================
// TYPES
// ============================================================================

interface RubriquesLoaderProps {
  loading: boolean;
  offeringsLoading: boolean;
}

// ============================================================================
// VARIANTS D'ANIMATION
// ============================================================================

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 24
    }
  }
};

const pulseVariants = {
  pulse: {
    scale: [1, 1.05, 1],
    opacity: [0.5, 0.8, 0.5],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
};

const floatVariants = {
  float: {
    y: [0, -8, 0],
    transition: {
      duration: 2.5,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
};

// ============================================================================
// COMPOSANT OPTIMISÉ
// ============================================================================

export const RubriquesLoader = memo<RubriquesLoaderProps>(({ loading, offeringsLoading }) => {
  const message = loading ? "Chargement des rubriques..." : "Chargement des offrandes...";
  const icon = loading ? Loader2 : Sparkles;

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-50 via-purple-50/30 to-pink-50/30">
      {/* Grille de fond subtile */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:24px_24px]" />

      {/* Cercles décoratifs animés */}
      <motion.div
        variants={pulseVariants}
        animate="pulse"
        className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-br from-purple-400/10 to-pink-400/10 rounded-full blur-3xl"
      />
      <motion.div
        variants={pulseVariants}
        animate="pulse"
        style={{ animationDelay: "1s" }}
        className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-br from-blue-400/10 to-purple-400/10 rounded-full blur-3xl"
      />

      {/* Contenu principal */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 flex flex-col items-center gap-4 p-6"
      >
        {/* Conteneur icon avec glow */}
        <motion.div
          variants={floatVariants}
          animate="float"
          className="relative"
        >
          {/* Glow effect */}
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute inset-0 bg-gradient-to-br from-violet-500 to-purple-600 rounded-full blur-xl"
          />

          {/* Icon container */}
          <div className="relative flex items-center justify-center w-20 h-20 bg-gradient-to-br from-violet-500 to-purple-600 rounded-2xl shadow-2xl shadow-violet-500/30">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "linear"
              }}
            >
              {React.createElement(icon, {
                className: "w-10 h-10 text-white",
                strokeWidth: 2.5
              })}
            </motion.div>
          </div>
        </motion.div>

        {/* Message animé */}
        <motion.div
          variants={itemVariants}
          className="text-center space-y-2"
        >
          <motion.h3
            key={message}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-base sm:text-lg font-bold text-gray-900"
          >
            {message}
          </motion.h3>
          <motion.p
            variants={itemVariants}
            className="text-xs sm:text-sm text-gray-500"
          >
            Veuillez patienter quelques instants
          </motion.p>
        </motion.div>

        {/* Barre de progression animée */}
        <motion.div
          variants={itemVariants}
          className="w-48 sm:w-64 h-1.5 bg-gray-200 rounded-full overflow-hidden"
        >
          <motion.div
            animate={{
              x: ["-100%", "100%"]
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="h-full w-1/2 bg-gradient-to-r from-violet-500 via-purple-600 to-violet-500 rounded-full"
          />
        </motion.div>

        {/* Points animés */}
        <motion.div
          variants={itemVariants}
          className="flex gap-1.5"
        >
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.3, 1, 0.3]
              }}
              transition={{
                duration: 1.2,
                repeat: Infinity,
                delay: i * 0.2,
                ease: "easeInOut"
              }}
              className="w-2 h-2 rounded-full bg-gradient-to-br from-violet-500 to-purple-600"
            />
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
});

RubriquesLoader.displayName = "RubriquesLoader";
