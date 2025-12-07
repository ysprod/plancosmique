import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Leaf, X, Info, Plus } from 'lucide-react';
import { Offering } from './types';
import { alternatives, offerings } from './data';
import { slideFromBottom } from './animations';

interface AlternativesModalProps {
    showAlternatives: boolean;
    selectedOffering: Offering | null;
    onClose: () => void;
    onAddToCart: (offering: Offering) => void;
    onShowCart: () => void;
}

export const AlternativesModal: React.FC<AlternativesModalProps> = ({
    showAlternatives,
    selectedOffering,
    onClose,
    onAddToCart,
    onShowCart
}) => {
    const handleAddAlternative = (altItems: { name: string; quantity: number }[]) => {
        altItems.forEach(altItem => {
            const offering = offerings.find(o => o.name === altItem.name);
            if (offering) {
                for (let i = 0; i < altItem.quantity; i++) {
                    onAddToCart(offering);
                }
            }
        });
        onClose();
        onShowCart();
    };

    return (
        <AnimatePresence>
            {showAlternatives && selectedOffering && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/50 z-50"
                        onClick={onClose}
                    />
                    <motion.div
                        variants={slideFromBottom}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        onClick={(e) => e.stopPropagation()}
                        className="fixed bottom-0 left-0 right-0 bg-white rounded-t-3xl z-50 max-h-[90vh] overflow-y-auto shadow-2xl"
                    >
                        {/* Header */}
                        <div className="sticky top-0 bg-white z-10 p-4 sm:p-6 border-b border-gray-200 rounded-t-3xl">
                            <div className="flex items-center justify-between">
                                <h2 className="text-xl sm:text-2xl font-black text-black flex items-center gap-2">
                                    <Leaf className="w-6 h-6 sm:w-7 sm:h-7 text-green-600" />
                                    <span className="hidden sm:inline">Alternatives Non-Animales</span>
                                    <span className="sm:hidden">Alternatives</span>
                                </h2>
                                <button
                                    onClick={onClose}
                                    className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 active:scale-90 flex items-center justify-center transition-all"
                                >
                                    <X className="w-6 h-6" />
                                </button>
                            </div>
                        </div>

                        {/* Contenu */}
                        <div className="p-4 sm:p-6">
                            {/* Info offrande */}
                            <div className="mb-6 p-4 bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl border-2 border-amber-200">
                                <div className="flex items-center gap-3 mb-2">
                                    <span className="text-4xl">{selectedOffering.icon}</span>
                                    <div className="flex-1">
                                        <p className="text-sm sm:text-base text-gray-700">
                                            Équivalences pour
                                        </p>
                                        <h3 className="text-lg sm:text-xl font-black text-black">
                                            {selectedOffering.name}
                                        </h3>
                                    </div>
                                </div>
                                <div className="flex items-center justify-between pt-3 border-t border-amber-300">
                                    <span className="text-sm text-gray-700">Prix de référence</span>
                                    <span className="text-xl sm:text-2xl font-black text-amber-600">
                                        {selectedOffering.price.toLocaleString()} F
                                    </span>
                                </div>
                            </div>

                            {/* Message explicatif */}
                            <div className="mb-6 p-4 bg-green-50 rounded-xl border border-green-200 flex items-start gap-3">
                                <Info className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                                <p className="text-sm text-green-800 leading-relaxed">
                                    Ces alternatives végétales et boissons ont la <strong>même valeur spirituelle</strong> que l'offrande animale selon la tradition.
                                </p>
                            </div>

                            {/* Liste des alternatives */}
                            <div className="space-y-4">
                                {alternatives[selectedOffering.id]?.map((alt, index) => (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: index * 0.1 }}
                                        className="p-4 sm:p-5 bg-white rounded-2xl border-2 border-gray-200 hover:border-green-400 transition-colors shadow-sm"
                                    >
                                        {/* En-tête option */}
                                        <div className="flex items-center justify-between mb-4">
                                            <h3 className="font-black text-black flex items-center gap-2 text-base sm:text-lg">
                                                <span className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center text-green-600 font-black text-sm">
                                                    {index + 1}
                                                </span>
                                                Option {index + 1}
                                            </h3>
                                            <span className="text-xs sm:text-sm px-3 py-1 bg-green-100 text-green-700 rounded-full font-bold">
                                                = {alt.total.toLocaleString()} F
                                            </span>
                                        </div>

                                        {/* Items */}
                                        <div className="space-y-2 mb-4">
                                            {alt.items.map((item, i) => (
                                                <div
                                                    key={i}
                                                    className="flex items-center justify-between py-2 px-3 bg-gray-50 rounded-lg"
                                                >
                                                    <span className="text-sm sm:text-base text-gray-700 flex items-center gap-2">
                                                        <span className="text-xs text-gray-500">•</span>
                                                        {item.name}
                                                    </span>
                                                    <span className="font-bold text-black text-sm sm:text-base">
                                                        × {item.quantity}
                                                    </span>
                                                </div>
                                            ))}
                                        </div>

                                        {/* Total option */}
                                        <div className="flex items-center justify-between pt-3 border-t-2 border-gray-200">
                                            <span className="font-bold text-gray-700 text-sm sm:text-base">Total équivalent</span>
                                            <span className="text-lg sm:text-xl font-black text-green-600">
                                                {alt.total.toLocaleString()} F
                                            </span>
                                        </div>

                                        {/* Bouton ajouter cette option */}
                                        <button
                                            onClick={() => handleAddAlternative(alt.items)}
                                            className="w-full mt-4 bg-green-600 text-white py-3 rounded-xl font-bold hover:bg-green-700 active:scale-95 transition-all flex items-center justify-center gap-2"
                                        >
                                            <Plus className="w-5 h-5" />
                                            Ajouter cette option au panier
                                        </button>
                                    </motion.div>
                                ))}
                            </div>

                            {/* Note de bas */}
                            <div className="mt-6 p-4 bg-blue-50 rounded-xl border border-blue-200">
                                <p className="text-xs sm:text-sm text-blue-800 text-center leading-relaxed">
                                    💡 <strong>Conseil :</strong> Vous pouvez aussi composer votre propre combinaison en ajoutant les articles individuellement depuis le catalogue.
                                </p>
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};
