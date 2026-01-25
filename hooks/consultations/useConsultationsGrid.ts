import { useCallback, useMemo } from "react";

export function useConsultationsGridHandlers(handleView: (id: string) => void, handleDownload: (id: string) => void) {
  const onView = useCallback((id: string) => handleView(id), [handleView]);
  const onDownload = useCallback((id: string) => handleDownload(id), [handleDownload]);
  return { onView, onDownload };
}

export function useConsultationsCount(consultations: any[]) {
  return useMemo(() => consultations.length, [consultations]);
}
