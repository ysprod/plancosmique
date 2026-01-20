"use client";

import { useConsultationCardData } from "@/hooks/consultations/useConsultationCardData";
import { memo } from "react";
import ConsultationCardActions from "./ConsultationCardActions";
import ConsultationCardHeader from "./ConsultationCardHeader";
import ConsultationCardTabsContainer from "./ConsultationCardTabsContainer";
import ConsultationCardUserInfo from "./ConsultationCardUserInfo";
import type { TabKey } from "./DisplayConsultationCard.types";
import { NumerologyCycles } from "./numerologie/NumerologyCycles";
import { NumerologyLifeCycles } from "./numerologie/NumerologyLifeCycles";
import { NumerologySynthesis } from "./numerologie/NumerologySynthesis";
import { NumerologyTheme } from "./numerologie/NumerologyTheme";
import { NumerologyWisdom } from "./numerologie/NumerologyWisdom";

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

    const isNumerology = derived.type === 'numerologie';

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

            {/* Numerology summary (modular version) */}
            {isNumerology ? (
                <section className="my-4 p-4 rounded-xl bg-gradient-to-r from-purple-100 to-indigo-100 dark:from-zinc-800 dark:to-zinc-900">
                    <h3 className="font-bold text-lg mb-4 text-purple-800 dark:text-purple-300 text-center">Analyse Numérologique</h3>
                    <NumerologyTheme themeDeNaissance={derived.themeDeNaissance} />
                    <NumerologyCycles cyclesEnMouvement={derived.cyclesEnMouvement} />
                    <NumerologySynthesis syntheseEtTiming={props.syntheseEtTiming} />
                    <NumerologyLifeCycles cyclesDeVieGrands={props.cyclesDeVieGrands} />
                    <NumerologyWisdom sagesseAfricaine={props.sagesseAfricaine} />
                </section>
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