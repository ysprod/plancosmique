"use client";
import { useRubriqueSelection } from "@/hooks/categorie/useRubriqueSelection";
import type { Rubrique } from "@/lib/interfaces";
import { memo } from "react";
import RubriqueErrorDisplay from "./RubriqueErrorDisplay";
import RubriqueHeader from "./RubriqueHeader";
import RubriqueLoadingState from "./RubriqueLoadingState";
import RubriqueConsultationList from "./RubriqueConsultationList";

interface RubriqueViewMultiPageProps {
  rubrique: Rubrique;
  categoryId: string;
}

export const RubriqueViewMultiPage = memo<RubriqueViewMultiPageProps>(
  function RubriqueViewMultiPage({ rubrique, categoryId }) {
    const {
      choices,
      choicesWithCount,
      alreadyDoneChoices,
      loading,
      apiError,
      creatingConsultation,
      handleSelectConsultation,
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
      <div className="relative mx-auto max-w-4xl">
        <RubriqueHeader rubrique={rubrique} />
        <div className="max-w-8xl mx-auto mt-6">
          <RubriqueConsultationList
            choices={choices}
            choicesWithCount={choicesWithCount}
            alreadyDoneChoices={alreadyDoneChoices}
            onSelectConsultation={handleSelectConsultation}
          />
        </div>
      </div>
    );
  }
);