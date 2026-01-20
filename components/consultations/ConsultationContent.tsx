'use client';

import MarkdownContent from '@/components/consultations/MarkdownContent';
import SubjectHeader from '@/components/consultations/SubjectHeader';
import { AnalyseAstrologique } from '@/lib/interfaces';
import { motion } from 'framer-motion';
import { NumerologyTheme } from '@/components/admin/consultations/numerologie/NumerologyTheme';
import { NumerologyCycles } from '@/components/admin/consultations/numerologie/NumerologyCycles';
import { NumerologySynthesis } from '@/components/admin/consultations/numerologie/NumerologySynthesis';
import { NumerologyLifeCycles } from '@/components/admin/consultations/numerologie/NumerologyLifeCycles';
import { NumerologyWisdom } from '@/components/admin/consultations/numerologie/NumerologyWisdom';
import { Info } from 'lucide-react';


const contentVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 280,
      damping: 25,
      duration: 0.4
    }
  }
};


interface ConsultationContentProps {
  analyse: AnalyseAstrologique;
}

export function ConsultationContent({ analyse }: ConsultationContentProps) {
  const isNumerology = !!analyse.themeDeNaissance || !!analyse.cyclesEnMouvement;
  const sujet = analyse?.carteDuCiel?.sujet;
  return (
    <div className="max-w-5xl mx-auto px-2 sm:px-4 md:px-6 py-4 sm:py-6 flex flex-col items-center justify-center">
      {sujet && <SubjectHeader sujet={sujet} />}
      <motion.div
        variants={contentVariants}
        initial="hidden"
        animate="visible"
        transition={{ delay: 0.2 }}
        className="bg-white/10 backdrop-blur-lg rounded-2xl sm:rounded-3xl p-5 sm:p-6 md:p-8 border border-white/20 w-full flex flex-col items-center justify-center"
      >
        {isNumerology ? (
          <div className="w-full flex flex-col items-center justify-center gap-4 animate-fade-in">
            <div className="w-full flex flex-col items-center mb-2">
              <h2 className="text-xl md:text-2xl font-extrabold text-center text-purple-800 dark:text-purple-200 tracking-tight mb-1 flex items-center gap-2">
                Analyse Numérologique
                <Info className="w-5 h-5 text-indigo-400 dark:text-indigo-200" />
              </h2>
              <p className="text-xs md:text-sm text-center text-slate-600 dark:text-zinc-300 max-w-2xl mb-1">Découvre ta partition de vie, tes cycles, tes opportunités et les énergies du moment. Toutes les interprétations sont issues de calculs précis et d'une analyse humaine.</p>
            </div>
            <NumerologyTheme themeDeNaissance={analyse.themeDeNaissance} />
            <NumerologyCycles cyclesEnMouvement={analyse.cyclesEnMouvement} />
            <NumerologySynthesis syntheseEtTiming={analyse.syntheseEtTiming} />
            <NumerologyLifeCycles cyclesDeVieGrands={analyse.cyclesDeVieGrands ?? []} />
            <NumerologyWisdom sagesseAfricaine={analyse.sagesseAfricaine} />
          </div>
        ) : (
          <MarkdownContent content={analyse?.missionDeVie?.contenu || ''} />
        )}
      </motion.div>
    </div>
  );
}
