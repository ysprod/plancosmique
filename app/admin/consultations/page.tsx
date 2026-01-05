"use client";
import { ConsultationsEmptyState } from "@/components/admin/consultations/ConsultationsEmptyState";
import { ConsultationsError } from "@/components/admin/consultations/ConsultationsError";
import { ConsultationsHeader } from "@/components/admin/consultations/ConsultationsHeader";
import { ConsultationsList } from "@/components/admin/consultations/ConsultationsList";
import { CosmicLoader } from "@/components/admin/consultations/CosmicLoader";
import Toast from "@/components/admin/consultations/Toast";
import { useAdminConsultationsPage } from "@/hooks/useAdminConsultationsPage";
import { AnimatePresence } from "framer-motion";

export default function ConsultationsPage() {
  const {
    consultations, total, loading, error, isRefreshing, toastMessage,
    generatingIds, notifyingIds, currentPage, totalPages,
    handlePageChange, handleToastClose, handleRefresh, handleGenerateAnalysis,
  } = useAdminConsultationsPage();

  if (loading) return <CosmicLoader />;

  if (error) {
    return <ConsultationsError error={error} onRetry={handleRefresh} />;
  }

  return (
    <div className="bg-gray-50 dark:bg-gray-950">
      <ConsultationsHeader
        total={total}
        onRefresh={handleRefresh}
        isRefreshing={isRefreshing}
        loading={loading}
      />

      <div className="max-w-5xl mx-auto px-3 py-3 space-y-2.5">
        {consultations && consultations.length > 0 ? (
          <ConsultationsList
            consultations={consultations}
            generatingIds={generatingIds}
            notifyingIds={notifyingIds}
            onGenerateAnalysis={handleGenerateAnalysis}
            currentPage={currentPage}
            totalPages={totalPages}
            total={total}
            onPageChange={handlePageChange}
            loading={loading}
          />
        ) : (
          <ConsultationsEmptyState />
        )}
      </div>
      <AnimatePresence>
        {toastMessage && (
          <Toast message={toastMessage} onClose={handleToastClose} />
        )}
      </AnimatePresence>
    </div>
  );
}