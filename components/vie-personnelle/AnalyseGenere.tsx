"use client";
import { useNavigation } from '@/hooks/analysegenere/useNavigation';
import type { Consultation } from '@/lib/interfaces';
import { motion } from 'framer-motion';
import { memo, useMemo } from 'react';
import ConsultationSummary from '../categorie/ConsultationSummary';
import BackButton from './analysegenere/BackButton';
import ConfidentialityNotice from './analysegenere/ConfidentialityNotice';
import MasterAssignmentNotice from './analysegenere/MasterAssignmentNotice';
import ProcessSteps from './analysegenere/ProcessSteps';
import ThankYouMessage from './analysegenere/ThankYouMessage';
import TimelineBadge from './analysegenere/TimelineBadge';

interface AnalyseGenereProps {
  consultation?: Partial<Consultation>;
  choix?: any;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      type: "spring",
      stiffness: 200,
      damping: 20
    }
  }
};

const AnalyseGenere = memo<AnalyseGenereProps>(({ consultation, choix }) => {
  const { navigateToProfil } = useNavigation();

  const consultationTitle = useMemo(() => 
    consultation?.title || choix?.title || 'Votre consultation',
    [consultation?.title, choix?.title]
  );

  return (
    <div 
      className="min-h-[80vh] flex items-center justify-center px-3 sm:px-4 py-8 sm:py-12 bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 dark:from-slate-950 dark:via-purple-950/30 dark:to-slate-900"
      role="main"
      aria-labelledby="success-heading"
    >
      <motion.div 
        className="w-full max-w-4xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="space-y-4 sm:space-y-5">
          
          <motion.div
            variants={itemVariants}
            className="text-center space-y-2 sm:space-y-2.5"
          >
            <h1 
              id="success-heading"
              className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-purple-700 via-pink-600 to-purple-700 bg-clip-text text-transparent dark:from-purple-400 dark:via-pink-400 dark:to-purple-400"
            >
              Félicitations !
            </h1>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 font-medium">
              Votre demande a bien été enregistrée ✨
            </p>
            <p className="sr-only">
              Votre consultation "{consultationTitle}" a été soumise avec succès et est en cours de traitement.
            </p>
          </motion.div>

          {/* Consultation Summary */}
          <motion.div variants={itemVariants}>
            <ConsultationSummary consultation={consultation} choix={choix} />
          </motion.div>

          {/* Master Assignment Notice */}
          <motion.div variants={itemVariants}>
            <MasterAssignmentNotice />
          </motion.div>

          {/* Timeline Badge */}
          <motion.div variants={itemVariants} className="flex justify-center pt-2">
            <TimelineBadge />
          </motion.div>

          {/* Confidentiality Notice */}
          <motion.div variants={itemVariants}>
            <ConfidentialityNotice />
          </motion.div>

          {/* Process Steps */}
          <motion.div variants={itemVariants}>
            <ProcessSteps />
          </motion.div>

          {/* Thank You Message */}
          <motion.div variants={itemVariants}>
            <ThankYouMessage />
          </motion.div>

          {/* Back Button */}
          <motion.div variants={itemVariants} className="flex justify-center pt-2">
            <BackButton onClick={navigateToProfil} />
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
});

AnalyseGenere.displayName = 'AnalyseGenere';

export default AnalyseGenere;