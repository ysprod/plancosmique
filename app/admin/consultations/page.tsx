/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import { useAdminConsultations } from '@/hooks/useAdminConsultations';
import { AnimatePresence, motion } from 'framer-motion';
import {
  AlertCircle,
  Calendar,
  CheckCircle,
  ChevronLeft, ChevronRight,
  ChevronsLeft, ChevronsRight,
  Clock,
  DollarSign,
  Download, Eye,
  FileText,
  Loader,
  Mail,
  MapPin,
  MessageSquare,
  Phone,
  RefreshCw,
  Sparkles,
  Star,
  User,
  XCircle,
  Zap
} from 'lucide-react';
import Link from 'next/link';
import { useCallback, useMemo, useState } from 'react';

type ConsultationStatus = 'all' | 'PENDING' | 'GENERATING' | 'COMPLETED' | 'ERROR';
type ConsultationType = 'all' | 'SPIRITUALITE' | 'TAROT' | 'ASTROLOGIE' | 'NUMEROLOGIE';

const ITEMS_PER_PAGE = 5;

export default function ConsultationsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<ConsultationStatus>('all');
  const [typeFilter, setTypeFilter] = useState<ConsultationType>('all');
  const [currentPage, setCurrentPage] = useState(1);

  const { consultations, total, loading, error, refetch } = useAdminConsultations({
    search: searchQuery,
    status: statusFilter,
    type: typeFilter,
    page: currentPage,
    limit: ITEMS_PER_PAGE,
  });

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
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

  const totalPages = Math.ceil(total / ITEMS_PER_PAGE);

  // Fonction pour gérer le changement de page
  const handlePageChange = useCallback((page: number) => {
    setCurrentPage(page);
    // Scroll vers le haut avec animation
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  // Génération des numéros de pages visibles
  const getVisiblePageNumbers = useMemo(() => {
    const pages: (number | string)[] = [];
    const maxVisible = 5; // Nombre maximum de boutons de page visibles

    if (totalPages <= maxVisible) {
      // Si peu de pages, afficher toutes
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Logique pour afficher les pages avec ellipses
      if (currentPage <= 3) {
        // Début : 1 2 3 4 ... 10
        for (let i = 1; i <= 4; i++) {
          pages.push(i);
        }
        pages.push('...');
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        // Fin : 1 ... 7 8 9 10
        pages.push(1);
        pages.push('...');
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        // Milieu : 1 ... 4 5 6 ... 10
        pages.push(1);
        pages.push('...');
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pages.push(i);
        }
        pages.push('...');
        pages.push(totalPages);
      }
    }

    return pages;
  }, [currentPage, totalPages]);

  // Helpers pour affichage (identiques à avant)
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
      transition: { staggerChildren: 0.05 }
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
      {/* En-tête (identique) */}
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
        {/* Bannière + Stats (identique au code précédent) */}
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

        {/* Stats (code identique à avant - je le skip pour la concision) */}
        {/* ... (Stats principales et secondaires) ... */}

        {/* Barre de recherche (identique) */}
        {/* ... (Code de recherche et filtres) ... */}

        {/* Grille consultations */}
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
              {/* Cards en liste verticale (5 max) */}
              <motion.div 
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                key={currentPage} // Force re-animation à chaque changement de page
                className="space-y-3"
              >
                {consultations.map((consultation: any) => (
                  <motion.div
                    key={consultation.id}
                    variants={cardVariants}
                    whileHover={{ x: 4, boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }}
                    className="bg-white rounded-lg border border-gray-200 p-4 transition-all"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                      {/* Colonne gauche : Type + Infos */}
                      <div className="flex-1 space-y-3">
                        {/* Type et statut */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="text-2xl">{getTypeIcon(consultation.type)}</span>
                            <div>
                              <h3 className="text-sm font-bold text-gray-900">
                                {getTypeText(consultation.type)}
                              </h3>
                              <p className="text-xs text-gray-500 line-clamp-1">
                                {consultation.title}
                              </p>
                            </div>
                          </div>
                          <span className={`inline-flex items-center gap-1 px-2.5 py-1 
                                          rounded-full text-xs font-medium border ${
                            getStatusColor(consultation.status)
                          }`}>
                            {getStatusIcon(consultation.status)}
                            {getStatusText(consultation.status)}
                          </span>
                        </div>

                        {/* Infos client */}
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                          <div className="flex items-center gap-1.5 text-xs text-gray-600">
                            <User className="w-3.5 h-3.5 flex-shrink-0" />
                            <span className="truncate font-medium">
                              {consultation.formData?.prenoms} {consultation.formData?.nom}
                            </span>
                          </div>
                          {consultation.clientId?.email && (
                            <div className="flex items-center gap-1.5 text-xs text-gray-600">
                              <Mail className="w-3.5 h-3.5 flex-shrink-0" />
                              <span className="truncate">{consultation.clientId.email}</span>
                            </div>
                          )}
                          {consultation.formData?.numeroSend && (
                            <div className="flex items-center gap-1.5 text-xs text-gray-600">
                              <Phone className="w-3.5 h-3.5 flex-shrink-0" />
                              <span>{consultation.formData.numeroSend}</span>
                            </div>
                          )}
                          {consultation.formData?.paysNaissance && (
                            <div className="flex items-center gap-1.5 text-xs text-gray-600">
                              <MapPin className="w-3.5 h-3.5 flex-shrink-0" />
                              <span className="truncate">
                                {consultation.formData.villeNaissance}, {consultation.formData.paysNaissance}
                              </span>
                            </div>
                          )}
                        </div>

                        {/* Badges et métriques */}
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 
                                         rounded-full text-xs font-medium bg-blue-50 text-blue-700 border border-blue-200">
                            <Calendar className="w-3 h-3" />
                            {new Date(consultation.createdAt).toLocaleDateString('fr-FR')}
                          </span>
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 
                                         rounded-full text-xs font-medium bg-green-50 text-green-700 border border-green-200">
                            <DollarSign className="w-3 h-3" />
                            {consultation.price ? `${consultation.price} F` : 'Gratuit'}
                          </span>
                          <span className={`inline-flex items-center gap-1 px-2 py-0.5 
                                         rounded-full text-xs font-medium border ${
                            consultation.isPaid 
                              ? 'bg-green-50 text-green-700 border-green-200' 
                              : 'bg-red-50 text-red-700 border-red-200'
                          }`}>
                            {consultation.isPaid ? 'Payé' : 'Non payé'}
                          </span>
                          {consultation.rating && (
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 
                                           rounded-full text-xs font-medium bg-amber-50 text-amber-700 border border-amber-200">
                              <Star className="w-3 h-3 fill-amber-500" />
                              {consultation.rating}/5
                            </span>
                          )}
                          {consultation.review && (
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 
                                           rounded-full text-xs font-medium bg-purple-50 text-purple-700 border border-purple-200">
                              <MessageSquare className="w-3 h-3" />
                              Avis
                            </span>
                          )}
                          {consultation.resultData && (
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 
                                           rounded-full text-xs font-medium bg-green-50 text-green-700 border border-green-200">
                              <Sparkles className="w-3 h-3" />
                              Résultat
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Colonne droite : Actions */}
                      <div className="flex sm:flex-col gap-2 sm:w-32">
                        <Link
                          href={`/admin/consultations/${consultation.id}`}
                          className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 
                                     px-4 py-2 bg-purple-600 text-white text-sm 
                                     rounded-lg font-medium hover:bg-purple-700 transition-colors"
                        >
                          <Eye className="w-4 h-4" />
                          Détails
                        </Link>
                        {consultation.status === 'COMPLETED' && consultation.resultData && (
                          <button
                            className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 
                                       px-4 py-2 bg-green-600 text-white text-sm 
                                       rounded-lg font-medium hover:bg-green-700 transition-colors"
                          >
                            <Download className="w-4 h-4" />
                            PDF
                          </button>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>

              {/* Pagination Ultra-Moderne */}
              {totalPages > 1 && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm"
                >
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                    {/* Info pagination */}
                    <div className="text-sm text-gray-600">
                      Affichage de <span className="font-semibold text-gray-900">
                        {((currentPage - 1) * ITEMS_PER_PAGE) + 1}
                      </span> à <span className="font-semibold text-gray-900">
                        {Math.min(currentPage * ITEMS_PER_PAGE, total)}
                      </span> sur <span className="font-semibold text-gray-900">{total}</span> résultats
                    </div>

                    {/* Boutons pagination */}
                    <div className="flex items-center gap-1">
                      {/* Première page */}
                      <motion.button
                        onClick={() => handlePageChange(1)}
                        disabled={currentPage === 1 || loading}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50 
                                   disabled:opacity-40 disabled:cursor-not-allowed
                                   transition-colors"
                        title="Première page"
                      >
                        <ChevronsLeft className="w-4 h-4 text-gray-600" />
                      </motion.button>

                      {/* Page précédente */}
                      <motion.button
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1 || loading}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50 
                                   disabled:opacity-40 disabled:cursor-not-allowed
                                   transition-colors"
                        title="Page précédente"
                      >
                        <ChevronLeft className="w-4 h-4 text-gray-600" />
                      </motion.button>

                      {/* Numéros de pages */}
                      <div className="hidden sm:flex items-center gap-1">
                        {getVisiblePageNumbers.map((page, index) => (
                          page === '...' ? (
                            <span key={`ellipsis-${index}`} className="px-3 py-2 text-gray-400">
                              ...
                            </span>
                          ) : (
                            <motion.button
                              key={page}
                              onClick={() => handlePageChange(page as number)}
                              disabled={loading}
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              className={`min-w-[36px] px-3 py-2 rounded-lg text-sm font-medium 
                                         transition-all ${
                                page === currentPage
                                  ? 'bg-gradient-to-r from-purple-500 to-purple-600 text-white shadow-md'
                                  : 'border border-gray-300 text-gray-700 hover:bg-gray-50'
                              } disabled:opacity-40 disabled:cursor-not-allowed`}
                            >
                              {page}
                            </motion.button>
                          )
                        ))}
                      </div>

                      {/* Page actuelle (mobile) */}
                      <div className="sm:hidden px-3 py-2 bg-gradient-to-r from-purple-500 to-purple-600 
                                      text-white rounded-lg text-sm font-semibold">
                        {currentPage} / {totalPages}
                      </div>

                      {/* Page suivante */}
                      <motion.button
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages || loading}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50 
                                   disabled:opacity-40 disabled:cursor-not-allowed
                                   transition-colors"
                        title="Page suivante"
                      >
                        <ChevronRight className="w-4 h-4 text-gray-600" />
                      </motion.button>

                      {/* Dernière page */}
                      <motion.button
                        onClick={() => handlePageChange(totalPages)}
                        disabled={currentPage === totalPages || loading}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50 
                                   disabled:opacity-40 disabled:cursor-not-allowed
                                   transition-colors"
                        title="Dernière page"
                      >
                        <ChevronsRight className="w-4 h-4 text-gray-600" />
                      </motion.button>
                    </div>
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
