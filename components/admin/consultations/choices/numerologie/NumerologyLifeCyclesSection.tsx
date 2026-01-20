import { motion } from "framer-motion";
import React from "react";
import { useNumerologyLifeCyclesSection } from "@/hooks/consultations/numerologie/useNumerologyLifeCyclesSection";

interface NumerologyLifeCyclesSectionProps {
  cyclesDeVieGrands: any[];
}

export const NumerologyLifeCyclesSection: React.FC<NumerologyLifeCyclesSectionProps> = React.memo(({ cyclesDeVieGrands }) => {
  const cycles = useNumerologyLifeCyclesSection(cyclesDeVieGrands);
  if (!cycles || !Array.isArray(cycles) || cycles.length === 0) return null;
  return (
    <motion.div
      className="w-full flex flex-col items-center gap-2 animate-fade-in"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
    >
      <div className="font-bold text-purple-700 dark:text-purple-200 text-center text-base md:text-lg mb-2">Grands Cycles de Vie</div>
      <div className="flex flex-col md:flex-row gap-2 md:gap-4 w-full items-center justify-center">
        {cycles.map((cycle, i) => (
          <div key={i} className="p-3 rounded-lg bg-white/80 dark:bg-zinc-900/60 shadow min-w-[180px] max-w-xs text-center">
            <div className="font-bold text-indigo-700 dark:text-indigo-300">{cycle.periode} <span className="text-xs">({cycle.ages})</span></div>
            <div className="text-xs text-slate-700 dark:text-zinc-200">Nombre : {cycle.nombre}</div>
            <div className="text-xs italic text-slate-800 dark:text-zinc-100 mt-1">{cycle.theme}</div>
          </div>
        ))}
      </div>
    </motion.div>
  );
});
