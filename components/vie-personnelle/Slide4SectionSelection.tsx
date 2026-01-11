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

interface Slide4SectionSelectionProps {
  onSelect: (choice: ConsultationChoice) => void;
  choices: ConsultationChoice[];
  alreadyDoneChoices: DoneChoice[];
}

const Slide4SectionSelection: FC<Slide4SectionSelectionProps> = ({
  onSelect,
  choices,
  alreadyDoneChoices,
}) => (
  <>
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.2 }}
      className="grid gap-4 sm:gap-6 grid-cols-1 lg:grid-cols-2"
    >
      {choices.map((choice, idx) => {
        const doneChoice = alreadyDoneChoices.find(dc => dc.choiceId === choice._id) || null;
        return (
          <ConsultationCard
            key={choice._id || idx}
            choice={choice}
            onSelect={() => onSelect(choice)}
            doneChoice={doneChoice}
          />
        );
      })}
    </motion.div>
  </>
);

export default Slide4SectionSelection;
