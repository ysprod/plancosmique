'use client';

import { ConsultationChoice } from '@/lib/interfaces';
import { FC } from 'react';
import { motion } from 'framer-motion';
import ConsultationCard from './ConsultationCard';

interface DoneChoice {
  _id: string;
  userId: string;
  consultationId: string;
  choiceTitle: string;
  choiceId: string | null;
  frequence: string;
  participants: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

interface ChoiceWithCount {
  _id: string;
  title: string;
  description: string;
  frequence: string;
  participants: string;
  order?: number;
  offering: any;
  consultationCount?: number;
  showButtons?: boolean;
}

interface Slide4SectionSelectionProps {
  onSelect: (choice: ConsultationChoice) => void;
  choices: ConsultationChoice[];
  alreadyDoneChoices: DoneChoice[];
  choicesWithCount?: ChoiceWithCount[]; // Données enrichies du backend
}

const Slide4SectionSelection: FC<Slide4SectionSelectionProps> = ({
  onSelect,
  choices,
  alreadyDoneChoices,
  choicesWithCount,
}) => {
  // Fonction pour obtenir le compteur depuis le backend ou calculer manuellement
  const getChoiceCount = (choiceId?: string) => {
    if (!choiceId) return 0;
    
    // Si on a les données du backend, les utiliser
    if (choicesWithCount) {
      const choiceData = choicesWithCount.find(c => c._id === choiceId);
      return choiceData?.consultationCount || 0;
    }
    
    // Sinon calcul manuel (fallback)
    return alreadyDoneChoices.filter(dc => dc.choiceId === choiceId).length;
  };

  // Handler pour voir l'historique (redirige vers la dernière consultation)
  const handleViewHistory = (choiceId?: string) => {
    if (!choiceId) return;
    const lastDone = alreadyDoneChoices
      .filter(dc => dc.choiceId === choiceId)
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())[0];
    
    if (lastDone) {
      window.location.href = `/secured/consultations/${lastDone.consultationId}`;
    }
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="grid gap-4 sm:gap-6 grid-cols-1 lg:grid-cols-2"
      >
        {choices.map((choice, idx) => {
          const doneChoice = alreadyDoneChoices.find(dc => dc.choiceId === choice._id) || null;
          const doneCount = getChoiceCount(choice._id);
          
          return (
            <ConsultationCard
              key={choice._id || idx}
              choice={choice}
              onSelect={() => onSelect(choice)}
              doneChoice={doneChoice}
              doneCount={doneCount}
              onViewHistory={() => handleViewHistory(choice._id)}
            />
          );
        })}
      </motion.div>
    </>
  );
};

export default Slide4SectionSelection;
