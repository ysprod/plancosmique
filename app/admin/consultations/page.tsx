/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import { useAdminConsultations } from '@/hooks/useAdminConsultations';
import { AnimatePresence, motion } from 'framer-motion';
import {
  AlertCircle,
  Calendar,
  CheckCircle,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Clock,
  DollarSign,
  Download,
  Edit,
  Eye,
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
import { useRouter } from 'next/navigation';
import { api } from '@/lib/api/client';
import { useCallback, useMemo, useState, memo } from 'react';

type ConsultationStatus = 'all' | 'PENDING' | 'GENERATING' | 'COMPLETED' | 'ERROR';
type ConsultationType = 'all' | 'SPIRITUALITE' | 'TAROT' | 'ASTROLOGIE' | 'NUMEROLOGIE';

const ITEMS_PER_PAGE = 5;

// =====================================================
// SOUS-COMPOSANTS MÉMORISÉS
// =====================================================

const StatusBadge = memo(({ status }: { status: string }) => {
  const config = useMemo(() => {
    const configs: Record<string, { color: string; icon: JSX.Element; text: string }> = {
      'COMPLETED': {
        color: 'bg-green-100 text-green-700 border-green-200',
        icon: <CheckCircle className="w-2.5 h-2.5" />,
        text: 'Complétée'
      },
      'GENERATING': {
        color: 'bg-blue-100 text-blue-700 border-blue-200',
        icon: <Loader className="w-2.5 h-2.5 animate-spin" />,
        text: 'En cours'
      },
      'PENDING': {
        color: 'bg-orange-100 text-orange-700 border-orange-200',
        icon: <Clock className="w-2.5 h-2.5" />,
        text: 'En attente'
      },
      'ERROR': {
        color: 'bg-red-100 text-red-700 border-red-200',
        icon: <XCircle className="w-2.5 h-2.5" />,
        text: 'Erreur'
      }
    };
    return configs[status] || {
      color: 'bg-gray-100 text-gray-700 border-gray-200',
      icon: <AlertCircle className="w-2.5 h-2.5" />,
      text: status
    };
  }, [status]);

  return (
    <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium border ${config.color}`}>
      {config.icon}
      {config.text}
    </span>
  );
});
StatusBadge.displayName = 'StatusBadge';

const ConsultationCard = memo(({
  consultation,
  onGenerateAnalysis,
  onModifyAnalysis,
  isGenerating
}: {
  consultation: any;
  onGenerateAnalysis: (id: string) => void;
  onModifyAnalysis: (id: string) => void;
  isGenerating: boolean;
}) => {
  const typeConfig = useMemo(() => {
    const configs: Record<string, { icon: string; text: string }> = {
      'SPIRITUALITE': { icon: '🌟', text: 'Spiritualité' },
      'TAROT': { icon: '🃏', text: 'Tarot' },
      'ASTROLOGIE': { icon: '⭐', text: 'Astrologie' },
      'NUMEROLOGIE': { icon: '🔢', text: 'Numérologie' }
    };
    return configs[consultation.type] || { icon: '📋', text: consultation.type };
  }, [consultation.type]);

  const hasAnalysis = useMemo(() => 
    consultation.status === 'COMPLETED' && consultation.resultData,
    [consultation.status, consultation.resultData]
  );

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      whileHover={{ x: 2, boxShadow: '0 4px 16px rgba(0,0,0,0.08)' }}
      className="bg-white rounded-xl border border-gray-200 p-3 transition-shadow"
    >
      {/* Header compact */}
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2 flex-1 min-w-0">
          <span className="text-xl flex-shrink-0">{typeConfig.icon}</span>
          <div className="flex-1 min-w-0">
            <h3 className="text-sm font-bold text-gray-900 truncate">
              {typeConfig.text}
            </h3>
            <p className="text-[11px] text-gray-500 truncate">
              {consultation.title}
            </p>
          </div>
        </div>
        <StatusBadge status={consultation.status} />
      </div>

      {/* Infos client compact (2 colonnes mobile) */}
      <div className="grid grid-cols-2 gap-1.5 mb-2 text-[11px]">
        <div className="flex items-center gap-1 text-gray-600 truncate">
          <User className="w-3 h-3 flex-shrink-0" />
          <span className="truncate font-medium">
            {consultation.formData?.prenoms} {consultation.formData?.nom}
          </span>
        </div>
        {consultation.clientId?.email && (
          <div className="flex items-center gap-1 text-gray-600 truncate">
            <Mail className="w-3 h-3 flex-shrink-0" />
            <span className="truncate">{consultation.clientId.email}</span>
          </div>
        )}
        {consultation.formData?.numeroSend && (
          <div className="flex items-center gap-1 text-gray-600">
            <Phone className="w-3 h-3 flex-shrink-0" />
            <span>{consultation.formData.numeroSend}</span>
          </div>
        )}
        {consultation.formData?.paysNaissance && (
          <div className="flex items-center gap-1 text-gray-600 truncate">
            <MapPin className="w-3 h-3 flex-shrink-0" />
            <span className="truncate">
              {consultation.formData.villeNaissance}, {consultation.formData.paysNaissance}
            </span>
          </div>
        )}
      </div>

      {/* Badges métriques (scrollable horizontal mobile) */}
      <div className="flex gap-1.5 overflow-x-auto scrollbar-hide mb-3 pb-1">
        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium bg-blue-50 text-blue-700 border border-blue-200 flex-shrink-0">
          <Calendar className="w-2.5 h-2.5" />
          {new Date(consultation.createdAt).toLocaleDateString('fr-FR', { day: '2-digit', month: 'short' })}
        </span>
        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium bg-green-50 text-green-700 border border-green-200 flex-shrink-0">
          <DollarSign className="w-2.5 h-2.5" />
          {consultation.price ? `${consultation.price} F` : 'Gratuit'}
        </span>
        <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium border flex-shrink-0 ${
          consultation.isPaid
            ? 'bg-green-50 text-green-700 border-green-200'
            : 'bg-red-50 text-red-700 border-red-200'
        }`}>
          {consultation.isPaid ? '✓ Payé' : '✗ Non payé'}
        </span>
        {consultation.rating && (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium bg-amber-50 text-amber-700 border border-amber-200 flex-shrink-0">
            <Star className="w-2.5 h-2.5 fill-amber-500" />
            {consultation.rating}/5
          </span>
        )}
        {consultation.review && (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium bg-purple-50 text-purple-700 border border-purple-200 flex-shrink-0">
            <MessageSquare className="w-2.5 h-2.5" />
            Avis
          </span>
        )}
      </div>

      {/* Actions compactes - 2x2 grid */}
      <div className="grid grid-cols-2 gap-2">
        {/* Bouton Détails - Toujours visible */}
        <Link
          href={`/admin/consultations/${consultation.id}`}
          className="flex items-center justify-center gap-1.5 px-3 py-2
                     bg-purple-600 text-white text-xs rounded-lg font-medium
                     hover:bg-purple-700 transition-colors active:scale-[0.98]"
        >
          <Eye className="w-3.5 h-3.5" />
          Détails
        </Link>

        {/* Bouton Générer/Régénérer - Toujours visible */}
        <button
          onClick={() => onGenerateAnalysis(consultation.id)}
          disabled={isGenerating}
          className="flex items-center justify-center gap-1.5 px-3 py-2
                     bg-blue-600 text-white text-xs rounded-lg font-medium
                     hover:bg-blue-700 transition-colors active:scale-[0.98]
                     disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Sparkles className={`w-3.5 h-3.5 ${isGenerating ? 'animate-spin' : ''}`} />
          {isGenerating ? 'Génération...' : (hasAnalysis ? 'Régénérer' : 'Générer')}
        </button>

        {/* Boutons supplémentaires si analyse existe */}
        {hasAnalysis && (
          <>
            <button
              onClick={() => onModifyAnalysis(consultation.id)}
              className="flex items-center justify-center gap-1.5 px-3 py-2
                       bg-orange-600 text-white text-xs rounded-lg font-medium
                       hover:bg-orange-700 transition-colors active:scale-[0.98]"
            >
              <Edit className="w-3.5 h-3.5" />
              Modifier
            </button>
            <button
              className="flex items-center justify-center gap-1.5 px-3 py-2
                       bg-green-600 text-white text-xs rounded-lg font-medium
                       hover:bg-green-700 transition-colors active:scale-[0.98]"
            >
              <Download className="w-3.5 h-3.5" />
              PDF
            </button>
          </>
        )}
      </div>
    </motion.div>
  );
});
ConsultationCard.displayName = 'ConsultationCard';

