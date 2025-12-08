/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useState, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FileText, Search, Filter,
  Clock, CheckCircle, XCircle, AlertCircle,
  Download, Eye, RefreshCw, X,
  User, Calendar, DollarSign, Loader,
  Mail, Phone, MapPin, Star, MessageSquare,
  Sparkles, Zap, TrendingUp
} from 'lucide-react';

import Link from 'next/link';
import { useAdminConsultations } from '@/hooks/useAdminConsultations';

type ConsultationStatus = 'all' | 'PENDING' | 'GENERATING' | 'COMPLETED' | 'ERROR';
type ConsultationType = 'all' | 'SPIRITUALITE' | 'TAROT' | 'ASTROLOGIE' | 'NUMEROLOGIE';

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
      pending: consultations.filter(c => c.status === 'PENDING').length,
      generating: consultations.filter(c => c.status === 'GENERATING').length,
      completed: consultations.filter(c => c.status === 'COMPLETED').length,
      error: consultations.filter(c => c.status === 'ERROR').length,
      paid: consultations.filter(c => c.isPaid).length,
      totalRevenue: consultations.reduce((sum, c) => sum + (c.price || 0), 0),
      avgRating: consultations.filter(c => c.rating).length > 0
        ? (consultations.reduce((sum, c) => sum + (c.rating || 0), 0) / consultations.filter(c => c.rating).length).toFixed(1)
        : 0,
    };
  }, [consultations]);

  const [isRefreshing, setIsRefreshing] = useState(false);
  const handleRefresh = useCallback(async () => {
    setIsRefreshing(true);
    await refetch();
    setTimeout(() => setIsRefreshing(false), 500);
  }, [refetch]);

  const handleResetFilters = useCallback(() => {
    setSearchQuery('');
    setStatusFilter('all');
    setTypeFilter('all');
    setCurrentPage(1);
  }, []);

  const totalPages = Math.ceil(total / 18);

  // Helpers pour affichage
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'COMPLETED': return 'bg-green-100 text-green-700 border-green-200';
      case 'GENERATING': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'PENDING': return 'bg-orange-100 text-orange-700 border-orange-200';
      case 'ERROR': return 'bg-red-100 text-red-700 border-red-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'COMPLETED': return <CheckCircle className="w-2.5 h-2.5" />;
      case 'GENERATING': return <Loader className="w-2.5 h-2.5 animate-spin" />;
      case 'PENDING': return <Clock className="w-2.5 h-2.5" />;
      case 'ERROR': return <XCircle className="w-2.5 h-2.5" />;
      default: return <AlertCircle className="w-2.5 h-2.5" />;
    }
  };

  const getStatusText = (status: string) => {
    const map: Record<string, string> = {
      'COMPLETED': 'Complétée',
      'GENERATING': 'En cours',
      'PENDING': 'En attente',
      'ERROR': 'Erreur'
    };
    return map[status] || status;
  };

  const getTypeText = (type: string) => {
    const map: Record<string, string> = {
      'SPIRITUALITE': 'Spiritualité',
      'TAROT': 'Tarot',
      'ASTROLOGIE': 'Astrologie',
      'NUMEROLOGIE': 'Numérologie'
    };
    return map[type] || type;
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'SPIRITUALITE': return '🌟';
      case 'TAROT': return '🃏';
      case 'ASTROLOGIE': return '⭐';
      case 'NUMEROLOGIE': return '🔢';
      default: return '📋';
    }
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.03 }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 8 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.3, ease: 'easeOut' }
    }
  };

  if (loading && !consultations) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
            className="w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full mx-auto mb-3"
          />
          <p className="text-sm text-gray-900 font-semibold">Chargement des consultations...</p>
          <p className="text-xs text-gray-500 mt-1">Veuillez patienter</p>
        </motion.div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50 px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center max-w-sm w-full bg-white rounded-xl shadow-xl border border-gray-200 p-6"
        >
          <motion.div
            animate={{ 
              rotate: [0, 10, -10, 10, 0],
              transition: { duration: 0.5, repeat: Infinity, repeatDelay: 2 }
            }}
          >
            <AlertCircle className="w-14 h-14 text-red-500 mx-auto mb-3" />
          </motion.div>
          <h3 className="text-lg font-bold text-gray-900 mb-2">Erreur de chargement</h3>
          <p className="text-sm text-gray-600 mb-4 leading-relaxed">{error}</p>
          <button
            onClick={handleRefresh}
            disabled={isRefreshing}
            className="w-full px-4 py-2.5 bg-gradient-to-r from-purple-500 to-purple-600 
                       text-white text-sm rounded-lg font-semibold hover:shadow-lg 
                       transition-all disabled:opacity-50 flex items-center justify-center gap-2"
          >
            <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
            {isRefreshing ? 'Chargement...' : 'Réessayer'}
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* En-tête compact et sticky */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-30 shadow-sm">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 py-3">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <div className="p-1.5 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg">
                <FileText className="w-4 h-4 text-white" />
              </div>
              <div>
                <h1 className="text-lg sm:text-xl font-bold text-gray-900">
                  Consultations
                </h1>
                <p className="text-xs text-gray-500 flex items-center gap-1">
                  <Zap className="w-3 h-3" />
                  {total} au total
                </p>
              </div>
            </div>

            <motion.button
              onClick={handleRefresh}
              disabled={isRefreshing || loading}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`p-2 rounded-lg transition-all ${
                isRefreshing || loading
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              <RefreshCw className={`w-4 h-4 ${isRefreshing || loading ? 'animate-spin' : ''}`} />
            </motion.button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-3 sm:px-4 py-4">
        {/* Bannière de rafraîchissement */}
        <AnimatePresence>
          {(loading || isRefreshing) && consultations && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mb-4 bg-gradient-to-r from-purple-500 to-purple-600 text-white 
                         rounded-lg p-3 flex items-center justify-center gap-2 shadow-md"
            >
              <Loader className="w-4 h-4 animate-spin" />
              <span className="text-sm font-medium">
                Mise à jour des données en cours...
              </span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Stats enrichies avec animations */}
        {stats && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-3 mb-4"
          >
            {/* Stats principales */}
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
              {[
                { icon: FileText, label: 'Total', value: stats.total, color: 'purple' },
                { icon: Clock, label: 'Attente', value: stats.pending, color: 'orange' },
                { icon: Loader, label: 'En cours', value: stats.generating, color: 'blue' },
                { icon: CheckCircle, label: 'Terminées', value: stats.completed, color: 'green' },
                { icon: XCircle, label: 'Erreurs', value: stats.error, color: 'red', span: 'col-span-2 sm:col-span-1' },
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ scale: 1.02 }}
                  className={`bg-white rounded-lg p-2.5 border border-gray-200 
                             hover:shadow-md transition-all ${stat.span || ''}`}
                >
                  <div className="flex items-center gap-2">
                    <div className={`p-1 bg-${stat.color}-50 rounded`}>
                      <stat.icon className={`w-3.5 h-3.5 text-${stat.color}-600`} />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">{stat.label}</p>
                      <p className="text-lg font-bold text-gray-900">{stat.value}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Stats secondaires (revenue, ratings) */}
            <div className="grid grid-cols-3 gap-2">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 }}
                whileHover={{ scale: 1.02 }}
                className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg p-2.5 border border-green-200"
              >
                <div className="flex items-center gap-2">
                  <div className="p-1 bg-green-100 rounded">
                    <DollarSign className="w-3.5 h-3.5 text-green-600" />
                  </div>
                  <div>
                    <p className="text-xs text-green-700 font-medium">Revenu Total</p>
                    <p className="text-base font-bold text-green-900">{stats.totalRevenue.toLocaleString()} F</p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.35 }}
                whileHover={{ scale: 1.02 }}
                className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-lg p-2.5 border border-amber-200"
              >
                <div className="flex items-center gap-2">
                  <div className="p-1 bg-amber-100 rounded">
                    <Star className="w-3.5 h-3.5 text-amber-600" />
                  </div>
                  <div>
                    <p className="text-xs text-amber-700 font-medium">Note Moyenne</p>
                    <p className="text-base font-bold text-amber-900">{stats.avgRating}/5</p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 }}
                whileHover={{ scale: 1.02 }}
                className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-2.5 border border-blue-200"
              >
                <div className="flex items-center gap-2">
                  <div className="p-1 bg-blue-100 rounded">
                    <TrendingUp className="w-3.5 h-3.5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-xs text-blue-700 font-medium">Payées</p>
                    <p className="text-base font-bold text-blue-900">{stats.paid}</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}

        {/* Barre de recherche et filtres */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-4"
        >
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
                placeholder="Rechercher par client, titre..."
                disabled={loading}
                className="w-full bg-white border border-gray-300 text-sm text-gray-900 
                           pl-8 pr-8 py-2 rounded-lg focus:outline-none 
                           focus:ring-2 focus:ring-purple-400 focus:border-transparent
                           disabled:bg-gray-50 disabled:cursor-not-allowed transition-all"
              />
              {searchQuery && (
                <motion.button
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 
                             hover:text-gray-600 transition-colors"
                >
                  <X className="w-4 h-4" />
                </motion.button>
              )}
            </div>

            <motion.button
              onClick={() => setShowFilters(!showFilters)}
              disabled={loading}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`flex items-center gap-1.5 px-3 py-2 text-sm rounded-lg 
                         font-medium transition-all disabled:opacity-50 
                         disabled:cursor-not-allowed ${
                showFilters || statusFilter !== 'all' || typeFilter !== 'all'
                  ? 'bg-gradient-to-r from-purple-500 to-purple-600 text-white shadow-md'
                  : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
              }`}
            >
              <Filter className="w-4 h-4" />
              <span className="hidden sm:inline">Filtres</span>
            </motion.button>
          </div>

          {/* Panneau filtres */}
          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.2 }}
                className="bg-white border border-gray-200 rounded-lg p-3 mt-2 overflow-hidden"
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
                      <option value="all">Tous statuts</option>
                      <option value="PENDING">En attente</option>
                      <option value="GENERATING">En cours</option>
                      <option value="COMPLETED">Terminées</option>
                      <option value="ERROR">Erreurs</option>
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
                      <option value="all">Tous types</option>
                      <option value="SPIRITUALITE">Spiritualité</option>
                      <option value="TAROT">Tarot</option>
                      <option value="ASTROLOGIE">Astrologie</option>
                      <option value="NUMEROLOGIE">Numérologie</option>
                    </select>
                  </div>
                </div>

                {(statusFilter !== 'all' || typeFilter !== 'all') && (
                  <motion.button
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    onClick={handleResetFilters}
                    disabled={loading}
                    className="text-xs text-purple-600 hover:text-purple-700 
                               font-medium flex items-center gap-1 mt-2
                               disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <X className="w-3 h-3" />
                    Réinitialiser les filtres
                  </motion.button>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Grille consultations enrichie */}
        <div className="relative">
          <AnimatePresence>
            {loading && consultations && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 bg-white/70 backdrop-blur-sm z-10 
                           rounded-lg flex items-center justify-center"
              >
                <div className="bg-white rounded-lg shadow-xl border border-gray-200 p-4 
                                flex items-center gap-3">
                  <Loader className="w-5 h-5 text-purple-600 animate-spin" />
                  <p className="text-sm font-semibold text-gray-900">
                    Chargement...
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {consultations && consultations.length > 0 ? (
            <div className="space-y-4">
              <motion.div 
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3"
              >
                {consultations.map((consultation: any) => (
                  <motion.div
                    key={consultation.id}
                    variants={cardVariants}
                    whileHover={{ y: -4, boxShadow: '0 10px 25px rgba(0,0,0,0.1)' }}
                    className="bg-white rounded-lg border border-gray-200 p-3 transition-all"
                  >
                    {/* En-tête avec type et statut */}
                    <div className="flex items-start justify-between mb-2.5">
                      <div className="flex items-center gap-1.5">
                        <span className="text-lg">{getTypeIcon(consultation.type)}</span>
                        <div className="flex-1 min-w-0">
                          <h3 className="text-xs font-semibold text-gray-900 truncate">
                            {getTypeText(consultation.type)}
                          </h3>
                        </div>
                      </div>
                      <span className={`inline-flex items-center gap-0.5 px-2 py-0.5 
                                      rounded-full text-xs font-medium border ${
                        getStatusColor(consultation.status)
                      }`}>
                        {getStatusIcon(consultation.status)}
                        {getStatusText(consultation.status)}
                      </span>
                    </div>

                    {/* Titre de la consultation */}
                    <div className="mb-2 pb-2 border-b border-gray-100">
                      <p className="text-xs font-bold text-gray-900 line-clamp-2 leading-tight">
                        {consultation.title}
                      </p>
                    </div>

                    {/* Infos client enrichies */}
                    <div className="space-y-1.5 mb-2.5 pb-2.5 border-b border-gray-100">
                      <div className="flex items-center gap-1.5 text-xs text-gray-600">
                        <User className="w-3 h-3 flex-shrink-0" />
                        <span className="truncate font-medium">
                          {consultation.formData?.prenoms} {consultation.formData?.nom}
                        </span>
                      </div>
                      {consultation.clientId?.email && (
                        <div className="flex items-center gap-1.5 text-xs text-gray-600">
                          <Mail className="w-3 h-3 flex-shrink-0" />
                          <span className="truncate">{consultation.clientId.email}</span>
                        </div>
                      )}
                      {consultation.formData?.numeroSend && (
                        <div className="flex items-center gap-1.5 text-xs text-gray-600">
                          <Phone className="w-3 h-3 flex-shrink-0" />
                          <span>{consultation.formData.numeroSend}</span>
                        </div>
                      )}
                      {consultation.formData?.paysNaissance && (
                        <div className="flex items-center gap-1.5 text-xs text-gray-600">
                          <MapPin className="w-3 h-3 flex-shrink-0" />
                          <span className="truncate">
                            {consultation.formData.villeNaissance}, {consultation.formData.paysNaissance}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Métriques */}
                    <div className="grid grid-cols-3 gap-1.5 mb-2.5 pb-2.5 border-b border-gray-100">
                      <div className="text-center">
                        <p className="text-xs text-gray-500">Prix</p>
                        <p className="text-sm font-bold text-gray-900">
                          {consultation.price ? `${consultation.price} F` : 'Gratuit'}
                        </p>
                      </div>
                      <div className="text-center">
                        <p className="text-xs text-gray-500">Payé</p>
                        <p className={`text-sm font-bold ${
                          consultation.isPaid ? 'text-green-600' : 'text-red-600'
                        }`}>
                          {consultation.isPaid ? 'Oui' : 'Non'}
                        </p>
                      </div>
                      <div className="text-center">
                        <p className="text-xs text-gray-500">Note</p>
                        <div className="flex items-center justify-center gap-0.5">
                          <Star className={`w-3 h-3 ${
                            consultation.rating ? 'text-amber-500 fill-amber-500' : 'text-gray-300'
                          }`} />
                          <p className="text-sm font-bold text-gray-900">
                            {consultation.rating || '-'}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Badges supplémentaires */}
                    <div className="flex flex-wrap items-center gap-1.5 mb-3">
                      <span className="inline-flex items-center gap-0.5 px-2 py-0.5 
                                     rounded-full text-xs font-medium bg-blue-100 text-blue-700">
                        <Calendar className="w-2.5 h-2.5" />
                        {new Date(consultation.createdAt).toLocaleDateString('fr-FR')}
                      </span>
                      
                      {consultation.review && (
                        <span className="inline-flex items-center gap-0.5 px-2 py-0.5 
                                       rounded-full text-xs font-medium bg-purple-100 text-purple-700">
                          <MessageSquare className="w-2.5 h-2.5" />
                          Avis
                        </span>
                      )}

                      {consultation.resultData && (
                        <span className="inline-flex items-center gap-0.5 px-2 py-0.5 
                                       rounded-full text-xs font-medium bg-green-100 text-green-700">
                          <Sparkles className="w-2.5 h-2.5" />
                          Résultat
                        </span>
                      )}
                    </div>

                    {/* Boutons d'action */}
                    <div className="flex gap-1.5">
                      <Link
                        href={`/dashboard/admin/consultations/${consultation.id}`}
                        className="flex-1 flex items-center justify-center gap-1 
                                   px-2 py-1.5 bg-purple-600 text-white text-xs 
                                   rounded font-medium hover:bg-purple-700 transition-colors"
                      >
                        <Eye className="w-3 h-3" />
                        Détails
                      </Link>
                      {consultation.status === 'COMPLETED' && consultation.resultData && (
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
              </motion.div>

              {/* Pagination */}
              {totalPages > 1 && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="flex items-center justify-between bg-white 
                            rounded-lg border border-gray-200 px-3 py-2 shadow-sm"
                >
                  <p className="text-xs text-gray-600 font-medium">
                    Page {currentPage} sur {totalPages}
                  </p>
                  <div className="flex gap-1.5">
                    <motion.button
                      onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                      disabled={currentPage === 1 || loading}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-3 py-1 bg-gray-100 text-gray-700 text-xs rounded 
                                 font-medium hover:bg-gray-200 disabled:opacity-50 
                                 disabled:cursor-not-allowed transition-all"
                    >
                      ← Préc
                    </motion.button>
                    <motion.button
                      onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                      disabled={currentPage === totalPages || loading}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-3 py-1 bg-gradient-to-r from-purple-500 to-purple-600 
                                 text-white text-xs rounded font-medium hover:shadow-md 
                                 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                    >
                      Suiv →
                    </motion.button>
                  </div>
                </motion.div>
              )}
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-lg border border-gray-200 p-8 text-center"
            >
              <FileText className="w-14 h-14 text-gray-300 mx-auto mb-3" />
              <h3 className="text-base font-bold text-gray-900 mb-1">
                Aucune consultation trouvée
              </h3>
              <p className="text-sm text-gray-500 mb-4">
                {searchQuery || statusFilter !== 'all' || typeFilter !== 'all'
                  ? 'Aucun résultat ne correspond à vos critères'
                  : 'Les consultations apparaîtront ici'}
              </p>
              {(searchQuery || statusFilter !== 'all' || typeFilter !== 'all') && (
                <button
                  onClick={handleResetFilters}
                  className="px-4 py-2 bg-gradient-to-r from-purple-500 to-purple-600 
                             text-white text-sm rounded-lg font-medium hover:shadow-md
                             transition-all"
                >
                  Réinitialiser les filtres
                </button>
              )}
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
