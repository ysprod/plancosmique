"use client";
import React from "react";

interface NumerologySynthesisProps {
  syntheseEtTiming: any;
}

export const NumerologySynthesis: React.FC<NumerologySynthesisProps> = React.memo(({ syntheseEtTiming }) => {
  if (!syntheseEtTiming) return null;
  return (
    <div className="w-full flex flex-col items-center gap-2 animate-fade-in">
      <div className="font-bold text-purple-700 dark:text-purple-200 text-center text-base md:text-lg mb-2">Synthèse & Timing</div>
      <div className="mb-1 text-xs md:text-sm text-slate-800 dark:text-zinc-100 text-center"><b>Accord :</b> {syntheseEtTiming.accord}</div>
      <div className="mb-1 text-xs md:text-sm text-slate-800 dark:text-zinc-100 text-center"><b>Opportunités :</b> {syntheseEtTiming.opportunites}</div>
      <div className="mb-1 text-xs md:text-sm text-slate-800 dark:text-zinc-100 text-center"><b>Défis :</b> {syntheseEtTiming.defisActuels}</div>
      <div className="mb-1 text-xs md:text-sm text-slate-800 dark:text-zinc-100 text-center"><b>Conseils pratiques :</b></div>
      <ul className="list-disc ml-6 text-xs text-blue-800 dark:text-blue-200 text-left">
        {syntheseEtTiming.conseilsPratiques?.map((c: string, i: number) => (
          <li key={i}>{c}</li>
        ))}
      </ul>
      <div className="mt-2 mb-1 text-xs md:text-sm text-slate-800 dark:text-zinc-100 text-center"><b>Prochains jours favorables :</b></div>
      <ul className="list-disc ml-6 text-xs text-green-800 dark:text-green-200 text-left">
        {syntheseEtTiming.prochainsJoursFavorables?.map((j: any, i: number) => (
          <li key={i}><b>{j.date}</b> (Jour {j.jourPersonnel}) : {j.pourquoi}</li>
        ))}
      </ul>
    </div>
  );
});
