"use client";
import { motion, useReducedMotion } from "framer-motion";
import { Info, X } from "lucide-react";
import { memo } from "react";
import { getAdvice, getPhaseConfig } from "./moonPhaseUtils";
import { modalVariants } from "./moonPhaseVariants";

interface MoonPhaseDay {
    day: number;
    phaseName: string;
    svg: string;
    illumination: number;
    isNew: boolean;
    isFull: boolean;
    isToday: boolean;
}

interface DetailModalProps {
    day: MoonPhaseDay | null;
    onClose: () => void;
}

const MoonPhaseDetailModal = memo<DetailModalProps>(({ day, onClose }) => {
    const prefersReducedMotion = useReducedMotion();
    if (!day) return null;
    const phaseConfig = getPhaseConfig(day.phaseName);
    const advice = getAdvice(day.illumination);
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/75 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        >
            <motion.div
                variants={modalVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                onClick={(e) => e.stopPropagation()}
                className="bg-white rounded-2xl p-4 sm:p-5 max-w-sm w-full shadow-2xl"
            >
                {/* Header compact */}
                <div className="flex items-center justify-between mb-5">
                    <div className="flex items-center gap-2.5">
                        <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${phaseConfig.badge} flex items-center justify-center shadow-lg`}>
                            <span className="text-xl">{phaseConfig.emoji}</span>
                        </div>
                        <div>
                            <h3 className="text-xl font-black text-gray-900">Jour {day.day}</h3>
                            <p className="text-xs text-gray-500">Phase Lunaire</p>
                        </div>
                    </div>
                    <motion.button
                        whileHover={{ scale: 1.08 }}
                        whileTap={{ scale: 0.92 }}
                        onClick={onClose}
                        className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors"
                        aria-label="Fermer"
                    >
                        <X className="w-4 h-4 text-gray-600" />
                    </motion.button>
                </div>
                {/* SVG */}
                <div className="flex justify-center mb-5">
                    <motion.span
                        initial={prefersReducedMotion ? {} : { scale: 0.7, rotate: -90 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ type: "spring", stiffness: 300, damping: 22 }}
                        dangerouslySetInnerHTML={{ __html: day.svg }}
                        className="w-28 h-28"
                    />
                </div>
                {/* Infos compactes */}
                <div className="space-y-3">
                    <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-3 border border-purple-100">
                        <div className="flex justify-between items-center mb-1.5">
                            <span className="text-xs font-semibold text-gray-700">Phase</span>
                            <span className="text-sm font-black text-gray-900">{day.phaseName}</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-xs font-semibold text-gray-700">Illumination</span>
                            <span className="text-sm font-black text-gray-900">{day.illumination}%</span>
                        </div>
                    </div>
                    {/* Barre de progression */}
                    <div>
                        <div className="flex justify-between text-[10px] text-gray-600 mb-1.5">
                            <span>🌑 Nouvelle</span>
                            <span>Pleine 🌕</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                            <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${day.illumination}%` }}
                                transition={{ duration: 0.8, ease: "easeOut" }}
                                className={`h-full bg-gradient-to-r ${phaseConfig.badge} rounded-full`}
                            />
                        </div>
                    </div>
                    {/* Conseil */}
                    <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-lg p-3 border border-indigo-200">
                        <div className="flex items-center gap-1.5 mb-1.5">
                            <Info className="w-3.5 h-3.5 text-indigo-600" />
                            <span className="font-bold text-gray-900 text-xs">Conseil énergétique</span>
                        </div>
                        <p className="text-xs text-gray-700 leading-relaxed">{advice}</p>
                    </div>
                </div>
                {/* CTA */}
                <motion.button
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    onClick={onClose}
                    className={`w-full mt-4 py-2.5 bg-gradient-to-r ${phaseConfig.badge} text-white rounded-lg font-bold text-sm shadow-lg hover:shadow-xl transition-all`}
                >
                    Compris
                </motion.button>
            </motion.div>
        </motion.div>
    );
});

MoonPhaseDetailModal.displayName = "MoonPhaseDetailModal";

export default MoonPhaseDetailModal;
