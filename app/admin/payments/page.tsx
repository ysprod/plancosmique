'use client';
import { useAdminPayments } from '@/hooks/useAdminPayments';
import { AnimatePresence, motion } from 'framer-motion';
import {
  AlertCircle,
  Calendar,
  CheckCircle, Clock,
  CreditCard,
  Eye,
  Filter,
  Hash,
  RefreshCw,
  Search,
  Smartphone,
  User,
  X,
  XCircle
} from 'lucide-react';
import Link from 'next/link';
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

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-700';
      case 'pending': return 'bg-orange-100 text-orange-700';
      case 'failed': return 'bg-red-100 text-red-700';
      case 'cancelled': return 'bg-gray-100 text-gray-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle className="w-2.5 h-2.5" />;
      case 'pending': return <Clock className="w-2.5 h-2.5" />;
      case 'failed': return <XCircle className="w-2.5 h-2.5" />;
      case 'cancelled': return <AlertCircle className="w-2.5 h-2.5" />;
      default: return <AlertCircle className="w-2.5 h-2.5" />;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed': return 'Réussi';
      case 'pending': return 'En attente';
      case 'failed': return 'Échoué';
      case 'cancelled': return 'Annulé';
      default: return status;
    }
  };

  const getMethodText = (method: string) => {
    switch (method) {
      case 'orange_money': return 'Orange Money';
      case 'mtn_money': return 'MTN Money';
      case 'moov_money': return 'Moov Money';
      case 'wave': return 'Wave';
      default: return method;
    }
  };

  const getMethodColor = (method: string) => {
    switch (method) {
      case 'orange_money': return 'bg-orange-50 text-orange-700';
      case 'mtn_money': return 'bg-yellow-50 text-yellow-700';
      case 'moov_money': return 'bg-blue-50 text-blue-700';
      case 'wave': return 'bg-pink-50 text-pink-700';
      default: return 'bg-gray-50 text-gray-700';
    }
  };

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
        {/* Stats compactes avec montants */}
        {stats && (
          <div className="space-y-3 mb-4">
            {/* Montants totaux */}
            <div className="grid grid-cols-2 gap-2">
              <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-lg p-3 text-white">
                <p className="text-xs opacity-90 mb-1">Montant total</p>
                <p className="text-xl font-bold">{stats.totalAmount.toLocaleString()} F</p>
              </div>
              <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-lg p-3 text-white">
                <p className="text-xs opacity-90 mb-1">Montant encaissé</p>
                <p className="text-xl font-bold">{stats.completedAmount.toLocaleString()} F</p>
              </div>
            </div>

            {/* Stats par statut */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              <div className="bg-white rounded-lg p-2.5 border border-gray-200">
                <div className="flex items-center gap-2">
                  <div className="p-1 bg-green-50 rounded">
                    <CheckCircle className="w-3.5 h-3.5 text-green-600" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Réussis</p>
                    <p className="text-lg font-bold text-gray-900">{stats.completed}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg p-2.5 border border-gray-200">
                <div className="flex items-center gap-2">
                  <div className="p-1 bg-orange-50 rounded">
                    <Clock className="w-3.5 h-3.5 text-orange-600" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">En attente</p>
                    <p className="text-lg font-bold text-gray-900">{stats.pending}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg p-2.5 border border-gray-200">
                <div className="flex items-center gap-2">
                  <div className="p-1 bg-red-50 rounded">
                    <XCircle className="w-3.5 h-3.5 text-red-600" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Échoués</p>
                    <p className="text-lg font-bold text-gray-900">{stats.failed}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg p-2.5 border border-gray-200">
                <div className="flex items-center gap-2">
                  <div className="p-1 bg-gray-50 rounded">
                    <AlertCircle className="w-3.5 h-3.5 text-gray-600" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Annulés</p>
                    <p className="text-lg font-bold text-gray-900">{stats.cancelled}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="mb-4">
          <div className="flex gap-2">
            <div className="flex-1 relative">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1);
                }}
                placeholder="Rechercher (ref, nom, tel)..."
                className="w-full bg-white border border-gray-300 text-sm text-gray-900 
                           pl-8 pr-8 py-2 rounded-lg focus:outline-none 
                           focus:ring-2 focus:ring-green-400 focus:border-transparent"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center gap-1.5 px-3 py-2 text-sm rounded-lg 
                         font-medium transition-all ${showFilters || statusFilter !== 'all' || methodFilter !== 'all'
                  ? 'bg-gradient-to-r from-green-500 to-green-600 text-white'
                  : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                }`}
            >
              <Filter className="w-4 h-4" />
              <span className="hidden sm:inline">Filtres</span>
            </button>
          </div>

          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="bg-white border border-gray-200 rounded-lg p-3 mt-2"
              >
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-xs font-medium text-gray-700 mb-1 block">
                      Statut
                    </label>
                    <select
                      value={statusFilter}
                      onChange={(e) => {
                        setStatusFilter(e.target.value as PaymentStatus);
                        setCurrentPage(1);
                      }}
                      className="w-full bg-white border border-gray-300 text-sm text-gray-900 
                                 px-2 py-1.5 rounded focus:ring-2 focus:ring-green-400"
                    >
                      <option value="all">Tous</option>
                      <option value="completed">Réussis</option>
                      <option value="pending">En attente</option>
                      <option value="failed">Échoués</option>
                      <option value="cancelled">Annulés</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-xs font-medium text-gray-700 mb-1 block">
                      Méthode
                    </label>
                    <select
                      value={methodFilter}
                      onChange={(e) => {
                        setMethodFilter(e.target.value as PaymentMethod);
                        setCurrentPage(1);
                      }}
                      className="w-full bg-white border border-gray-300 text-sm text-gray-900 
                                 px-2 py-1.5 rounded focus:ring-2 focus:ring-green-400"
                    >
                      <option value="all">Tous</option>
                      <option value="orange_money">Orange Money</option>
                      <option value="mtn_money">MTN Money</option>
                      <option value="moov_money">Moov Money</option>
                      <option value="wave">Wave</option>
                    </select>
                  </div>
                </div>

                {(statusFilter !== 'all' || methodFilter !== 'all') && (
                  <button
                    onClick={handleResetFilters}
                    className="text-xs text-green-600 hover:text-green-700 
                               font-medium flex items-center gap-1 mt-2"
                  >
                    <X className="w-3 h-3" />
                    Réinitialiser
                  </button>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {payments && payments.length > 0 ? (
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
              {payments.map((payment, index) => (
                <motion.div
                  key={payment.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.02 }}
                  whileHover={{ y: -2 }}
                  className="bg-white rounded-lg border border-gray-200 p-3 
                             hover:shadow-lg transition-all"
                >
                  {/* En-tête */}
                  <div className="flex items-start justify-between mb-2.5">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5 mb-1">
                        <Hash className="w-3 h-3 text-gray-400" />
                        <p className="text-xs font-mono text-gray-500 truncate">
                          {payment.reference}
                        </p>
                      </div>
                      <p className="text-lg font-bold text-gray-900">
                        {payment.amount.toLocaleString()} F
                      </p>
                    </div>
                  </div>

                  {/* Infos client */}
                  <div className="space-y-1 mb-2.5 pb-2.5 border-b border-gray-100">
                    <div className="flex items-center gap-1.5 text-xs text-gray-600 truncate">
                      <User className="w-3 h-3 flex-shrink-0" />
                      <span className="truncate">{payment.customerName}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-xs text-gray-600">
                      <Smartphone className="w-3 h-3 flex-shrink-0" />
                      {payment.customerPhone}
                    </div>
                    <div className="flex items-center gap-1.5 text-xs text-gray-600">
                      <Calendar className="w-3 h-3 flex-shrink-0" />
                      {new Date(payment.createdAt).toLocaleDateString('fr-FR')}
                    </div>
                  </div>

                  {/* Badges */}
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    <span className={`inline-flex items-center gap-0.5 px-2 py-0.5 
                                    rounded-full text-xs font-medium ${getStatusColor(payment.status)
                      }`}>
                      {getStatusIcon(payment.status)}
                      {getStatusText(payment.status)}
                    </span>

                    {payment.method && (
                      <span className={`inline-flex items-center px-2 py-0.5 
                                      rounded-full text-xs font-medium ${getMethodColor(payment.method)
                        }`}>
                        <CreditCard className="w-2.5 h-2.5 mr-0.5" />
                        {getMethodText(payment.method)}
                      </span>
                    )}
                  </div>

                  {/* Bouton */}
                  <Link
                    href={`/admin/payments/${payment.id}`}
                    className="w-full flex items-center justify-center gap-1 
                               px-2 py-1.5 bg-green-600 text-white text-xs 
                               rounded font-medium hover:bg-green-700 transition-colors"
                  >
                    <Eye className="w-3 h-3" />
                    Détails
                  </Link>
                </motion.div>
              ))}
            </div>  
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
