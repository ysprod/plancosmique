/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { motion, AnimatePresence } from "framer-motion";
import { 
  CheckCircle2, 
  Circle, 
  Wallet, 
  AlertTriangle,
  Sparkles,
  ChevronRight,
  Info,
  ArrowRight,
  ShoppingBag
} from "lucide-react";
import { useMemo, useState, useCallback } from "react";
import { useRouter } from "next/navigation";

// =====================================================
// TYPES & INTERFACES
// =====================================================

interface OfferingAlternative {
  category: 'animal' | 'vegetal' | 'beverage';
  offeringId: string;
  quantity: number;
  name?: string;
  price?: number;
  icon?: string;
}

interface WalletOffering {
  offeringId: string; // ID de l'offrande
  quantity: number;
  name: string;
  icon: string;
  category: string;
  price: number;
}


interface OfferingStepProps {
  requiredOfferings: OfferingAlternative[];
  walletOfferings: WalletOffering[];
  onNext: (selected: OfferingAlternative) => void;
  onBack: () => void;
}


export default function OfferingStep({
  requiredOfferings,
  walletOfferings,
  onNext,
  onBack,
}: OfferingStepProps) {
  const router = useRouter();
  // On suppose requiredOfferings = alternatives[]
  const [selected, setSelected] = useState<string | null>(null);

  // Trouver l'alternative sélectionnée
  const selectedAlternative = requiredOfferings.find((alt) => alt.offeringId === selected);

  // Vérifier la disponibilité dans le wallet
  const getAvailableQuantity = (offeringId: string) => {
    const found = walletOfferings.find((w) => w.offeringId === offeringId);
    return found?.quantity || 0;
  };

  const canProceed = !!selectedAlternative && getAvailableQuantity(selectedAlternative.offeringId) >= selectedAlternative.quantity;

  const handleNext = () => {
    if (selectedAlternative) {
      onNext(selectedAlternative);
    }
  };

  // Aller au marché
  const handleGoToMarket = useCallback(() => {
    router.push('/secured/marcheoffrandes');
  }, [router]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2 flex items-center gap-2">
          <Sparkles className="w-6 h-6 text-purple-500" />
          Choisissez votre alternative d'offrande
        </h2>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Sélectionnez une alternative (animal, végétal ou boisson) pour cette consultation
        </p>
      </div>

      <div className="space-y-3 max-w-md mx-auto">
        {requiredOfferings.map((alt, idx) => {
          const available = getAvailableQuantity(alt.offeringId);
          const isSelected = selected === alt.offeringId;
          return (
            <motion.button
              key={alt.offeringId}
              type="button"
              whileHover={{ scale: available >= alt.quantity ? 1.02 : 1 }}
              whileTap={{ scale: available >= alt.quantity ? 0.98 : 1 }}
              onClick={() => available >= alt.quantity && setSelected(alt.offeringId)}
              className={`w-full flex items-center justify-between px-4 py-4 rounded-xl border-2 transition-all font-semibold text-lg mb-2
                ${isSelected ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/20 shadow-lg' : available >= alt.quantity ? 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:border-purple-300' : 'border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 opacity-60 cursor-not-allowed'}`}
            >
              <span className="capitalize flex items-center gap-2">
                {alt.icon || ''} {alt.category}
              </span>
              <span className="text-xs text-gray-500">x{alt.quantity} {alt.name ? `- ${alt.name}` : ''}</span>
              <span className="ml-4 text-xs">
                {available >= alt.quantity ? `Disponible: ${available}` : `Manquant`}
              </span>
            </motion.button>
          );
        })}
      </div>

      <div className="flex gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onBack}
          className="flex-1 h-12 rounded-xl border-2 border-gray-300 dark:border-gray-600
                   text-gray-700 dark:text-gray-300 font-semibold
                   hover:bg-gray-50 dark:hover:bg-gray-800 transition-all"
        >
          Retour
        </motion.button>

        <motion.button
          whileHover={{ scale: canProceed ? 1.02 : 1 }}
          whileTap={{ scale: canProceed ? 0.98 : 1 }}
          onClick={handleNext}
          disabled={!canProceed}
          className={`
            flex-1 h-12 rounded-xl font-semibold flex items-center justify-center gap-2
            transition-all
            ${canProceed
              ? "bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white shadow-lg"
              : "bg-gray-200 dark:bg-gray-700 text-gray-400 dark:text-gray-500 cursor-not-allowed"
            }
          `}
        >
          <span>Valider l'alternative</span>
          <ChevronRight className="w-5 h-5" />
        </motion.button>
      </div>

      {!canProceed && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-start gap-2 p-3 rounded-lg bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800"
        >
          <AlertTriangle className="w-4 h-4 text-yellow-600 dark:text-yellow-400 mt-0.5 flex-shrink-0" />
          <p className="text-xs text-yellow-700 dark:text-yellow-300">
            Veuillez sélectionner une alternative disponible pour continuer
          </p>
        </motion.div>
      )}

      <motion.button
        whileTap={{ scale: 0.98 }}
        onClick={handleGoToMarket}
        className="w-full h-11 rounded-xl border-2 border-purple-300 dark:border-purple-700
                 bg-purple-50 dark:bg-purple-900/20
                 text-purple-700 dark:text-purple-300 font-semibold text-sm
                 hover:bg-purple-100 dark:hover:bg-purple-900/30
                 flex items-center justify-center gap-2 transition-all"
      >
        <ShoppingBag className="w-4 h-4" />
        <span>Aller au marché des offrandes</span>
        <ArrowRight className="w-4 h-4" />
      </motion.button>
    </motion.div>
  );
}
