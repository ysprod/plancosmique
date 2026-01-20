"use client";
import React from "react";

interface NumerologyCyclesProps {
  cyclesEnMouvement: any;
}

const blockStyle =
  "flex flex-col items-center justify-center p-2 md:p-3 rounded-xl bg-white/80 dark:bg-zinc-900/60 shadow transition-all duration-300 hover:scale-[1.03] hover:shadow-lg min-w-[140px] max-w-xs mx-auto";

export const NumerologyCycles: React.FC<NumerologyCyclesProps> = React.memo(({ cyclesEnMouvement }) => {
  if (!cyclesEnMouvement) return null;
  return (
    <div className="w-full flex flex-col items-center gap-2 md:gap-4 animate-fade-in">
      <div className="font-bold text-purple-700 dark:text-purple-200 text-center text-base md:text-lg mb-2">Cycles en Mouvement</div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-4 w-full">
        {cyclesEnMouvement.anneeUniverselle && (
          <div className={blockStyle}>
            <div className="font-bold text-indigo-700 dark:text-indigo-300 text-center">Année Universelle <span className="text-xl">{cyclesEnMouvement.anneeUniverselle.valeur}</span></div>
            <div className="text-xs text-slate-500 mb-1 text-center">{cyclesEnMouvement.anneeUniverselle.calcul}</div>
            <div className="text-xs text-slate-700 dark:text-zinc-200 mb-1 text-center">{cyclesEnMouvement.anneeUniverselle.signification}</div>
            <div className="text-xs italic text-slate-800 dark:text-zinc-100 text-center">{cyclesEnMouvement.anneeUniverselle.interpretation}</div>
          </div>
        )}
        {cyclesEnMouvement.anneePersonnelle && (
          <div className={blockStyle}>
            <div className="font-bold text-indigo-700 dark:text-indigo-300 text-center">Année Personnelle <span className="text-xl">{cyclesEnMouvement.anneePersonnelle.valeur}</span></div>
            <div className="text-xs text-slate-500 mb-1 text-center">{cyclesEnMouvement.anneePersonnelle.calcul}</div>
            <div className="text-xs text-slate-700 dark:text-zinc-200 mb-1 text-center">{cyclesEnMouvement.anneePersonnelle.signification}</div>
            <div className="text-xs italic text-slate-800 dark:text-zinc-100 text-center">{cyclesEnMouvement.anneePersonnelle.interpretation}</div>
            {cyclesEnMouvement.anneePersonnelle.conseil && (
              <div className="text-xs text-blue-700 dark:text-blue-300 mt-1 text-center">Conseil : {cyclesEnMouvement.anneePersonnelle.conseil}</div>
            )}
          </div>
        )}
        {cyclesEnMouvement.moisPersonnel && (
          <div className={blockStyle}>
            <div className="font-bold text-indigo-700 dark:text-indigo-300 text-center">Mois Personnel <span className="text-xl">{cyclesEnMouvement.moisPersonnel.valeur}</span> ({cyclesEnMouvement.moisPersonnel.mois})</div>
            <div className="text-xs text-slate-500 mb-1 text-center">{cyclesEnMouvement.moisPersonnel.calcul}</div>
            <div className="text-xs text-slate-700 dark:text-zinc-200 mb-1 text-center">{cyclesEnMouvement.moisPersonnel.signification}</div>
            <div className="text-xs italic text-slate-800 dark:text-zinc-100 text-center">{cyclesEnMouvement.moisPersonnel.interpretation}</div>
          </div>
        )}
        {cyclesEnMouvement.jourPersonnel && (
          <div className={blockStyle}>
            <div className="font-bold text-indigo-700 dark:text-indigo-300 text-center">Jour Personnel <span className="text-xl">{cyclesEnMouvement.jourPersonnel.valeur}</span> ({cyclesEnMouvement.jourPersonnel.date})</div>
            <div className="text-xs text-slate-500 mb-1 text-center">{cyclesEnMouvement.jourPersonnel.calcul}</div>
            <div className="text-xs text-slate-700 dark:text-zinc-200 mb-1 text-center">{cyclesEnMouvement.jourPersonnel.signification}</div>
            <div className="text-xs italic text-slate-800 dark:text-zinc-100 text-center">{cyclesEnMouvement.jourPersonnel.interpretation}</div>
          </div>
        )}
      </div>
      {cyclesEnMouvement.description && (
        <div className="col-span-full text-xs text-slate-600 dark:text-zinc-300 mt-2 text-center max-w-xl mx-auto animate-fade-in-delay">{cyclesEnMouvement.description}</div>
      )}
    </div>
  );
});
