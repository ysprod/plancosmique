import { ConsultationChoice } from '@/lib/interfaces';
import { motion } from 'framer-motion';
import React from 'react';
import ConsultationCard from '../vie-personnelle/ConsultationCard';
 
interface Props {
  onSelect: (choice: ConsultationChoice) => void;
  title?: string;
  choices: ConsultationChoice[];
}

const ConsultationSelection: React.FC<Props> = ({ onSelect, title, choices }) => (
  <>
   
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
          alreadyDone={false} // à remplacer par la vraie logique si disponible
          consultationId={undefined} // à remplacer par la vraie logique si disponible
        />
      ))}
    </motion.div>
  </>
);

export default ConsultationSelection;
