import { Grade, getGradeName } from "@/lib/types/grade.types";
import React from "react";

const GRADE_LABELS: Record<Grade | "NEOPHYTE", string> = {
  NEOPHYTE: "Néophyte",
  ASPIRANT: "Aspirant",
  CONTEMPLATEUR: "Contemplateur",
  CONSCIENT: "Conscient",
  INTEGRATEUR: "Intégrateur",
  TRANSMUTANT: "Transmutant",
  ALIGNE: "Aligné",
  EVEILLE: "Éveillé",
  SAGE: "Sage",
  MAITRE_DE_SOI: "Maître de Soi",
};

export function InitiatiqueBadge({ grade }: { grade: Grade | null | undefined }) {
  let label: string;
  if (grade === null || grade === undefined) {
    label = GRADE_LABELS.NEOPHYTE;
  } else {
    label = GRADE_LABELS[grade] || getGradeName(grade);
  }
  return (
    <span
      className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r from-purple-700 to-indigo-600 text-white shadow-md border border-white/10 animate-glow"
      title={`Grade initiatique : ${label}`}
    >
      {label}
    </span>
  );
}
