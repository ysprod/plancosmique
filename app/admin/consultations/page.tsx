"use client";
import { AnimatePresence } from "framer-motion";
import { useAdminConsultationsPage } from "@/hooks/useAdminConsultationsPage";
import { CosmicLoader } from "@/components/admin/consultations/CosmicLoader";
import { ConsultationsHeader } from "@/components/admin/consultations/ConsultationsHeader";
import { ConsultationsList } from "@/components/admin/consultations/ConsultationsList";
import { ConsultationsEmptyState } from "@/components/admin/consultations/ConsultationsEmptyState";
import Toast from "@/components/admin/consultations/Toast";

export default function ConsultationsPage() {
  const page = useAdminConsultationsPage();
  const {
    consultations,
    total,
    loading,
    error,
    isRefreshing,
    handleRefresh,
    toastMessage,
    handleToastClose,
    generatingIds,
    notifyingIds,
    handleGenerateAnalysis,
    currentPage,
    totalPages,
    handlePageChange,
  } = page;

  if (loading) return <CosmicLoader />;

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-950 p-4">
        <div className="text-center max-w-sm bg-white dark:bg-gray-900 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-800 p-6">
          <div className="w-12 h-12 text-rose-500 mx-auto mb-3">⚠️</div>
          <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-2">Erreur</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">{error}</p>
          <button
            onClick={handleRefresh}
            className="w-full px-4 py-2.5 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-lg font-bold hover:shadow-lg transition-all active:scale-95"
          >
            Réessayer
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
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
