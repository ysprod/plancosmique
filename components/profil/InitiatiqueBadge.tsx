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
  NEOPHYTE:      { main: "#a3a3a3", glow: "#d4d4d8", text: "#dfdfe8" },
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

function cx(...c: Array<string | false | undefined | null>) {
  return c.filter(Boolean).join(" ");
}

/** Hash stable pour ids SVG (évite collisions) */
function hashStr(s: string) {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) h = Math.imul(h ^ s.charCodeAt(i), 16777619);
  return (h >>> 0).toString(16);
}

/** Rosette scalloped : on alterne rayon externe/interne -> effet “dents” */
function buildRosettePoints(cx0: number, cy0: number, rOuter: number, rInner: number, teeth = 40) {
  const pts: string[] = [];
  const total = teeth * 2;
  for (let i = 0; i < total; i++) {
    const a = (i / total) * Math.PI * 2 - Math.PI / 2;
    const r = i % 2 === 0 ? rOuter : rInner;
    const x = cx0 + Math.cos(a) * r;
    const y = cy0 + Math.sin(a) * r;
    pts.push(`${x.toFixed(2)},${y.toFixed(2)}`);
  }
  return pts.join(" ");
}

export const InitiatiqueBadge = memo(function InitiatiqueBadge({ grade }: { grade: Grade | null | undefined }) {
  const g = (grade ?? "NEOPHYTE") as Grade | "NEOPHYTE";
  const label = GRADE_LABELS[g] || getGradeName(g as Grade) || "Néophyte";
  const color = GRADE_COLORS[g] || GRADE_COLORS.NEOPHYTE;

  // Taille adaptée au label (comme toi)
  const minWidth = Math.max(96, label.length * 11);
  const size = Math.max(76, minWidth + 28);
  const center = size / 2;

  // Dimensions rosette (proches de l’image)
  const rOuter = center - 6;
  const rInner = rOuter - 6;     // profondeur des dents
  const rGoldRing = rInner - 6;  // anneau or principal
  const rPurple = rGoldRing - 6; // centre violet

  const id = useMemo(() => hashStr(`badge_${label}_${color.main}`), [label, color.main]);

  // ~40 dents comme sur l’illustration [Image](https://www.genspark.ai/api/files/s/JADuRhOK)
  const rosettePoints = useMemo(
    () => buildRosettePoints(center, center, rOuter, rInner, 40),
    [center, rOuter, rInner]
  );

  return (
    <span className="inline-flex items-center justify-center" title={`Grade initiatique : ${label}`}>
      <span className="relative inline-flex items-center justify-center">
        <svg
          width={size}
          height={size}
          viewBox={`0 0 ${size} ${size}`}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="block"
          style={{
            filter: `drop-shadow(0 0 10px ${color.glow}66) drop-shadow(0 10px 24px rgba(0,0,0,.15))`,
          }}
        >
          <defs>
            {/* Or métallisé (multi-stops) */}
            <linearGradient id={`gold_${id}`} x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#fff7d1" />
              <stop offset="18%" stopColor="#f5d97a" />
              <stop offset="45%" stopColor="#d4af37" />
              <stop offset="70%" stopColor="#b8891b" />
              <stop offset="100%" stopColor="#fff1b8" />
            </linearGradient>

            {/* Or ombre (pour donner relief sur une portion, comme l’image) */}
            <linearGradient id={`goldShadow_${id}`} x1="0" y1="1" x2="1" y2="0">
              <stop offset="0%" stopColor="rgba(0,0,0,0)" />
              <stop offset="55%" stopColor="rgba(0,0,0,0.20)" />
              <stop offset="100%" stopColor="rgba(0,0,0,0)" />
            </linearGradient>

            {/* Centre violet glossy */}
            <radialGradient id={`purple_${id}`} cx="35%" cy="28%" r="75%">
              <stop offset="0%" stopColor="#bca7d6" />
              <stop offset="35%" stopColor="#7a3bb5" />
              <stop offset="100%" stopColor="#3b0a5e" />
            </radialGradient>

            {/* Highlight “verre” */}
            <radialGradient id={`highlight_${id}`} cx="40%" cy="22%" r="55%">
              <stop offset="0%" stopColor="rgba(255,255,255,0.80)" />
              <stop offset="55%" stopColor="rgba(255,255,255,0.20)" />
              <stop offset="100%" stopColor="rgba(255,255,255,0)" />
            </radialGradient>
          </defs>

          {/* Rosette dentelée (or) */}
          <polygon points={rosettePoints} fill={`url(#gold_${id})`} />

          {/* ombre diagonale douce (comme sur le visuel) */}
          <circle cx={center} cy={center} r={rOuter - 1} fill={`url(#goldShadow_${id})`} opacity="0.9" />

          {/* Anneau externe or */}
          <circle
            cx={center}
            cy={center}
            r={rGoldRing}
            fill="none"
            stroke={`url(#gold_${id})`}
            strokeWidth={8}
            opacity="0.95"
          />

          {/* Double anneau fin (violet puis or fin) */}
          <circle cx={center} cy={center} r={rPurple + 10} fill="none" stroke="#2a0a3f" strokeWidth={3} opacity="0.85" />
          <circle cx={center} cy={center} r={rPurple + 6} fill="none" stroke="#d4af37" strokeWidth={2} opacity="0.9" />

          {/* Centre violet */}
          <circle cx={center} cy={center} r={rPurple} fill={`url(#purple_${id})`} />

          {/* Reflet glossy */}
          <ellipse cx={center} cy={center - rPurple * 0.22} rx={rPurple * 0.92} ry={rPurple * 0.62} fill={`url(#highlight_${id})`} opacity="0.95" />

          {/* petite ligne intérieure (finition) */}
          <circle cx={center} cy={center} r={rPurple - 2} fill="none" stroke="rgba(255,255,255,0.25)" strokeWidth={1.5} />
        </svg>

        {/* Label centré (comme toi) */}
        <span
          className={cx(
            "pointer-events-none select-none",
            "absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2",
            "text-center font-extrabold tracking-wide"
          )}
          style={{
            color: color.text,
            minWidth,
            maxWidth: size - 18,
            fontSize: 14,
            lineHeight: "16px",
            textShadow: "0 1px 0 rgba(255,255,255,.35), 0 8px 22px rgba(0,0,0,.22)",
          }}
        >
          {label}
        </span>
      </span>
    </span>
  );
});

InitiatiqueBadge.displayName = "InitiatiqueBadge";
