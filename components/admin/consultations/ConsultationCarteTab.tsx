"use client";
import { AnimatePresence, motion } from "framer-motion";
import { Plane, ScrollText, Telescope } from "lucide-react";
import { memo, useState } from "react";
import PlanetChip from "./PlanetChip";
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

interface ConsultationCarteTabProps {
  positions: any[];
  visiblePositions: any[];
  retrogradeCount: number;
  aspectsTexte: string;
}

const ConsultationCarteTab = memo(function ConsultationCarteTab({
  positions,
  visiblePositions,
  retrogradeCount,
  aspectsTexte,
}: ConsultationCarteTabProps) {
  const [aspectsOpen, setAspectsOpen] = useState(false);

  return (
    <motion.section
      key="carte"
      variants={tabVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="space-y-3"
    >
      <div className={cx(glassPanel, "p-5 text-center")}>
        <div className="mx-auto mb-4 flex flex-col items-center justify-center gap-2">
          <div className="inline-flex rounded-2xl bg-blue-500/10 p-3">
            <Plane className="h-6 w-6 text-blue-600 dark:text-blue-400" />
          </div>
          <h3 className="text-base font-black text-slate-900 dark:text-white">Carte du Ciel</h3>
          <p className="text-xs text-slate-600 dark:text-zinc-400">
            {positions.length} positions • {retrogradeCount} rétrogrades
          </p>

          <button
            type="button"
            onClick={() => setAspectsOpen((v) => !v)}
            className={cx(
              "mt-2 inline-flex items-center justify-center gap-2 rounded-2xl px-4 py-2 text-xs font-extrabold",
              "bg-slate-50 text-slate-700 hover:bg-slate-100",
              "dark:bg-zinc-900 dark:text-zinc-200 dark:hover:bg-zinc-800"
            )}
          >
            <ScrollText className="h-4 w-4" />
            {aspectsOpen ? "Masquer" : "Afficher"} les aspects
          </button>
        </div>

        <div className="flex flex-wrap justify-center gap-2">
          {visiblePositions.map((pos: any, idx: number) => (
            <PlanetChip key={`${pos.planete}-${pos.maison}-${idx}`} {...pos} />
          ))}
        </div>
      </div>

      <AnimatePresence>
        {aspectsOpen && (
          <motion.div
            key="aspects"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.14 }}
            className={cx(glassPanel, "p-5 text-center")}
          >
            <div className="mx-auto mb-3 flex flex-col items-center justify-center gap-2">
              <div className="inline-flex rounded-2xl bg-purple-500/10 p-3">
                <Telescope className="h-6 w-6 text-purple-600 dark:text-purple-400" />
              </div>
              <h4 className="text-sm font-black text-slate-900 dark:text-white">Aspects détaillés</h4>
            </div>

            <pre className="mx-auto max-h-56 w-full overflow-auto whitespace-pre-wrap rounded-2xl bg-slate-50 p-4 text-left text-[12px] leading-relaxed text-slate-700 dark:bg-zinc-900 dark:text-zinc-200">
              {aspectsTexte || "Aucun aspect disponible"}
            </pre>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.section>
  );
});

ConsultationCarteTab.displayName = "ConsultationCarteTab";

export default ConsultationCarteTab;