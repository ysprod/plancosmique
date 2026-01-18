import { useMemo } from "react";
import { normalizeIllumination } from "@/components/astrologie-africaine/moonPhaseUtils";
import type { MoonPhaseDay, MonthData } from "./useMoonPhaseData";

export function useMoonPhaseProcessing(monthData: MonthData | null) {
  const moonDays = useMemo(() => {
    if (!monthData?.phases) return [];
    const today = new Date();
    const isCurrentMonth =
      monthData.year === today.getFullYear() &&
      monthData.month === today.getMonth() + 1;

    return Object.entries(monthData.phases)
      .slice(0, 31)
      .map(([day, data]) => {
        if (!data || typeof data !== 'object') return null;

        const dayNum = parseInt(day);
        const phaseName = String(data.phaseName || '').toLowerCase();
        const illumination = normalizeIllumination(data.illumination);

        return {
          day: dayNum,
          phaseName: data.phaseName || 'Phase inconnue',
          svg: data.svg || '',
          illumination,
          isNew: phaseName.includes("nouvelle lune"),
          isFull: phaseName.includes("pleine lune"),
          isToday: isCurrentMonth && dayNum === today.getDate()
        };
      })
      .filter((day): day is MoonPhaseDay => day !== null);
  }, [monthData]);

  return { moonDays };
}
