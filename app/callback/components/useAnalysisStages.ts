/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useMemo } from 'react';
import type { AnalysisStage } from './types';
import {
  BookOpen,
  CheckCircle,
  Compass,
  Heart,
  Sparkles,
  Stars,
  Target,
  Telescope,
  Zap,
} from 'lucide-react';

/**
 * Hook custom pour obtenir les étapes de génération d'analyse
 */
export function useAnalysisStages() {
  return useMemo<AnalysisStage[]>(
    () => [
      {
        progress: 5,
        label: 'Initialisation',
        icon: Sparkles,
        color: 'from-blue-400 to-cyan-400',
        description: 'Préparation des données de naissance...',
        duration: 1000,
      },
      {
        progress: 15,
        label: 'Positions Planétaires',
        icon: Stars,
        color: 'from-purple-400 to-pink-400',
        description: 'Calcul des positions célestes à votre naissance...',
        duration: 3000,
      },
      {
        progress: 30,
        label: 'Aspects Astrologiques',
        icon: Zap,
        color: 'from-yellow-400 to-orange-400',
        description: 'Analyse des interactions entre les planètes...',
        duration: 4000,
      },
      {
        progress: 45,
        label: 'Thème Natal',
        icon: Telescope,
        color: 'from-indigo-400 to-purple-400',
        description: 'Construction de votre carte du ciel personnalisée...',
        duration: 5000,
      },
      {
        progress: 60,
        label: 'Maisons Astrologiques',
        icon: Compass,
        color: 'from-green-400 to-teal-400',
        description: 'Interprétation des 12 maisons de votre thème...',
        duration: 4000,
      },
      {
        progress: 75,
        label: 'Mission de Vie',
        icon: Target,
        color: 'from-pink-400 to-rose-400',
        description: 'Dévoilement de votre chemin de vie karmique...',
        duration: 5000,
      },
      {
        progress: 88,
        label: 'Personnalité',
        icon: Heart,
        color: 'from-red-400 to-pink-400',
        description: 'Analyse approfondie de votre personnalité...',
        duration: 3000,
      },
      {
        progress: 95,
        label: 'Finalisation',
        icon: BookOpen,
        color: 'from-violet-400 to-purple-400',
        description: 'Compilation de votre rapport complet...',
        duration: 2000,
      },
      {
        progress: 100,
        label: 'Terminé',
        icon: CheckCircle,
        color: 'from-green-400 to-emerald-400',
        description: 'Votre analyse astrologique est prête !',
        duration: 1000,
      },
    ],
    []
  );
}
