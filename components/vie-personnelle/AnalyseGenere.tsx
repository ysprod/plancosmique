"use client";
import { useNavigation } from '@/hooks/analysegenere/useNavigation';
import type { Consultation } from '@/lib/interfaces';
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

const AnalyseGenere = memo<AnalyseGenereProps>(({ consultation, choix }) => {
  const { navigateToProfil } = useNavigation();

  const consultationTitle = useMemo(() =>
    consultation?.title || choix?.title || 'Votre consultation',
    [consultation?.title, choix?.title]
  );

  return (
    <div
      className="flex items-center justify-center px-3 sm:px-4 py-8 sm:py-12"
      role="main"
      aria-labelledby="success-heading"
    >
      <div className="w-full max-w-4xl mx-auto"      >
        <div className="space-y-4 sm:space-y-5">
          <div className="text-center space-y-2 sm:space-y-2.5"          >
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
          </div>
          <MasterAssignmentNotice />
          <div className="flex justify-center pt-2">
            <TimelineBadge />
          </div>
          <ConsultationSummary consultation={consultation} choix={choix} />
          <ConfidentialityNotice />
          <ProcessSteps />
          <ThankYouMessage />
          <div className="flex justify-center pt-2">
            <BackButton onClick={navigateToProfil} />
          </div>
        </div>
      </div>
    </div>
  );
});

AnalyseGenere.displayName = 'AnalyseGenere';

export default AnalyseGenere;