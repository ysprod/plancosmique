import { useCallback, useEffect, useState } from "react";
import { useThrottle } from "./moonPhaseUtils";

export interface MoonPhaseDay {
  day: number;
  phaseName: string;
  svg: string;
  illumination: number;
  isNew: boolean;
  isFull: boolean;
  isToday: boolean;
}

export interface MonthData {
  year: number;
  month: number;
  phases: Record<number, any>;
}

export function useMoonPhaseData() {
  const [monthData, setMonthData] = useState<MonthData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentDate, setCurrentDate] = useState(() => new Date());

  const fetchMonthData = useCallback(async (date: Date) => {
    setLoading(true);
    setError(null);

    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const cacheKey = `moon-${year}-${month}`;

    const cached = sessionStorage.getItem(cacheKey);
    if (cached) {
      try {
        setMonthData(JSON.parse(cached));
        setLoading(false);
        return;
      } catch (e) {
        sessionStorage.removeItem(cacheKey);
      }
    }

    try {
      const url = `https://www.icalendar37.net/lunar/api/?lang=fr&year=${year}&month=${month}&LDZ=${Date.now()}`;
      const res = await fetch(url);
      const data = await res.json();

      const processedData = { year, month, phases: data.phase };
      setMonthData(processedData);
      sessionStorage.setItem(cacheKey, JSON.stringify(processedData));
    } catch {
      setError("Impossible de charger les phases lunaires.");
    } finally {
      setLoading(false);
    }
  }, []);

  const throttledFetch = useThrottle(fetchMonthData, 250);

  const handleMonthChange = useCallback((direction: -1 | 1) => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      newDate.setMonth(prev.getMonth() + direction);
      return newDate;
    });
  }, []);

  useEffect(() => {
    throttledFetch(currentDate);
  }, [currentDate, throttledFetch]);

  return {
    monthData,
    loading,
    error,
    currentDate,
    handleMonthChange
  };
}
