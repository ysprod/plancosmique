import { useMemo } from "react";

export function useHoroscopeSummary(consultation: any) {
  return useMemo(() => {
    if (!consultation) return null;
    return consultation.analyse?.horoscope || consultation.resultData?.horoscope || null;
  }, [consultation]);
}