const PaginationControls = memo(({
  currentPage,
  totalPages,
  total,
  itemsPerPage,
  onPageChange,
  loading
}: {
  currentPage: number;
  totalPages: number;
  total: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
  loading: boolean;
}) => {
  const getVisiblePageNumbers = useMemo(() => {
    const pages: (number | string)[] = [];
    const maxVisible = 5;

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) pages.push(i);
        pages.push('...');
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1);
        pages.push('...');
        for (let i = totalPages - 3; i <= totalPages; i++) pages.push(i);
      } else {
        pages.push(1);
        pages.push('...');
        for (let i = currentPage - 1; i <= currentPage + 1; i++) pages.push(i);
        pages.push('...');
        pages.push(totalPages);
      }
    }
    return pages;
  }, [currentPage, totalPages]);

  if (totalPages <= 1) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl border border-gray-200 p-3 shadow-sm"
    >
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
        {/* Info */}
        <div className="text-xs text-gray-600">
          <span className="font-semibold text-gray-900">
            {((currentPage - 1) * itemsPerPage) + 1}
          </span> - <span className="font-semibold text-gray-900">
            {Math.min(currentPage * itemsPerPage, total)}
          </span> sur <span className="font-semibold text-gray-900">{total}</span>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-1">
          <button
            onClick={() => onPageChange(1)}
            disabled={currentPage === 1 || loading}
            className="p-1.5 rounded-lg border border-gray-300 hover:bg-gray-50
                     disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronsLeft className="w-3.5 h-3.5 text-gray-600" />
          </button>

          <button
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1 || loading}
            className="p-1.5 rounded-lg border border-gray-300 hover:bg-gray-50
                     disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronLeft className="w-3.5 h-3.5 text-gray-600" />
          </button>

          <div className="hidden sm:flex items-center gap-1">
            {getVisiblePageNumbers.map((page, index) => (
              page === '...' ? (
                <span key={`ellipsis-${index}`} className="px-2 text-gray-400 text-sm">...</span>
              ) : (
                <button
                  key={page}
                  onClick={() => onPageChange(page as number)}
                  disabled={loading}
                  className={`min-w-[32px] px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                    page === currentPage
                      ? 'bg-gradient-to-r from-purple-500 to-purple-600 text-white shadow-sm'
                      : 'border border-gray-300 text-gray-700 hover:bg-gray-50'
                  } disabled:opacity-40`}
                >
                  {page}
                </button>
              )
            ))}
          </div>

          <div className="sm:hidden px-2.5 py-1.5 bg-gradient-to-r from-purple-500 to-purple-600
                        text-white rounded-lg text-xs font-semibold">
            {currentPage} / {totalPages}
          </div>

          <button
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages || loading}
            className="p-1.5 rounded-lg border border-gray-300 hover:bg-gray-50
                     disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronRight className="w-3.5 h-3.5 text-gray-600" />
          </button>

          <button
            onClick={() => onPageChange(totalPages)}
            disabled={currentPage === totalPages || loading}
            className="p-1.5 rounded-lg border border-gray-300 hover:bg-gray-50
                     disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronsRight className="w-3.5 h-3.5 text-gray-600" />
          </button>
        </div>
      </div>
    </motion.div>
  );
});
PaginationControls.displayName = 'PaginationControls';

