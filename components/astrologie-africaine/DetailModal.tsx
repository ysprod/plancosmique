"use client";
import { motion, useReducedMotion } from "framer-motion";
import { Info, X } from "lucide-react";
import { memo } from "react";
import { getAdvice, getPhaseConfig } from "./moonPhaseUtils";
import { modalVariants } from "./moonPhaseVariants";
import type { MoonPhaseDay } from "./useMoonPhaseData";

interface DetailModalProps {
  day: MoonPhaseDay | null;
  onClose: () => void;
}

export const DetailModal = memo<DetailModalProps>(({ day, onClose }) => {
  const prefersReducedMotion = useReducedMotion();

  if (!day) return null;

  const phaseConfig = getPhaseConfig(day.phaseName);
  const advice = getAdvice(day.illumination);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      className="fixed inset-0 bg-black/80 dark:bg-black/90 backdrop-blur-md z-50 flex items-center justify-center p-3 sm:p-4"
    >
      <motion.div
        variants={modalVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        onClick={(e) => e.stopPropagation()}
        className="bg-white dark:bg-gray-900 rounded-2xl sm:rounded-3xl p-4 sm:p-6 max-w-sm w-full shadow-2xl border border-gray-200 dark:border-gray-700"
      >
        <div className="flex items-center justify-between mb-4 sm:mb-5">
          <div className="flex items-center gap-2.5">
            <motion.div 
              whileHover={{ rotate: [0, -10, 10, 0], scale: 1.05 }}
              transition={{ duration: 0.5 }}
              className={`w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br ${phaseConfig.badge} flex items-center justify-center shadow-lg`}
            >
              <span className="text-2xl">{phaseConfig.emoji}</span>
            </motion.div>
            <div>
              <h3 className="text-xl sm:text-2xl font-black text-gray-900 dark:text-white">
                Jour {day.day}
              </h3>
              <p className="text-xs text-gray-500 dark:text-gray-400">Phase Lunaire</p>
            </div>
          </div>
          <motion.button
            whileHover={{ scale: 1.1, rotate: 90 }}
            whileTap={{ scale: 0.9 }}
            onClick={onClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl transition-colors"
            aria-label="Fermer"
          >
            <X className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600 dark:text-gray-300" />
          </motion.button>
        </div>

        <div className="flex justify-center mb-5">
          <motion.div
            initial={prefersReducedMotion ? {} : { scale: 0.7, rotate: -90, opacity: 0 }}
            animate={{ scale: 1, rotate: 0, opacity: 1 }}
            transition={{ type: "spring", stiffness: 300, damping: 22 }}
            className="relative"
          >
            <motion.div
              animate={{ 
                boxShadow: [
                  "0 0 20px rgba(168, 85, 247, 0.4)",
                  "0 0 40px rgba(168, 85, 247, 0.6)",
                  "0 0 20px rgba(168, 85, 247, 0.4)"
                ]
              }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-28 h-28 sm:w-32 sm:h-32 rounded-full"
              dangerouslySetInnerHTML={{ __html: day.svg }}
            />
          </motion.div>
        </div>

        <div className="space-y-3">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-950/30 dark:to-pink-950/30 rounded-xl p-3 border border-purple-100 dark:border-purple-800/30"
          >
            <div className="flex justify-between items-center mb-1.5">
              <span className="text-xs font-semibold text-gray-700 dark:text-gray-300">Phase</span>
              <span className="text-sm font-black text-gray-900 dark:text-white">{day.phaseName}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-xs font-semibold text-gray-700 dark:text-gray-300">Illumination</span>
              <span className="text-sm font-black bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-400 dark:to-pink-400 bg-clip-text text-transparent">{day.illumination}%</span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="flex justify-between text-[10px] text-gray-600 dark:text-gray-400 mb-1.5 px-1">
              <span>🌑 Nouvelle</span>
              <span>Pleine 🌕</span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 overflow-hidden shadow-inner">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${day.illumination}%` }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className={`h-full bg-gradient-to-r ${phaseConfig.badge} rounded-full relative`}
              >
                <motion.div
                  animate={{ x: ['-100%', '100%'] }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                />
              </motion.div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-950/30 dark:to-purple-950/30 rounded-xl p-3 border border-indigo-200 dark:border-indigo-800/30"
          >
            <div className="flex items-center gap-1.5 mb-1.5">
              <motion.div
                animate={{ rotate: [0, 15, -15, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Info className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
              </motion.div>
              <span className="font-bold text-gray-900 dark:text-white text-xs sm:text-sm">Conseil énergétique</span>
            </div>
            <p className="text-xs sm:text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
              {advice}
            </p>
          </motion.div>
        </div>

        <motion.button
          whileHover={{ scale: 1.02, y: -2 }}
          whileTap={{ scale: 0.98 }}
          onClick={onClose}
          className={`w-full mt-4 py-3 bg-gradient-to-r ${phaseConfig.badge} text-white rounded-xl font-bold text-sm sm:text-base shadow-lg hover:shadow-2xl transition-all relative overflow-hidden`}
        >
          <motion.div
            animate={{ x: ['-100%', '100%'] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
          />
          <span className="relative">Compris</span>
        </motion.button>
      </motion.div>
    </motion.div>
  );
});

DetailModal.displayName = "DetailModal";
