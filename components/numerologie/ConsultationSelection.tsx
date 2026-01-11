import { ConsultationChoice, DoneChoice } from '@/lib/interfaces';
import { motion } from 'framer-motion';
import React from 'react';
import ConsultationCard from '../vie-personnelle/ConsultationCard';

interface Props {
  onSelect: (choice: ConsultationChoice) => void;
  title?: string;
  choices: ConsultationChoice[];
  alreadyDoneChoices?: Record<string, DoneChoice>; // optionnel, pour la logique future
}

const ConsultationSelection: React.FC<Props> = ({ onSelect, title, choices, alreadyDoneChoices = {} }) => (
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
        />
      ))}
    </motion.div>
  </>
);

export default ConsultationSelection;
