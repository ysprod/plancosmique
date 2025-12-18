import React from 'react';
import { motion } from 'framer-motion';
import { Plus } from 'lucide-react';
import { Offering } from './types';
import { fadeInUp } from './animations';

interface OfferingCardProps {
    offering: Offering;
    onAddToCart: (offering: Offering) => void;
}


export const OfferingCard: React.FC<OfferingCardProps> = ({ offering, onAddToCart }) => {
    return (
        <motion.div
            variants={fadeInUp}
            whileHover={{ y: -4 }}
            whileTap={{ scale: 0.98 }}
            className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 border-2 border-gray-200 shadow-md hover:shadow-xl transition-all group"
        >
            {/* Icône */}
            <div className="text-5xl sm:text-6xl mb-3 sm:mb-4 text-center group-hover:scale-110 transition-transform">
                {offering.icon}
            </div>

            {/* Nom */}
            <h3 className="text-lg sm:text-xl font-black text-black mb-1 text-center group-hover:text-amber-600 transition-colors">
                {offering.name}
            </h3>

            {/* Description */}
            <p className="text-xs sm:text-sm text-gray-600 text-center mb-3 sm:mb-4 min-h-[32px] sm:min-h-[40px] px-1">
                {offering.description}
            </p>

            {/* Prix */}
            <div className="text-center mb-3 sm:mb-4 py-2 bg-gray-50 rounded-xl">
                <p className="text-xl sm:text-2xl font-black text-gray-900">
                    {offering.price.toLocaleString()} F
                </p>
                <p className="text-xs text-gray-500">
                    ≈ ${offering.priceUSD.toFixed(1)} USD
                </p>
            </div>

            {/* Actions */}
            <div className="space-y-2">
                <button
                    onClick={() => onAddToCart(offering)}
                    className="w-full bg-gradient-to-r from-amber-500 to-orange-600 text-white py-3 sm:py-3.5 rounded-xl font-bold shadow-md hover:shadow-lg active:scale-95 transition-all flex items-center justify-center gap-2 text-sm sm:text-base"
                >
                    <Plus className="w-4 h-4 sm:w-5 sm:h-5" />
                    Ajouter
                </button>

                
            </div>
        </motion.div>
    );
};
