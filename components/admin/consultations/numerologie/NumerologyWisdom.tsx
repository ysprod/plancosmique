"use client";
import React from "react";

interface NumerologyWisdomProps {
  sagesseAfricaine: any;
}

export const NumerologyWisdom: React.FC<NumerologyWisdomProps> = React.memo(({ sagesseAfricaine }) => {
  if (!sagesseAfricaine) return null;
  return (
    <div className="w-full flex flex-col items-center gap-2 animate-fade-in">
      <div className="font-bold text-purple-700 dark:text-purple-200 text-center text-base md:text-lg mb-2">Sagesse Africaine</div>
      <div className="italic text-slate-800 dark:text-zinc-100 text-center">{sagesseAfricaine.proverbe}</div>
      <div className="text-xs text-slate-600 dark:text-zinc-300 text-center">{sagesseAfricaine.source}</div>
      {sagesseAfricaine.lien && (
        <div className="text-xs text-blue-700 dark:text-blue-300 mt-1 text-center">{sagesseAfricaine.lien}</div>
      )}
    </div>
  );
});
