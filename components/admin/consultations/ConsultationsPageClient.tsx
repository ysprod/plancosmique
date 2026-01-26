"use client";
import { ConsultationsEmptyState } from "@/components/admin/consultations/ConsultationsEmptyState";
import { ConsultationsError } from "@/components/admin/consultations/ConsultationsError";
import { ConsultationsHeader } from "@/components/admin/consultations/ConsultationsHeader";
import { ConsultationsList } from "@/components/admin/consultations/ConsultationsList";
import { CosmicLoader } from "@/components/admin/consultations/CosmicLoader";
import Toast from "@/components/admin/consultations/Toast";
import { useAdminConsultationsPage } from "@/hooks/consultations/useAdminConsultationsPage";
import { useMemo } from "react";
import { AnimatePresence } from "framer-motion";

export default function ConsultationsPageClient() {
  const {
    consultations, total, loading, error, isRefreshing, toastMessage, totalPages,
    currentPage, statusFilter, handlePageChange, handleToastClose, handleRefresh,
    handleGenerateAnalysis, setStatusFilter
  } = useAdminConsultationsPage();

  const tabs = useMemo(() => [
    { key: 'all', label: 'Toutes' },
    { key: 'COMPLETED', label: 'Terminées' },
    { key: 'PENDING', label: 'En attente' },
    { key: 'ERROR', label: 'Erreur' },
  ], []);

  if (loading) return <CosmicLoader />;

  if (error) { return <ConsultationsError error={error} onRetry={handleRefresh} />; }

  return (
    <div className="bg-gray-50 dark:bg-gray-950">
      <ConsultationsHeader
        total={total}
        onRefresh={handleRefresh}
        isRefreshing={isRefreshing}
        loading={loading}
      />

      <div className="max-w-5xl mx-auto px-3 pt-2 pb-1">
        <div className="flex gap-2 border-b border-gray-200 dark:border-gray-800 mb-2">
          {tabs.map(tab => (
            <button
              key={tab.key}
              className={`px-4 py-2 text-sm font-medium rounded-t-lg focus:outline-none transition-colors duration-200
                ${statusFilter === tab.key ? 'bg-white dark:bg-zinc-900 border-x border-t border-b-0 border-gray-200 dark:border-gray-800 text-cosmic-indigo dark:text-fuchsia-300' : 'bg-transparent text-gray-500 dark:text-gray-400 hover:text-cosmic-indigo dark:hover:text-fuchsia-300'}`}
              onClick={() => setStatusFilter(tab.key as any)}
              type="button"
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-3 py-3 space-y-2.5">
        {consultations && consultations.length > 0 ? (
          <ConsultationsList
            consultations={consultations}
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