'use client';
import { memo } from 'react';
import WelcomeHeader from '@/components/accueil/WelcomeHeader';
import WelcomeQuestions from '@/components/accueil/WelcomeQuestions';
import WelcomeIntro from '@/components/accueil/WelcomeIntro';

function WelcomePageClient() {
  return (
    <div className="flex items-center justify-center bg-gradient-to-br from-purple-50 via-indigo-50 to-pink-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 py-6 sm:py-8">
      <div className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-600 via-indigo-600 to-pink-600 z-50 origin-left"      >
        <div className="h-full w-1/3 bg-gradient-to-r from-transparent via-white/40 to-transparent" />
      </div>
      <div className="w-full max-w-4xl mx-auto px-3 sm:px-6"      >
        <WelcomeHeader />
        <p className="text-center mb-4 text-xs sm:text-sm text-gray-700 dark:text-slate-300 px-2 leading-relaxed">
          Bienvenue dans ce temple, où chacun vient chercher une réponse aux trois grandes questions de l'existence :
        </p>
        <WelcomeQuestions />
        <WelcomeIntro />
      </div>
    </div>
  );
}

export default memo(WelcomePageClient);