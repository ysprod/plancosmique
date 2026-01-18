'use client';
import { motion } from 'framer-motion';
import { ConsultationChoice, DoneChoice } from '@/lib/interfaces';
import { ConsultationChoiceWithCount } from '@/lib/api/services/rubriques.service';
import RubriqueConsultationCard from './RubriqueConsultationCard';

interface RubriqueConsultationListProps {
  choices: ConsultationChoice[];
  choicesWithCount: ConsultationChoiceWithCount[];
  alreadyDoneChoices: DoneChoice[];
  onSelectConsultation: (choice: ConsultationChoice) => Promise<void>;
}

export default function RubriqueConsultationList({
  choices,
  choicesWithCount,
  alreadyDoneChoices,
  onSelectConsultation,
}: RubriqueConsultationListProps) {
  
  // Fonction pour obtenir les informations enrichies d'un choix
  const getEnrichedChoice = (choice: ConsultationChoice) => {
    const choiceWithCount = choicesWithCount.find(c => c._id === choice._id);
    const doneChoices = alreadyDoneChoices.filter(dc => dc.choiceId === choice._id);
    
    return {
      choice,
      consultationCount: choiceWithCount?.consultationCount || 0,
      showButtons: choiceWithCount?.showButtons ?? true,
      doneChoices,
    };
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.2 }}
      className="grid gap-4 sm:gap-6 grid-cols-1 lg:grid-cols-2"
    >
      {choices.map((choice, idx) => {
        const enriched = getEnrichedChoice(choice);
        
        return (
          <RubriqueConsultationCard
            key={choice._id || idx}
            choice={enriched.choice}
            consultationCount={enriched.consultationCount}
            showButtons={enriched.showButtons}
            doneChoices={enriched.doneChoices}
            onSelect={() => onSelectConsultation(choice)}
          />
        );
      })}
    </motion.div>
  );
}
