"use client";
import { memo } from "react";
import ConsultationCardActions from "./ConsultationCardActions";
import ConsultationCardHeader from "./ConsultationCardHeader";
import ConsultationCardUserInfo from "./ConsultationCardUserInfo";
import ConsultationCardTabsContainer from "./ConsultationCardTabsContainer";
import type { TabKey } from "./DisplayConsultationCard.types";
import type { MissionBlock } from "./missionParser";

interface ConsultationCardContentProps {
    nomComplet: string;
    retrogradeCount: number;
    isNotified: boolean;
    dateNaissance: string;
    heureNaissance: string;
    lieuNaissance: string;
    mostFrequentSign: string;
    handleNotify: () => void;
    handleModify: () => void;
    tab: TabKey;
    setTab: (tab: TabKey) => void;
    firstMissionLine: string;
    positions: any[];
    visiblePositions: any[];
    aspectsTexte: string;
    missionTitre: string;
    missionBlocks: MissionBlock[];
    dateGen: string;
}

const ConsultationCardContent = memo(function ConsultationCardContent({
    nomComplet,
    retrogradeCount,
    isNotified,
    dateNaissance,
    heureNaissance,
    lieuNaissance,
    mostFrequentSign,
    handleNotify,
    handleModify,
    tab,
    setTab,
    firstMissionLine,
    positions,
    visiblePositions,
    aspectsTexte,
    missionTitre,
    missionBlocks,
    dateGen,
}: ConsultationCardContentProps) {
    return (
        <>
            <ConsultationCardHeader nomComplet={nomComplet} retrogradeCount={retrogradeCount} isNotified={isNotified} />

            <ConsultationCardUserInfo
                dateNaissance={dateNaissance}
                heureNaissance={heureNaissance}
                lieuNaissance={lieuNaissance}
                mostFrequentSign={mostFrequentSign}
            />

            <ConsultationCardActions isNotified={isNotified} onNotify={handleNotify} onModify={handleModify} />

            <ConsultationCardTabsContainer
                tab={tab}
                setTab={setTab}
                firstMissionLine={firstMissionLine}
                positions={positions}
                visiblePositions={visiblePositions}
                retrogradeCount={retrogradeCount}
                aspectsTexte={aspectsTexte}
                missionTitre={missionTitre}
                missionBlocks={missionBlocks}
                dateGen={dateGen}
            />
        </>
    );
});

ConsultationCardContent.displayName = "ConsultationCardContent";

export default ConsultationCardContent;