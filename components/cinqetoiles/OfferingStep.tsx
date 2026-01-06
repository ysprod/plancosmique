/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { OfferingAlternative, WalletOffering } from "@/lib/interfaces";
import { AnimatePresence, motion } from "framer-motion";
import {
  AlertTriangle, ArrowRight, CheckCircle2, ChevronRight, Circle, Package, ShoppingBag
} from "lucide-react";
import { useRouter } from "next/navigation";
import { memo, useCallback, useMemo, useState } from "react";

type Category = 'animal' | 'vegetal' | 'beverage';

interface OfferingStepProps {
  requiredOfferings: OfferingAlternative[];
  walletOfferings: WalletOffering[];
  onNext: (selected: OfferingAlternative) => void;
  onBack: () => void;
}

export const CATEGORY_CONFIG: Record<Category, {
  label: string;
  icon: string;
  gradient: string;
  lightBg: string;
  darkBg: string;
}> = {
  animal: {
    label: "Animal",
    icon: "🐾",
    gradient: "from-amber-500 to-orange-500",
    lightBg: "bg-amber-50",
    darkBg: "dark:bg-amber-900/20"
  },
  vegetal: {
    label: "Végétal",
    icon: "🌿",
    gradient: "from-green-500 to-emerald-500",
    lightBg: "bg-green-50",
    darkBg: "dark:bg-green-900/20"
  },
  beverage: {
    label: "Boisson",
    icon: "🥤",
    gradient: "from-blue-500 to-cyan-500",
    lightBg: "bg-blue-50",
    darkBg: "dark:bg-blue-900/20"
  }
};

const TabButton = memo(({
  category,
  isActive,
  onClick,
  count
}: {
  category: Category;
  isActive: boolean;
  onClick: () => void;
  count: number;
}) => {
  const config = CATEGORY_CONFIG[category];

  return (
    <button
      onClick={onClick}
      className={`
        flex-1 relative py-3 px-4 rounded-xl font-semibold text-sm transition-all
        ${isActive
          ? `bg-gradient-to-r ${config.gradient} text-white shadow-lg`
          : `${config.lightBg} ${config.darkBg} text-gray-700 dark:text-gray-300 hover:opacity-80`
        }
      `}
    >
      <span className="flex items-center justify-center gap-1.5">
        <span className="text-base">{config.icon}</span>
        <span>{config.label}</span>
      </span>

    </button>
  );
});
TabButton.displayName = 'TabButton';

const OfferingCard = memo(({
  offering,
  isSelected,
  availableQuantity,
  onSelect,
  index
}: {
  offering: OfferingAlternative;
  isSelected: boolean;
  availableQuantity: number;
  onSelect: () => void;
  index: number;
}) => {
  const isSufficient = availableQuantity >= offering.quantity;
  const config = CATEGORY_CONFIG[offering.category];

  return (
    <motion.button
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.05 }}
      onClick={isSufficient ? onSelect : undefined}
      disabled={!isSufficient}
      className={`
        w-full flex items-center gap-3 p-3 rounded-xl border-2 transition-all text-left
        ${isSelected
          ? `border-purple-500 ${config.lightBg} ${config.darkBg} shadow-md`
          : isSufficient
            ? "border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:border-purple-300 active:scale-[0.98]"
            : "border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 opacity-50 cursor-not-allowed"
        }
      `}
    >
      <div className="flex-shrink-0">
        {isSelected ? (
          <CheckCircle2 className="w-5 h-5 text-purple-600 dark:text-purple-400" />
        ) : (
          <Circle className="w-5 h-5 text-gray-300 dark:text-gray-600" />
        )}
      </div>

      <div className={`
        w-10 h-10 rounded-lg flex items-center justify-center text-xl flex-shrink-0
        ${isSelected
          ? `bg-gradient-to-br ${config.gradient} text-white shadow-sm`
          : "bg-gray-100 dark:bg-gray-700"
        }
      `}>
        {offering.icon || config.icon}
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <h4 className="text-sm font-bold text-gray-900 dark:text-gray-100 truncate">
          {offering.name || `${config.label} ${index + 1}`}
        </h4>
        <div className="flex items-center gap-2 text-[11px] text-gray-600 dark:text-gray-400">
          <span>Requis: <strong>{offering.quantity}</strong></span>
          <span>•</span>
          <span className={isSufficient ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"}>
            Dispo: <strong>{availableQuantity}</strong>
          </span>
        </div>
      </div>
    </motion.button>
  );
});
OfferingCard.displayName = 'OfferingCard';

