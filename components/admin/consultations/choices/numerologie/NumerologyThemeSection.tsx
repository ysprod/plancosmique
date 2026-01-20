import { motion } from "framer-motion";
import React from "react";
import { useNumerologyThemeSection } from "@/hooks/consultations/numerologie/useNumerologyThemeSection";

interface NumerologyThemeSectionProps {
  themeDeNaissance: any;
}

export const NumerologyThemeSection: React.FC<NumerologyThemeSectionProps> = React.memo(({ themeDeNaissance }) => {
  const data = useNumerologyThemeSection(themeDeNaissance);
  if (!data) return null;
  return (
    <motion.div
      className="w-full flex flex-col items-center gap-2 md:gap-3 animate-fade-in"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
    >
      <div className="font-bold text-purple-700 dark:text-purple-200 text-center text-base md:text-lg mb-1 md:mb-2">
        Thème de Naissance
      </div>
      <div className="grid grid-cols-2 gap-2 md:gap-3 w-full max-w-lg mx-auto">
        {data.cheminDeVie && (
          <div className="flex flex-col items-center justify-center p-2 md:p-3 rounded-xl bg-white/80 dark:bg-zinc-900/60 shadow transition-all duration-300 hover:scale-[1.03] hover:shadow-lg min-w-[120px] max-w-xs mx-auto">
            <span className="font-bold text-indigo-700 dark:text-indigo-300 text-lg">{data.cheminDeVie}</span>
            <span className="text-xs text-slate-500">Chemin de Vie</span>
          </div>
        )}
        {/* Ajoutez d'autres blocs ici si besoin */}
      </div>
    </motion.div>
  );
});
