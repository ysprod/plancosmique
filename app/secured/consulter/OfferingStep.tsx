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
interface RequiredOffering {
  _id: string;
  name: string;
  price: number;
  icon: string;
  category: string;
  quantity: number; // ✅ Quantité requise pour cette offrande
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
  requiredOfferings: RequiredOffering[];
  walletOfferings: WalletOffering[];
  onNext: (selectedIds: string[]) => void;
  onBack: () => void;
}

// =====================================================
// HELPER: Normalisation des offrandes
// =====================================================
interface NormalizedOffering {
  id: string; // ID unique normalisé
  name: string;
  price: number;
  icon: string;
  category: string;
  source: "required" | "wallet";
  requiredQuantity: number; // ✅ Quantité requise
  availableQuantity?: number; // Pour les offrandes du wallet
}

const normalizeOfferings = (
  requiredOfferings: RequiredOffering[],
  walletOfferings: WalletOffering[]
): NormalizedOffering[] => {
  console.log("🔄 [OfferingStep] Normalisation des données...");
  console.log("📋 RequiredOfferings reçus:", requiredOfferings);
  console.log("💰 WalletOfferings reçus:", walletOfferings);

  // Map des offrandes du wallet par offeringId pour accès rapide
  const walletMap = new Map<string, WalletOffering>();
  walletOfferings.forEach(wo => {
    walletMap.set(wo.offeringId, wo);
    console.log(`  ✅ Wallet: ${wo.name} (ID: ${wo.offeringId}, Qty: ${wo.quantity})`);
  });

  // Normaliser les requiredOfferings avec infos du wallet
  const normalized: NormalizedOffering[] = requiredOfferings.map(req => {
    const walletEntry = walletMap.get(req._id);
    const availableQuantity = walletEntry?.quantity || 0;

    console.log(`  🔍 Required: ${req.name} (ID: ${req._id}, Qty requis: ${req.quantity})`);
    console.log(`     → Disponible dans wallet: ${availableQuantity}`);

    return {
      id: req._id, // Utiliser _id comme identifiant unique
      name: req.name,
      price: req.price,
      icon: req.icon,
      category: req.category,
      source: "required",
      requiredQuantity: req.quantity, // ✅ Quantité requise
      availableQuantity,
    };
  });

  console.log("✅ [OfferingStep] Normalisation terminée:", normalized);
  return normalized;
};