const StatusBanner = memo(({
  hasSelection,
  isSufficient
}: {
  hasSelection: boolean;
  isSufficient: boolean;
}) => {
  if (!hasSelection) {
    return (
      <motion.div
        initial={{ opacity: 0, y: -5 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-start gap-2 p-3 rounded-xl bg-yellow-50 dark:bg-yellow-900/20 
                 border border-yellow-200 dark:border-yellow-800"
      >
        <AlertTriangle className="w-4 h-4 text-yellow-600 dark:text-yellow-400 mt-0.5 flex-shrink-0" />
        <p className="text-xs text-yellow-700 dark:text-yellow-300">
          Sélectionnez une alternative disponible pour continuer
        </p>
      </motion.div>
    );
  }

  if (!isSufficient) {
    return (
      <motion.div
        initial={{ opacity: 0, y: -5 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-start gap-2 p-3 rounded-xl bg-red-50 dark:bg-red-900/20 
                 border border-red-200 dark:border-red-800"
      >
        <AlertTriangle className="w-4 h-4 text-red-600 dark:text-red-400 mt-0.5 flex-shrink-0" />
        <p className="text-xs text-red-700 dark:text-red-300">
          Quantité insuffisante. Rendez-vous au marché pour acquérir cette offrande.
        </p>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex items-start gap-2 p-3 rounded-xl bg-green-50 dark:bg-green-900/20 
               border border-green-200 dark:border-green-800"
    >
      <CheckCircle2 className="w-4 h-4 text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" />
      <p className="text-xs text-green-700 dark:text-green-300">
        Alternative sélectionnée et disponible. Prêt à continuer !
      </p>
    </motion.div>
  );
});
StatusBanner.displayName = 'StatusBanner';

// =====================================================
// COMPOSANT PRINCIPAL
// =====================================================
export default function OfferingStep({
  requiredOfferings,
  walletOfferings,
  onNext,
  onBack,
}: OfferingStepProps) {
  const router = useRouter();

  // État local (minimal pour éviter re-renders)
  const [activeTab, setActiveTab] = useState<Category>('animal');
  const [selectedId, setSelectedId] = useState<string | null>(null);

  // Memoization des calculs coûteux
  const walletMap = useMemo(() => {
    const map = new Map<string, number>();
    walletOfferings.forEach(w => map.set(w.offeringId, w.quantity));
    return map;
  }, [walletOfferings]);

  const offeringsByCategory = useMemo(() => {
    const grouped: Record<Category, OfferingAlternative[]> = {
      animal: [],
      vegetal: [],
      beverage: []
    };
    requiredOfferings.forEach(off => {
      grouped[off.category].push(off);
    });
    return grouped;
  }, [requiredOfferings]);

  const categoryCounts = useMemo(() => ({
    animal: offeringsByCategory.animal.length,
    vegetal: offeringsByCategory.vegetal.length,
    beverage: offeringsByCategory.beverage.length
  }), [offeringsByCategory]);

  const selectedOffering = useMemo(
    () => requiredOfferings.find(off => off.offeringId === selectedId),
    [requiredOfferings, selectedId]
  );

  const availableQty = useMemo(
    () => selectedOffering ? (walletMap.get(selectedOffering.offeringId) || 0) : 0,
    [selectedOffering, walletMap]
  );

  const canProceed = useMemo(
    () => !!selectedOffering && availableQty >= selectedOffering.quantity,
    [selectedOffering, availableQty]
  );

  // Handlers mémorisés
  const handleTabChange = useCallback((category: Category) => {
    setActiveTab(category);
  }, []);

  const handleSelect = useCallback((offeringId: string) => {
    setSelectedId(offeringId);
  }, []);

  const handleNext = useCallback(() => {
    if (selectedOffering && canProceed) {
      onNext(selectedOffering);
    }
  }, [selectedOffering, canProceed, onNext]);

  const handleGoToMarket = useCallback(() => {
    router.push('/secured/marcheoffrandes');
  }, [router]);

  const currentOfferings = offeringsByCategory[activeTab];

  return (
    <div className=" bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 
                  dark:from-gray-950 dark:via-purple-950/20 dark:to-gray-900 
                  flex flex-col">

      <motion.h1
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ type: 'spring', stiffness: 120, damping: 12, delay: 0.2 }}
        className="text-center text-2xl sm:text-2xl md:text-2xl font-extrabold mb-8 select-none relative"
      >
        <span
          className="block bg-gradient-to-r from-purple-500 via-pink-500 to-orange-400 bg-clip-text text-transparent animate-gradient-x drop-shadow-lg"
          style={{
            WebkitTextStroke: '1px rgba(80,0,80,0.08)',
            filter: 'drop-shadow(0 2px 16px #e879f9aa) drop-shadow(0 0px 8px #a21caf66)'
          }}
        >
          <motion.span
            initial={{ textShadow: '0 0 0px #190404ff' }}

            className="inline-block"
          >
            OFFRANDES
          </motion.span>
        </span>
      </motion.h1>

      <div className="sticky top-0 z-50 bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl 
                    border-b border-gray-200 dark:border-gray-800 shadow-sm">
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

          {/* Tabs */}
          <div className="flex gap-2">
            {(['animal', 'vegetal', 'beverage'] as Category[]).map(cat => (
              <TabButton
                key={cat}
                category={cat}
                isActive={activeTab === cat}
                onClick={() => handleTabChange(cat)}
                count={categoryCounts[cat]}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        <div className="max-w-2xl mx-auto px-4 py-4 space-y-3 pb-32">

          {/* Status banner */}
          <AnimatePresence mode="wait">
            <StatusBanner
              hasSelection={!!selectedOffering}
              isSufficient={canProceed}
            />
          </AnimatePresence>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
              className="space-y-2"
            >
              {currentOfferings.length === 0 ? (
                <div className="text-center py-12 px-4">
                  <div className="w-16 h-16 rounded-full bg-gray-100 dark:bg-gray-800 
                                flex items-center justify-center mx-auto mb-3">
                    <Package className="w-8 h-8 text-gray-400" />
                  </div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Aucune offrande dans cette catégorie
                  </p>
                </div>
              ) : (
                currentOfferings.map((offering, index) => (
                  <OfferingCard
                    key={offering.offeringId}
                    offering={offering}
                    isSelected={selectedId === offering.offeringId}
                    availableQuantity={walletMap.get(offering.offeringId) || 0}
                    onSelect={() => handleSelect(offering.offeringId)}
                    index={index}
                  />
                ))
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      <div className="sticky bottom-0 z-40 bg-white dark:bg-gray-900 
                    border-t border-gray-200 dark:border-gray-800 
                    shadow-[0_-4px_12px_rgba(0,0,0,0.1)]">
        <div className="max-w-2xl mx-auto px-4 py-3 space-y-2">

          {/* Boutons principaux */}
          <div className="flex gap-2">
            <button
              onClick={onBack}
              className="px-4 h-11 rounded-xl border-2 border-gray-300 dark:border-gray-600
                       text-gray-700 dark:text-gray-300 font-semibold text-sm
                       hover:bg-gray-50 dark:hover:bg-gray-800 transition-all
                       active:scale-[0.98]"
            >
              Retour
            </button>

            <button
              onClick={handleNext}
              disabled={!canProceed}
              className={`
                flex-1 h-11 rounded-xl font-semibold text-sm flex items-center justify-center gap-2
                transition-all active:scale-[0.98]
                ${canProceed
                  ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg"
                  : "bg-gray-200 dark:bg-gray-700 text-gray-400 dark:text-gray-500 cursor-not-allowed"
                }
              `}
            >
              <span>Valider</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <button
            onClick={handleGoToMarket}
            className="w-full h-10 rounded-xl border-2 border-purple-300 dark:border-purple-700
                     bg-purple-50 dark:bg-purple-900/20
                     text-purple-700 dark:text-purple-300 font-semibold text-sm
                     hover:bg-purple-100 dark:hover:bg-purple-900/30
                     flex items-center justify-center gap-2 transition-all
                     active:scale-[0.98]"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Marché des offrandes</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
