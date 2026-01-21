"use client";
import { useConsultationCardData } from "@/hooks/consultations/useConsultationCardData";
import { memo } from "react";
import { NumerologyAnalysisSection } from "./choices/numerologie/NumerologyAnalysisSection";
import ConsultationCardActions from "./ConsultationCardActions";
import ConsultationCardHeader from "./ConsultationCardHeader";
import ConsultationCardTabsContainer from "./ConsultationCardTabsContainer";
import ConsultationCardUserInfo from "./ConsultationCardUserInfo";
import type { TabKey } from "./DisplayConsultationCard.types";

interface ConsultationCardContentProps {
    derived: any;
    isNotified: boolean;
    handleNotify: () => void;
    handleModify: () => void;
    tab: TabKey;
    setTab: (tab: TabKey) => void;
    syntheseEtTiming?: any;
    cyclesDeVieGrands?: any;
    sagesseAfricaine?: any;
}

const ConsultationCardContent = memo(function ConsultationCardContent(props: ConsultationCardContentProps) {
    const { isNotified, handleNotify, handleModify, tab, setTab, derived, } = props;
    const cardData = derived.type === 'numerologie'
        ? {
            stars: [],
            firstMissionLine: '',
            visiblePositions: [],
            missionBlocks: [],
            positions: [],
        }
        : useConsultationCardData(derived);

    return (
        <>
            <ConsultationCardHeader nomComplet={derived.nomComplet} retrogradeCount={derived?.retrogradeCount ?? 0} isNotified={isNotified} />
            <ConsultationCardUserInfo
                dateNaissance={derived.dateNaissance}
                heureNaissance={derived.heureNaissance}
                lieuNaissance={derived.lieuNaissance}
                mostFrequentSign={derived.mostFrequentSign ?? '—'}
            />

            <ConsultationCardActions isNotified={isNotified} onNotify={handleNotify} onModify={handleModify} />

            {derived.type === 'numerologie' ? (
                <NumerologyAnalysisSection
                  themeDeNaissance={derived.themeDeNaissance}
                  cyclesEnMouvement={derived.cyclesEnMouvement}
                  syntheseEtTiming={props.syntheseEtTiming}
                  cyclesDeVieGrands={props.cyclesDeVieGrands}
                  sagesseAfricaine={props.sagesseAfricaine}
                />
            ) : (
                <ConsultationCardTabsContainer
                    tab={tab}
                    setTab={setTab}
                    firstMissionLine={derived?.firstMissionLine ?? ''}
                    positions={derived?.positions ?? []}
                    visiblePositions={cardData.visiblePositions ?? []}
                    retrogradeCount={derived?.retrogradeCount ?? 0}
                    aspectsTexte={derived?.aspectsTexte ?? ''}
                    missionTitre={derived?.missionTitre ?? ''}
                    missionBlocks={cardData.missionBlocks ?? []}
                    dateGen={derived.dateGen}
                />
            )}
        </>
    );
});

ConsultationCardContent.displayName = "ConsultationCardContent";

export default ConsultationCardContent;