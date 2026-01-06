import { motion, AnimatePresence } from "framer-motion";
import { BookOpen, Clock, ChevronDown, Sparkle, TrendingUp, Sparkles, User } from "lucide-react";
import { memo, useState, useMemo, useCallback } from "react";
import AnalysisSection from "./AnalysisSection";

const AnalysisPreview = memo(({ analysis }: { analysis: any }) => {
    const [isMainExpanded, setIsMainExpanded] = useState(true);

    // Mémoisation des données d'analyse
    const analysisData = useMemo(() => {
        if (!analysis) return null;

        return {
            carteDuCiel: analysis.carteDuCiel || null,
            missionDeVie: analysis.missionDeVie || null,
            positions: analysis.carteDuCiel?.positions || [],
            aspects: analysis.carteDuCiel?.aspectsTexte || '',
            metadata: analysis.metadata || null,
            sujet: analysis.carteDuCiel?.sujet || null
        };
    }, [analysis]);

    // Toggle handler mémorisé
    const handleMainToggle = useCallback(() => {
        setIsMainExpanded(prev => !prev);
    }, []);

    if (!analysis || !analysisData) return null;

    return (
        <motion.div
            layout
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-2"
        >
            {/* Main expandable header */}
            <motion.button
                whileHover={{ scale: 1.005 }}
                whileTap={{ scale: 0.995 }}
                onClick={handleMainToggle}
                className="w-full flex items-center justify-between gap-2 p-2 rounded-lg mb-1.5
                 bg-gradient-to-r from-purple-100 to-pink-100 
                 dark:from-purple-900/30 dark:to-pink-900/30
                 border-2 border-purple-300 dark:border-purple-700
                 hover:from-purple-200 hover:to-pink-200
                 dark:hover:from-purple-900/40 dark:hover:to-pink-900/40
                 transition-all shadow-md hover:shadow-lg"
            >
                <div className="flex items-center gap-1.5">
                    <motion.div
                        animate={{
                            rotate: isMainExpanded ? [0, 10, -10, 0] : 0,
                            scale: isMainExpanded ? [1, 1.1, 1] : 1
                        }}
                        transition={{ duration: 0.5 }}
                    >
                        <BookOpen className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" />
                    </motion.div>
                    <span className="text-[11px] font-bold text-purple-900 dark:text-purple-200">
                        📊 Analyse Complète
                    </span>
                </div>
                <div className="flex items-center gap-2">
                    {analysisData.metadata?.processingTime && (
                        <motion.span
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="text-[8px] font-semibold text-emerald-600 dark:text-emerald-400 
                           px-1.5 py-0.5 rounded-md bg-emerald-100 dark:bg-emerald-900/30
                           flex items-center gap-0.5"
                        >
                            <Clock className="w-2 h-2" />
                            {(analysisData.metadata.processingTime / 1000).toFixed(1)}s
                        </motion.span>
                    )}
                    <motion.div
                        animate={{ rotate: isMainExpanded ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        <ChevronDown className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" />
                    </motion.div>
                </div>
            </motion.button>

            {/* Expandable sections */}
            <AnimatePresence mode="wait">
                {isMainExpanded && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                        className="space-y-1 overflow-hidden"
                    >
                        {/* Mission de Vie */}
                        {analysisData.missionDeVie?.contenu && (
                            <AnalysisSection
                                title="🎯 Mission de Vie"
                                content={analysisData.missionDeVie.contenu}
                                icon={Sparkle}
                                iconColor="text-amber-600"
                                index={0}
                            />
                        )}

                        {/* Positions Planétaires */}
                        {analysisData.positions.length > 0 && (
                            <AnalysisSection
                                title={`⭐ Positions Planétaires (${analysisData.positions.length})`}
                                content={analysisData.positions.map((p: any) =>
                                    `${p.planete || p.astre || 'N/A'} en ${p.signe || 'N/A'} ${p.maison ? `(Maison ${p.maison})` : ''}${p.retrograde ? ' ℞' : ''}`
                                ).join('\n')}
                                icon={TrendingUp}
                                iconColor="text-blue-600"
                                index={1}
                            />
                        )}

                        {/* Aspects */}
                        {analysisData.aspects && (
                            <AnalysisSection
                                title="🔗 Aspects Astrologiques"
                                content={analysisData.aspects}
                                icon={Sparkles}
                                iconColor="text-purple-600"
                                index={2}
                            />
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}, (prevProps, nextProps) => {
    // Custom comparison
    return prevProps.analysis === nextProps.analysis;
});

AnalysisPreview.displayName = 'AnalysisPreview';

export default AnalysisPreview;