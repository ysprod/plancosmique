/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useState, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FileText, Search, Filter,
  Clock, CheckCircle, XCircle, AlertCircle,
  Download, Eye, RefreshCw, X,
  User, Calendar, DollarSign, Loader
} from 'lucide-react';

import Link from 'next/link';
import { useAdminConsultations } from '@/hooks/useAdminConsultations';

type ConsultationStatus = 'all' | 'pending' | 'generating' | 'completed' | 'error';
type ConsultationType = 'all' | 'theme_astral' | 'mission_vie' | 'compatibilite';

export default function ConsultationsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<ConsultationStatus>('all');
  const [typeFilter, setTypeFilter] = useState<ConsultationType>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [showFilters, setShowFilters] = useState(false);

  const { consultations, total, loading, error, refetch } = useAdminConsultations({
    search: searchQuery,
    status: statusFilter,
    type: typeFilter,
    page: currentPage,
    limit: 18,
  });

  const stats = useMemo(() => {
    if (!consultations) return null;
    return {
      total: consultations.length,
      pending: consultations.filter(c => c.status === 'pending').length,
      generating: consultations.filter(c => c.status === 'generating').length,
      completed: consultations.filter(c => c.status === 'completed').length,
      error: consultations.filter(c => c.status === 'error').length,
    };
  }, [consultations]);

  const [isRefreshing, setIsRefreshing] = useState(false);
  const handleRefresh = useCallback(async () => {
    setIsRefreshing(true);
    await refetch();
    setTimeout(() => setIsRefreshing(false), 500);
  }, [refetch]);

  const handleResetFilters = () => {
    setSearchQuery('');
    setStatusFilter('all');
    setTypeFilter('all');
    setCurrentPage(1);
  };

  const totalPages = Math.ceil(total / 18);

  // Helper pour les couleurs de statut
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-700';
      case 'generating': return 'bg-blue-100 text-blue-700';
      case 'pending': return 'bg-orange-100 text-orange-700';
      case 'error': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle className="w-2.5 h-2.5" />;
      case 'generating': return <Loader className="w-2.5 h-2.5 animate-spin" />;
      case 'pending': return <Clock className="w-2.5 h-2.5" />;
      case 'error': return <XCircle className="w-2.5 h-2.5" />;
      default: return <AlertCircle className="w-2.5 h-2.5" />;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed': return 'Complétée';
      case 'generating': return 'En cours';
      case 'pending': return 'En attente';
      case 'error': return 'Erreur';
      default: return status;
    }
  };

  const getTypeText = (type: string) => {
    switch (type) {
      case 'theme_astral': return 'Thème Astral';
      case 'mission_vie': return 'Mission de Vie';
      case 'compatibilite': return 'Compatibilité';
      default: return type;
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
            className="w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full mx-auto mb-3"
          />
          <p className="text-sm text-gray-600 font-medium">Chargement des consultations...</p>
        </div>
      </div>
    );
  }



  // État d'erreur
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
            className="w-full px-4 py-2 bg-gradient-to-r from-purple-500 to-purple-600 
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
              <div className="p-1.5 bg-purple-50 rounded-lg">
                <FileText className="w-4 h-4 text-purple-600" />
              </div>
              <div>
                <h1 className="text-lg sm:text-xl font-bold text-gray-900">
                  Consultations
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
        {/* Loader de rafraîchissement */}
        <AnimatePresence>
          {(loading || isRefreshing) && consultations && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mb-4 bg-purple-50 border border-purple-200 rounded-lg p-3 
                         flex items-center gap-2"
            >
              <Loader className="w-4 h-4 text-purple-600 animate-spin" />
              <p className="text-sm text-purple-700 font-medium">
                Mise à jour des données...
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Stats compactes */}
        {stats && (
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 mb-4">
            <div className="bg-white rounded-lg p-2.5 border border-gray-200">
              <div className="flex items-center gap-2">
                <div className="p-1 bg-purple-50 rounded">
                  <FileText className="w-3.5 h-3.5 text-purple-600" />
                </div>
                <div>
                  <p className="text-xs text-gray-500">Total</p>
                  <p className="text-lg font-bold text-gray-900">{stats.total}</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg p-2.5 border border-gray-200">
              <div className="flex items-center gap-2">
                <div className="p-1 bg-orange-50 rounded">
                  <Clock className="w-3.5 h-3.5 text-orange-600" />
                </div>
                <div>
                  <p className="text-xs text-gray-500">Attente</p>
                  <p className="text-lg font-bold text-gray-900">{stats.pending}</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg p-2.5 border border-gray-200">
              <div className="flex items-center gap-2">
                <div className="p-1 bg-blue-50 rounded">
                  <Loader className="w-3.5 h-3.5 text-blue-600" />
                </div>
                <div>
                  <p className="text-xs text-gray-500">En cours</p>
                  <p className="text-lg font-bold text-gray-900">{stats.generating}</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg p-2.5 border border-gray-200">
              <div className="flex items-center gap-2">
                <div className="p-1 bg-green-50 rounded">
                  <CheckCircle className="w-3.5 h-3.5 text-green-600" />
                </div>
                <div>
                  <p className="text-xs text-gray-500">Terminées</p>
                  <p className="text-lg font-bold text-gray-900">{stats.completed}</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg p-2.5 border border-gray-200 col-span-2 sm:col-span-1">
              <div className="flex items-center gap-2">
                <div className="p-1 bg-red-50 rounded">
                  <XCircle className="w-3.5 h-3.5 text-red-600" />
                </div>
                <div>
                  <p className="text-xs text-gray-500">Erreurs</p>
                  <p className="text-lg font-bold text-gray-900">{stats.error}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Barre de recherche compacte */}
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
                placeholder="Rechercher..."
                disabled={loading}
                className="w-full bg-white border border-gray-300 text-sm text-gray-900 
                           pl-8 pr-8 py-2 rounded-lg focus:outline-none 
                           focus:ring-2 focus:ring-purple-400 focus:border-transparent
                           disabled:bg-gray-50 disabled:cursor-not-allowed"
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
              disabled={loading}
              className={`flex items-center gap-1.5 px-3 py-2 text-sm rounded-lg 
                         font-medium transition-all disabled:opacity-50 
                         disabled:cursor-not-allowed ${showFilters || statusFilter !== 'all' || typeFilter !== 'all'
                  ? 'bg-gradient-to-r from-purple-500 to-purple-600 text-white'
                  : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                }`}
            >
              <Filter className="w-4 h-4" />
              <span className="hidden sm:inline">Filtres</span>
            </button>
          </div>

          {/* Panneau filtres compact */}
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
                        setStatusFilter(e.target.value as ConsultationStatus);
                        setCurrentPage(1);
                      }}
                      disabled={loading}
                      className="w-full bg-white border border-gray-300 text-sm text-gray-900 
                                 px-2 py-1.5 rounded focus:ring-2 focus:ring-purple-400
                                 disabled:bg-gray-50 disabled:cursor-not-allowed"
                    >
                      <option value="all">Tous</option>
                      <option value="pending">En attente</option>
                      <option value="generating">En cours</option>
                      <option value="completed">Terminées</option>
                      <option value="error">Erreurs</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-xs font-medium text-gray-700 mb-1 block">
                      Type
                    </label>
                    <select
                      value={typeFilter}
                      onChange={(e) => {
                        setTypeFilter(e.target.value as ConsultationType);
                        setCurrentPage(1);
                      }}
                      disabled={loading}
                      className="w-full bg-white border border-gray-300 text-sm text-gray-900 
                                 px-2 py-1.5 rounded focus:ring-2 focus:ring-purple-400
                                 disabled:bg-gray-50 disabled:cursor-not-allowed"
                    >
                      <option value="all">Tous</option>
                      <option value="theme_astral">Thème Astral</option>
                      <option value="mission_vie">Mission de Vie</option>
                      <option value="compatibilite">Compatibilité</option>
                    </select>
                  </div>
                </div>

                {(statusFilter !== 'all' || typeFilter !== 'all') && (
                  <button
                    onClick={handleResetFilters}
                    disabled={loading}
                    className="text-xs text-purple-600 hover:text-purple-700 
                               font-medium flex items-center gap-1 mt-2
                               disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <X className="w-3 h-3" />
                    Réinitialiser
                  </button>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Grille ultra-compacte avec loader overlay */}
        <div className="relative">
          {/* Overlay de chargement */}
          <AnimatePresence>
            {loading && consultations && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 bg-white/60 backdrop-blur-sm z-10 
                           rounded-lg flex items-center justify-center"
              >
                <div className="bg-white rounded-lg shadow-lg p-4 flex items-center gap-3">
                  <Loader className="w-5 h-5 text-purple-600 animate-spin" />
                  <p className="text-sm font-medium text-gray-900">
                    Chargement...
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {consultations && consultations.length > 0 ? (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
                {consultations.map((consultation, index) => (
                  <motion.div
                    key={consultation.id}
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
                        <h3 className="text-sm font-bold text-gray-900 truncate mb-0.5">
                          {getTypeText(consultation.type)}
                        </h3>
                        <p className="text-xs text-gray-500 flex items-center gap-1 truncate">
                          <User className="w-3 h-3" />
                          {consultation.clientName}
                        </p>
                      </div>
                      <span className={`inline-flex items-center gap-0.5 px-2 py-0.5 
                                      rounded-full text-xs font-medium ${getStatusColor(consultation.status)
                        }`}>
                        {getStatusIcon(consultation.status)}
                        {getStatusText(consultation.status)}
                      </span>
                    </div>

                    {/* Infos */}
                    <div className="space-y-1.5 mb-3 pb-3 border-b border-gray-100">
                      <div className="flex items-center gap-1.5 text-xs text-gray-600">
                        <Calendar className="w-3 h-3" />
                        {new Date(consultation.createdAt).toLocaleDateString('fr-FR')}
                      </div>
                      {consultation.price && (
                        <div className="flex items-center gap-1.5 text-xs text-gray-600">
                          <DollarSign className="w-3 h-3" />
                          {consultation.price.toLocaleString()} F
                        </div>
                      )}
                    </div>

                    {/* Boutons */}
                    <div className="flex gap-1.5">
                      <Link
                        href={`/dashboard/admin/consultations/${consultation.id}`}
                        className="flex-1 flex items-center justify-center gap-1 
                                   px-2 py-1.5 bg-purple-600 text-white text-xs 
                                   rounded font-medium hover:bg-purple-700 transition-colors"
                      >
                        <Eye className="w-3 h-3" />
                        Voir
                      </Link>
                      {consultation.status === 'completed' && (
                        <button
                          className="flex items-center justify-center gap-1 
                                     px-2 py-1.5 bg-green-600 text-white text-xs 
                                     rounded font-medium hover:bg-green-700 transition-colors"
                        >
                          <Download className="w-3 h-3" />
                          PDF
                        </button>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Pagination compacte */}
              {totalPages > 1 && (
                <div className="flex items-center justify-between bg-white 
                                rounded-lg border border-gray-200 px-3 py-2">
                  <p className="text-xs text-gray-600">
                    Page {currentPage}/{totalPages}
                  </p>
                  <div className="flex gap-1.5">
                    <button
                      onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                      disabled={currentPage === 1 || loading}
                      className="px-3 py-1 bg-gray-100 text-gray-700 text-xs rounded 
                                 font-medium hover:bg-gray-200 disabled:opacity-50 
                                 disabled:cursor-not-allowed"
                    >
                      ←
                    </button>
                    <button
                      onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                      disabled={currentPage === totalPages || loading}
                      className="px-3 py-1 bg-gradient-to-r from-purple-500 to-purple-600 
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
              <FileText className="w-12 h-12 text-gray-300 mx-auto mb-3" />
              <h3 className="text-base font-bold text-gray-900 mb-1">
                Aucune consultation
              </h3>
              <p className="text-sm text-gray-500 mb-4">
                {searchQuery || statusFilter !== 'all' || typeFilter !== 'all'
                  ? 'Aucun résultat trouvé'
                  : 'Les consultations apparaîtront ici'}
              </p>
              {(searchQuery || statusFilter !== 'all' || typeFilter !== 'all') && (
                <button
                  onClick={handleResetFilters}
                  className="px-4 py-2 bg-gradient-to-r from-purple-500 to-purple-600 
                             text-white text-sm rounded-lg font-medium hover:shadow-md"
                >
                  Réinitialiser
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
