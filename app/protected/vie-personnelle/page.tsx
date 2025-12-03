'use client';

import { AnimatePresence, motion } from 'framer-motion';
import {
  UserCheck
} from 'lucide-react';
import React, { useState } from 'react';
import Slide4Section from './Slide4Section';
import AspectAffirmation from './components/AspectAffirmation';
import AspectDeepAnalysis from './components/AspectDeepAnalysis';
import AspectExercises from './components/AspectExercises';
import AspectHeader from './components/AspectHeader';
import AspectInsights from './components/AspectInsights';
import AspectLearnings from './components/AspectLearnings';
import AspectTransformation from './components/AspectTransformation';
import BackButton from './components/BackButton';
import FloatingCTA from './components/FloatingCTA';
import TabsNavigation from './components/TabsNavigation';
import { personalLifeAspects } from './personalLifeAspects';

 

const ViePersonnellePage = () => {
  const [activeTab, setActiveTab] = useState<string>('theme');

  // Ajout du nouvel onglet Consultation
  const consultationTab = {
    id: 'consultation',
    title: 'Consultation',
    icon: <UserCheck className="w-5 h-5" />,
  };

  // Tabs avec le nouvel onglet consultation
  const aspectTabs = [ consultationTab,...personalLifeAspects];
  const activeAspect = personalLifeAspects.find(a => a.id === activeTab);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-fuchsia-50">
      {/* Bouton Retour */}
      <BackButton />

      {/* HEADER */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white/80 backdrop-blur-md shadow-lg border-b border-purple-100"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          <div className="text-center">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-violet-700 via-purple-600 to-fuchsia-600 bg-clip-text text-transparent mb-4">
              Ma Vie Personnelle
            </h1>
            <p className="text-base sm:text-lg text-gray-700 max-w-3xl mx-auto leading-relaxed">
              Explorez votre essence profonde, vos talents cachés et votre destinée.
            </p>
          </div>
        </div>
      </motion.div>

      {/* Navigation par onglets */}
      <TabsNavigation aspectTabs={aspectTabs} activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Contenu de l'onglet actif */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <AnimatePresence mode="wait">
          {activeTab === 'consultation' ? (
            <motion.div
              key="consultation"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-2xl shadow-2xl p-6 sm:p-8 lg:p-12"
            >
              <Slide4Section />
            </motion.div>
          ) : (
            activeAspect && (
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.5 }}
                className="bg-white rounded-2xl shadow-2xl p-6 sm:p-8 lg:p-12"
              >
                <AspectHeader
                  icon={activeAspect.icon}
                  title={activeAspect.title}
                  description={activeAspect.description}
                  introduction={activeAspect.introduction}
                />
                <AspectInsights keyInsights={activeAspect.keyInsights} />
                <AspectDeepAnalysis deepAnalysis={activeAspect.deepAnalysis} />
                <AspectLearnings whatYouLearn={activeAspect.whatYouLearn} />
                <AspectTransformation transformation={activeAspect.transformation} />
                <AspectExercises practicalExercise={activeAspect.practicalExercise} />
                <AspectAffirmation affirmation={activeAspect.affirmation} />
                {/* Prix et CTA */}
                <div className="text-center p-6 bg-gradient-to-r from-violet-100 to-fuchsia-100 rounded-xl">
                  <p className="text-sm text-gray-600 mb-4">Analyse personnalisée détaillée</p>
                  <button
                    onClick={() => alert('Fonction de commande à implémenter avec votre backend')}
                    className="px-8 py-4 bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white font-bold rounded-full shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 text-lg"
                  >
                    ✨ Commander Cette Analyse
                  </button>
                </div>
              </motion.div>
            )
          )}
        </AnimatePresence>
      </div>

      {/* CTA flottant */}
      <FloatingCTA />
    </div>
  );
};

export default ViePersonnellePage;
