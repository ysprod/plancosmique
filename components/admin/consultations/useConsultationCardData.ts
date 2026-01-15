import { useMemo } from "react";
import { extractFirstMissionLine, parseMissionText } from "./missionParser";
import { useConsultationCardStars } from "./useConsultationCardStars";

interface ConsultationDerivedData {
  id?: string;
  positions: any[];
  missionContenu: string;
}

export function useConsultationCardData(derived: ConsultationDerivedData) {
  const visiblePositions = useMemo(() => derived.positions.slice(0, 20), [derived.positions]);

  const firstMissionLine = useMemo(() => extractFirstMissionLine(derived.missionContenu), [derived.missionContenu]);

  const missionBlocks = useMemo(() => parseMissionText(derived.missionContenu), [derived.missionContenu]);

  const stars = useConsultationCardStars(derived.id);

  return {
    visiblePositions,
    firstMissionLine,
    missionBlocks,
    stars,
  };
}
