"use client";
import { useRubriqueSelection } from "@/hooks/categorie/useRubriqueSelection";
import type { Rubrique } from "@/lib/interfaces";
import { memo } from "react";
import { RubriqueConsultationGrid } from "./RubriqueConsultationGrid";
import RubriqueErrorDisplay from "./RubriqueErrorDisplay";
import RubriqueHeader from "./RubriqueHeader";
import RubriqueLoadingState from "./RubriqueLoadingState";

interface RubriqueViewMultiPageProps {
  rubrique: Rubrique;
  categoryId: string;
}

export const RubriqueViewMultiPage = memo<RubriqueViewMultiPageProps>(
  function RubriqueViewMultiPage({ rubrique, categoryId }) {
    const {
      loading, apiError, creatingConsultation, sortedChoices, handleSelectConsultation,
    } = useRubriqueSelection(rubrique, categoryId);

    if (loading || creatingConsultation) {
      return (
        <div className="relative mx-auto max-w-4xl">
          <RubriqueHeader rubrique={rubrique} />
          <RubriqueLoadingState isCreating={creatingConsultation} />
        </div>
      );
    }

    if (apiError) {
      return (
        <div className="relative mx-auto max-w-4xl">
          <RubriqueHeader rubrique={rubrique} />
          <RubriqueErrorDisplay error={apiError} />
        </div>
      );
    }

    return (
      <div className="relative mx-auto max-w-8xl px-3 sm:px-4 lg:px-6">
        <RubriqueHeader rubrique={rubrique} />
        <RubriqueConsultationGrid
          sortedChoices={sortedChoices}
          onSelectConsultation={handleSelectConsultation}
        />
      </div>
    );
  }
);