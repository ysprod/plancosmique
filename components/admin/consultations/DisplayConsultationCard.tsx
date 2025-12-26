/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import { formatDate } from '@/lib/functions';
import { AnalyseAstrologique } from '@/lib/interfaces';
import { motion } from 'framer-motion';
import {
    Calendar,
    Clock,
    Edit, Mail, MapPin,
    Sparkles,
    User
} from 'lucide-react';
import { memo, useCallback, useMemo, useState } from 'react';
import AnalysisPreview from './AnalysisPreview';

interface ConsultationCardProps {
    consultation: AnalyseAstrologique;
    onModifyAnalysis: (id: string) => void;
    onNotifyUser: (id: string) => void;
    notifiedback: boolean;
}
  
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

 
const DisplayConsultationCard = memo(({
    consultation,
    onModifyAnalysis,
    onNotifyUser,
    notifiedback
}: ConsultationCardProps) => {
    const consultationId = useMemo(() => consultation?.consultationId, [consultation]);
    const sujet = useMemo(() => consultation?.carteDuCiel?.sujet, [consultation]);

    // State local pour désactiver le bouton après clic
    const [notified, setNotified] = useState(notifiedback);

    // Handlers mémorisés
    const handleModify = useCallback(() => {
        if (consultationId) onModifyAnalysis(consultationId);
    }, [consultationId, onModifyAnalysis]);

    const handleNotify = useCallback(() => {
        if (consultationId && !notified) {
            setNotified(true);
            onNotifyUser(consultationId);
        }
    }, [consultationId, onNotifyUser, notified]);

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

            <div className="grid grid-cols-3 gap-1 mb-2">
                <InfoCard icon={Calendar} label="Naissance" value={formatDate(sujet.dateNaissance)} iconColor="text-amber-400" index={0} />
                <InfoCard icon={Clock} label="Heure" value={sujet.heureNaissance} iconColor="text-blue-400" index={1} />
                <InfoCard icon={MapPin} label="Lieu" value={sujet.lieuNaissance} iconColor="text-green-400" index={2} />
            </div>

            <div className="flex gap-1 mb-2">
                <ActionButton
                    onClick={handleNotify}
                    icon={Mail}
                    label={notified || consultation.analysisNotified === true ? 'Déjà notifié' : 'Notifier'}
                    gradient="from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800"
                    disabled={notified || consultation.analysisNotified === true}
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
