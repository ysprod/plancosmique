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
  ASPIRANT:      { main: "#a78bfa", glow: "#c4b5fd", text: "#ebf74b" },
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

    // Taille auto (compact + lisible)
    const minWidth = Math.max(92, label.length * 10.5);
    const size = Math.max(74, minWidth + 22);
    const fontSize = clamp(label.length > 15 ? 12 : 13, 12, 14);

    const id = hashStr(`sigil_${label}_${color.main}_${color.glow}`);

    return { label, color, minWidth, size, fontSize, id };
  }, [g]);

  const s = vm.size;
  const c = s / 2;

  // rayons
  const rOuter = c - 3;
  const rRing = rOuter - 7;
  const rCore = rRing - 9;

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
          aria-hidden="true"
          style={{
            filter: `drop-shadow(0 0 10px ${vm.color.glow}66) drop-shadow(0 18px 36px rgba(0,0,0,.18))`,
          }}
        >
          <defs>
            {/* Métal (or/argent) adaptatif selon grade */}
            <linearGradient id={`metal_${vm.id}`} x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="rgba(255,255,255,0.95)" />
              <stop offset="18%" stopColor="rgba(255,255,255,0.55)" />
              <stop offset="45%" stopColor={vm.color.main} stopOpacity="0.55" />
              <stop offset="70%" stopColor="rgba(0,0,0,0.08)" />
              <stop offset="100%" stopColor="rgba(255,255,255,0.60)" />
            </linearGradient>

            {/* Centre cosmique */}
            <radialGradient id={`core_${vm.id}`} cx="35%" cy="30%" r="75%">
              <stop offset="0%" stopColor="rgba(255,255,255,0.92)" />
              <stop offset="30%" stopColor={vm.color.main} stopOpacity="0.85" />
              <stop offset="100%" stopColor="rgba(10,12,20,1)" />
            </radialGradient>

            {/* Halo intérieur */}
            <radialGradient id={`halo_${vm.id}`} cx="50%" cy="50%" r="65%">
              <stop offset="0%" stopColor={vm.color.glow} stopOpacity="0.35" />
              <stop offset="70%" stopColor={vm.color.glow} stopOpacity="0.08" />
              <stop offset="100%" stopColor={vm.color.glow} stopOpacity="0" />
            </radialGradient>

            {/* Reflet glossy */}
            <radialGradient id={`shine_${vm.id}`} cx="42%" cy="26%" r="60%">
              <stop offset="0%" stopColor="rgba(255,255,255,0.85)" />
              <stop offset="55%" stopColor="rgba(255,255,255,0.18)" />
              <stop offset="100%" stopColor="rgba(255,255,255,0)" />
            </radialGradient>
          </defs>

          {/* Aura douce */}
          <circle cx={c} cy={c} r={rOuter} fill={`url(#halo_${vm.id})`} />

          {/* Anneau externe métallisé */}
          <circle cx={c} cy={c} r={rOuter - 1} fill="rgba(255,255,255,0.00)" stroke={`url(#metal_${vm.id})`} strokeWidth="4.5" />
          <circle cx={c} cy={c} r={rRing} fill="rgba(255,255,255,0.00)" stroke="rgba(255,255,255,0.22)" strokeWidth="1.6" />

          {/* Centre */}
          <circle cx={c} cy={c} r={rCore} fill={`url(#core_${vm.id})`} />

          {/* “Sigil” (marque initiatique) : un swoosh + un anneau brisé */}
          <path
            d={`
              M ${c - rCore * 0.35} ${c - rCore * 0.05}
              C ${c - rCore * 0.10} ${c - rCore * 0.55}, ${c + rCore * 0.55} ${c - rCore * 0.35}, ${c + rCore * 0.32} ${c + rCore * 0.12}
              C ${c + rCore * 0.18} ${c + rCore * 0.45}, ${c - rCore * 0.18} ${c + rCore * 0.40}, ${c - rCore * 0.30} ${c + rCore * 0.18}
            `}
            fill="none"
            stroke="rgba(255,255,255,0.82)"
            strokeWidth={Math.max(2.2, s * 0.03)}
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity="0.95"
          />

          <path
            d={`
              M ${c} ${c - rCore * 0.62}
              A ${rCore * 0.62} ${rCore * 0.62} 0 1 1 ${c - 0.01} ${c - rCore * 0.62}
            `}
            fill="none"
            stroke="rgba(255,255,255,0.35)"
            strokeWidth={Math.max(1.4, s * 0.018)}
            strokeDasharray={`${Math.max(6, s * 0.08)} ${Math.max(10, s * 0.12)}`}
            strokeLinecap="round"
            opacity="0.9"
          />

          {/* Reflet */}
          <ellipse
            cx={c}
            cy={c - rCore * 0.28}
            rx={rCore * 0.95}
            ry={rCore * 0.62}
            fill={`url(#shine_${vm.id})`}
            opacity="0.9"
          />

          {/* Fine bordure interne */}
          <circle cx={c} cy={c} r={rCore - 2} fill="none" stroke="rgba(255,255,255,0.16)" strokeWidth="1.2" />
        </svg>

        {/* Label centré */}
        <span
          className="pointer-events-none select-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center font-extrabold tracking-wide"
          style={{
            color: vm.color.text,
            minWidth: vm.minWidth,
            maxWidth: s - 16,
            fontSize: vm.fontSize,
            lineHeight: "16px",
            textShadow: "0 1px 0 rgba(255,255,255,.25), 0 14px 30px rgba(0,0,0,.25)",
          }}
        >
          {vm.label}
        </span>
      </span>
    </span>
  );
});

InitiatiqueBadge.displayName = "InitiatiqueBadge";
