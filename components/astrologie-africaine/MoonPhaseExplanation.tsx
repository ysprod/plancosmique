"use client";
import { motion } from "framer-motion";
import { memo } from "react";

export const MoonPhaseExplanation = memo(() => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6 }}
      className="mt-5 text-xs sm:text-sm text-gray-700 dark:text-gray-300 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-4 sm:p-5 max-w-2xl mx-auto border border-gray-200 dark:border-gray-700 shadow-lg"
    >
      <div className="text-center mb-3">
        <h4 className="text-base sm:text-lg font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 dark:from-purple-400 dark:via-pink-400 dark:to-indigo-400 bg-clip-text text-transparent">
          Comprendre les phases lunaires
        </h4>
      </div>
      
      <div className="space-y-3">
        <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-950/30 dark:to-pink-950/30 rounded-xl p-3 border border-purple-100 dark:border-purple-800/30">
          <ul className="space-y-2">
            <li className="flex items-start gap-2">
              <span className="text-lg shrink-0">🌑</span>
              <span><b className="text-gray-900 dark:text-white">Nouvelle Lune</b> : début du cycle, la Lune est invisible</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-lg shrink-0">🌓</span>
              <span><b className="text-gray-900 dark:text-white">Premier quartier</b> : la Lune est à moitié éclairée</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-lg shrink-0">🌕</span>
              <span><b className="text-gray-900 dark:text-white">Pleine Lune</b> : la Lune est entièrement éclairée</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-lg shrink-0">🌗</span>
              <span><b className="text-gray-900 dark:text-white">Dernier quartier</b> : la Lune est à moitié éclairée (côté opposé)</span>
            </li>
          </ul>
          <div className="mt-3 text-center text-xs sm:text-sm font-semibold text-purple-600 dark:text-purple-400">
            ✨ Cycle complet : environ 29,5 jours
          </div>
        </div>

        <div className="bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-950/30 dark:to-purple-950/30 rounded-xl p-3 border border-indigo-100 dark:border-indigo-800/30">
          <h5 className="font-bold text-gray-900 dark:text-white mb-2 text-sm">Durée approximative de chaque phase :</h5>
          <ul className="space-y-1.5 text-xs sm:text-sm">
            <li className="flex justify-between items-center">
              <span>🌑 <b className="text-gray-900 dark:text-white">Nouvelle Lune</b></span>
              <span className="text-indigo-600 dark:text-indigo-400 font-semibold">1-2 jours</span>
            </li>
            <li className="flex justify-between items-center">
              <span>🌒 <b className="text-gray-900 dark:text-white">Lune croissante</b></span>
              <span className="text-indigo-600 dark:text-indigo-400 font-semibold">~7,4 jours</span>
            </li>
            <li className="flex justify-between items-center">
              <span>🌓 <b className="text-gray-900 dark:text-white">Premier quartier</b></span>
              <span className="text-indigo-600 dark:text-indigo-400 font-semibold">1 jour</span>
            </li>
            <li className="flex justify-between items-center">
              <span>🌔 <b className="text-gray-900 dark:text-white">Gibbeuse croissante</b></span>
              <span className="text-indigo-600 dark:text-indigo-400 font-semibold">~7,4 jours</span>
            </li>
            <li className="flex justify-between items-center">
              <span>🌕 <b className="text-gray-900 dark:text-white">Pleine Lune</b></span>
              <span className="text-indigo-600 dark:text-indigo-400 font-semibold">1 jour</span>
            </li>
            <li className="flex justify-between items-center">
              <span>🌖 <b className="text-gray-900 dark:text-white">Gibbeuse décroissante</b></span>
              <span className="text-indigo-600 dark:text-indigo-400 font-semibold">~7,4 jours</span>
            </li>
            <li className="flex justify-between items-center">
              <span>🌗 <b className="text-gray-900 dark:text-white">Dernier quartier</b></span>
              <span className="text-indigo-600 dark:text-indigo-400 font-semibold">1 jour</span>
            </li>
            <li className="flex justify-between items-center">
              <span>🌘 <b className="text-gray-900 dark:text-white">Lune décroissante</b></span>
              <span className="text-indigo-600 dark:text-indigo-400 font-semibold">~7,4 jours</span>
            </li>
          </ul>
          
          <div className="mt-3 text-[10px] sm:text-xs text-gray-500 dark:text-gray-400 italic text-center">
            💡 Les durées sont approximatives et peuvent varier légèrement
          </div>
        </div>
      </div>
    </motion.div>
  );
});

MoonPhaseExplanation.displayName = "MoonPhaseExplanation";