// =====================================================
// COMPOSANT PRINCIPAL
// =====================================================
export default function ConsultationsPage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<ConsultationStatus>('all');
  const [typeFilter, setTypeFilter] = useState<ConsultationType>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [generatingIds, setGeneratingIds] = useState<Set<string>>(new Set());

  const { consultations, total, loading, error, refetch } = useAdminConsultations({
    search: searchQuery,
    status: statusFilter,
    type: typeFilter,
    page: currentPage,
    limit: ITEMS_PER_PAGE,
  });

  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = useCallback(async () => {
    setIsRefreshing(true);
    await refetch();
    setTimeout(() => setIsRefreshing(false), 500);
  }, [refetch]);

  const handlePageChange = useCallback((page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleGenerateAnalysis = useCallback(async (id: string) => {
    setGeneratingIds(prev => new Set(prev).add(id));
    try {
      const res = await api.post(`/consultations/${id}/generate-analysis`);
      if (res.status === 200 || res.status === 201) {
        // On refetch pour obtenir le statut à jour
        await refetch();
         router.push(`/admin/consultations/${id}`);
        // On attend que la consultation soit bien en COMPLETED avec resultData
        // const pollForAnalysis = async (retries = 10) => {
        //   for (let i = 0; i < retries; i++) {
        //     const refreshed = await api.get(`/consultations/${id}`);
        //     const c = refreshed.data?.consultation || refreshed.data;
        //     if (c.status === 'COMPLETED' && c.resultData) {
             
        //       return;
        //     }
        //     await new Promise(r => setTimeout(r, 1500));
        //   }
        // };
        // pollForAnalysis();
      }
    } catch (err) {
      alert('Erreur lors de la génération de l\'analyse');
    } finally {
      setGeneratingIds(prev => {
        const newSet = new Set(prev);
        newSet.delete(id);
        return newSet;
      });
    }
  }, [refetch, router]);

  const handleModifyAnalysis = useCallback((id: string) => {
    router.push(`/secured/genereanalyse?id=${id}`);
  }, [router]);

  const totalPages = Math.ceil(total / ITEMS_PER_PAGE);

  if (loading && !consultations) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center"
        >
          <Loader className="w-10 h-10 text-purple-600 animate-spin mx-auto mb-2" />
          <p className="text-sm font-semibold text-gray-900">Chargement...</p>
        </motion.div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50 p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center max-w-sm bg-white rounded-xl shadow-xl border p-6"
        >
          <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-3" />
          <h3 className="text-lg font-bold text-gray-900 mb-2">Erreur</h3>
          <p className="text-sm text-gray-600 mb-4">{error}</p>
          <button
            onClick={handleRefresh}
            className="w-full px-4 py-2.5 bg-gradient-to-r from-purple-500 to-purple-600
                     text-white rounded-lg font-semibold hover:shadow-lg transition-all"
          >
            Réessayer
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header sticky */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-30 shadow-sm">
        <div className="max-w-5xl mx-auto px-3 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="p-1.5 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg">
                <FileText className="w-4 h-4 text-white" />
              </div>
              <div>
                <h1 className="text-base font-bold text-gray-900">Consultations</h1>
                <p className="text-xs text-gray-500 flex items-center gap-1">
                  <Zap className="w-3 h-3" />
                  {total} total
                </p>
              </div>
            </div>

            <button
              onClick={handleRefresh}
              disabled={isRefreshing || loading}
              className={`p-2 rounded-lg transition-all ${
                isRefreshing || loading
                  ? 'bg-gray-100 text-gray-400'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              <RefreshCw className={`w-4 h-4 ${isRefreshing || loading ? 'animate-spin' : ''}`} />
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-3 py-4 space-y-3">
        {/* Liste consultations */}
        {consultations && consultations.length > 0 ? (
          <>
            <AnimatePresence mode="popLayout">
              {consultations.map((consultation: any) => (
                <ConsultationCard
                  key={consultation.id}
                  consultation={consultation}
                  onGenerateAnalysis={handleGenerateAnalysis}
                  onModifyAnalysis={handleModifyAnalysis}
                  isGenerating={generatingIds.has(consultation.id)}
                />
              ))}
            </AnimatePresence>

            <PaginationControls
              currentPage={currentPage}
              totalPages={totalPages}
              total={total}
              itemsPerPage={ITEMS_PER_PAGE}
              onPageChange={handlePageChange}
              loading={loading}
            />
          </>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-white rounded-xl border p-8 text-center"
          >
            <FileText className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <h3 className="text-base font-bold text-gray-900 mb-1">
              Aucune consultation
            </h3>
            <p className="text-sm text-gray-500">
              Les consultations apparaîtront ici
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
}