// =====================================================
// SOUS-COMPOSANTS
// =====================================================
const CategoryBadge = ({ category }: { category: string }) => {
  const configs: Record<string, { label: string; colors: string }> = {
    animal: { 
      label: "Animal", 
      colors: "bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300" 
    },
    vegetal: { 
      label: "Végétal", 
      colors: "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300" 
    },
    beverage: { 
      label: "Boisson", 
      colors: "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300" 
    },
  };

  const config = configs[category] || configs.animal;

  return (
    <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${config.colors}`}>
      {config.label}
    </span>
  );
};

const OfferingCard = ({ 
  offering, 
  isSelected, 
  onToggle, 
  index 
}: { 
  offering: NormalizedOffering; 
  isSelected: boolean; 
  onToggle: () => void;
  index: number;
}) => {
  // ✅ Vérifier si la quantité disponible est suffisante
  const isAvailable = (offering.availableQuantity || 0) >= offering.requiredQuantity;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      onClick={() => {
        console.log(`🖱️ [Click] Offrande: ${offering.name} (ID: ${offering.id})`);
        console.log(`   → Disponible: ${isAvailable}, Sélectionné: ${isSelected}`);
        if (isAvailable) onToggle();
      }}
      className={`
        group relative p-4 rounded-xl border-2 transition-all duration-300 cursor-pointer
        ${isSelected 
          ? "border-purple-500 bg-purple-50 dark:bg-purple-900/20 shadow-lg" 
          : isAvailable
            ? "border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:border-purple-300"
            : "border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 opacity-60 cursor-not-allowed"
        }
      `}
    >
      {/* Checkbox en haut à droite */}
      <div className="absolute top-3 right-3">
        {isSelected ? (
          <CheckCircle2 className="w-6 h-6 text-purple-600 dark:text-purple-400" />
        ) : (
          <Circle className={`w-6 h-6 ${isAvailable ? "text-gray-300 dark:text-gray-600" : "text-gray-200 dark:text-gray-700"}`} />
        )}
      </div>

      {/* Contenu */}
      <div className="flex items-start gap-3 pr-8">
        {/* Icône avec badge quantité */}
        <div className="relative flex-shrink-0">
          <div className={`
            w-14 h-14 rounded-xl flex items-center justify-center text-3xl
            ${isSelected 
              ? "bg-gradient-to-br from-purple-500 to-pink-500 shadow-md" 
              : "bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-600"
            }
          `}>
            {offering.icon}
          </div>
          
          {/* Badge quantité */}
          {isAvailable && (
            <div className="absolute -bottom-1 -right-1 min-w-[22px] h-[22px] px-1
                          rounded-full bg-green-500 dark:bg-green-600 
                          flex items-center justify-center
                          border-2 border-white dark:border-gray-800 shadow-sm">
              <span className="text-[10px] font-bold text-white">
                {offering.availableQuantity}
              </span>
            </div>
          )}
        </div>

        {/* Infos */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="text-sm font-bold text-gray-900 dark:text-gray-100 truncate">
              {offering.name}
            </h3>
            <CategoryBadge category={offering.category} />
          </div>
          
          {/* ✅ Affichage de la quantité requise */}
          <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">
            Requis: <span className="font-bold text-gray-900 dark:text-gray-100">{offering.requiredQuantity}</span>
            {isAvailable && (
              <span className="ml-2">
                | Disponible: <span className="font-bold text-green-600 dark:text-green-400">{offering.availableQuantity}</span>
              </span>
            )}
          </p>

          {!isAvailable && (
            <div className="flex items-center gap-1 text-xs text-red-600 dark:text-red-400">
              <AlertTriangle className="w-3 h-3" />
              <span>
                {(offering.availableQuantity || 0) === 0 
                  ? "Non disponible dans votre wallet"
                  : `Quantité insuffisante (besoin de ${offering.requiredQuantity})`
                }
              </span>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

const WalletSummary = ({ 
  totalSelected, 
  totalValue 
}: { 
  totalSelected: number; 
  totalValue: number;
}) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.95 }}
    animate={{ opacity: 1, scale: 1 }}
    className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20
               rounded-xl p-4 border border-purple-200 dark:border-purple-800"
  >
    <div className="flex items-center justify-between mb-3">
      <div className="flex items-center gap-2">
        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500
                       flex items-center justify-center">
          <Wallet className="w-5 h-5 text-white" />
        </div>
        <div>
          <p className="text-xs text-gray-600 dark:text-gray-400">Offrandes sélectionnées</p>
          <p className="text-lg font-bold text-gray-900 dark:text-gray-100">
            {totalSelected} article{totalSelected > 1 ? "s" : ""}
          </p>
        </div>
      </div>
      
      <div className="text-right">
        <p className="text-xs text-gray-600 dark:text-gray-400">Sélectionnées</p>
        <p className="text-lg font-bold text-purple-600 dark:text-purple-400">
          ✓
        </p>
      </div>
    </div>

    <div className="flex items-start gap-2 p-3 rounded-lg bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800">
      <Info className="w-4 h-4 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
      <p className="text-xs text-blue-700 dark:text-blue-300">
        Les offrandes sélectionnées seront consommées depuis votre wallet pour cette consultation
      </p>
    </div>
  </motion.div>
);

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

  // Normaliser les offrandes au chargement
  const normalizedOfferings = useMemo(
    () => normalizeOfferings(requiredOfferings, walletOfferings),
    [requiredOfferings, walletOfferings]
  );

  // État de sélection (stocke les IDs normalisés)
  const [selected, setSelected] = useState<Set<string>>(new Set());

  // Navigation vers le marché des offrandes
  const handleGoToMarket = useCallback(() => {
    console.log('🛒 [Navigation] Redirection vers le marché des offrandes');
    router.push('/secured/marcheoffrandes');
  }, [router]);

  // Handler de toggle avec logs détaillés
  const handleToggleSelection = useCallback((offeringId: string) => {
    console.log(`🔄 [Toggle] ID: ${offeringId}`);
    console.log(`   → État actuel de selected:`, Array.from(selected));

    setSelected(prev => {
      const newSet = new Set(prev);
      if (newSet.has(offeringId)) {
        console.log(`   ❌ Désélection de ${offeringId}`);
        newSet.delete(offeringId);
      } else {
        console.log(`   ✅ Sélection de ${offeringId}`);
        newSet.add(offeringId);
      }
      console.log(`   → Nouvel état de selected:`, Array.from(newSet));
      return newSet;
    });
  }, [selected]);

  // Calculs de résumé
  const summary = useMemo(() => {
    const selectedOfferings = normalizedOfferings.filter(o => selected.has(o.id));
    const totalValue = selectedOfferings.reduce((sum, o) => sum + o.price, 0);
    
    console.log("📊 [Summary] Recalculé:", {
      total: selected.size,
      value: totalValue,
      items: selectedOfferings.map(o => o.name)
    });

    return {
      totalSelected: selected.size,
      totalValue,
    };
  }, [selected, normalizedOfferings]);

  // ✅ Validation : toutes les offrandes disponibles doivent être sélectionnées
  const availableOfferings = normalizedOfferings.filter(o => (o.availableQuantity || 0) >= o.requiredQuantity);
  const canProceed = availableOfferings.length > 0 && availableOfferings.every(o => selected.has(o.id));

  const handleNext = () => {
    const selectedIds = Array.from(selected);
    console.log("➡️ [Validation] IDs sélectionnés envoyés:", selectedIds);
    onNext(selectedIds);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      {/* En-tête */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2 flex items-center gap-2">
          <Sparkles className="w-6 h-6 text-purple-500" />
          Sélectionnez vos offrandes
        </h2>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Choisissez les offrandes disponibles dans votre wallet pour cette consultation
        </p>
      </div>

      {/* Résumé wallet */}
      <AnimatePresence>
        {summary.totalSelected > 0 && (
          <WalletSummary 
            totalSelected={summary.totalSelected} 
            totalValue={summary.totalValue} 
          />
        )}
      </AnimatePresence>

      {/* Liste des offrandes */}
      <div className="space-y-3 max-h-[450px] overflow-y-auto pr-2 
                    scrollbar-thin scrollbar-thumb-purple-300 dark:scrollbar-thumb-purple-700 
                    scrollbar-track-gray-100 dark:scrollbar-track-gray-800">
        {normalizedOfferings.length === 0 ? (
          <div className="text-center py-12 px-4">
            <div className="w-16 h-16 rounded-full bg-gray-100 dark:bg-gray-800 
                          flex items-center justify-center mx-auto mb-4">
              <Wallet className="w-8 h-8 text-gray-400" />
            </div>
            <p className="text-gray-500 dark:text-gray-400 font-medium mb-2">
              Aucune offrande requise
            </p>
            <p className="text-xs text-gray-400 dark:text-gray-500">
              Vous pouvez continuer sans sélectionner d'offrandes
            </p>
          </div>
        ) : (
          normalizedOfferings.map((offering, index) => (
            <OfferingCard
              key={offering.id}
              offering={offering}
              isSelected={selected.has(offering.id)}
              onToggle={() => handleToggleSelection(offering.id)}
              index={index}
            />
          ))
        )}
      </div>

      {/* Actions */}
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
          <span>Valider la sélection</span>
          <ChevronRight className="w-5 h-5" />
        </motion.button>
      </div>

      {/* Message d'avertissement si rien n'est sélectionné */}
      {!canProceed && normalizedOfferings.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-start gap-2 p-3 rounded-lg bg-yellow-50 dark:bg-yellow-900/20 
                   border border-yellow-200 dark:border-yellow-800"
        >
          <AlertTriangle className="w-4 h-4 text-yellow-600 dark:text-yellow-400 mt-0.5 flex-shrink-0" />
          <p className="text-xs text-yellow-700 dark:text-yellow-300">
            Veuillez sélectionner au moins une offrande disponible pour continuer
          </p>
        </motion.div>
      )}

       {/* Bouton marché (toujours visible) */}
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
