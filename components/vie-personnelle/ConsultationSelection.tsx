import { ConsultationChoice } from '@/lib/interfaces';
import { motion } from 'framer-motion';
import React from 'react';
import ConsultationCard from './ConsultationCard';
 
interface Props {
  onSelect: (choice: ConsultationChoice) => void;
  title?: string;
  choices: ConsultationChoice[];
}

const ConsultationSelection: React.FC<Props> = ({ onSelect, title, choices }) => (
  <>
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-center mb-8"
    >
      <h2 className="text-xl sm:text-xl lg:text-xl font-bold mb-3">
        {title || 'Veuillez choisir une consultation'}
      </h2>
    </motion.div>
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.2 }}
      className="grid gap-4 sm:gap-6 grid-cols-1 lg:grid-cols-2"
    >
      {choices.map((choice) => (
        <ConsultationCard
          key={choice.id}
          choice={choice}
          onSelect={() => onSelect(choice)}
        />
      ))}
    </motion.div>
  </>
);

export default ConsultationSelection;
