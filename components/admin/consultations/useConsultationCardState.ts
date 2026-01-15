import { useCallback, useEffect, useState } from "react";
import type { TabKey } from "./DisplayConsultationCard.types";

interface UseConsultationCardStateProps {
  notifiedback: boolean;
  isNotifiedBackend: boolean;
  onModifyAnalysis: (id: string) => void;
  onNotifyUser: (id: string) => void;
  consultationId: string | undefined;
}

export function useConsultationCardState({
  notifiedback,
  isNotifiedBackend,
  onModifyAnalysis,
  onNotifyUser,
  consultationId,
}: UseConsultationCardStateProps) {
  const [tab, setTab] = useState<TabKey>("resume");
  const [notifiedLocal, setNotifiedLocal] = useState(notifiedback || isNotifiedBackend);

  useEffect(() => {
    setNotifiedLocal(notifiedback || isNotifiedBackend);
  }, [notifiedback, isNotifiedBackend]);

  const isNotified = notifiedLocal || isNotifiedBackend;

  const handleModify = useCallback(() => {
    if (consultationId) onModifyAnalysis(consultationId);
  }, [consultationId, onModifyAnalysis]);

  const handleNotify = useCallback(() => {
    if (!consultationId || isNotified) return;
    setNotifiedLocal(true); // optimiste
    onNotifyUser(consultationId);
  }, [consultationId, isNotified, onNotifyUser]);

  return {
    tab,
    setTab,
    isNotified,
    handleModify,
    handleNotify,
  };
}
