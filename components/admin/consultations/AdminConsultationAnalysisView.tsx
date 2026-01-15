import { AnimatePresence, motion } from 'framer-motion';
import DisplayConsultationCard from '@/components/admin/consultations/DisplayConsultationCard';
import ErrorState from '@/components/consultations/ErrorState';
import LoadingSkeleton from '@/components/consultations/LoadingSkeleton';
import PageHeader from '@/components/consultations/PageHeader';
import Toast from '@/components/consultations/Toast';
import { useAdminConsultationAnalysis } from '@/hooks/consultations/useAdminConsultationAnalysis';

export default function AdminConsultationAnalysisView() {
    const {
        analyse,
        loading,
        notified,
        error,
        toast,
        setToast,
        handleBack,
        handleModifyAnalysis,
        handleNotifyUser,
    } = useAdminConsultationAnalysis();

    if (loading) {
        return <LoadingSkeleton />;
    }

    if (error || !analyse) {
        return <ErrorState error={error || 'Analyse introuvable'} onRetry={handleBack} />;
    }

    return (
        <div className="bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900">
            <PageHeader onBack={handleBack} />
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                    type: 'spring',
                    stiffness: 200,
                    damping: 25,
                    delay: 0.1
                }}
                className="max-w-7xl mx-auto"
            >
                <DisplayConsultationCard
                    consultation={analyse}
                    onModifyAnalysis={handleModifyAnalysis}
                    onNotifyUser={handleNotifyUser}
                    notifiedback={notified}
                />
            </motion.div>
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
