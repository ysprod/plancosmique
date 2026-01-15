"use client";
import useConsultationData from "@/hooks/admin/consultations/useConsultationData";
import type { AnalyseAstrologique } from "@/lib/interfaces";
import { memo } from "react";
import ConsultationCardBackground from "./ConsultationCardBackground";
import ConsultationCardBorder from "./ConsultationCardBorder";
import ConsultationCardContainer from "./ConsultationCardContainer";
import ConsultationCardContent from "./ConsultationCardContent";
import { consultationCardMemoComparator } from "./consultationCardMemoComparator";
import { useConsultationCardData } from "./useConsultationCardData";
import { useConsultationCardState } from "./useConsultationCardState";

interface ConsultationCardProps {
  consultation: AnalyseAstrologique;
  onModifyAnalysis: (id: string) => void;
  onNotifyUser: (id: string) => void;
  notifiedback: boolean;
}

const DisplayConsultationCard = memo(
  function DisplayConsultationCard({ consultation, onModifyAnalysis, onNotifyUser, notifiedback }: ConsultationCardProps) {
    const derived = useConsultationData(consultation);

    const { tab, setTab, isNotified, handleModify, handleNotify } = useConsultationCardState({
      notifiedback,
      isNotifiedBackend: derived.isNotifiedBackend,
      onModifyAnalysis,
      onNotifyUser,
      consultationId: derived.id,
    });

    const { visiblePositions, firstMissionLine, missionBlocks, stars } = useConsultationCardData(derived);

    if (!derived.id || !derived.nomComplet) return null;

    return (
      <ConsultationCardContainer consultationId={derived.id}>
        <ConsultationCardBackground stars={stars} />

        <ConsultationCardContent
          nomComplet={derived.nomComplet}
          retrogradeCount={derived.retrogradeCount}
          isNotified={isNotified}
          dateNaissance={derived.dateNaissance}
          heureNaissance={derived.heureNaissance}
          lieuNaissance={derived.lieuNaissance}
          mostFrequentSign={derived.mostFrequentSign}
          handleNotify={handleNotify}
          handleModify={handleModify}
          tab={tab}
          setTab={setTab}
          firstMissionLine={firstMissionLine}
          positions={derived.positions}
          visiblePositions={visiblePositions}
          aspectsTexte={derived.aspectsTexte}
          missionTitre={derived.missionTitre}
          missionBlocks={missionBlocks}
          dateGen={derived.dateGen}
        />

        <ConsultationCardBorder />
      </ConsultationCardContainer>
    );
  },
  consultationCardMemoComparator
);

DisplayConsultationCard.displayName = "DisplayConsultationCard";

export default DisplayConsultationCard;