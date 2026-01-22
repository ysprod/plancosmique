import type { ConsultationChoice, Rubrique } from "@/lib/interfaces";
import React from "react";
import RubriqueConsultationCard from "../RubriqueConsultationCard";
import RubriqueHeader from "../RubriqueHeader";

interface CategoryBodyChoixProps {
    rubriqueCourante: Rubrique;
    handleSelectConsultation: (choice: ConsultationChoice) => void;
}

export const CategoryBodyChoix = React.memo(function CategoryBodyChoix({
    rubriqueCourante,  handleSelectConsultation,
}: CategoryBodyChoixProps) {
    return (
        <div className="w-full animate-fade-in">
            <div className="mx-auto w-full max-w-3xl px-2 sm:px-3 flex flex-col items-center justify-center">
                <RubriqueHeader rubrique={rubriqueCourante} />
                
                <div className="grid gap-4 sm:gap-5 lg:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2">
                    {rubriqueCourante.consultationChoices.map((choice, idx) => (
                        <RubriqueConsultationCard
                            key={idx}
                            enrichedChoice={choice}
                            onSelect={() => handleSelectConsultation(choice)}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
});