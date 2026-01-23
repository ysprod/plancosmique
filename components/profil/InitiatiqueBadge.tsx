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

const GRADE_COLORS: Record<Grade | "NEOPHYTE", { main: string; glow: string; text: string }> = {
  NEOPHYTE:      { main: '#a3a3a3', glow: '#d4d4d8', text: '#27272a' },
  ASPIRANT:      { main: '#a78bfa', glow: '#c4b5fd', text: '#4c1d95' },
  CONTEMPLATEUR: { main: '#38bdf8', glow: '#7dd3fc', text: '#0369a1' },
  CONSCIENT:     { main: '#34d399', glow: '#6ee7b7', text: '#065f46' },
  INTEGRATEUR:   { main: '#fbbf24', glow: '#fde68a', text: '#92400e' },
  TRANSMUTANT:   { main: '#f472b6', glow: '#f9a8d4', text: '#831843' },
  ALIGNE:        { main: '#f59e42', glow: '#fcd34d', text: '#78350f' },
  EVEILLE:       { main: '#818cf8', glow: '#a5b4fc', text: '#312e81' },
  SAGE:          { main: '#f87171', glow: '#fca5a5', text: '#991b1b' },
  MAITRE_DE_SOI: { main: '#facc15', glow: '#fde047', text: '#713f12' },
};

export function InitiatiqueBadge({ grade }: { grade: Grade | null | undefined }) {
  let label: string;
  let color;
  if (grade === null || grade === undefined) {
    label = GRADE_LABELS.NEOPHYTE;
    color = GRADE_COLORS.NEOPHYTE;
  } else {
    label = GRADE_LABELS[grade] || getGradeName(grade);
    color = GRADE_COLORS[grade] || GRADE_COLORS.NEOPHYTE;
  }
  // Taille adaptée au label
  const minWidth = Math.max(90, label.length * 12);
  const svgSize = Math.max(64, minWidth + 24);
  const center = svgSize / 2;
  const radius = (svgSize / 2) - 8;
  return (
    <span
      className="inline-flex items-center justify-center"
      title={`Grade initiatique : ${label}`}
    >
      <span className="relative flex items-center justify-center">
        {/* SVG roue dentée raffinée */}
        <svg
          width={svgSize}
          height={svgSize}
          viewBox={`0 0 ${svgSize} ${svgSize}`}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="drop-shadow-md"
          style={{ filter: `drop-shadow(0 0 8px ${color.glow})` }}
        >
          <g>
            {/* Cercle principal */}
            <circle cx={center} cy={center} r={radius - 4} fill={`url(#badge-gradient-${label})`} stroke={color.main} strokeWidth="2.5" />
            {/* Dents fines */}
            <g>
              {[...Array(18)].map((_, i) => {
                const angle = (i * 20) * (Math.PI / 180);
                const x1 = center + Math.cos(angle) * (radius - 2);
                const y1 = center + Math.sin(angle) * (radius - 2);
                const x2 = center + Math.cos(angle) * (radius + 6);
                const y2 = center + Math.sin(angle) * (radius + 6);
                return (
                  <line
                    key={i}
                    x1={x1}
                    y1={y1}
                    x2={x2}
                    y2={y2}
                    stroke={color.main}
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    opacity="0.7"
                  />
                );
              })}
            </g>
            <defs>
              <radialGradient id={`badge-gradient-${label}`} cx="0.5" cy="0.5" r="0.5" fx="0.5" fy="0.5">
                <stop offset="0%" stopColor="#fff" />
                <stop offset="100%" stopColor={color.main} />
              </radialGradient>
            </defs>
          </g>
        </svg>
        {/* Label centré, typo élégante */}
        <span
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-base font-semibold text-center pointer-events-none select-none drop-shadow-sm tracking-wide"
          style={{ color: color.text, minWidth: minWidth, maxWidth: svgSize - 16, letterSpacing: 1 }}
        >
          {label}
        </span>
      </span>
    </span>
  );
}
