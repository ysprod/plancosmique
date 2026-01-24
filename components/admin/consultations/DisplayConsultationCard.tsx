"use client";
import useConsultationData from "@/hooks/admin/consultations/useConsultationData";
import { useConsultationCardState } from "@/hooks/consultations/useConsultationCardState";
import type { AnalyseAstrologique, Consultation } from "@/lib/interfaces";
import { memo } from "react";
import ConsultationCardContent from "./ConsultationCardContent";
import { consultationCardMemoComparator } from "./consultationCardMemoComparator";

interface ConsultationCardProps {
  consultation: Consultation;
  onModifyAnalysis: (id: string) => void;
  onNotifyUser: (id: string) => void;
  notifiedback: boolean;
}

const DisplayConsultationCard = memo(
  function DisplayConsultationCard({ consultation, onModifyAnalysis, onNotifyUser, notifiedback }: ConsultationCardProps) {
    const derived = useConsultationData(consultation);
    const { tab, setTab, isNotified, handleModify, handleNotify } = useConsultationCardState({
      notifiedback, isNotifiedBackend: derived.isNotifiedBackend,
      onModifyAnalysis, onNotifyUser, consultationId: derived.id,
    });

    return (
      <ConsultationCardContent
        derived={derived}
        isNotified={isNotified}
        handleNotify={handleNotify}
        handleModify={handleModify}
        tab={tab}
        setTab={setTab}
      />
    );
  },
  consultationCardMemoComparator
);

DisplayConsultationCard.displayName = "DisplayConsultationCard";

export default DisplayConsultationCard;