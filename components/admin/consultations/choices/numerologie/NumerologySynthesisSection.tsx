import { motion } from "framer-motion";
import React from "react";
import { useNumerologySynthesisSection } from "@/hooks/consultations/numerologie/useNumerologySynthesisSection";

interface NumerologySynthesisSectionProps {
  syntheseEtTiming: any;
}

export const NumerologySynthesisSection: React.FC<NumerologySynthesisSectionProps> = React.memo(({ syntheseEtTiming }) => {
  const synthese = useNumerologySynthesisSection(syntheseEtTiming);
  if (!synthese) return null;
  return (
    <motion.div
      className="w-full flex flex-col items-center gap-2 animate-fade-in"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
    >
      <div className="font-bold text-purple-700 dark:text-purple-200 text-center text-base md:text-lg mb-2">Synthèse & Timing</div>
      <div className="mb-1 text-xs md:text-sm text-slate-800 dark:text-zinc-100 text-center"><b>Accord :</b> {synthese.accord}</div>
      <div className="mb-1 text-xs md:text-sm text-slate-800 dark:text-zinc-100 text-center"><b>Opportunités :</b> {synthese.opportunites}</div>
      <div className="mb-1 text-xs md:text-sm text-slate-800 dark:text-zinc-100 text-center"><b>Défis :</b> {synthese.defisActuels}</div>
      <div className="mb-1 text-xs md:text-sm text-slate-800 dark:text-zinc-100 text-center"><b>Conseils pratiques :</b></div>
      <ul className="list-disc ml-6 text-xs text-blue-800 dark:text-blue-200 text-left">
        {synthese.conseilsPratiques?.map((c: string, i: number) => (
          <li key={i}>{c}</li>
        ))}
      </ul>
    </motion.div>
  );
});
