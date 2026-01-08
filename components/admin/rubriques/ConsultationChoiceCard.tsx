import { ConsultationChoice } from "@/lib/interfaces";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, ChevronUp, DollarSign, Package, Search, Trash2 } from "lucide-react";
import { memo, useCallback, useMemo, useState } from "react";

type OfferingCategory = "animal" | "vegetal" | "beverage";

const CATEGORY_CONFIG: Record<OfferingCategory, { icon: string; label: string; color: string; bgColor: string }> = {
    animal: {
        icon: "🐾",
        label: "Animal",
        color: "text-amber-700 border-amber-300",
        bgColor: "bg-amber-50"
    },
    vegetal: {
        icon: "🌿",
        label: "Végétal",
        color: "text-green-700 border-green-300",
        bgColor: "bg-green-50"
    },
    beverage: {
        icon: "🥤",
        label: "Boisson",
        color: "text-blue-700 border-blue-300",
        bgColor: "bg-blue-50"
    }
};


import type { Offering, OfferingAlternative } from "@/lib/interfaces";

export const OfferingSelector = memo(({
    alternative,
    offerings,
    onChange
}: {
    alternative: OfferingAlternative;
    offerings: Offering[];
    onChange: (updated: OfferingAlternative) => void;
}) => {
    const [search, setSearch] = useState("");

    const config = CATEGORY_CONFIG[alternative.category as OfferingCategory];

    // Filtrer par catégorie et recherche
    const filteredOfferings = useMemo(() =>
        offerings
            .filter(o => o.category === alternative.category)
            .filter(o =>
                search === "" ||
                o.name.toLowerCase().includes(search.toLowerCase())
            ),
        [offerings, alternative.category, search]
    );

    // Offrande sélectionnée
    const selectedOffering = useMemo(() =>
        offerings.find(o => o._id === alternative.offeringId),
        [offerings, alternative.offeringId]
    );

    return (
        <motion.div
            layout
            className={`p-3 rounded-xl border-2 ${config.color} ${config.bgColor} space-y-2`}
        >
            {/* Header avec catégorie */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <span className="text-xl">{config.icon}</span>
                    <span className="text-xs font-bold">{config.label}</span>
                </div>
                {selectedOffering && (
                    <div className="flex items-center gap-1 text-xs font-semibold">
                        <DollarSign className="w-3 h-3" />
                        {selectedOffering.price} FCFA
                    </div>
                )}
            </div>


            <div className="relative">
                <Search className="absolute left-2 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Rechercher..."
                    className="w-full pl-8 pr-3 py-2 text-sm rounded-lg border border-slate-300 
                   focus:ring-2 focus:ring-violet-500 focus:border-transparent
                   bg-white"
                />
            </div>

            {/* Select dropdown */}
            <select
                value={alternative.offeringId}
                onChange={(e) => {
                    onChange({ ...alternative, offeringId: e.target.value });
                    setSearch("");
                }}
                className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 
                 focus:ring-2 focus:ring-violet-500 focus:border-transparent
                 bg-white font-medium"
            >
                <option value="">Sélectionner</option>
                {filteredOfferings.map((offering) => (
                    <option key={offering._id} value={offering._id}>
                        {offering.icon} {offering.name} - {offering.price} FCFA
                    </option>
                ))}
            </select>


            {/* Quantité */}
            <div className="flex items-center gap-2">
                <label className="text-xs font-semibold">Quantité:</label>
                <input
                    type="number"
                    min={1}
                    max={10}
                    value={alternative.quantity}
                    onChange={(e) => onChange({ ...alternative, quantity: Number(e.target.value) })}
                    className="w-20 px-3 py-2 text-sm rounded-lg border border-slate-300 
                   focus:ring-2 focus:ring-violet-500 focus:border-transparent
                   bg-white font-bold text-center"
                />
            </div>


            {/* Offrande sélectionnée (détails) */}
            {selectedOffering && (
                <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    className="pt-2 border-t border-slate-200"
                >
                    <p className="text-xs text-slate-600 line-clamp-2">
                        {selectedOffering.description}
                    </p>
                    <div className="flex items-center gap-3 mt-2 text-xs">
                        <span className="font-semibold">
                            Total: {selectedOffering.price * alternative.quantity} FCFA
                        </span>
                        <span className="text-slate-500">
                            (${(selectedOffering.priceUSD * alternative.quantity).toFixed(2)})
                        </span>
                    </div>
                </motion.div>
            )}
        </motion.div>
    );
});
OfferingSelector.displayName = "OfferingSelector";


const ConsultationChoiceCard = memo(({
    choice,
    onUpdate,
    onDelete,
    offerings,
    index
}: {
    choice: ConsultationChoice;
    onUpdate: (updated: ConsultationChoice) => void;
    onDelete: () => void;
    offerings: Offering[];
    index: number;
}) => {
    const [isExpanded, setIsExpanded] = useState(false);

    const handleAlternativeChange = useCallback((idx: number, updated: OfferingAlternative) => {
        const newAlternatives = [...choice.offering.alternatives];
        newAlternatives[idx] = updated;
        onUpdate({ ...choice, offering: { alternatives: newAlternatives } });
    }, [choice, onUpdate]);

    // Calculer le coût total
    const totalCost = useMemo(() => {
        return choice.offering.alternatives.reduce((sum, alt) => {
            const offering = offerings.find(o => o._id === alt.offeringId);
            return sum + (offering ? offering.price * alt.quantity : 0);
        }, 0);
    }, [choice.offering.alternatives, offerings]);

    return (
        <motion.div
            layout
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            exit={{ opacity: 0, y: -10 }}
            className="border-2 border-slate-200 rounded-xl p-4 bg-white shadow-md
               hover:shadow-lg transition-shadow"
        >
            {/* Header */}
            <div className="flex items-start gap-3 mb-3">
                <div className="flex-1 space-y-2">
                    <input
                        type="text"
                        value={choice.title}
                        onChange={(e) => onUpdate({ ...choice, title: e.target.value })}
                        placeholder="Titre du choix"
                        className="w-full px-3 py-2 text-sm font-bold rounded-lg border-2 border-violet-300 
                     focus:ring-2 focus:ring-violet-500 focus:border-violet-500"
                    />

                    {/* Fréquence */}
                    <div className="flex items-center gap-2 mt-1">
                        <label className="text-xs font-semibold">Fréquence:</label>
                        <select
                            value={choice.frequence || ''}
                            onChange={e => onUpdate({ ...choice, frequence: e.target.value as any })}
                            className="px-2 py-1 text-xs rounded border border-slate-300 bg-white"
                        >
                            <option value="">--</option>
                            <option value="UNE_FOIS_VIE">Une fois dans la vie</option>
                            <option value="ANNUELLE">Chaque année</option>
                            <option value="MENSUELLE">Chaque mois</option>
                            <option value="QUOTIDIENNE">Chaque jour</option>
                            <option value="LIBRE">À tout moment</option>
                        </select>
                    </div>

                    <div className="flex items-center gap-2 mt-1">
                        <label className="text-xs font-semibold">Participants:</label>
                        <select
                            value={choice.participants || ''}
                            onChange={e => onUpdate({ ...choice, participants: e.target.value as any })}
                            className="px-2 py-1 text-xs rounded border border-slate-300 bg-white"
                        >
                            <option value="">--</option>
                            <option value="SOLO">Solo (utilisateur seul)</option>
                            <option value="AVEC_TIERS">Avec une personne tierce</option>
                            <option value="GROUPE">En groupe (équipe)</option>
                        </select>
                    </div>

                    <textarea
                        value={choice.description}
                        onChange={(e) => onUpdate({ ...choice, description: e.target.value })}
                        placeholder="Description du choix"
                        rows={2}
                        className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 
                     focus:ring-2 focus:ring-violet-500 focus:border-transparent"
                    />
                </div>

                <div className="flex gap-1">
                    <button
                        onClick={() => setIsExpanded(!isExpanded)}
                        className="p-2 rounded-lg hover:bg-violet-100 transition-colors"
                    >
                        {isExpanded ? (
                            <ChevronUp className="w-5 h-5 text-violet-600" />
                        ) : (
                            <ChevronDown className="w-5 h-5 text-violet-600" />
                        )}
                    </button>
                    <button
                        onClick={onDelete}
                        className="p-2 rounded-lg hover:bg-red-100 text-red-600 transition-colors"
                    >
                        <Trash2 className="w-5 h-5" />
                    </button>
                </div>
            </div>

            {/* Coût total (toujours visible) */}
            {totalCost > 0 && (
                <div className="flex items-center gap-2 px-3 py-2 bg-gradient-to-r from-violet-50 to-purple-50 
                      rounded-lg border border-violet-200 mb-3">
                    <DollarSign className="w-4 h-4 text-violet-600" />
                    <span className="text-sm font-bold text-violet-900">
                        Coût total: {totalCost} FCFA
                    </span>
                </div>
            )}

            {/* Alternatives (expandable) */}
            <AnimatePresence>
                {isExpanded && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="space-y-3 overflow-hidden"
                    >
                        <p className="text-xs font-bold text-slate-700 mb-2 flex items-center gap-2">
                            <Package className="w-4 h-4" />
                            Alternatives d'offrandes (3 requises)
                        </p>
                        {choice.offering.alternatives.map((alt, idx) => (
                            <OfferingSelector
                                key={alt.category}
                                alternative={alt}
                                offerings={offerings}
                                onChange={(updated) => handleAlternativeChange(idx, updated)}
                            />
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
});

ConsultationChoiceCard.displayName = "ConsultationChoiceCard";

export default ConsultationChoiceCard;