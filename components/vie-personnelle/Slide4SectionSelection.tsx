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
  title?: string;
  choices: ConsultationChoice[];
  alreadyDoneChoices: DoneChoice[];
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
    <div className="mb-4 p-2 bg-yellow-50 border border-yellow-300 rounded text-xs text-yellow-900">
      <strong>Debug alreadyDoneChoices:</strong> {JSON.stringify(alreadyDoneChoices)}
    </div>
     <div className="mb-4 p-2 bg-yellow-50 border border-yellow-300 rounded text-xs text-yellow-900">
      <strong>Debug alreadyDoneConsultationIds:</strong> {JSON.stringify(alreadyDoneConsultationIds)}
    </div>
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.2 }}
      className="grid gap-4 sm:gap-6 grid-cols-1 lg:grid-cols-2"
    >
      {choices.map((choice, idx) => {
        const isDone = alreadyDoneChoices.some(dc => dc.choiceId === choice._id);
        return (
          <ConsultationCard
            key={choice.id || idx}
            choice={choice}
            onSelect={() => onSelect(choice)}
            alreadyDone={isDone}
            consultationId={alreadyDoneConsultationIds?.[choice._id!]}
          />
        );
      })}
    </motion.div>
  </>
);

export default Slide4SectionSelection;
