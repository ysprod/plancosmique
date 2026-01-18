"use client";
import { useRubriqueSelection } from "@/hooks/categorie/useRubriqueSelection";
import type { Rubrique } from "@/lib/interfaces";
import { motion } from "framer-motion";
import { memo } from "react";
import RubriqueConsultationCard from "./RubriqueConsultationCard";
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
      enrichedChoices, loading, apiError, creatingConsultation,
      handleSelectConsultation
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
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="grid gap-4 sm:gap-6 grid-cols-1 lg:grid-cols-2"
          >
            {enrichedChoices.map((enriched, idx) => (
              <RubriqueConsultationCard
                key={enriched.choice._id || idx}
                choice={enriched.choice}
                status={enriched.status}
                onSelect={() => handleSelectConsultation(enriched.choice)}
              />
            ))}
          </motion.div>
        </div>
      </div>
    );
  }
);