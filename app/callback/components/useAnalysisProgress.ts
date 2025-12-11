/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useCallback, useState } from 'react';
import type { AnalysisStage } from './types';

/**
 * Hook custom pour gérer la progression de l'analyse
 */
export function useAnalysisProgress(analysisStages: AnalysisStage[]) {
  const [isGeneratingAnalysis, setIsGeneratingAnalysis] = useState(true);
  const [analysisCompleted, setAnalysisCompleted] = useState(false);
  const [analysisProgress, setAnalysisProgress] = useState(0);
  const [currentStageIndex, setCurrentStageIndex] = useState(0);
  const [currentStageMessage, setCurrentStageMessage] = useState('');

  const resetProgress = useCallback(() => {
    setAnalysisProgress(0);
    setCurrentStageIndex(0);
    setCurrentStageMessage('');
    setAnalysisCompleted(false);
  }, []);

  const startAnalysisAnimation = useCallback(async () => {
    setIsGeneratingAnalysis(true);
    setAnalysisCompleted(false);
    setAnalysisProgress(0);
    setCurrentStageIndex(0);
    setCurrentStageMessage('');

    let isCancelled = false;

    const animateStages = async () => {
      for (let i = 0; i < analysisStages.length && !isCancelled; i++) {
        const stage = analysisStages[i];
        setCurrentStageIndex(i);
        setCurrentStageMessage(stage.description);

        const startProgress = i === 0 ? 0 : analysisStages[i - 1].progress;
        const endProgress = stage.progress;
        const steps = 20;
        const stepDuration = stage.duration / steps;

        for (let step = 0; step <= steps && !isCancelled; step++) {
          const progress = startProgress + ((endProgress - startProgress) * step) / steps;
          setAnalysisProgress(Math.round(progress));
          await new Promise((resolve) => setTimeout(resolve, stepDuration));
        }

        if (i < analysisStages.length - 1 && !isCancelled) {
          await new Promise((resolve) => setTimeout(resolve, 500));
        }
      }

      if (!isCancelled) {
        setAnalysisCompleted(true);
        setIsGeneratingAnalysis(false);
        console.log('✅ Analyse terminée, activation de la redirection...');
      }
    };

    animateStages();

    return () => {
      isCancelled = true;
      setIsGeneratingAnalysis(false);
    };
  }, [analysisStages]);

  return {
    isGeneratingAnalysis,
    setIsGeneratingAnalysis,
    analysisCompleted,
    analysisProgress,
    currentStageIndex,
    currentStageMessage,
    resetProgress,
    startAnalysisAnimation,
  };
}
