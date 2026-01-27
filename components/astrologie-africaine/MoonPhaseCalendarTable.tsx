"use client";
import { memo } from "react";
import { useMoonPhaseData } from "@/hooks/useMoonPhaseData";
import { useMoonPhaseProcessing } from "@/hooks/useMoonPhaseProcessing";

export const MoonPhaseCalendarTable = memo(() => {
  const { monthData, loading, currentDate } = useMoonPhaseData();
  const { moonDays } = useMoonPhaseProcessing(monthData);

  if (loading) return <div className="text-center py-4">Chargement des phases lunaires...</div>;
  if (!monthData || !moonDays.length) return <div className="text-center py-4 text-red-500">Aucune donnée lunaire disponible.</div>;

  // Grouper par phase principale (Nouvelle Lune, Premier quartier, Pleine Lune, Dernier quartier)
  const mainPhases = [
    { key: "Nouvelle Lune", emoji: "🌑" },
    { key: "Premier quartier", emoji: "🌓" },
    { key: "Pleine Lune", emoji: "🌕" },
    { key: "Dernier quartier", emoji: "🌗" },
  ];

  // Chercher la date de chaque phase principale dans le mois courant
  const phaseDates = mainPhases.map(phase => {
    const found = moonDays.find(day => day.phaseName.toLowerCase().includes(phase.key.toLowerCase()));
    return {
      ...phase,
      date: found ? new Date(currentDate.getFullYear(), currentDate.getMonth(), found.day) : null,
      day: found ? found.day : null,
    };
  });

  return (
    <div className="overflow-x-auto mt-4">
      <table className="min-w-full text-xs sm:text-sm border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden bg-white/80 dark:bg-gray-800/80">
        <thead>
          <tr className="bg-gradient-to-r from-purple-100 to-indigo-100 dark:from-purple-900/30 dark:to-indigo-900/30">
            <th className="px-3 py-2 text-left font-bold">Phase</th>
            <th className="px-3 py-2 text-left font-bold">Date</th>
            <th className="px-3 py-2 text-left font-bold">Jour</th>
          </tr>
        </thead>
        <tbody>
          {phaseDates.map(phase => (
            <tr key={phase.key} className="border-t border-gray-100 dark:border-gray-700">
              <td className="px-3 py-2 flex items-center gap-2 font-semibold">
                <span className="text-lg">{phase.emoji}</span> {phase.key}
              </td>
              <td className="px-3 py-2">
                {phase.date ? phase.date.toLocaleDateString("fr-FR", { day: "2-digit", month: "long", year: "numeric" }) : <span className="text-gray-400">-</span>}
              </td>
              <td className="px-3 py-2">
                {phase.day ? phase.day : <span className="text-gray-400">-</span>}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="text-[10px] sm:text-xs text-gray-500 dark:text-gray-400 italic text-center mt-2">
        Les dates sont calculées pour le mois affiché.
      </div>
    </div>
  );
});

MoonPhaseCalendarTable.displayName = "MoonPhaseCalendarTable";
