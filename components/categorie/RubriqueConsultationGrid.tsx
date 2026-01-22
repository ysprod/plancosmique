'use client';
import type { ConsultationChoice, EnrichedChoice } from '@/lib/interfaces';
import { memo } from 'react';
import RubriqueConsultationCard from './RubriqueConsultationCard';

interface RubriqueConsultationGridProps {
    sortedChoices: ConsultationChoice[];
    onSelectConsultation: (choice: ConsultationChoice) => void;
}

export const RubriqueConsultationGrid = memo<RubriqueConsultationGridProps>(
    function RubriqueConsultationGrid({ sortedChoices, onSelectConsultation }) {
        return (
            <div className="grid gap-4 sm:gap-5 lg:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2">
                {sortedChoices.map((choice, idx) => (
                    <RubriqueConsultationCard
                        key={idx}
                        enrichedChoice={choice}
                        onSelect={() => onSelectConsultation(choice)}
                    />
                ))}
            </div>
        );
    }
);