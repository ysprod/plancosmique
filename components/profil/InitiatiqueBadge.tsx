"use client";

import React, { memo, useMemo } from "react";
import { Grade, getGradeName } from "@/lib/types/grade.types";
import { Star } from "lucide-react";

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

const GRADE_STARS: Record<Grade | "NEOPHYTE", number> = {
  NEOPHYTE: 1,
  ASPIRANT: 2,
  CONTEMPLATEUR: 3,
  CONSCIENT: 4,
  INTEGRATEUR: 5,
  TRANSMUTANT: 6,
  ALIGNE: 7,
  EVEILLE: 8,
  SAGE: 9,
  MAITRE_DE_SOI: 9,
};

const GRADE_COLORS: Record<Grade | "NEOPHYTE", string> = {
  NEOPHYTE: "#a3a3a3",
  ASPIRANT: "#a78bfa",
  CONTEMPLATEUR: "#38bdf8",
  CONSCIENT: "#34d399",
  INTEGRATEUR: "#fbbf24",
  TRANSMUTANT: "#f472b6",
  ALIGNE: "#f59e42",
  EVEILLE: "#818cf8",
  SAGE: "#f87171",
  MAITRE_DE_SOI: "#facc15",
};

export const InitiatiqueBadge = memo(function InitiatiqueBadge({
  grade,
}: {
  grade: Grade | null | undefined;
}) {
  const g = (grade ?? "NEOPHYTE") as Grade | "NEOPHYTE";

  const label = GRADE_LABELS[g] || getGradeName(g as Grade) || "Néophyte";
  const stars = GRADE_STARS[g] || 1;

  return (
    <div className="flex flex-col items-center justify-center py-6">
      <span
        className="font-black uppercase tracking-normal text-cosmic-indigo dark:text-cosmic-pink"
        style={{ fontSize: "2.7rem", lineHeight: 1.1 }}
      >
        {label}
      </span>
      <div className="flex items-center justify-center mt-2 gap-1">
        {Array.from({ length: stars }).map((_, i) => (
          <Star key={i} className="w-6 h-6 text-yellow-400 drop-shadow-sm" fill="#facc15" />
        ))}
      </div>
    </div>
  );
});

InitiatiqueBadge.displayName = "InitiatiqueBadge";