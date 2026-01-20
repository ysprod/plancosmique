'use client';
import DisplayConsultationCard from '@/components/admin/consultations/DisplayConsultationCard';
import ErrorState from '@/components/consultations/ErrorState';
import LoadingSkeleton from '@/components/consultations/LoadingSkeleton';
import Toast from '@/components/consultations/Toast';
import { useAdminConsultationAnalysis } from '@/hooks/consultations/useAdminConsultationAnalysis';
import { AnimatePresence } from 'framer-motion';

export default function AdminConsultationAnalysisView() {
    const {
        analyse, loading, notified, error, toast,
        setToast, handleBack, handleModifyAnalysis, handleNotifyUser,
    } = useAdminConsultationAnalysis();

    if (loading) { return <LoadingSkeleton />; }

    if (error || !analyse) {
        return <ErrorState error={error || 'Analyse introuvable'} onRetry={handleBack} />;
    }

    return (
        <div>
            <DisplayConsultationCard
                consultation={analyse}
                onModifyAnalysis={handleModifyAnalysis}
                onNotifyUser={handleNotifyUser}
                notifiedback={notified}
            />
            <AnimatePresence>
                {toast && (
                    <Toast
                        message={toast.message}
                        type={toast.type}
                        onClose={() => setToast(null)}
                    />
                )}
            </AnimatePresence>
        </div>
    );
}