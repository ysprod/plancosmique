"use client";
import { motion } from "framer-motion";
import { Target } from "lucide-react";
import { memo } from "react";
import { cx } from "@/lib/functions";
import type { MissionBlock } from "./missionParser";

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

interface ConsultationMissionTabProps {
  missionTitre: string;
  missionBlocks: MissionBlock[];
  dateGen: string;
}

const ConsultationMissionTab = memo(function ConsultationMissionTab({
  missionTitre,
  missionBlocks,
  dateGen,
}: ConsultationMissionTabProps) {
  return (
    <motion.section
      key="mission"
      variants={tabVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className={cx(glassPanel, "p-5 text-center")}
    >
      <div className="mx-auto mb-5 flex flex-col items-center justify-center gap-2">
        <div className="inline-flex rounded-2xl bg-amber-500/10 p-3">
          <Target className="h-6 w-6 text-amber-600 dark:text-amber-400" />
        </div>
        <h3 className="text-base font-black text-slate-900 dark:text-white">{missionTitre}</h3>
        <p className="text-xs text-slate-600 dark:text-zinc-400">Texte généré par le backend</p>
      </div>

      <div className="space-y-3 text-left">
        {missionBlocks.map((b) => {
          if (b.type === "spacer") return <div key={b.key} className="h-2" />;
          if (b.type === "h2")
            return (
              <h4 key={b.key} className="text-sm font-black text-slate-900 dark:text-white">
                {b.value}
              </h4>
            );
          if (b.type === "bullet")
            return (
              <div key={b.key} className="flex gap-2 text-sm text-slate-700 dark:text-zinc-200">
                <span className="mt-[6px] h-1.5 w-1.5 shrink-0 rounded-full bg-violet-500" />
                <span className="leading-relaxed">{b.value}</span>
              </div>
            );
          return (
            <p key={b.key} className="text-sm leading-relaxed text-slate-700 dark:text-zinc-200">
              {b.value}
            </p>
          );
        })}
      </div>

      <div className="mt-5 border-t border-slate-200 pt-4 text-center dark:border-zinc-800">
        <span className="text-[12px] text-slate-500 dark:text-zinc-400">Généré le {dateGen}</span>
      </div>
    </motion.section>
  );
});

ConsultationMissionTab.displayName = "ConsultationMissionTab";

export default ConsultationMissionTab;