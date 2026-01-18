'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { Info } from 'lucide-react';

export const InfoBox: React.FC = () => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-10 border-2 border-amber-200"
        >
            <div className="flex items-start gap-3 sm:gap-4 mb-4">
                <Info className="w-6 h-6 sm:w-7 sm:h-7 text-amber-600 flex-shrink-0 mt-0.5" />
                <div>
                    <h3 className="text-lg sm:text-xl md:text-2xl font-black text-black mb-2">
                        Pourquoi des offrandes ?
                    </h3>
                    <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                        Dans la tradition africaine, les offrandes établissent une connexion sacrée avec les ancêtres et les forces spirituelles.
                        Vous pouvez choisir des <strong>offrandes animales</strong> ou leurs <strong>équivalents végétaux et boissons</strong>.
                    </p>
                </div>
            </div>
        </motion.div>
    );
};