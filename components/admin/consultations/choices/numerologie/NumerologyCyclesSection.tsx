import { motion } from "framer-motion";
import React from "react";
import { useNumerologyCyclesSection } from "@/hooks/consultations/numerologie/useNumerologyCyclesSection";

interface NumerologyCyclesSectionProps {
  cyclesEnMouvement: any;
}

export const NumerologyCyclesSection: React.FC<NumerologyCyclesSectionProps> = React.memo(({ cyclesEnMouvement }) => {
  const cycles = useNumerologyCyclesSection(cyclesEnMouvement);
  if (!cycles) return null;
  return (
    <motion.div
      className="w-full flex flex-col items-center gap-2 md:gap-4 animate-fade-in"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
    >
      <div className="font-bold text-purple-700 dark:text-purple-200 text-center text-base md:text-lg mb-2">Cycles en Mouvement</div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-4 w-full">
        {cycles.anneeUniverselle && (
          <div className="flex flex-col items-center justify-center p-2 md:p-3 rounded-xl bg-white/80 dark:bg-zinc-900/60 shadow transition-all duration-300 hover:scale-[1.03] hover:shadow-lg min-w-[140px] max-w-xs mx-auto">
            <div className="font-bold text-indigo-700 dark:text-indigo-300 text-center">Année Universelle <span className="text-xl">{cycles.anneeUniverselle.valeur}</span></div>
            <div className="text-xs text-slate-500 mb-1 text-center">{cycles.anneeUniverselle.calcul}</div>
          </div>
        )}
        {/* Ajoutez d'autres cycles ici si besoin */}
      </div>
    </motion.div>
  );
});
