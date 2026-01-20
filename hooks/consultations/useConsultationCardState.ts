import { useCallback, useEffect, useState } from "react";
import type { TabKey } from "../../components/admin/consultations/DisplayConsultationCard.types";

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
    setNotifiedLocal(true); 
    onNotifyUser(consultationId!);
  }, [consultationId, isNotified, onNotifyUser]);

  return {
    tab,
    setTab,
    isNotified,
    handleModify,
    handleNotify,
  };
}