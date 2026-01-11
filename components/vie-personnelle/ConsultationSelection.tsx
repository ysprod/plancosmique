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

const ConsultationSelection: React.FC<ConsultationSelectionProps> = ({ onSelect, title, choices, alreadyDoneChoices, alreadyDoneConsultationIds }) => (
  <>
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.2 }}
      className="grid gap-4 sm:gap-6 grid-cols-1 lg:grid-cols-2"
    >
      {choices.map((choice, idx) => (
        <ConsultationCard
          key={choice.id || idx}
          choice={choice}
          onSelect={() => onSelect(choice)}
          // alreadyDone={alreadyDoneChoices.includes(choice.id)}
        />
      ))}
    </motion.div>
  </>
);

export default ConsultationSelection;
