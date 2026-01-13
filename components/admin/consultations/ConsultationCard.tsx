import { useConsultationCard } from '@/hooks/consultations/useConsultationCard';
import { motion } from 'framer-motion';
import { memo, useMemo } from 'react';
import CardActions from './CardActions';
import CardHeader from './CardHeader';
import ClientInfo from './ClientInfo';
import ConsultationBadges from './ConsultationBadges';
import StatusBadge from './StatusBadge';
import { cardVariants, floatingParticle1Variants, floatingParticle2Variants, glowVariants, shimmerVariants } from './consultationCardVariants';

interface ConsultationCardProps {
    consultation: any;
    onGenerateAnalysis: (id: string) => void;
    isGenerating: boolean;
    isNotifying: boolean;
}

const ConsultationCard = memo(({ consultation, onGenerateAnalysis, isGenerating, isNotifying }: ConsultationCardProps) => {
  console.log(consultation);
  
  
    const { typeConfig, hasResultData, hasCarteDuCiel, hasTierce, isPaid } = useConsultationCard(consultation);
  
    const formattedDate = useMemo(() => {
        return new Date(consultation.createdAt).toLocaleString('fr-FR', {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    }, [consultation.createdAt]);

    const clientName = useMemo(() => {
        const firstName = consultation.formData?.firstName || consultation.formData?.prenoms || '';
        const lastName = consultation.formData?.lastName || consultation.formData?.nom || '';
        return `${firstName} ${lastName}`.trim();
    }, [consultation.formData?.firstName, consultation.formData?.lastName, consultation.formData?.prenoms, consultation.formData?.nom]);

    const tierceName = useMemo(() => {
        if (!consultation.tierce) return null;
        return `${consultation.tierce.prenoms || ''} ${consultation.tierce.nom || ''}`.trim();
    }, [consultation.tierce]);

    const email = consultation.clientId?.email || null;
    const phone = consultation.clientId?.phone || null;
    const isCompleted = consultation.status === 'COMPLETED';
    const isNotified = Boolean(consultation.analysisNotified);
    const canGenerateAnalysis = isPaid && !isCompleted && !isGenerating;
  
    return (
        <motion.div
            layout
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            whileHover={{ y: -4, transition: { duration: 0.2 } }}
            className="relative bg-gradient-to-br from-white via-white to-gray-50/50
                       dark:from-slate-900 dark:via-slate-900 dark:to-slate-800/50
                       rounded-2xl border-2 border-gray-200/60 dark:border-slate-700/60
                       p-4 shadow-lg hover:shadow-2xl hover:shadow-purple-500/10 dark:hover:shadow-purple-500/20
                       transition-all duration-300 overflow-hidden group"
        >
            {/* Animated gradient border */}
            <motion.div
                variants={shimmerVariants}
                animate="animate"
                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 
                           transition-opacity duration-300 pointer-events-none"
                style={{
                    background: `linear-gradient(90deg, transparent, ${typeConfig.gradient.includes('purple') ? 'rgba(168, 85, 247, 0.1)' : 'rgba(99, 102, 241, 0.1)'}, transparent)`,
                    backgroundSize: '200% 100%'
                }}
            />

            {/* Top gradient bar with glow */}
            <motion.div
                variants={shimmerVariants}
                animate="animate"
                className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${typeConfig.gradient}`}
                style={{ backgroundSize: '200% 200%' }}
            />
            <motion.div
                variants={glowVariants}
                animate="animate"
                className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${typeConfig.gradient} blur-sm`}
                style={{ backgroundSize: '200% 200%' }}
            />

            <CardHeader
                typeConfig={typeConfig}
                title={consultation.title}
                status={consultation.status}
                StatusBadgeComponent={StatusBadge}
            />

            <ClientInfo 
                clientName={clientName} 
                email={email} 
                phone={phone}
                tierceName={tierceName}
                hasTierce={hasTierce}
            />

            <ConsultationBadges
                formattedDate={formattedDate}
                hasResultData={hasResultData}
                hasCarteDuCiel={hasCarteDuCiel}
                isPaid={isPaid}
            />

            <CardActions
                isCompleted={isCompleted}
                isNotified={isNotified}
                consultationId={consultation.id}
                canGenerateAnalysis={canGenerateAnalysis}
                onGenerateAnalysis={onGenerateAnalysis}
                isGenerating={isGenerating}
            />

            {/* Floating particles effect */}
            <motion.div
                variants={floatingParticle1Variants}
                animate="animate"
                className="absolute top-4 right-4 w-2 h-2 rounded-full bg-purple-400/30 blur-sm"
            />
            <motion.div
                variants={floatingParticle2Variants}
                animate="animate"
                className="absolute bottom-4 left-4 w-2 h-2 rounded-full bg-fuchsia-400/30 blur-sm"
            />
        </motion.div>
    );
}, (prevProps, nextProps) => {
    return (
        prevProps.consultation.id === nextProps.consultation.id &&
        prevProps.consultation.status === nextProps.consultation.status &&
        prevProps.consultation.resultData === nextProps.consultation.resultData &&
        prevProps.consultation.analysisNotified === nextProps.consultation.analysisNotified &&
        prevProps.consultation.isPaid === nextProps.consultation.isPaid &&
        prevProps.consultation.tierce === nextProps.consultation.tierce &&
        prevProps.consultation.formData?.firstName === nextProps.consultation.formData?.firstName &&
        prevProps.consultation.formData?.lastName === nextProps.consultation.formData?.lastName &&
        prevProps.isGenerating === nextProps.isGenerating &&
        prevProps.isNotifying === nextProps.isNotifying
    );
});
ConsultationCard.displayName = 'ConsultationCard';

export default ConsultationCard;