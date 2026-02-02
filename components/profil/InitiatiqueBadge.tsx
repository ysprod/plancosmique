"use client";

import React, { memo, useMemo } from "react";
import { Grade, getGradeName } from "@/lib/types/grade.types";

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

  const vm = useMemo(() => {
    const label = GRADE_LABELS[g] || getGradeName(g as Grade) || "Néophyte";
    const bgColor = GRADE_COLORS[g] || GRADE_COLORS.NEOPHYTE;
    return { label, bgColor };
  }, [g]);

  return (
    <div className="inline-flex items-center justify-center p-6">
      <div
        style={{
          backgroundColor: vm.bgColor,
          // Ombre portée multipliée par 3 pour supporter la nouvelle taille
          boxShadow: "0 12px 42px 0 rgba(0, 0, 0, 0.3), 0 6px 12px 0 rgba(0, 0, 0, 0.2)",
          border: "3px solid rgba(0,0,0,0.1)"
        }}
        className={`
          relative
          px-15 py-4.5       /* Padding x3 */
          rounded-full
          flex items-center justify-center
          min-w-[360px]      /* Largeur x3 (120 * 3) */
          transition-all duration-300
          hover:translate-y-[-6px]
        `}
      >
        <span 
          className="text-black font-black uppercase tracking-normal"
          style={{ 
            color: "#000000",
            fontSize: "42px", /* Taille x3 (14px * 3) */
            lineHeight: "1",
            textShadow: "0 2px 4px rgba(255,255,255,0.2)" // Petit relief sur le texte
          }}
        >
          {vm.label}
        </span>
        
        {/* Reflet interne agrandi */}
        <div className="absolute inset-x-0 top-0 h-1/2 bg-white/20 rounded-t-full pointer-events-none" />
      </div>
    </div>
  );
});

InitiatiqueBadge.displayName = "InitiatiqueBadge";