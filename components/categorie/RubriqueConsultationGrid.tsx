'use client';
import type { ConsultationChoice, EnrichedChoice } from '@/lib/interfaces';
import { memo } from 'react';
import RubriqueConsultationCard from './RubriqueConsultationCard';

interface RubriqueConsultationGridProps {
    sortedChoices: EnrichedChoice[];
    onSelectConsultation: (choice: ConsultationChoice) => void;
}

export const RubriqueConsultationGrid = memo<RubriqueConsultationGridProps>(
    function RubriqueConsultationGrid({ sortedChoices, onSelectConsultation }) {
        return (
            <div className="grid gap-4 sm:gap-5 lg:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2">
                {sortedChoices.map((enriched, idx) => (
                    <RubriqueConsultationCard
                        key={enriched.choice._id || idx}
                        enrichedChoice={enriched}
                        onSelect={() => onSelectConsultation(enriched.choice)}
                        index={idx}
                    />
                ))}
            </div>
        );
    }
);