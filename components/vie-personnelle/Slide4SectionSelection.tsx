import { ConsultationChoice } from '@/lib/interfaces';
import { FC } from 'react';
import { motion } from 'framer-motion';
import ConsultationCard from './ConsultationCard';

interface Slide4SectionSelectionProps {
  onSelect: (choice: ConsultationChoice) => void;
  title?: string;
  choices: ConsultationChoice[];
  alreadyDoneChoices: string[];
  alreadyDoneConsultationIds?: Record<string, string>;
}

const Slide4SectionSelection: FC<Slide4SectionSelectionProps> = ({
  onSelect,
  title,
  choices,
  alreadyDoneChoices,
  alreadyDoneConsultationIds
}) => (
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
      {choices.map((choice, idx) => (
        <ConsultationCard
          key={choice.id || idx}
          choice={choice}
          onSelect={() => onSelect(choice)}
          alreadyDone={alreadyDoneChoices.includes(choice.id)}
          consultationId={alreadyDoneConsultationIds?.[choice.id]}
        />
      ))}
    </motion.div>
  </>
);

export default Slide4SectionSelection;
