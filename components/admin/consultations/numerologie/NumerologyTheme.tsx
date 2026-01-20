"use client";

import React from "react";
import { useNumerologyTheme } from "@/hooks/consultations/useNumerologyTheme";

interface NumerologyThemeProps {
  themeDeNaissance: any;
}

const blockStyle =
  "flex flex-col items-center justify-center p-2 md:p-3 rounded-xl bg-white/80 dark:bg-zinc-900/60 shadow transition-all duration-300 hover:scale-[1.03] hover:shadow-lg min-w-[120px] max-w-xs mx-auto";

export const NumerologyTheme: React.FC<NumerologyThemeProps> = React.memo(({ themeDeNaissance }) => {
  const data = useNumerologyTheme(themeDeNaissance);
  if (!data) return null;
  return (
    <div className="w-full flex flex-col items-center gap-2 md:gap-3 animate-fade-in">
      <div className="font-bold text-purple-700 dark:text-purple-200 text-center text-base md:text-lg mb-1 md:mb-2">Thème de Naissance</div>
      <div className="grid grid-cols-2 gap-2 md:gap-3 w-full max-w-lg mx-auto">
        {data.cheminDeVie && (
          <div className={blockStyle}>
            <div className="font-bold text-indigo-700 dark:text-indigo-300 text-center">Chemin de Vie <span className="text-xl">{data.cheminDeVie.valeur}</span></div>
            <div className="text-xs text-slate-500 mb-1 text-center">{data.cheminDeVie.calcul}</div>
            <div className="text-xs text-slate-700 dark:text-zinc-200 mb-1 text-center">{data.cheminDeVie.signification}</div>
            <div className="text-xs italic text-slate-800 dark:text-zinc-100 text-center">{data.cheminDeVie.interpretation}</div>
          </div>
        )}
        {data.nombreExpression && (
          <div className={blockStyle}>
            <div className="font-bold text-indigo-700 dark:text-indigo-300 text-center">Expression <span className="text-xl">{data.nombreExpression.valeur}</span></div>
            <div className="text-xs text-slate-500 mb-1 text-center">{data.nombreExpression.calcul}</div>
            <div className="text-xs text-slate-700 dark:text-zinc-200 mb-1 text-center">{data.nombreExpression.signification}</div>
            <div className="text-xs italic text-slate-800 dark:text-zinc-100 text-center">{data.nombreExpression.interpretation}</div>
          </div>
        )}
        {data.nombreAme && (
          <div className={blockStyle}>
            <div className="font-bold text-indigo-700 dark:text-indigo-300 text-center">Âme <span className="text-xl">{data.nombreAme.valeur}</span></div>
            <div className="text-xs text-slate-500 mb-1 text-center">{data.nombreAme.calcul}</div>
            <div className="text-xs text-slate-700 dark:text-zinc-200 mb-1 text-center">{data.nombreAme.signification}</div>
            <div className="text-xs italic text-slate-800 dark:text-zinc-100 text-center">{data.nombreAme.interpretation}</div>
          </div>
        )}
        {data.nombrePersonnalite && (
          <div className={blockStyle}>
            <div className="font-bold text-indigo-700 dark:text-indigo-300 text-center">Personnalité <span className="text-xl">{data.nombrePersonnalite.valeur}</span></div>
            <div className="text-xs text-slate-500 mb-1 text-center">{data.nombrePersonnalite.calcul}</div>
            <div className="text-xs text-slate-700 dark:text-zinc-200 mb-1 text-center">{data.nombrePersonnalite.signification}</div>
            <div className="text-xs italic text-slate-800 dark:text-zinc-100 text-center">{data.nombrePersonnalite.interpretation}</div>
          </div>
        )}
      </div>
      {data.description && (
        <div className="col-span-full text-xs text-slate-600 dark:text-zinc-300 mt-2 text-center max-w-xl mx-auto animate-fade-in-delay">{data.description}</div>
      )}
    </div>
  );
});
