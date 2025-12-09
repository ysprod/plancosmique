/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { motion } from 'framer-motion';
import { Clock, CheckCircle } from 'lucide-react';
import type { AnalysisStage } from './types';

interface AnalysisProgressProps {
  analysisProgress: number;
  currentStageIndex: number;
  currentStageMessage: string;
  analysisStages: AnalysisStage[];
}

/**
 * Composant d'affichage de la progression de génération d'analyse
 * Affiche une barre de progression ultra-premium avec étapes détaillées
 */
export function AnalysisProgress({
  analysisProgress,
  currentStageIndex,
  currentStageMessage,
  analysisStages,
}: AnalysisProgressProps) {
  const currentStage = analysisStages[currentStageIndex] || analysisStages[0];
  const CurrentStageIcon = currentStage.icon;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="mb-6"
    >
      <div className="bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden p-5 sm:p-8 relative">
        {/* Étoiles animées en arrière-plan */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(30)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute bg-white rounded-full"
              style={{
                width: Math.random() * 4 + 1 + 'px',
                height: Math.random() * 4 + 1 + 'px',
                left: Math.random() * 100 + '%',
                top: Math.random() * 100 + '%',
              }}
              animate={{
                opacity: [0, 1, 0],
                scale: [0, 1.5, 0],
              }}
              transition={{
                duration: Math.random() * 3 + 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>

        {/* Contenu principal */}
        <div className="relative z-10">
          {/* Icône centrale animée de l'étape actuelle */}
          <div className="flex justify-center mb-5 sm:mb-6">
            <motion.div
              key={currentStageIndex}
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: 'spring', stiffness: 200, damping: 15 }}
              className="relative"
            >
              <motion.div
                className={`absolute inset-0 bg-gradient-to-r ${currentStage.color} rounded-full blur-2xl opacity-60`}
                animate={{
                  scale: [1, 1.3, 1],
                  opacity: [0.6, 0.8, 0.6],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />
              <div className="relative bg-white/20 backdrop-blur-sm rounded-full p-5 sm:p-6">
                <CurrentStageIcon className="w-10 h-10 sm:w-16 sm:h-16 text-white" />
              </div>
            </motion.div>
          </div>

          {/* Titre dynamique */}
          <motion.h2
            key={`title-${currentStageIndex}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-xl sm:text-3xl md:text-4xl font-bold text-white text-center mb-2"
          >
            ✨ {currentStage.label}
          </motion.h2>

          {/* Message dynamique */}
          <motion.p
            key={`msg-${currentStageIndex}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-white/90 text-center text-xs sm:text-base mb-5 sm:mb-6 px-2 min-h-[40px] sm:min-h-[48px]"
          >
            {currentStageMessage}
          </motion.p>

          {/* 📊 BARRE DE PROGRESSION ULTRA-PREMIUM */}
          <div className="space-y-3 mb-5 sm:mb-6">
            {/* Barre de progression avec indicateur intégré */}
            <div className="relative">
              {/* Container de la barre */}
              <div className="bg-white/20 backdrop-blur-sm rounded-full h-8 sm:h-10 overflow-hidden shadow-inner relative">
                {/* Barre de progression principale */}
                <motion.div
                  className={`h-full bg-gradient-to-r ${currentStage.color} rounded-full relative shadow-lg flex items-center justify-end pr-3 sm:pr-4`}
                  initial={{ width: '0%' }}
                  animate={{ width: `${analysisProgress}%` }}
                  transition={{ duration: 0.3, ease: 'easeOut' }}
                >
                  {/* Effet brillant qui traverse */}
                  <motion.div
                    className="absolute inset-0 bg-white/40"
                    animate={{
                      x: ['-100%', '200%'],
                    }}
                    transition={{
                      duration: 1.2,
                      repeat: Infinity,
                      ease: 'linear',
                    }}
                  />
                  
                  {/* Pourcentage DANS la barre (si largeur > 30%) */}
                  {analysisProgress > 30 && (
                    <motion.span
                      key={`inner-${analysisProgress}`}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="relative z-10 text-white font-bold text-sm sm:text-lg drop-shadow-lg"
                    >
                      {analysisProgress}%
                    </motion.span>
                  )}
                </motion.div>

                {/* Pourcentage HORS de la barre (si largeur < 30%) */}
                {analysisProgress <= 30 && (
                  <motion.div
                    key={`outer-${analysisProgress}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="absolute inset-0 flex items-center justify-center"
                  >
                    <span className="text-white font-bold text-sm sm:text-lg drop-shadow-lg">
                      {analysisProgress}%
                    </span>
                  </motion.div>
                )}
              </div>

              {/* Indicateur de pulsation sur le bord de la progression */}
              <motion.div
                className="absolute top-1/2 -translate-y-1/2 w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-white shadow-lg ring-2 ring-white/50"
                animate={{
                  left: `${analysisProgress}%`,
                  scale: [1, 1.3, 1],
                }}
                transition={{
                  left: { duration: 0.3, ease: 'easeOut' },
                  scale: { duration: 1, repeat: Infinity, ease: 'easeInOut' },
                }}
                style={{
                  filter: 'drop-shadow(0 0 8px rgba(255, 255, 255, 0.8))',
                }}
              />
            </div>

            {/* Informations détaillées sous la barre */}
            <div className="flex justify-between items-center px-2">
              {/* Étape actuelle */}
              <div className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${currentStage.color} animate-pulse`} />
                <p className="text-white/80 text-[10px] sm:text-sm font-medium">
                  Étape {currentStageIndex + 1}/{analysisStages.length}
                </p>
              </div>

              {/* Temps estimé restant */}
              <motion.div
                key={`time-${currentStageIndex}`}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-center gap-1.5 bg-white/10 backdrop-blur-sm rounded-full px-2 sm:px-3 py-1"
              >
                <Clock className="w-3 h-3 sm:w-4 sm:h-4 text-white/70" />
                <p className="text-white/80 text-[10px] sm:text-xs font-medium">
                  ~{Math.ceil((100 - analysisProgress) / 3)}s restantes
                </p>
              </motion.div>
            </div>

            {/* Barre de segments (mini-visualisation des étapes) */}
            <div className="flex gap-0.5 sm:gap-1 px-2">
              {analysisStages.map((stage, index) => {
                const isCompleted = analysisProgress >= stage.progress;
                const isActive = index === currentStageIndex;
                
                return (
                  <motion.div
                    key={index}
                    className={`flex-1 h-1 sm:h-1.5 rounded-full transition-all ${
                      isCompleted
                        ? 'bg-gradient-to-r ' + stage.color
                        : isActive
                        ? 'bg-white/40'
                        : 'bg-white/10'
                    }`}
                    animate={
                      isActive
                        ? {
                            opacity: [0.4, 1, 0.4],
                            transition: { duration: 1, repeat: Infinity },
                          }
                        : {}
                    }
                  />
                );
              })}
            </div>
          </div>

          {/* Liste des étapes avec indicateurs visuels */}
          <div className="grid grid-cols-3 sm:grid-cols-5 gap-1.5 sm:gap-3 mb-4 sm:mb-6">
            {analysisStages.slice(0, -1).map((stage, index) => {
              const isCompleted = analysisProgress >= stage.progress;
              const isActive = index === currentStageIndex;
              const StageIcon = stage.icon;

              return (
                <motion.div
                  key={index}
                  className={`relative rounded-lg sm:rounded-xl p-1.5 sm:p-3 text-center transition-all ${
                    isCompleted
                      ? 'bg-white/25 ring-1 sm:ring-2 ring-white/50'
                      : isActive
                      ? 'bg-white/15 ring-1 ring-white/30'
                      : 'bg-white/5'
                  }`}
                  animate={
                    isActive
                      ? {
                          scale: [1, 1.05, 1],
                          transition: { duration: 0.5, repeat: Infinity },
                        }
                      : {}
                  }
                >
                  <StageIcon
                    className={`w-4 h-4 sm:w-6 sm:h-6 mx-auto mb-0.5 sm:mb-1 ${
                      isCompleted
                        ? 'text-yellow-300'
                        : isActive
                        ? 'text-white'
                        : 'text-white/40'
                    }`}
                  />
                  <p
                    className={`text-[9px] sm:text-xs font-medium leading-tight ${
                      isCompleted
                        ? 'text-white'
                        : isActive
                        ? 'text-white/90'
                        : 'text-white/40'
                    }`}
                  >
                    {stage.label}
                  </p>
                  {isCompleted && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute -top-1 -right-1 bg-green-500 rounded-full p-0.5"
                    >
                      <CheckCircle className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-white" />
                    </motion.div>
                  )}
                </motion.div>
              );
            })}
          </div>

          {/* Message d'attente */}
          <motion.p
            className="text-white/70 text-center text-[10px] sm:text-sm italic"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            ⏳ Ne fermez pas cette page, la génération est en cours...
          </motion.p>
        </div>
      </div>
    </motion.div>
  );
}
