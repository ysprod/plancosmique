import React from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

export const Hero: React.FC = () => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-6 sm:mb-10"
        >
            <div className="inline-block mb-4">
                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-amber-500 to-orange-600 rounded-2xl sm:rounded-3xl flex items-center justify-center shadow-xl">
                    <Star className="w-8 h-8 sm:w-10 sm:h-10 text-white fill-white" />
                </div>
            </div>

            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-black mb-3 sm:mb-4 leading-tight">
                Bienvenue au marché des offrandes.
            </h2>

            <p className="text-sm sm:text-base md:text-lg text-gray-700 max-w-2xl mx-auto leading-relaxed px-2">
                Ici vous trouverez tout ce dont vous aurez besoin pour votre quête de connaissance et de compréhension des mystères de votre vie.
                Sachez que ces offrandes sont symboliques et représentent les vibrations énergétiques compensatoires, qui correspondent aux demandes que vous allez faire en parcourant notre temple virtuel.
            </p>
        </motion.div>
    );
};
