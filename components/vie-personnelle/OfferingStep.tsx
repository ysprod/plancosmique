"use client";
import { OfferingAlternative, WalletOffering } from "@/lib/interfaces";
import { AnimatePresence, motion } from "framer-motion";
import OfferingCard from "./OfferingCard";
import OfferingStepActions from "./OfferingStepActions";
import OfferingStepEmptyCategory from "./OfferingStepEmptyCategory";
import OfferingStepHeader from "./OfferingStepHeader";
import OfferingStepTabs from "./OfferingStepTabs";
import StatusBanner from "./StatusBanner";
import { useOfferingStepState } from "./useOfferingStepState";

interface OfferingStepProps {
  requiredOfferings: OfferingAlternative[];
  walletOfferings: WalletOffering[];
  onNext: (selected: OfferingAlternative) => void;
  consultationTitle: string;
}

export default function OfferingStep({
  requiredOfferings,
  walletOfferings,
  onNext,
  consultationTitle,
}: OfferingStepProps) {
  const state = useOfferingStepState(requiredOfferings, walletOfferings, onNext);
  return (
    <div className=" bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 
                  dark:from-gray-950 dark:via-purple-950/20 dark:to-gray-900 
                  flex flex-col">
      <OfferingStepHeader />
      {consultationTitle && (
        <div className="w-full flex justify-center items-center mt-2 mb-1">
          <h2 className="text-lg sm:text-xl font-bold">
            {consultationTitle}
          </h2>
        </div>
      )}
      <div className="sticky top-0 z-50 bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl border-b border-gray-200 dark:border-gray-800 shadow-sm">
        <div className="max-w-2xl mx-auto px-4 py-3">
          <div className="flex items-center justify-center gap-3 mb-3">
            <div className="flex flex-col items-center justify-center text-center">
              <p className="text-base text-gray-500 dark:text-gray-400 font-bold">
                Cette requête nécessite que vous fassiez une offrande.
              </p>
              <p className="text-base text-gray-500 dark:text-gray-400">
                Choisissez entre une offrande animale, végétale ou boisson.
              </p>
            </div>
          </div>
          <OfferingStepTabs activeTab={state.activeTab} categoryCounts={state.categoryCounts} onTabChange={state.handleTabChange} />
        </div>
      </div>
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-2xl mx-auto px-4 py-4 space-y-3 pb-8">
          <AnimatePresence mode="wait">
            <StatusBanner
              hasSelection={!!state.selectedOffering}
              isSufficient={state.canProceed}
            />
          </AnimatePresence>
          <AnimatePresence mode="wait">
            <motion.div
              key={state.activeTab}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
              className="space-y-2"
            >
              {state.currentOfferings.length === 0 ? (
                <OfferingStepEmptyCategory />
              ) : (
                state.currentOfferings.map((offering: OfferingAlternative, index: number) => (
                  <OfferingCard
                    key={offering.offeringId}
                    offering={offering}
                    isSelected={state.selectedId === offering.offeringId}
                    availableQuantity={state.walletMap.get(offering.offeringId) || 0}
                    onSelect={() => state.handleSelect(offering.offeringId)}
                    index={index}
                  />
                ))
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
      <OfferingStepActions
        onNext={state.handleNext}
        canProceed={state.canProceed}
      />
    </div>
  );
}