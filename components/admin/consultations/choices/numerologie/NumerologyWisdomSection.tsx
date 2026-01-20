import { motion } from "framer-motion";
import React from "react";
import { useNumerologyWisdomSection } from "@/hooks/consultations/numerologie/useNumerologyWisdomSection";

interface NumerologyWisdomSectionProps {
  sagesseAfricaine: any;
}

export const NumerologyWisdomSection: React.FC<NumerologyWisdomSectionProps> = React.memo(({ sagesseAfricaine }) => {
  const sagesse = useNumerologyWisdomSection(sagesseAfricaine);
  if (!sagesse) return null;
  return (
    <motion.div
      className="w-full flex flex-col items-center gap-2 animate-fade-in"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
    >
      <div className="font-bold text-purple-700 dark:text-purple-200 text-center text-base md:text-lg mb-2">Sagesse Africaine</div>
      <div className="italic text-slate-800 dark:text-zinc-100 text-center">{sagesse.proverbe}</div>
      <div className="text-xs text-slate-600 dark:text-zinc-300 text-center">{sagesse.source}</div>
      {sagesse.lien && (
        <div className="text-xs text-blue-700 dark:text-blue-300 mt-1 text-center">{sagesse.lien}</div>
      )}
    </motion.div>
  );
});
