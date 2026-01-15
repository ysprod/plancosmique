import React from 'react';
import { motion } from 'framer-motion';
import ConsultationCard from './ConsultationCard';
import { ConsultationChoice } from '@/lib/interfaces';

interface ConsultationSelectionProps {
  onSelect: (choice: ConsultationChoice) => void;
  title?: string;
  choices: ConsultationChoice[];
  alreadyDoneChoices: string[];
  alreadyDoneConsultationIds?: Record<string, string>;
}

const ConsultationSelection: React.FC<ConsultationSelectionProps> = ({ onSelect, title, choices, alreadyDoneChoices, alreadyDoneConsultationIds }) => {
  // Note: Ce composant utilise alreadyDoneChoices comme array de string (choiceIds)
  // Pour les fonctionnalités avancées, utilisez Slide4SectionSelection qui utilise DoneChoice[]
  
  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="grid gap-4 sm:gap-6 grid-cols-1 lg:grid-cols-2"
      >
        {choices.map((choice, idx) => (
          <ConsultationCard
            key={choice._id || idx}
            choice={choice}
            onSelect={() => onSelect(choice)}
            doneCount={0}
          />
        ))}
      </motion.div>
    </>
  );
};

export default ConsultationSelection;
