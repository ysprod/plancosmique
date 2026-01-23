'use client';
import { motion } from 'framer-motion';
import { memo } from 'react';
import { useConsultationCard } from '@/hooks/consultations/useConsultationCard';
import { useConsultationCardDisplay } from '@/hooks/consultations/useConsultationCardDisplay';
import CardActions from './CardActions';
import CardHeader from './CardHeader';
import ClientInfo from './ClientInfo';
import ConsultationBadges from './ConsultationBadges';
import StatusBadge from './StatusBadge';
import { cardVariants, shimmerVariants } from './consultationCardVariants';
import ConsultationCardParticles from './ConsultationCardParticles';
import ConsultationCardGlowBar from './ConsultationCardGlowBar';
import { Consultation } from '@/lib/interfaces';

interface ConsultationCardProps {
    consultation: Consultation;
    onGenerateAnalysis: (id: string) => void;
}

const ConsultationCard = memo(({ consultation, onGenerateAnalysis }: ConsultationCardProps) => {
    const { typeConfig, hasTierce, isPaid } = useConsultationCard(consultation);
    const { formattedDate, clientName, tierceName } = useConsultationCardDisplay(consultation);
    const email = consultation.clientId?.email || consultation.formData?.email || null;
    const phone = (consultation.clientId && 'phone' in consultation.clientId)
        ? (consultation.clientId as any).phone
        : (consultation.formData?.numeroSend || null);

    const isCompleted = consultation.status?.toLowerCase() === 'completed';
    const isNotified = Boolean(consultation.analysisNotified);

    return (
        <motion.div
            layout
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            whileHover={{ y: -4, transition: { duration: 0.2 } }}
            className="relative flex flex-col items-center justify-center bg-gradient-to-br from-white via-white to-gray-50/50 dark:from-slate-900 dark:via-slate-900 dark:to-slate-800/50 rounded-2xl border-2 border-gray-200/60 dark:border-slate-700/60 p-4 shadow-lg hover:shadow-2xl hover:shadow-purple-500/10 dark:hover:shadow-purple-500/20 transition-all duration-300 overflow-hidden group  max-w-md mx-auto"
        >
            <motion.div
                variants={shimmerVariants}
                animate="animate"
                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                style={{
                    background: `linear-gradient(90deg, transparent, ${typeConfig.gradient.includes('purple') ? 'rgba(168, 85, 247, 0.1)' : 'rgba(99, 102, 241, 0.1)'}, transparent)`,
                    backgroundSize: '200% 100%'
                }}
            />

            <ConsultationCardGlowBar gradient={typeConfig.gradient} />

            <div className="absolute top-2 right-2 z-10">
                <StatusBadge status={consultation.status} />
            </div>

            <div className="flex flex-col items-center w-full gap-2 mt-2">
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
                    isPaid={isPaid}
                />
                <CardActions
                    isCompleted={isCompleted}
                    isNotified={isNotified}
                    consultationId={consultation.id}
                    onGenerateAnalysis={onGenerateAnalysis}
                />
            </div>

            <ConsultationCardParticles />
        </motion.div>
    );
}, (prevProps, nextProps) => {
    const c1 = prevProps.consultation;
    const c2 = nextProps.consultation;
    return (c1.id === c2.id);
});

ConsultationCard.displayName = 'ConsultationCard';

export default ConsultationCard;