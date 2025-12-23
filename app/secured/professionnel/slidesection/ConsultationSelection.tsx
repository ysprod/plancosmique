import React from 'react';
import { motion } from 'framer-motion';
import ConsultationCard from './ConsultationCard';
import { CONSULTATION_CHOICES } from './consultation.constants';
import { ConsultationChoice } from '@/lib/interfaces';

interface Props {
  onSelect: (choice: ConsultationChoice) => void;
}

const ConsultationSelection: React.FC<Props> = ({ onSelect }) => (
  <>
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-center mb-8"
    >
      <h2 className="text-xl sm:text-xl lg:text-xl font-bold mb-3">
        Souhaitez-vous vraiment une consultation sur votre Vie Professionnelle ?
      </h2>
    </motion.div>
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.2 }}
      className="grid gap-4 sm:gap-6 grid-cols-1 lg:grid-cols-2"
    >
      {CONSULTATION_CHOICES.map((choice) => (
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
