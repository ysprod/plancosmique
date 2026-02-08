"use client";

import { memo, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import ConsultationContentHistory from "@/components/consultations/ConsultationContentHistory";
import type { Analysis } from "@/lib/interfaces";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";

interface AnalysisPagerProps {
  analyses: Analysis[];
  total?: number;               // optionnel si tu l'as déjà
  initialIndex?: number;        // ex: ouvrir sur la dernière analyse
  onIndexChange?: (index: number) => void;
  className?: string;
}

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

const cardVariants = {
  enter: (dir: number) => ({ opacity: 0, x: dir > 0 ? 28 : -28, filter: "blur(2px)" }),
  center: { opacity: 1, x: 0, filter: "blur(0px)" },
  exit: (dir: number) => ({ opacity: 0, x: dir > 0 ? -28 : 28, filter: "blur(2px)" }),
};

const AnalysisPager = memo(function AnalysisPager({
  analyses,
  total,
  initialIndex,
  onIndexChange,
  className,
}: AnalysisPagerProps) {
  const reduced = useReducedMotion();

  const count = analyses.length;
  const defaultIndex = useMemo(() => {
    if (!count) return 0;
    if (typeof initialIndex === "number") return clamp(initialIndex, 0, count - 1);
    return 0; // ou count - 1 si tu veux "la plus récente"
  }, [count, initialIndex]);

  const [index, setIndex] = useState(defaultIndex);
  const [dir, setDir] = useState(1);

  // ✅ si la liste change (ex: refetch), on garde l’index valide
  useEffect(() => {
    setIndex((i) => clamp(i, 0, Math.max(0, count - 1)));
  }, [count]);

  useEffect(() => {
    onIndexChange?.(index);
  }, [index, onIndexChange]);

  const current = analyses[index] ?? null;

  const canPrev = index > 0;
  const canNext = index < count - 1;

  const goTo = useCallback(
    (nextIndex: number) => {
      const safe = clamp(nextIndex, 0, Math.max(0, count - 1));
      if (safe === index) return;
      setDir(safe > index ? 1 : -1);
      setIndex(safe);
    },
    [count, index],
  );

  const prev = useCallback(() => { if (canPrev) goTo(index - 1); }, [canPrev, goTo, index]);
  const next = useCallback(() => { if (canNext) goTo(index + 1); }, [canNext, goTo, index]);
  const first = useCallback(() => goTo(0), [goTo]);
  const last = useCallback(() => goTo(count - 1), [count, goTo]);

  // ✅ clavier (← → Home End)
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (!count) return;
      if (e.key === "ArrowLeft") prev();
      else if (e.key === "ArrowRight") next();
      else if (e.key === "Home") first();
      else if (e.key === "End") last();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [count, prev, next, first, last]);

  // ✅ swipe (mobile) via drag Framer Motion
  const dragThreshold = 60;

  if (count === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-sm text-gray-500 dark:text-gray-400">
          Aucune analyse disponible pour ce choix.
        </div>
      </div>
    );
  }

  return (
    <section className={["w-full max-w-4xl", className].filter(Boolean).join(" ")}>
      {/* Top bar: compteur + actions */}
      <div className="mb-3 flex items-center justify-between gap-3">
        <div className="min-w-0">
          <div className="text-xs text-slate-600 dark:text-slate-300/80">
            Analyse <span className="font-semibold text-slate-900 dark:text-white">{index + 1}</span>
            <span className="text-slate-400 dark:text-white/30"> / </span>
            <span className="font-semibold text-slate-900 dark:text-white">{count}</span>
            {typeof total === "number" && total > count ? (
              <span className="ml-2 text-[11px] text-slate-500 dark:text-white/50">
                (total {total})
              </span>
            ) : null}
          </div>

          {/* mini barre de progression */}
          <div className="mt-1 h-1.5 w-40 max-w-full overflow-hidden rounded-full bg-slate-200/70 dark:bg-white/10">
            <div
              className="h-full rounded-full bg-gradient-to-r from-purple-500 via-indigo-500 to-pink-500 transition-[width] duration-300"
              style={{ width: `${Math.round(((index + 1) / count) * 100)}%` }}
            />
          </div>
        </div>

        <div className="flex items-center gap-1.5">
          <NavButton title="Première" onClick={first} disabled={!canPrev}>
            <ChevronsLeft className="h-4 w-4" />
          </NavButton>
          <NavButton title="Précédente" onClick={prev} disabled={!canPrev}>
            <ChevronLeft className="h-4 w-4" />
          </NavButton>
          <NavButton title="Suivante" onClick={next} disabled={!canNext}>
            <ChevronRight className="h-4 w-4" />
          </NavButton>
          <NavButton title="Dernière" onClick={last} disabled={!canNext}>
            <ChevronsRight className="h-4 w-4" />
          </NavButton>
        </div>
      </div>

      {/* Card */}
      <div className="relative">
        <AnimatePresence mode="popLayout" initial={false} custom={dir}>
          <motion.div
            key={(current as any)?._id ?? index}
            custom={dir}
            variants={cardVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={
              reduced
                ? { duration: 0 }
                : { type: "spring", stiffness: 520, damping: 44, mass: 0.9 }
            }
            drag={reduced ? false : "x"}
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.12}
            onDragEnd={(_, info) => {
              if (reduced) return;
              const dx = info.offset.x;
              if (dx > dragThreshold) prev();
              else if (dx < -dragThreshold) next();
            }}
            className="will-change-transform"
          >
            {/* 1 analyse = 1 page */}
            <ConsultationContentHistory analyse={current as Analysis} />
          </motion.div>
        </AnimatePresence>

        {/* Hint swipe mobile */}
        {!reduced && count > 1 ? (
          <div className="pointer-events-none mt-3 text-center text-[11px] text-slate-500 dark:text-white/40">
            Glisse à gauche/droite ou utilise ← →
          </div>
        ) : null}
      </div>
    </section>
  );
});

const NavButton = memo(function NavButton({
  title,
  onClick,
  disabled,
  children,
}: {
  title: string;
  onClick: () => void;
  disabled?: boolean;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      title={title}
      onClick={onClick}
      disabled={disabled}
      className={[
        "inline-flex h-9 w-9 items-center justify-center rounded-xl border",
        "border-slate-200 bg-white/70 text-slate-700 shadow-sm backdrop-blur",
        "hover:bg-white hover:shadow-md",
        "dark:border-white/10 dark:bg-white/5 dark:text-white/80 dark:hover:bg-white/10",
        "transition-all",
        disabled ? "opacity-40 cursor-not-allowed hover:shadow-sm" : "",
      ].join(" ")}
    >
      {children}
    </button>
  );
});

export default AnalysisPager;
