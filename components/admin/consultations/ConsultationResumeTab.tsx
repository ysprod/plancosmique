"use client";
import { motion } from "framer-motion";
import { Brain, Compass, Crown } from "lucide-react";
import { memo } from "react";
import { cx } from "@/lib/functions";

const tabVariants = {
  initial: { opacity: 0, y: 8 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.14 } },
  exit: { opacity: 0, y: 8, transition: { duration: 0.12 } },
};

const glassPanel = cx(
  "rounded-3xl border shadow-xl",
  "border-slate-200/60 bg-white/85 shadow-black/5",
  "dark:border-zinc-800/60 dark:bg-zinc-900/75 dark:shadow-black/30"
);

interface ConsultationResumeTabProps {
  firstMissionLine: string;
}

const ConsultationResumeTab = memo(function ConsultationResumeTab({ firstMissionLine }: ConsultationResumeTabProps) {
  return (
    <motion.section
      key="resume"
      variants={tabVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className={cx(glassPanel, "p-5 text-center")}
    >
      <div className="mx-auto mb-4 flex flex-col items-center justify-center gap-2">
        <div className="inline-flex rounded-2xl bg-violet-500/10 p-3">
          <Brain className="h-6 w-6 text-violet-600 dark:text-violet-400" />
        </div>
        <h3 className="text-base font-black text-slate-900 dark:text-white">Synthèse</h3>
        <p className="text-xs text-slate-600 dark:text-zinc-400">Extrait de la mission de vie</p>
      </div>

      <p className="text-sm leading-relaxed text-slate-700 dark:text-zinc-200">{firstMissionLine}</p>

      <div className="mt-5 grid grid-cols-2 gap-3">
        <div className={cx(glassPanel, "p-3")}>
          <div className="flex items-center justify-center gap-2 text-[12px] font-extrabold text-slate-900 dark:text-white">
            <Crown className="h-4 w-4 text-amber-600 dark:text-amber-400" />
            Mission
          </div>
          <div className="mt-2 text-[11px] text-slate-600 dark:text-zinc-300">
            Basée sur les nœuds lunaires, maisons et dominantes.
          </div>
        </div>

        <div className={cx(glassPanel, "p-3")}>
          <div className="flex items-center justify-center gap-2 text-[12px] font-extrabold text-slate-900 dark:text-white">
            <Compass className="h-4 w-4 text-blue-600 dark:text-blue-400" />
            Orientation
          </div>
          <div className="mt-2 text-[11px] text-slate-600 dark:text-zinc-300">
            Lecture structurée + actions concrètes.
          </div>
        </div>
      </div>
    </motion.section>
  );
});

ConsultationResumeTab.displayName = "ConsultationResumeTab";

export default ConsultationResumeTab;