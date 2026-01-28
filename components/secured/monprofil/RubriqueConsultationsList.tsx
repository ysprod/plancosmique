"use client";
import { useRubriqueConsultationsList } from "@/hooks/monprofil/useRubriqueConsultationsList";
import { Consultation } from "@/lib/interfaces";
import { memo } from "react";
import ConsultationCard from "./consultations/ConsultationCard";
import ConsultationEmptyState from "./consultations/ConsultationEmptyState";

interface Props {
  consultations: Consultation[];
}

function RubriqueConsultationsListImpl({ consultations }: Props) {
  const { onView } = useRubriqueConsultationsList();

  if (!consultations?.length) {
    return <ConsultationEmptyState />;
  }

  return (
    <div className="w-full grid place-items-center px-2">
      <ul
        role="list"
        className="w-full max-w-xl flex flex-col items-center justify-center gap-2"
      >
        {consultations.map((c) => (
          <ConsultationCard key={String((c as any).consultationId || c.id)} c={c} onView={onView} />
        ))}
      </ul>
    </div>
  );
}

const RubriqueConsultationsList = memo(RubriqueConsultationsListImpl);

export default RubriqueConsultationsList;