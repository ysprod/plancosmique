import { ConsultationChoice, DoneChoice } from '@/lib/interfaces';
import { motion } from 'framer-motion';
import React from 'react';
import ConsultationCard from '../vie-personnelle/ConsultationCard';

interface Props {
  onSelect: (choice: ConsultationChoice) => void;
  title?: string;
  choices: ConsultationChoice[];
  alreadyDoneChoices?: Record<string, DoneChoice>;
}

const ConsultationSelection: React.FC<Props> = ({ onSelect, title, choices, alreadyDoneChoices = {} }) => {
  // Calculer le nombre de consultations par choix
  const getChoiceCount = (choiceId?: string) => {
    if (!choiceId || !alreadyDoneChoices[choiceId]) return 0;
    // Pour l'instant on retourne 1 car le format est un Record<string, DoneChoice>
    // et non un array qui permettrait de compter plusieurs occurrences
    return 1;
  };

  // Handler pour voir l'historique
  const handleViewHistory = (choiceId?: string) => {
    if (!choiceId || !alreadyDoneChoices[choiceId]) return;
    const doneChoice = alreadyDoneChoices[choiceId];
    if (doneChoice.consultationId) {
      window.location.href = `/secured/consultations/${doneChoice.consultationId}`;
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
        {choices.map((choice) => (
          <ConsultationCard
            key={choice._id}
            choice={choice}
            onSelect={() => onSelect(choice)}
            doneChoice={alreadyDoneChoices[choice._id!]}
            doneCount={getChoiceCount(choice._id)}
            onViewHistory={() => handleViewHistory(choice._id)}
          />
        ))}
      </motion.div>
    </>
  );
};

export default ConsultationSelection;
