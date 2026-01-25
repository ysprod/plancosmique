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

const GRADE_COLORS: Record<Grade | "NEOPHYTE", { main: string; glow: string; text: string }> = {
  NEOPHYTE:      { main: "#a3a3a3", glow: "#d4d4d8", text: "#e5e7eb" },
  ASPIRANT:      { main: "#a78bfa", glow: "#c4b5fd", text: "#4c1d95" },
  CONTEMPLATEUR: { main: "#38bdf8", glow: "#7dd3fc", text: "#0369a1" },
  CONSCIENT:     { main: "#34d399", glow: "#6ee7b7", text: "#065f46" },
  INTEGRATEUR:   { main: "#fbbf24", glow: "#fde68a", text: "#92400e" },
  TRANSMUTANT:   { main: "#f472b6", glow: "#f9a8d4", text: "#831843" },
  ALIGNE:        { main: "#f59e42", glow: "#fcd34d", text: "#78350f" },
  EVEILLE:       { main: "#818cf8", glow: "#a5b4fc", text: "#312e81" },
  SAGE:          { main: "#f87171", glow: "#fca5a5", text: "#991b1b" },
  MAITRE_DE_SOI: { main: "#facc15", glow: "#fde047", text: "#713f12" },
};

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

function hashStr(s: string) {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) h = Math.imul(h ^ s.charCodeAt(i), 16777619);
  return (h >>> 0).toString(16);
}

