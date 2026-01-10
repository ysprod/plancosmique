"use client";
import { cx } from "@/lib/functions";
import type { Rubrique } from "@/lib/interfaces";
import { motion } from "framer-motion";
import { memo, useCallback, useMemo } from "react";
import { useRubriqueUtils } from "./useRubriqueUtils";

const itemVariants = {
  initial: { opacity: 0, y: 10, scale: 0.98 },
  animate: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.22, ease: [0.22, 1, 0.36, 1] },
  },
  hover: { scale: 1.015, transition: { duration: 0.15 } },
  tap: { scale: 0.98 },
} as const;

const borderGradients = [
  "from-red-500 via-orange-500 to-pink-500",
  "from-violet-600 via-indigo-600 to-blue-500",
  "from-emerald-500 via-teal-500 to-cyan-500",
  "from-rose-500 via-fuchsia-500 to-purple-500",
  "from-amber-500 via-yellow-500 to-orange-500",
] as const;

function clampText(s: string, max = 120) {
  if (!s) return "";
  const x = typeof s === "string" ? s.replace(/\s+/g, " ").trim() : "";
  return x.length > max ? x.slice(0, max - 1) + "…" : x;
}



/** Hash déterministe (rapide) */
function hashString(input: string): number {
  let h = 2166136261;
  for (let i = 0; i < input.length; i++) {
    h ^= input.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

function getStableRubriqueId(r: Rubrique): string {
  const anyRub: any = r as any;
  const raw = String(anyRub?._id ?? "");
  if (raw) return raw;

  const t = String(anyRub?.titre ?? "");
  const d = String(anyRub?.description ?? "");
  const h = hashString(`${t}|${d}`);
  return `rub_${h.toString(16)}`; // stable
}

function getBorderGradientFromId(id: string): (typeof borderGradients)[number] {
  const h = hashString(id);
  return borderGradients[h % borderGradients.length];
}



export const RubriqueCard = memo(
  function RubriqueCard({
    rub,
    onOpen,
  }: {
    rub: Rubrique;
    onOpen: (id: string) => void;
  }) {
    const derived = useMemo(() => {
      const id = getStableRubriqueId(rub);
      const title = typeof rub.titre === "string" ? rub.titre.trim() : "Rubrique";
      const desc = rub.description ? clampText(rub.description, 140) : "—";
      const borderClass = getBorderGradientFromId(id);
      const choicesCount = Array.isArray((rub as any)?.consultationChoices)
        ? (rub as any).consultationChoices.length
        : undefined;
      return { id, title, desc, borderClass, choicesCount };
    }, [rub._id, rub.titre, rub.description, (rub as any)?.consultationChoices]);

    const handleClick = useCallback(() => {
      onOpen(derived.id);
    }, [derived.id, onOpen]);

    return (
      <motion.div
        whileHover="hover"
        whileTap="tap"
        variants={itemVariants}
        initial="initial"
        animate="animate"
        className={cx(
          "p-4 xs:p-5 sm:p-6 bg-white dark:bg-zinc-900/80 shadow-lg rounded-2xl cursor-pointer border-2 transition-all",
          "border-violet-200 hover:border-violet-400 dark:border-violet-800 dark:hover:border-violet-500",
          "flex flex-col min-h-[170px] justify-between"
        )}
        layoutId={`rubrique-${derived.id}`}
        tabIndex={0}
        role="group"
        aria-label={derived.title}
      >
        <div>
          <h3 className="font-bold text-violet-700 dark:text-violet-300 text-base xs:text-lg mb-2 truncate">
            {derived.title}
          </h3>
          <p className="text-gray-600 dark:text-zinc-300 text-xs xs:text-sm leading-relaxed mb-4 min-h-[2.5em]">
            {derived.desc}
          </p>
        </div>
        <button
          type="button"
          onClick={handleClick}
          className={cx(
            "w-full px-4 py-2.5 font-semibold rounded-xl shadow-md transition-all text-sm xs:text-base focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-500",
            derived.choicesCount
              ? "bg-gradient-to-r from-emerald-600 to-teal-600 text-white hover:scale-105 hover:shadow-lg"
              : "bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white hover:scale-105 hover:shadow-lg"
          )}
          tabIndex={0}
          aria-label={derived.choicesCount ? `${derived.choicesCount} consultation${derived.choicesCount > 1 ? 's' : ''}` : `Découvrir ${derived.title}`}
        >
          Decouvrir
        </button>
      </motion.div>
    );
  },
  (prev, next) => {
    if (prev.onOpen !== next.onOpen) return false;
    const p: any = prev.rub;
    const n: any = next.rub;
    if (p === n) return true;
    return (
      String(p?._id ?? "") === String(n?._id ?? "") &&
      String(p?.titre ?? "") === String(n?.titre ?? "") &&
      String(p?.description ?? "") === String(n?.description ?? "") &&
      (Array.isArray(p?.consultationChoices) ? p.consultationChoices.length : -1) ===
      (Array.isArray(n?.consultationChoices) ? n.consultationChoices.length : -1)
    );
  }
);
