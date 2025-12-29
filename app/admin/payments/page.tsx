'use client';
import PaymentsFilters from '@/components/admin/payments/PaymentsFilters';
import PaymentsList from '@/components/admin/payments/PaymentsList';
import PaymentsStats from '@/components/admin/payments/PaymentsStats';
import { useAdminPayments } from '@/hooks/useAdminPayments';
import { motion } from 'framer-motion';
import { AlertCircle, CreditCard, RefreshCw } from 'lucide-react';
import { useCallback, useMemo, useState } from 'react';

type PaymentStatus = 'all' | 'pending' | 'completed' | 'failed' | 'cancelled';
type PaymentMethod = 'all' | 'orange_money' | 'mtn_money' | 'moov_money' | 'wave';

export default function PaymentsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<PaymentStatus>('all');
  const [methodFilter, setMethodFilter] = useState<PaymentMethod>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [showFilters, setShowFilters] = useState(false);

  const { payments, total, loading, error, refetch } = useAdminPayments({
    search: searchQuery,
    status: statusFilter,
    method: methodFilter,
    page: currentPage,
    limit: 18,
  });

  const stats = useMemo(() => {
    if (!payments) return null;

    const totalAmount = payments.reduce((sum, p) => sum + (p.amount || 0), 0);
    const completedAmount = payments
      .filter(p => p.status === 'completed')
      .reduce((sum, p) => sum + (p.amount || 0), 0);

    return {
      total: payments.length,
      pending: payments.filter(p => p.status === 'pending').length,
      completed: payments.filter(p => p.status === 'completed').length,
      failed: payments.filter(p => p.status === 'failed').length,
      cancelled: payments.filter(p => p.status === 'cancelled').length,
      totalAmount,
      completedAmount,
    };
  }, [payments]);

  const [isRefreshing, setIsRefreshing] = useState(false);
  const handleRefresh = useCallback(async () => {
    setIsRefreshing(true);
    await refetch();
    setTimeout(() => setIsRefreshing(false), 500);
  }, [refetch]);

  const handleResetFilters = () => {
    setSearchQuery('');
    setStatusFilter('all');
    setMethodFilter('all');
    setCurrentPage(1);
  };

  const totalPages = Math.ceil(total / 18);

  if (loading && !payments) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
            className="w-12 h-12 border-4 border-green-500 border-t-transparent rounded-full mx-auto mb-3"
          />
          <p className="text-sm text-gray-600 font-medium">Chargement...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50 px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center max-w-sm w-full bg-white rounded-xl shadow-lg p-6"
        >
          <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-3" />
          <h3 className="text-lg font-bold text-gray-900 mb-2">Erreur</h3>
          <p className="text-sm text-gray-600 mb-4">{error}</p>
          <button
            onClick={handleRefresh}
            className="w-full px-4 py-2 bg-gradient-to-r from-green-500 to-green-600 
                       text-white text-sm rounded-lg font-semibold hover:shadow-lg transition-all"
          >
            Réessayer
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* En-tête compact */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 py-3">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <div className="p-1.5 bg-green-50 rounded-lg">
                <CreditCard className="w-4 h-4 text-green-600" />
              </div>
              <div>
                <h1 className="text-lg sm:text-xl font-bold text-gray-900">
                  Paiements
                </h1>
                <p className="text-xs text-gray-500">{total} total</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleRefresh}
                disabled={isRefreshing}
                className={`p-2 rounded-lg transition-all ${isRefreshing
                  ? 'bg-gray-100 text-gray-400'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
              >
                <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
              </button>
            </div>
          </div>
        </div>
      </div>

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
            <PaymentsList
              payments={payments}
            />
            {totalPages > 1 && (
              <div className="flex items-center justify-between bg-white 
                              rounded-lg border border-gray-200 px-3 py-2">
                <p className="text-xs text-gray-600">
                  Page {currentPage}/{totalPages}
                </p>
                <div className="flex gap-1.5">
                  <button
                    onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                    className="px-3 py-1 bg-gray-100 text-gray-700 text-xs rounded 
                               font-medium hover:bg-gray-200 disabled:opacity-50 
                               disabled:cursor-not-allowed"
                  >
                    ←
                  </button>
                  <button
                    onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                    disabled={currentPage === totalPages}
                    className="px-3 py-1 bg-gradient-to-r from-green-500 to-green-600 
                               text-white text-xs rounded font-medium hover:shadow-md 
                               disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    →
                  </button>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="bg-white rounded-lg border border-gray-200 p-8 text-center">
            <CreditCard className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <h3 className="text-base font-bold text-gray-900 mb-1">
              Aucun paiement
            </h3>

            <p className="text-sm text-gray-500 mb-4">
              {searchQuery || statusFilter !== 'all' || methodFilter !== 'all'
                ? 'Aucun résultat trouvé'
                : 'Les paiements apparaîtront ici'}
            </p>
            {(searchQuery || statusFilter !== 'all' || methodFilter !== 'all') && (
              <button
                onClick={handleResetFilters}
                className="px-4 py-2 bg-gradient-to-r from-green-500 to-green-600 
                           text-white text-sm rounded-lg font-medium hover:shadow-md"
              >
                Réinitialiser
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
