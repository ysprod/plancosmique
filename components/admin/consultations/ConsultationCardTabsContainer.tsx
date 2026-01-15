"use client";

import { AnimatePresence } from "framer-motion";
import { memo } from "react";
import ConsultationCarteTab from "./ConsultationCarteTab";
import ConsultationMissionTab from "./ConsultationMissionTab";
import ConsultationResumeTab from "./ConsultationResumeTab";
import type { TabKey } from "./DisplayConsultationCard.types";
import type { MissionBlock } from "./missionParser";
import Tabs from "./Tabs";

interface ConsultationCardTabsContainerProps {
  tab: TabKey;
  setTab: (tab: TabKey) => void;
  firstMissionLine: string;
  positions: any[];
  visiblePositions: any[];
  retrogradeCount: number;
  aspectsTexte: string;
  missionTitre: string;
  missionBlocks: MissionBlock[];
  dateGen: string;
}

const ConsultationCardTabsContainer = memo(function ConsultationCardTabsContainer({
  tab,
  setTab,
  firstMissionLine,
  positions,
  visiblePositions,
  retrogradeCount,
  aspectsTexte,
  missionTitre,
  missionBlocks,
  dateGen,
}: ConsultationCardTabsContainerProps) {
  return (
    <>
      {/* Tabs selector */}
      <div className="relative z-10 mx-auto mt-4 w-full">
        <Tabs tab={tab} setTab={setTab} />
      </div>

      {/* Tab content */}
      <div className="relative z-10 mx-auto mt-4 w-full">
        <AnimatePresence mode="wait">
          {tab === "resume" && <ConsultationResumeTab firstMissionLine={firstMissionLine} />}

          {tab === "carte" && (
            <ConsultationCarteTab
              positions={positions}
              visiblePositions={visiblePositions}
              retrogradeCount={retrogradeCount}
              aspectsTexte={aspectsTexte}
            />
          )}

          {tab === "mission" && (
            <ConsultationMissionTab missionTitre={missionTitre} missionBlocks={missionBlocks} dateGen={dateGen} />
          )}
        </AnimatePresence>
      </div>
    </>
  );
});

ConsultationCardTabsContainer.displayName = "ConsultationCardTabsContainer";
export default ConsultationCardTabsContainer;