export const InitiatiqueBadge = memo(function InitiatiqueBadge({
  grade,
}: {
  grade: Grade | null | undefined;
}) {
  const g = (grade ?? "NEOPHYTE") as Grade | "NEOPHYTE";

  const vm = useMemo(() => {
    const label = GRADE_LABELS[g] || getGradeName(g as Grade) || "Néophyte";
    const color = GRADE_COLORS[g] || GRADE_COLORS.NEOPHYTE;

    // taille auto (compact mais lisible)
    const minWidth = Math.max(96, label.length * 11);
    const size = Math.max(78, minWidth + 28);
    const fontSize = clamp(label.length > 14 ? 12 : 13, 12, 14);

    const id = hashStr(`init_badge_${label}_${color.main}_${color.glow}`);

    return { label, color, size, minWidth, fontSize, id };
  }, [g]);

  const s = vm.size;
  const r = 0.22 * s; // rayon arrondi du carré
  const pad = Math.max(10, Math.floor(s * 0.10));
  const inner = s - pad * 2;

  return (
    <span
      className="inline-flex items-center justify-center"
      title={`Grade initiatique : ${vm.label}`}
      aria-label={`Grade initiatique : ${vm.label}`}
    >
      <span className="relative inline-flex items-center justify-center">
        <svg
          width={s}
          height={s}
          viewBox={`0 0 ${s} ${s}`}
          xmlns="http://www.w3.org/2000/svg"
          className="block"
          style={{
            filter: `drop-shadow(0 0 10px ${vm.color.glow}66) drop-shadow(0 16px 34px rgba(0,0,0,.18))`,
          }}
          aria-hidden="true"
        >
          <defs>
            {/* Fond “glass” light/dark */}
            <linearGradient id={`bg_${vm.id}`} x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="rgba(255,255,255,0.92)" />
              <stop offset="55%" stopColor="rgba(255,255,255,0.78)" />
              <stop offset="100%" stopColor="rgba(255,255,255,0.88)" />
            </linearGradient>

            {/* Vagues dégradées (inspirées de l’icône) */}
            <linearGradient id={`wave1_${vm.id}`} x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#ffcc66" />
              <stop offset="45%" stopColor="#ff7a59" />
              <stop offset="100%" stopColor="#ff4da6" />
            </linearGradient>

            <linearGradient id={`wave2_${vm.id}`} x1="0" y1="1" x2="1" y2="0">
              <stop offset="0%" stopColor="#3b82f6" />
              <stop offset="55%" stopColor="#6d28d9" />
              <stop offset="100%" stopColor="#ec4899" />
            </linearGradient>

            <radialGradient id={`shine_${vm.id}`} cx="35%" cy="22%" r="70%">
              <stop offset="0%" stopColor="rgba(255,255,255,0.95)" />
              <stop offset="45%" stopColor="rgba(255,255,255,0.35)" />
              <stop offset="100%" stopColor="rgba(255,255,255,0)" />
            </radialGradient>

            {/* Teinte liée au grade (accent subtil) */}
            <radialGradient id={`accent_${vm.id}`} cx="60%" cy="60%" r="70%">
              <stop offset="0%" stopColor={`${vm.color.main}`} stopOpacity="0.35" />
              <stop offset="70%" stopColor={`${vm.color.main}`} stopOpacity="0.06" />
              <stop offset="100%" stopColor={`${vm.color.main}`} stopOpacity="0" />
            </radialGradient>

            {/* Bord interne (anneau) */}
            <linearGradient id={`ring_${vm.id}`} x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="rgba(255,255,255,0.75)" />
              <stop offset="50%" stopColor="rgba(0,0,0,0.05)" />
              <stop offset="100%" stopColor="rgba(255,255,255,0.25)" />
            </linearGradient>
          </defs>

          {/* Carte arrondie */}
          <rect x="0" y="0" width={s} height={s} rx={r} fill={`url(#bg_${vm.id})`} />
          {/* Ombre interne légère (premium) */}
          <rect
            x="1"
            y="1"
            width={s - 2}
            height={s - 2}
            rx={r - 1}
            fill="transparent"
            stroke="rgba(0,0,0,0.08)"
          />

          {/* Zone interne */}
          <g transform={`translate(${pad} ${pad})`}>
            <rect
              x="0"
              y="0"
              width={inner}
              height={inner}
              rx={Math.max(14, Math.floor(inner * 0.20))}
              fill="rgba(255,255,255,0.00)"
            />

            {/* Vague chaude (haut/gauche) */}
            <path
              d={`
                M ${inner * 0.05} ${inner * 0.35}
                C ${inner * 0.20} ${inner * 0.05}, ${inner * 0.55} ${inner * 0.02}, ${inner * 0.78} ${inner * 0.12}
                C ${inner * 0.98} ${inner * 0.22}, ${inner * 0.95} ${inner * 0.55}, ${inner * 0.65} ${inner * 0.62}
                C ${inner * 0.40} ${inner * 0.69}, ${inner * 0.18} ${inner * 0.55}, ${inner * 0.05} ${inner * 0.35}
                Z
              `}
              fill={`url(#wave1_${vm.id})`}
              opacity="0.95"
            />

            {/* Vague froide (droite/bas) */}
            <path
              d={`
                M ${inner * 0.35} ${inner * 0.65}
                C ${inner * 0.55} ${inner * 0.45}, ${inner * 0.85} ${inner * 0.38}, ${inner * 0.98} ${inner * 0.52}
                C ${inner * 1.06} ${inner * 0.64}, ${inner * 0.92} ${inner * 0.88}, ${inner * 0.62} ${inner * 0.92}
                C ${inner * 0.40} ${inner * 0.95}, ${inner * 0.20} ${inner * 0.82}, ${inner * 0.35} ${inner * 0.65}
                Z
              `}
              fill={`url(#wave2_${vm.id})`}
              opacity="0.92"
            />

            {/* Accent grade */}
            <rect
              x="0"
              y="0"
              width={inner}
              height={inner}
              rx={Math.max(14, Math.floor(inner * 0.20))}
              fill={`url(#accent_${vm.id})`}
            />

            {/* Shine */}
            <ellipse
              cx={inner * 0.46}
              cy={inner * 0.20}
              rx={inner * 0.55}
              ry={inner * 0.32}
              fill={`url(#shine_${vm.id})`}
              opacity="0.9"
            />

            {/* Anneau interne */}
            <rect
              x="3"
              y="3"
              width={inner - 6}
              height={inner - 6}
              rx={Math.max(12, Math.floor(inner * 0.18))}
              fill="transparent"
              stroke={`url(#ring_${vm.id})`}
              strokeWidth="2"
              opacity="0.9"
            />
          </g>
        </svg>

        {/* Label centré (comme avant) */}
        <span
          className="pointer-events-none select-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center font-extrabold tracking-wide"
          style={{
            color: vm.color.text,
            minWidth: vm.minWidth,
            maxWidth: s - 18,
            fontSize: vm.fontSize,
            lineHeight: "16px",
            textShadow: "0 1px 0 rgba(255,255,255,.35), 0 12px 28px rgba(0,0,0,.22)",
          }}
        >
          {vm.label}
        </span>
      </span>
    </span>
  );
});

InitiatiqueBadge.displayName = "InitiatiqueBadge";
