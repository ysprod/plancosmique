/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { memo, useMemo, useState, useCallback } from 'react';
import {
    Calendar, Star, MessageSquare, MapPin, Phone, Mail, User, Edit, Download, Eye, Sparkles,
    ChevronDown, BookOpen, Sparkle, TrendingUp, Clock
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { AnalyseAstrologique } from '@/lib/interfaces';

// =====================================================
// UTILITIES
// =====================================================
const formatDate = (dateString: string) => {
    try {
        return new Date(dateString).toLocaleDateString('fr-FR', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        });
    } catch {
        return dateString;
    }
};

// =====================================================
// TYPES
// =====================================================
interface ConsultationCardProps {
    consultation: AnalyseAstrologique;
    onModifyAnalysis: (id: string) => void;
    onNotifyUser: (id: string) => void;
}

// =====================================================
// EXPANDABLE ANALYSIS SECTION (Ultra-optimisé)
// =====================================================
const AnalysisSection = memo(({
    title,
    content,
    icon: Icon,
    iconColor = "text-purple-600",
    index = 0
}: {
    title: string;
    content: string | any;
    icon: any;
    iconColor?: string;
    index?: number;
}) => {
    const [isExpanded, setIsExpanded] = useState(false);

    // Mémoisation du contenu formaté
    const displayContent = useMemo(() => {
        if (typeof content === 'string') return content;
        if (Array.isArray(content)) return content.join('\n');
        if (typeof content === 'object' && content !== null) {
            return JSON.stringify(content, null, 2);
        }
        return String(content);
    }, [content]);

    // Toggle handler mémorisé
    const handleToggle = useCallback(() => {
        setIsExpanded(prev => !prev);
    }, []);

    // Ne rien afficher si vide
    if (!content || displayContent.length === 0) return null;

    return (
        <motion.div
            layout
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05 }}
            className="mb-1.5"
        >
            <motion.button
                whileHover={{ scale: 1.005, x: 2 }}
                whileTap={{ scale: 0.995 }}
                onClick={handleToggle}
                className="w-full flex items-center justify-between gap-2 p-2 rounded-lg
                 bg-gradient-to-r from-purple-50/50 to-pink-50/50 
                 dark:from-purple-900/10 dark:to-pink-900/10
                 border border-purple-200/50 dark:border-purple-800/50
                 hover:from-purple-50 hover:to-pink-50
                 dark:hover:from-purple-900/20 dark:hover:to-pink-900/20
                 transition-all shadow-sm hover:shadow-md"
            >
                <div className="flex items-center gap-1.5 flex-1 min-w-0">
                    <motion.div
                        animate={{ rotate: isExpanded ? 360 : 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        <Icon className={`w-3 h-3 flex-shrink-0 ${iconColor}`} />
                    </motion.div>
                    <span className="text-[10px] font-bold text-gray-900 dark:text-gray-100 truncate">
                        {title}
                    </span>
                </div>
                <div className="flex items-center gap-1">
                    <motion.span
                        animate={{ scale: isExpanded ? 1.05 : 1 }}
                        className="text-[8px] font-semibold text-purple-600 dark:text-purple-400 
                         px-1.5 py-0.5 rounded-md bg-purple-100 dark:bg-purple-900/30"
                    >
                        {isExpanded ? 'Réduire' : 'Voir'}
                    </motion.span>
                    <motion.div
                        animate={{ rotate: isExpanded ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        <ChevronDown className="w-3 h-3 text-purple-600 dark:text-purple-400" />
                    </motion.div>
                </div>
            </motion.button>

            <AnimatePresence mode="wait">
                {isExpanded && (
                    <motion.div
                        initial={{ height: 0, opacity: 0, y: -10 }}
                        animate={{ height: 'auto', opacity: 1, y: 0 }}
                        exit={{ height: 0, opacity: 0, y: -10 }}
                        transition={{ duration: 0.25, ease: 'easeInOut' }}
                        className="overflow-hidden"
                    >
                        <div className="mt-1 p-2 rounded-lg bg-white dark:bg-gray-800 
                          border border-gray-200 dark:border-gray-700 shadow-sm">
                            <pre className="text-[9px] leading-relaxed text-gray-700 dark:text-gray-300 
                            whitespace-pre-wrap font-sans max-h-48 overflow-y-auto
                            scrollbar-thin scrollbar-thumb-purple-300 dark:scrollbar-thumb-purple-700
                            scrollbar-track-transparent">
                                {displayContent}
                            </pre>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}, (prevProps, nextProps) => {
    // Custom comparison pour éviter re-renders
    return (
        prevProps.title === nextProps.title &&
        prevProps.content === nextProps.content &&
        prevProps.iconColor === nextProps.iconColor
    );
});
AnalysisSection.displayName = 'AnalysisSection';

// =====================================================
// ANALYSIS PREVIEW CONTAINER (Ultra-optimisé)
// =====================================================
const AnalysisPreview = memo(({ analysis }: { analysis: any }) => {
    const [isMainExpanded, setIsMainExpanded] = useState(false);

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

                        {/* Sujet info */}
                        {analysisData.sujet && (
                            <AnalysisSection
                                title="👤 Informations du Sujet"
                                content={`${analysisData.sujet.prenoms || ''} ${analysisData.sujet.nom || ''}
Né(e) le: ${analysisData.sujet.dateNaissance || 'N/A'}
Lieu: ${analysisData.sujet.lieuNaissance || 'N/A'}
Heure: ${analysisData.sujet.heureNaissance || 'N/A'}`}
                                icon={User}
                                iconColor="text-indigo-600"
                                index={3}
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

// =====================================================
// INFO CARD (Nouveau composant pour infos du sujet)
// =====================================================
const InfoCard = memo(({ 
    icon: Icon, 
    label, 
    value, 
    iconColor,
    index = 0
}: { 
    icon: any; 
    label: string; 
    value: string; 
    iconColor: string;
    index?: number;
}) => (
    <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: index * 0.05 }}
        whileHover={{ scale: 1.02, y: -2 }}
        className="flex items-center gap-2.5 bg-white/5 backdrop-blur-sm rounded-xl p-3
                 border border-white/10 hover:border-white/20 transition-all shadow-lg"
    >
        <motion.div
            whileHover={{ rotate: 360 }}
            transition={{ duration: 0.5 }}
            className={`p-1.5 rounded-lg bg-white/10 ${iconColor}`}
        >
            <Icon className="w-4 h-4" />
        </motion.div>
        <div className="flex-1 min-w-0">
            <p className="text-[10px] text-purple-300 font-medium">{label}</p>
            <p className="text-sm text-white font-bold truncate">{value}</p>
        </div>
    </motion.div>
));
InfoCard.displayName = 'InfoCard';

// =====================================================
// ACTION BUTTON (Composant réutilisable)
// =====================================================
const ActionButton = memo(({
    onClick,
    icon: Icon,
    label,
    gradient,
    disabled = false
}: {
    onClick: () => void;
    icon: any;
    label: string;
    gradient: string;
    disabled?: boolean;
}) => (
    <motion.button
        whileHover={!disabled ? { scale: 1.02, y: -2 } : {}}
        whileTap={!disabled ? { scale: 0.98 } : {}}
        onClick={onClick}
        disabled={disabled}
        className={`flex items-center justify-center gap-1.5 px-3 py-2 
                 bg-gradient-to-r ${gradient} text-white 
                 text-[11px] rounded-xl font-bold
                 transition-all shadow-md hover:shadow-lg
                 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-md
                 border border-white/20`}
    >
        <Icon className="w-3.5 h-3.5" />
        <span>{label}</span>
    </motion.button>
));
ActionButton.displayName = 'ActionButton';

// =====================================================
// MAIN CONSULTATION CARD (Ultra-optimisé)
// =====================================================
const DisplayConsultationCard = memo(({
    consultation,
    onModifyAnalysis,
    onNotifyUser,
}: ConsultationCardProps) => {
    const consultationId = useMemo(() => consultation?.consultationId, [consultation]);
    const sujet = useMemo(() => consultation?.carteDuCiel?.sujet, [consultation]);

    // Handlers mémorisés
    const handleModify = useCallback(() => {
        if (consultationId) onModifyAnalysis(consultationId);
    }, [consultationId, onModifyAnalysis]);

    const handleNotify = useCallback(() => {
        if (consultationId) onNotifyUser(consultationId);
    }, [consultationId, onNotifyUser]);

    if (!consultation || !sujet) return null;

    return (
        <motion.div
            layout
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: 'spring', stiffness: 220, damping: 22 }}
            className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-xl border border-white/15 p-3 sm:p-4 shadow-lg overflow-hidden relative max-w-full"
        >
            {/* Gradient animé en arrière-plan */}
            <motion.div
                className="absolute inset-0 bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-blue-500/10 pointer-events-none"
                animate={{ backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }}
                transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
                style={{ backgroundSize: '200% 200%' }}
            />

            {/* Header ultra-compact */}
            <div className="relative z-10 flex items-center gap-2 mb-2">
                <motion.div
                    whileHover={{ scale: 1.08, rotate: 3 }}
                    className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center shadow border border-white/20"
                >
                    <User className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </motion.div>
                <div className="flex-1 min-w-0">
                    <h2 className="text-base sm:text-lg font-black text-white truncate leading-tight">
                        {sujet.prenoms} {sujet.nom}
                    </h2>
                    <p className="text-xs text-purple-200 flex items-center gap-1">
                        <Sparkles className="w-3 h-3" /> Thème Natal
                    </p>
                </div>
            </div>

            {/* Infos sujet ultra-compact grid */}
            <div className="grid grid-cols-3 gap-1 mb-2">
                <InfoCard icon={Calendar} label="Naissance" value={formatDate(sujet.dateNaissance)} iconColor="text-amber-400" index={0} />
                <InfoCard icon={Clock} label="Heure" value={sujet.heureNaissance} iconColor="text-blue-400" index={1} />
                <InfoCard icon={MapPin} label="Lieu" value={sujet.lieuNaissance} iconColor="text-green-400" index={2} />
            </div>

            {/* Actions principales compactes */}
            <div className="flex gap-1 mb-2">
                <ActionButton
                    onClick={handleNotify}
                    icon={Mail}
                    label="Notifier"
                    gradient="from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800"
                />
                <ActionButton
                    onClick={handleModify}
                    icon={Edit}
                    label="Modifier"
                    gradient="from-orange-600 to-orange-700 hover:from-orange-700 hover:to-orange-800"
                />
            </div>

            {/* Analyse Preview animée */}
            <AnalysisPreview analysis={consultation} />
        </motion.div>
    );
}, (prevProps, nextProps) => {
    // Custom comparison ultra-stricte
    return (
        prevProps.consultation?.consultationId === nextProps.consultation?.consultationId &&
        prevProps.consultation?.carteDuCiel === nextProps.consultation?.carteDuCiel &&
        prevProps.consultation?.missionDeVie === nextProps.consultation?.missionDeVie
    );
});
DisplayConsultationCard.displayName = 'DisplayConsultationCard';

export default DisplayConsultationCard;
