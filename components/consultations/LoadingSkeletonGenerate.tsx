"use client";

import React, { memo } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Loader2 } from "lucide-react";

const DOTS = [0, 1, 2] as const;

const shellVariants = {
  hidden: { opacity: 0, y: 8, scale: 0.985 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 420, damping: 34, mass: 0.7 },
  },
};

const titleVariants = {
  hidden: { opacity: 0, y: 8 },
  visible: { opacity: 1, y: 0, transition: { delay: 0.08 } },
};

const subVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { delay: 0.14 } },
};

const ringSpin = {
  rotate: 360,
  transition: { duration: 1.7, repeat: Infinity, ease: "linear" },
};

const dotAnim = (i: number) => ({
  opacity: [0.35, 1, 0.35],
  scale: [1, 1.55, 1],
  transition: { duration: 1.25, repeat: Infinity, delay: i * 0.12, ease: "easeInOut" },
});

function LoadingSkeletonGenerateImpl() {
  const reduceMotion = useReducedMotion();

  return (
    <div className="min-h-[100dvh] w-full grid place-items-center px-3 py-6">
      {/* Fond premium light/dark, centré, sans surcharge */}
      <div className="fixed inset-0 -z-10 bg-gradient-to-br from-white via-slate-50 to-slate-100 dark:from-slate-950 dark:via-slate-950 dark:to-indigo-950/60" />
      <div className="fixed inset-0 -z-10 [background:radial-gradient(60%_45%_at_50%_10%,rgba(99,102,241,0.22),transparent_60%),radial-gradient(50%_40%_at_20%_80%,rgba(236,72,153,0.18),transparent_55%)]" />

      <AnimatePresence mode="wait">
        <motion.section
          key="loading-generate"
          role="status"
          aria-live="polite"
          aria-label="Génération de l'analyse en cours"
          initial="hidden"
          animate="visible"
          exit="hidden"
          variants={shellVariants}
          className={[
            "w-full max-w-md",
            "rounded-2xl",
            "border border-black/10 dark:border-white/10",
            "bg-white/70 dark:bg-slate-950/55",
            "backdrop-blur-xl",
            "shadow-[0_20px_60px_rgba(0,0,0,0.12)] dark:shadow-[0_20px_60px_rgba(0,0,0,0.35)]",
            "px-5 py-6 sm:px-7 sm:py-7",
            "text-center",
          ].join(" ")}
        >
          {/* Accent line (micro détail premium) */}
          <div className="mx-auto mb-5 h-[3px] w-20 rounded-full bg-gradient-to-r from-indigo-500 via-fuchsia-500 to-rose-500 opacity-80" />

          {/* Spinner premium (halo + ring) */}
          <div className="mx-auto mb-5 grid place-items-center">
            <div className="relative h-14 w-14">
              {/* halo */}
              <div className="absolute inset-0 rounded-full blur-xl opacity-60 bg-gradient-to-r from-indigo-500/50 via-fuchsia-500/45 to-rose-500/45" />
              {/* ring */}
              <motion.div
                aria-hidden="true"
                className="absolute inset-0 rounded-full border border-black/10 dark:border-white/10 bg-white/35 dark:bg-white/5 backdrop-blur"
                animate={reduceMotion ? undefined : ringSpin}
              />
              {/* icon */}
              <motion.div
                aria-hidden="true"
                className="absolute inset-0 grid place-items-center"
                animate={reduceMotion ? undefined : { scale: [1, 1.06, 1] }}
                transition={reduceMotion ? undefined : { duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
              >
                <Loader2 className="h-7 w-7 text-slate-900/80 dark:text-white" strokeWidth={2.4} />
              </motion.div>
            </div>
          </div>

          <motion.h2
            variants={titleVariants}
            className="text-[15px] sm:text-[16px] font-semibold tracking-tight text-slate-900 dark:text-slate-50"
          >
            Génération de l’analyse…
          </motion.h2>

          <motion.p
            variants={subVariants}
            className="mt-1 text-[12px] sm:text-[13px] leading-snug text-slate-600 dark:text-slate-300"
          >
            Préparation et mise en forme de votre contenu. Merci de patienter.
          </motion.p>

          {/* Dots ultra light (pas de map recréé, constante DOTS) */}
          <div className="mt-5 flex items-center justify-center gap-2">
            {DOTS.map((i) => (
              <motion.span
                key={i}
                aria-hidden="true"
                className="h-2 w-2 rounded-full bg-slate-900/25 dark:bg-white/25"
                animate={reduceMotion ? undefined : dotAnim(i)}
              />
            ))}
          </div>

          {/* Hint compact */}
          <div className="mt-5 text-[11px] text-slate-500 dark:text-slate-400">
            Ne fermez pas cette page.
          </div>
        </motion.section>
      </AnimatePresence>
    </div>
  );
}

const LoadingSkeletonGenerate = memo(LoadingSkeletonGenerateImpl);
LoadingSkeletonGenerate.displayName = "LoadingSkeletonGenerate";

export default LoadingSkeletonGenerate;
