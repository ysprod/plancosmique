"use client";
import type { Rubrique } from "@/lib/interfaces";
import RubriqueConsultationSection from "./RubriqueConsultationSection";
import RubriqueHeader from "./RubriqueHeader";
import { useRubriqueDerived } from "./useRubriqueDerived";

export function RubriqueView({ rubrique }: { rubrique: Rubrique }) {
  const derived = useRubriqueDerived(rubrique);
  return (
    <div className="relative mx-auto max-w-4xl">
      <RubriqueHeader title={derived.title} description={derived.description} />
      <RubriqueConsultationSection rubrique={rubrique} />
    </div>
  );
}