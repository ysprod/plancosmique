import { useConsultationCard } from '@/hooks/consultations/useConsultationCard';
import { motion } from 'framer-motion';
import { Calendar, Eye, Mail, Sparkles, User } from 'lucide-react';
import { memo } from 'react';
import AstrologyData from './AstrologyData';
import NumerologyData from './NumerologyData';
import StatusBadge from './StatusBadge';

interface ConsultationCardProps {
    consultation: any;
    onGenerateAnalysis: (id: string) => void;
    isGenerating: boolean;
    isNotifying: boolean;
}

const ConsultationCard = memo(({
    consultation,
    onGenerateAnalysis,
    isGenerating
}: ConsultationCardProps) => {
    const { typeConfig, hasResultData, hasCarteDuCiel } = useConsultationCard(consultation);
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
            </div>

            <div className="flex gap-1 overflow-x-auto scrollbar-hide mb-2 pb-0.5">
                <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-md text-[9px] font-semibold bg-blue-50 text-blue-700 border border-blue-200 flex-shrink-0 dark:bg-blue-900/30 dark:text-blue-400 dark:border-blue-800">
                    <Calendar className="w-2 h-2" />
                    {new Date(consultation.createdAt).toLocaleString('fr-FR', {
                        day: '2-digit',
                        month: 'long',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                    })}
                </span>
                {hasResultData && (
                    <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-md text-[9px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200 flex-shrink-0 dark:bg-emerald-900/30 dark:text-emerald-400 dark:border-emerald-800">
                        🔢 Numérologie
                    </span>
                )}
                {hasCarteDuCiel && (
                    <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-md text-[9px] font-semibold bg-indigo-50 text-indigo-700 border border-indigo-200 flex-shrink-0 dark:bg-indigo-900/30 dark:text-indigo-400 dark:border-indigo-800">
                        ⭐ Astrologie
                    </span>
                )}
            </div>

            <div className="space-y-1 mb-2">
                {hasResultData && <NumerologyData resultData={consultation.resultData} />}
                {hasCarteDuCiel && <AstrologyData formData={consultation.formData} />}
            </div>

            <div className="grid grid-cols-2 gap-1.5">
                {consultation.status === 'COMPLETED' && (
                    <a
                        href={`/admin/consultations/${consultation.id}`}
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-1 px-2.5 py-1.5 
                   bg-gradient-to-r from-purple-600 to-purple-700 text-white 
                   text-[10px] rounded-lg font-semibold
                   hover:from-purple-700 hover:to-purple-800 
                   transition-all active:scale-95 shadow-sm hover:shadow-md"
                    >
                        <Eye className="w-3 h-3" />
                        Voir
                    </a>
                )}

                {consultation.analysisNotified && (
                    <span
                        className="inline-flex items-center justify-center gap-1 px-2 py-1.5 rounded-lg text-[10px] font-bold bg-gradient-to-r from-emerald-400 via-green-500 to-lime-400 text-white shadow-lg animate-pulse"
                    >
                        <Mail className="w-3 h-3" />
                        Notifié
                    </span>
                )}

                <button
                    onClick={() => onGenerateAnalysis(consultation.id)}
                    disabled={isGenerating || hasResultData}
                    className="flex items-center justify-center gap-1 px-2.5 py-1.5 
                   bg-gradient-to-r from-blue-600 to-blue-700 text-white 
                   text-[10px] rounded-lg font-semibold
                   hover:from-blue-700 hover:to-blue-800 
                   transition-all active:scale-95 shadow-sm hover:shadow-md
                   disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    <Sparkles className={`w-3 h-3 ${isGenerating ? 'animate-spin' : ''}`} />
                    {isGenerating ? 'Génération...' : hasResultData ? 'Généré' : 'Générer'}
                </button>
            </div>
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