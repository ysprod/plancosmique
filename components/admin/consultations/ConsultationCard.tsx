import { memo, useMemo, useState } from 'react';
import {
    Calendar, Star, MessageSquare, MapPin, Phone, Mail, User, Edit, Download, Eye, Sparkles,
    ChevronDown, BookOpen, Sparkle, TrendingUp, Clock as ClockIcon
} from 'lucide-react';
import StatusBadge from './StatusBadge';
import { motion, AnimatePresence } from 'framer-motion';

interface ConsultationCardProps {
    consultation: any;
    onGenerateAnalysis: (id: string) => void;
    isGenerating: boolean;
    isNotifying: boolean;
}

// =====================================================
// EXPANDABLE ANALYSIS SECTION COMPONENT
// =====================================================
const AnalysisSection = memo(({
    title,
    content,
    icon: Icon,
    iconColor = "text-purple-600"
}: {
    title: string;
    content: string | any;
    icon: any;
    iconColor?: string;
}) => {
    const [isExpanded, setIsExpanded] = useState(false);

    const displayContent = useMemo(() => {
        if (typeof content === 'string') {
            return content;
        }
        if (Array.isArray(content)) {
            return content.join('\n');
        }
        if (typeof content === 'object' && content !== null) {
            return JSON.stringify(content, null, 2);
        }
        return String(content);
    }, [content]);


    if (!content || displayContent.length === 0) return null;

    return (
        <motion.div
            layout
            className="mb-1.5 overflow-hidden"
        >
            <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="w-full flex items-center justify-between gap-2 p-2 rounded-lg
                 bg-gradient-to-r from-purple-50/50 to-pink-50/50 
                 dark:from-purple-900/10 dark:to-pink-900/10
                 border border-purple-200/50 dark:border-purple-800/50
                 hover:from-purple-50 hover:to-pink-50
                 dark:hover:from-purple-900/20 dark:hover:to-pink-900/20
                 transition-all group"
            >
                <div className="flex items-center gap-1.5 flex-1 min-w-0">
                    <Icon className={`w-3 h-3 flex-shrink-0 ${iconColor}`} />
                    <span className="text-[10px] font-bold text-gray-900 dark:text-gray-100 truncate">
                        {title}
                    </span>
                </div>
                <div className="flex items-center gap-1">
                    <span className="text-[8px] font-semibold text-purple-600 dark:text-purple-400 
                         px-1.5 py-0.5 rounded-md bg-purple-100 dark:bg-purple-900/30">
                        {isExpanded ? 'Réduire' : 'Voir'}
                    </span>
                    <ChevronDown className={`w-3 h-3 text-purple-600 dark:text-purple-400 transition-transform ${isExpanded ? 'rotate-180' : ''
                        }`} />
                </div>
            </button>

            <AnimatePresence>
                {isExpanded && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                    >
                        <div className="mt-1 p-2 rounded-lg bg-white dark:bg-gray-800 
                          border border-gray-200 dark:border-gray-700">
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
});
AnalysisSection.displayName = 'AnalysisSection';

// =====================================================
// ANALYSIS PREVIEW CONTAINER
// =====================================================
const AnalysisPreview = memo(({ analysis }: { analysis: any }) => {
    console.log('Analysis data:', analysis);
    const [isMainExpanded, setIsMainExpanded] = useState(false);

    const analysisData = useMemo(() => {
        if (!analysis) return null;

        return {
            carteDuCiel: analysis.carteDuCiel || null,
            missionDeVie: analysis.missionDeVie || null,
            positions: analysis.carteDuCiel?.positions || [],
            aspects: analysis.carteDuCiel?.aspectsTexte || '',
            metadata: analysis.metadata || null
        };
    }, [analysis]);

    if (!analysis || !analysisData) return null;

    return (
        <motion.div
            layout
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-2 overflow-hidden"
        >
            {/* Main expandable header */}
            <button
                onClick={() => setIsMainExpanded(!isMainExpanded)}
                className="w-full flex items-center justify-between gap-2 p-2 rounded-lg mb-1.5
                 bg-gradient-to-r from-purple-100 to-pink-100 
                 dark:from-purple-900/30 dark:to-pink-900/30
                 border-2 border-purple-300 dark:border-purple-700
                 hover:from-purple-200 hover:to-pink-200
                 dark:hover:from-purple-900/40 dark:hover:to-pink-900/40
                 transition-all shadow-sm"
            >
                <div className="flex items-center gap-1.5">
                    <BookOpen className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" />
                    <span className="text-[11px] font-bold text-purple-900 dark:text-purple-200">
                        📊 Analyse Complète
                    </span>
                </div>
                <div className="flex items-center gap-2">
                    {analysisData.metadata?.processingTime && (
                        <span className="text-[8px] font-semibold text-emerald-600 dark:text-emerald-400 
                           px-1.5 py-0.5 rounded-md bg-emerald-100 dark:bg-emerald-900/30
                           flex items-center gap-0.5">
                            <ClockIcon className="w-2 h-2" />
                            {(analysisData.metadata.processingTime / 1000).toFixed(1)}s
                        </span>
                    )}
                    <ChevronDown className={`w-3.5 h-3.5 text-purple-600 dark:text-purple-400 transition-transform ${isMainExpanded ? 'rotate-180' : ''
                        }`} />
                </div>
            </button>

            {/* Expandable sections */}
            <AnimatePresence>
                {isMainExpanded && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                        className="space-y-1"
                    >
                        {/* Mission de Vie */}
                        {analysisData.missionDeVie?.contenu && (
                            <AnalysisSection
                                title="🎯 Mission de Vie"
                                content={analysisData.missionDeVie.contenu}
                                icon={Sparkle}
                                iconColor="text-amber-600"
                            />
                        )}

                        {/* Carte du Ciel - Positions */}
                        {analysisData.positions.length > 0 && (
                            <AnalysisSection
                                title={`⭐ Positions Planétaires (${analysisData.positions.length})`}
                                content={analysisData.positions.map((p: any) =>
                                    `${p.planete || p.astre || 'N/A'} en ${p.signe || 'N/A'} (Maison ${p.maison || 'N/A'})`
                                ).join('\n')}
                                icon={TrendingUp}
                                iconColor="text-blue-600"
                            />
                        )}

                        {/* Aspects */}
                        {analysisData.aspects && (
                            <AnalysisSection
                                title="🔗 Aspects Astrologiques"
                                content={analysisData.aspects}
                                icon={Sparkles}
                                iconColor="text-purple-600"
                            />
                        )}

                        {/* Sujet info (if available) */}
                        {analysisData.carteDuCiel?.sujet && (
                            <AnalysisSection
                                title="👤 Informations du Sujet"
                                content={`${analysisData.carteDuCiel.sujet.nom || ''}
Né(e) le: ${analysisData.carteDuCiel.sujet.dateNaissance || 'N/A'}
Lieu: ${analysisData.carteDuCiel.sujet.lieuNaissance || 'N/A'}
Heure: ${analysisData.carteDuCiel.sujet.heureNaissance || 'N/A'}`}
                                icon={User}
                                iconColor="text-indigo-600"
                            />
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
});
AnalysisPreview.displayName = 'AnalysisPreview';

// =====================================================
// MAIN CONSULTATION CARD COMPONENT
// =====================================================
const ConsultationCard = memo(({
    consultation,
    onGenerateAnalysis,
    isGenerating }: ConsultationCardProps) => {
    const typeConfig = useMemo(() => {
        const configs: Record<string, { icon: string; text: string; gradient: string }> = {
            'SPIRITUALITE': { icon: '🌟', text: 'Spiritualité', gradient: 'from-purple-500 to-pink-500' },
            'TAROT': { icon: '🃏', text: 'Tarot', gradient: 'from-indigo-500 to-purple-500' },
            'ASTROLOGIE': { icon: '⭐', text: 'Astrologie', gradient: 'from-blue-500 to-cyan-500' },
            'NUMEROLOGIE': { icon: '🔢', text: 'Numérologie', gradient: 'from-emerald-500 to-teal-500' }
        };
        return configs[consultation.type] || {
            icon: '📋',
            text: consultation.type,
            gradient: 'from-gray-500 to-gray-600'
        };
    }, [consultation.type]);

    const hasAnalysis = useMemo(() =>
        consultation.status === 'COMPLETED' && consultation.analysis,
        [consultation.status, consultation.analysis]
    );

    return (
        <motion.div
            layout
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 
               dark:border-gray-800 p-2.5 transition-shadow overflow-hidden relative"
        >
            <motion.div
                className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${typeConfig.gradient}`}
                animate={{
                    backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
                }}
                transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "linear"
                }}
                style={{ backgroundSize: '200% 200%' }}
            />
            <div className="flex items-start justify-between mb-1.5 mt-1">
                <div className="flex items-center gap-1.5 flex-1 min-w-0">
                    <span className="text-lg flex-shrink-0">{typeConfig.icon}</span>
                    <div className="flex-1 min-w-0">
                        <h3 className="text-xs font-bold text-gray-900 dark:text-gray-100 truncate">
                            {typeConfig.text}
                        </h3>
                        <p className="text-[10px] text-gray-500 dark:text-gray-400 truncate leading-tight">
                            {consultation.title}
                        </p>
                    </div>
                </div>
                <StatusBadge status={consultation.status} />
            </div>
            <div className="grid grid-cols-2 gap-1 mb-1.5 text-[10px]">
                <div className="flex items-center gap-1 text-gray-600 dark:text-gray-400 truncate">
                    <User className="w-2.5 h-2.5 flex-shrink-0" />
                    <span className="truncate font-medium">
                        {consultation.formData?.prenoms} {consultation.formData?.nom}
                    </span>
                </div>
                {consultation.clientId?.email && (
                    <div className="flex items-center gap-1 text-gray-600 dark:text-gray-400 truncate">
                        <Mail className="w-2.5 h-2.5 flex-shrink-0" />
                        <span className="truncate">{consultation.clientId.email}</span>
                    </div>
                )}
                {consultation.formData?.numeroSend && (
                    <div className="flex items-center gap-1 text-gray-600 dark:text-gray-400 truncate">
                        <Phone className="w-2.5 h-2.5 flex-shrink-0" />
                        <span className="truncate">{consultation.formData.numeroSend}</span>
                    </div>
                )}
                {consultation.formData?.paysNaissance && (
                    <div className="flex items-center gap-1 text-gray-600 dark:text-gray-400 truncate">
                        <MapPin className="w-2.5 h-2.5 flex-shrink-0" />
                        <span className="truncate">
                            {consultation.formData.villeNaissance}, {consultation.formData.paysNaissance}
                        </span>
                    </div>
                )}
            </div>
            <div className="flex gap-1 overflow-x-auto scrollbar-hide mb-2 pb-0.5">
                <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-md text-[9px] 
                       font-semibold bg-blue-50 text-blue-700 border border-blue-200 flex-shrink-0
                       dark:bg-blue-900/30 dark:text-blue-400 dark:border-blue-800">
                    <Calendar className="w-2 h-2" />
                    {new Date(consultation.createdAt).toLocaleDateString('fr-FR', { day: '2-digit', month: 'short' })}
                </span>
                {consultation.rating && (
                    <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-md text-[9px] 
                         font-semibold bg-amber-50 text-amber-700 border border-amber-200 flex-shrink-0
                         dark:bg-amber-900/30 dark:text-amber-400 dark:border-amber-800">
                        <Star className="w-2 h-2 fill-amber-500" />
                        {consultation.rating}/5
                    </span>
                )}
                {consultation.review && (
                    <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-md text-[9px] 
                         font-semibold bg-purple-50 text-purple-700 border border-purple-200 flex-shrink-0
                         dark:bg-purple-900/30 dark:text-purple-400 dark:border-purple-800">
                        <MessageSquare className="w-2 h-2" />
                        Avis
                    </span>
                )}
            </div>
            <div className="grid grid-cols-2 gap-1.5 mt-2">
                {hasAnalysis && (
                    <a
                        href={`/admin/consultations/${consultation.id}`}
                        className="flex items-center justify-center gap-1 px-2.5 py-1.5 
                   bg-gradient-to-r from-purple-600 to-purple-700 text-white 
                   text-[10px] rounded-lg font-semibold
                   hover:from-purple-700 hover:to-purple-800 
                   transition-all active:scale-95 shadow-sm hover:shadow-md"
                    >
                        <Eye className="w-3 h-3" />
                        Voir l'analyse
                    </a>)}
                <button
                    onClick={() => onGenerateAnalysis(consultation.id)}
                    disabled={isGenerating || hasAnalysis}
                    className="flex items-center justify-center gap-1 px-2.5 py-1.5 
                   bg-gradient-to-r from-blue-600 to-blue-700 text-white 
                   text-[10px] rounded-lg font-semibold
                   hover:from-blue-700 hover:to-blue-800 
                   transition-all active:scale-95 shadow-sm hover:shadow-md
                   disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-sm"
                >
                    <Sparkles className={`w-3 h-3 ${isGenerating ? 'animate-spin' : ''}`} />
                    {isGenerating ? 'Génération' : hasAnalysis ? 'Déjà généré' : 'Générer'}
                </button>
            </div>
            {hasAnalysis && (
                <div className="text-xs text-emerald-600 dark:text-emerald-400 mt-1 mb-1">Analyse déjà générée.</div>
            )}
        </motion.div>
    );
}, (prevProps, nextProps) => {
    return (
        prevProps.consultation.id === nextProps.consultation.id &&
        prevProps.consultation.status === nextProps.consultation.status &&
        prevProps.consultation.resultData === nextProps.consultation.resultData &&
        prevProps.isGenerating === nextProps.isGenerating &&
        prevProps.isNotifying === nextProps.isNotifying
    );
});
ConsultationCard.displayName = 'ConsultationCard';

export default ConsultationCard;