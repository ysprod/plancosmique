"use client";
import React, { useEffect, useState } from "react";

interface MoonPhase {
  phase: string;
  svg: string;
  illumination: number;
  date: string;
}

// Utilise l'API icalendar37.net pour la phase lunaire du jour
export function MoonPhaseWidget() {
  const [moon, setMoon] = useState<MoonPhase | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth() + 1;
    const day = today.getDate();
    // API docs: https://www.icalendar37.net/lunar/api/
    const url = `https://www.icalendar37.net/lunar/api/?lang=fr&year=${year}&month=${month}&LDZ=1`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        const moonData = data.phase[day];
        setMoon({
          phase: moonData.phaseName,
          svg: moonData.svg,
          illumination: moonData.illumination,
          date: `${day}/${month}/${year}`,
        });
      })
      .catch(() => setError("Impossible de charger la phase lunaire."))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="text-sm text-gray-500">Chargement de la lune...</div>;
  if (error) return <div className="text-sm text-red-500">{error}</div>;
  if (!moon) return null;

  return (
    <div className="flex items-center gap-4 p-4 bg-violet-50 dark:bg-violet-950/30 rounded-xl shadow">
      <span dangerouslySetInnerHTML={{ __html: moon.svg }} className="w-12 h-12" />
      <div>
        <div className="font-bold text-violet-700 dark:text-violet-300">Phase lunaire aujourd'hui</div>
        <div className="text-sm text-gray-700 dark:text-gray-200">{moon.phase} ({moon.illumination}% éclairée)</div>
        <div className="text-xs text-gray-400">{moon.date}</div>
      </div>
    </div>
  );
}
