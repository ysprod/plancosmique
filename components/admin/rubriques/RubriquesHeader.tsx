import { memo } from 'react';
import { motion } from 'framer-motion';
import { Package, Plus, Sparkles } from "lucide-react";

interface RubriquesHeaderProps {
  rubriquesCount: number;
  offeringsCount: number;
  onCreate: () => void;
}

const headerVariants = {
  initial: { opacity: 0, y: -20 },
  animate: { 
    opacity: 1, 
    y: 0,
    transition: { 
      duration: 0.5,
      type: 'spring',
      stiffness: 200,
      damping: 20
    }
  }
};

const iconVariants = {
  initial: { scale: 0.8, rotate: -10 },
  animate: { 
    scale: 1, 
    rotate: 0,
    transition: { 
      type: 'spring',
      stiffness: 300,
      damping: 15
    }
  }
};

export const RubriquesHeader = memo(function RubriquesHeader({ 
  rubriquesCount, 
  offeringsCount, 
  onCreate 
}: RubriquesHeaderProps) {
  return (
    <motion.div
      variants={headerVariants}
      initial="initial"
      animate="animate"
      className="flex flex-col gap-4 sm:gap-0 sm:flex-row sm:items-center sm:justify-between mb-6 sm:mb-8"
    >
      <div className="flex items-center gap-3 sm:gap-4">
        <motion.div
          variants={iconVariants}
          whileHover={{ rotate: [0, -10, 10, -10, 0], scale: 1.1 }}
          transition={{ duration: 0.5 }}
          className="p-2.5 sm:p-3 bg-gradient-to-br from-violet-600 via-purple-600 to-fuchsia-600 dark:from-violet-500 dark:via-purple-500 dark:to-fuchsia-500 rounded-xl sm:rounded-2xl shadow-lg"
        >
          <Package className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
        </motion.div>
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight">
            Gestion des rubriques
          </h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-xs sm:text-sm text-slate-600 dark:text-zinc-400 flex items-center gap-2 mt-0.5"
          >
            <span className="inline-flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-violet-500 dark:text-violet-400" />
              <strong className="font-bold text-slate-800 dark:text-zinc-200">{rubriquesCount}</strong> rubriques
            </span>
            <span className="text-slate-400 dark:text-zinc-600">•</span>
            <span>
              <strong className="font-bold text-slate-800 dark:text-zinc-200">{offeringsCount}</strong> offrandes
            </span>
          </motion.p>
        </div>
      </div>

      <motion.button
        onClick={onCreate}
        whileHover={{ scale: 1.05, y: -2 }}
        whileTap={{ scale: 0.95 }}
        transition={{ type: 'spring', stiffness: 400, damping: 20 }}
        className="flex items-center justify-center gap-2 px-4 sm:px-5 py-2.5 sm:py-3 rounded-xl sm:rounded-2xl bg-gradient-to-r from-violet-600 to-purple-600 dark:from-violet-500 dark:to-purple-500 text-white text-sm sm:text-base font-bold hover:from-violet-700 hover:to-purple-700 dark:hover:from-violet-600 dark:hover:to-purple-600 transition-all shadow-lg hover:shadow-xl"
      >
        <motion.div
          whileHover={{ rotate: 90 }}
          transition={{ duration: 0.3 }}
        >
          <Plus className="w-4 h-4 sm:w-5 sm:h-5" />
        </motion.div>
        <span className="hidden sm:inline">Nouvelle rubrique</span>
        <span className="sm:hidden">Nouvelle</span>
      </motion.button>
    </motion.div>
  );
});
