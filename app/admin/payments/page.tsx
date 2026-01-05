"use client";
import { AdminPaymentsEmptyState } from '@/components/admin/payments/AdminPaymentsEmptyState';
import { AdminPaymentsErrorAlert } from '@/components/admin/payments/AdminPaymentsErrorAlert';
import { AdminPaymentsHeader } from '@/components/admin/payments/AdminPaymentsHeader';
import { AdminPaymentsLoader } from '@/components/admin/payments/AdminPaymentsLoader';
import { AdminPaymentsPagination } from '@/components/admin/payments/AdminPaymentsPagination';
import PaymentsFilters from '@/components/admin/payments/PaymentsFilters';
import PaymentsList from '@/components/admin/payments/PaymentsList';
import PaymentsStats from '@/components/admin/payments/PaymentsStats';
import { useAdminPaymentsPage } from '@/hooks/useAdminPaymentsPage';

export default function PaymentsPage() {
  const {
    payments, total, showFilters,
    loading, totalPages, error,
    stats, methodFilter, currentPage, isRefreshing,
    searchQuery, statusFilter,
    setStatusFilter, setSearchQuery, setMethodFilter,
    setCurrentPage, setShowFilters, handleRefresh,
    handleResetFilters,
  } = useAdminPaymentsPage();

  if (loading) {
    return <AdminPaymentsLoader />;
  }

  if (error) {
    return <AdminPaymentsErrorAlert error={error} onRetry={handleRefresh} />;
  }

  return (
    <div className=" bg-gray-50">
      <AdminPaymentsHeader total={total} isRefreshing={isRefreshing} onRefresh={handleRefresh} />

      <div className="max-w-7xl mx-auto px-3 sm:px-4 py-4">
        <PaymentsStats stats={stats} />
        <PaymentsFilters
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
          methodFilter={methodFilter}
          setMethodFilter={setMethodFilter}
          showFilters={showFilters}
          setShowFilters={setShowFilters}
          handleResetFilters={handleResetFilters}
        />

        {payments && payments.length > 0 ? (
          <div className="space-y-4">
            <PaymentsList payments={payments} />
            {totalPages > 1 && (
              <AdminPaymentsPagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPrev={() => setCurrentPage(p => Math.max(1, p - 1))}
                onNext={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              />
            )}
          </div>
        ) : (
          <AdminPaymentsEmptyState
            searchQuery={searchQuery}
            statusFilter={statusFilter}
            methodFilter={methodFilter}
            onResetFilters={handleResetFilters}
          />
        )}
      </div>
    </div>
  );
}