/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import { useAdminConsultations } from '@/hooks/useAdminConsultations';
import { AnimatePresence, motion } from 'framer-motion';
import {
  AlertCircle,
  Bell,
  Calendar,
  CheckCircle,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Clock,
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
  X,
  XCircle,
  Zap
} from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { api } from '@/lib/api/client';
import { useCallback, useMemo, useState, memo, useEffect } from 'react';

type ConsultationStatus = 'all' | 'PENDING' | 'GENERATING' | 'COMPLETED' | 'ERROR';
type ConsultationType = 'all' | 'SPIRITUALITE' | 'TAROT' | 'ASTROLOGIE' | 'NUMEROLOGIE';

const ITEMS_PER_PAGE = 5;

// =====================================================
// TOAST NOTIFICATION COMPONENT
// =====================================================
const Toast = memo(({ message, onClose }: { message: string; onClose: () => void }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 3500);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 10, scale: 0.95 }}
      className="fixed bottom-4 right-4 z-50 max-w-sm"
    >
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white 
                    px-4 py-2.5 rounded-xl shadow-2xl flex items-center gap-3 border border-white/20">
        <Bell className="w-4 h-4 flex-shrink-0 animate-pulse" />
        <p className="text-sm font-medium flex-1">{message}</p>
        <button
          onClick={onClose}
          className="p-1 hover:bg-white/20 rounded-lg transition-colors"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </motion.div>
  );
});
Toast.displayName = 'Toast';

// =====================================================
// STATUS BADGE COMPONENT
// =====================================================
const StatusBadge = memo(({ status }: { status: string }) => {
  const config = useMemo(() => {
    const configs: Record<string, { color: string; icon: JSX.Element; text: string }> = {
      'COMPLETED': {
        color: 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-400',
        icon: <CheckCircle className="w-2.5 h-2.5" />,
        text: 'Complétée'
      },
      'GENERATING': {
        color: 'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/30 dark:text-blue-400',
        icon: <Loader className="w-2.5 h-2.5 animate-spin" />,
        text: 'En cours'
      },
      'PENDING': {
        color: 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-900/30 dark:text-amber-400',
        icon: <Clock className="w-2.5 h-2.5" />,
        text: 'En attente'
      },
      'ERROR': {
        color: 'bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-900/30 dark:text-rose-400',
        icon: <XCircle className="w-2.5 h-2.5" />,
        text: 'Erreur'
      }
    };
    return configs[status] || {
      color: 'bg-gray-50 text-gray-700 border-gray-200',
      icon: <AlertCircle className="w-2.5 h-2.5" />,
      text: status
    };
  }, [status]);

  return (
    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold border ${config.color}`}>
      {config.icon}
      {config.text}
    </span>
  );
});
StatusBadge.displayName = 'StatusBadge';

// =====================================================
// CONSULTATION CARD COMPONENT (Ultra-compact)
// =====================================================
const ConsultationCard = memo(({
  consultation,
  onGenerateAnalysis,
  onModifyAnalysis,
  onNotifyUser,
  isGenerating,
  isNotifying
}: {
  consultation: any;
  onGenerateAnalysis: (id: string) => void;
  onModifyAnalysis: (id: string) => void;
  onNotifyUser: (id: string) => void;
  isGenerating: boolean;
  isNotifying: boolean;
}) => {
  const typeConfig = useMemo(() => {
    const configs: Record<string, { icon: string; text: string; gradient: string }> = {
      'SPIRITUALITE': { icon: '🌟', text: 'Spiritualité', gradient: 'from-purple-500 to-pink-500' },
      'TAROT': { icon: '🃏', text: 'Tarot', gradient: 'from-indigo-500 to-purple-500' },
      'ASTROLOGIE': { icon: '⭐', text: 'Astrologie', gradient: 'from-blue-500 to-cyan-500' },
      'NUMEROLOGIE': { icon: '🔢', text: 'Numérologie', gradient: 'from-emerald-500 to-teal-500' }
    };
    return configs[consultation.type] || { 
      icon: '📋', 
      text: consultation.type,
      gradient: 'from-gray-500 to-gray-600'
    };
  }, [consultation.type]);

  const hasAnalysis = useMemo(() => 
    consultation.status === 'COMPLETED' && consultation.resultData,
    [consultation.status, consultation.resultData]
  );

  return (
    <motion.div
      layout
      layoutId={`card-${consultation.id}`}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      whileHover={{ y: -2, boxShadow: '0 8px 24px rgba(0,0,0,0.12)' }}
      transition={{ type: 'spring', stiffness: 300, damping: 25 }}
      className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 
               dark:border-gray-800 p-2.5 transition-shadow overflow-hidden relative"
    >
      {/* Gradient accent bar */}
      <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${typeConfig.gradient}`} />

      {/* Header ultra-compact */}
      <div className="flex items-start justify-between mb-1.5 mt-1">
        <div className="flex items-center gap-1.5 flex-1 min-w-0">
          <span className="text-lg flex-shrink-0">{typeConfig.icon}</span>
          <div className="flex-1 min-w-0">
            <h3 className="text-xs font-bold text-gray-900 dark:text-gray-100 truncate">
              {typeConfig.text}
            </h3>
            <p className="text-[10px] text-gray-500 dark:text-gray-400 truncate leading-tight">
              {consultation.title}
            </p>
          </div>
        </div>
        <StatusBadge status={consultation.status} />
      </div>

      {/* Infos client ultra-compact (2 colonnes) */}
      <div className="grid grid-cols-2 gap-1 mb-1.5 text-[10px]">
        <div className="flex items-center gap-1 text-gray-600 dark:text-gray-400 truncate">
          <User className="w-2.5 h-2.5 flex-shrink-0" />
          <span className="truncate font-medium">
            {consultation.formData?.prenoms} {consultation.formData?.nom}
          </span>
        </div>
        {consultation.clientId?.email && (
          <div className="flex items-center gap-1 text-gray-600 dark:text-gray-400 truncate">
            <Mail className="w-2.5 h-2.5 flex-shrink-0" />
            <span className="truncate">{consultation.clientId.email}</span>
          </div>
        )}
        {consultation.formData?.numeroSend && (
          <div className="flex items-center gap-1 text-gray-600 dark:text-gray-400 truncate">
            <Phone className="w-2.5 h-2.5 flex-shrink-0" />
            <span className="truncate">{consultation.formData.numeroSend}</span>
          </div>
        )}
        {consultation.formData?.paysNaissance && (
          <div className="flex items-center gap-1 text-gray-600 dark:text-gray-400 truncate">
            <MapPin className="w-2.5 h-2.5 flex-shrink-0" />
            <span className="truncate">
              {consultation.formData.villeNaissance}, {consultation.formData.paysNaissance}
            </span>
          </div>
        )}
      </div>

      {/* Badges métriques compacts */}
      <div className="flex gap-1 overflow-x-auto scrollbar-hide mb-2 pb-0.5">
        <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-md text-[9px] 
                       font-semibold bg-blue-50 text-blue-700 border border-blue-200 flex-shrink-0
                       dark:bg-blue-900/30 dark:text-blue-400 dark:border-blue-800">
          <Calendar className="w-2 h-2" />
          {new Date(consultation.createdAt).toLocaleDateString('fr-FR', { 
            day: '2-digit', 
            month: 'short' 
          })}
        </span>
        {consultation.rating && (
          <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-md text-[9px] 
                         font-semibold bg-amber-50 text-amber-700 border border-amber-200 flex-shrink-0
                         dark:bg-amber-900/30 dark:text-amber-400 dark:border-amber-800">
            <Star className="w-2 h-2 fill-amber-500" />
            {consultation.rating}/5
          </span>
        )}
        {consultation.review && (
          <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-md text-[9px] 
                         font-semibold bg-purple-50 text-purple-700 border border-purple-200 flex-shrink-0
                         dark:bg-purple-900/30 dark:text-purple-400 dark:border-purple-800">
            <MessageSquare className="w-2 h-2" />
            Avis
          </span>
        )}
      </div>

      {/* Actions ultra-compactes - Grid responsive */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5">
        {/* Bouton Détails */}
        <Link
          href={`/admin/consultations/${consultation.id}`}
          className="flex items-center justify-center gap-1 px-2.5 py-1.5
                     bg-gradient-to-r from-purple-600 to-purple-700 text-white 
                     text-[10px] rounded-lg font-semibold
                     hover:from-purple-700 hover:to-purple-800 
                     transition-all active:scale-95 shadow-sm hover:shadow-md"
        >
          <Eye className="w-3 h-3" />
          Détails
        </Link>

        {/* Bouton Générer/Régénérer */}
        <button
          onClick={() => onGenerateAnalysis(consultation.id)}
          disabled={isGenerating}
          className="flex items-center justify-center gap-1 px-2.5 py-1.5
                     bg-gradient-to-r from-blue-600 to-blue-700 text-white 
                     text-[10px] rounded-lg font-semibold
                     hover:from-blue-700 hover:to-blue-800 
                     transition-all active:scale-95 shadow-sm hover:shadow-md
                     disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-sm"
        >
          <Sparkles className={`w-3 h-3 ${isGenerating ? 'animate-spin' : ''}`} />
          {isGenerating ? 'Génération' : (hasAnalysis ? 'Régénérer' : 'Générer')}
        </button>

        {/* Bouton Modifier */}
        <button
          onClick={() => onModifyAnalysis(consultation.id)}
          className="flex items-center justify-center gap-1 px-2.5 py-1.5
                     bg-gradient-to-r from-orange-600 to-orange-700 text-white 
                     text-[10px] rounded-lg font-semibold
                     hover:from-orange-700 hover:to-orange-800 
                     transition-all active:scale-95 shadow-sm hover:shadow-md"
        >
          <Edit className="w-3 h-3" />
          Modifier
        </button>

        {/* Bouton PDF */}
        <button
          className="flex items-center justify-center gap-1 px-2.5 py-1.5
                     bg-gradient-to-r from-emerald-600 to-emerald-700 text-white 
                     text-[10px] rounded-lg font-semibold
                     hover:from-emerald-700 hover:to-emerald-800 
                     transition-all active:scale-95 shadow-sm hover:shadow-md"
        >
          <Download className="w-3 h-3" />
          PDF
        </button>

        {/* Bouton Notifier */}
        <button
          onClick={() => onNotifyUser(consultation.id)}
          disabled={isNotifying}
          className="flex items-center justify-center gap-1 px-2.5 py-1.5
                     bg-gradient-to-r from-indigo-600 to-indigo-700 text-white 
                     text-[10px] rounded-lg font-semibold
                     hover:from-indigo-700 hover:to-indigo-800 
                     transition-all active:scale-95 shadow-sm hover:shadow-md
                     disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-sm
                     col-span-2 sm:col-span-1"
        >
          <Mail className={`w-3 h-3 ${isNotifying ? 'animate-pulse' : ''}`} />
          {isNotifying ? 'Envoi...' : 'Notifier'}
        </button>
      </div>
    </motion.div>
  );
}, (prevProps, nextProps) => {
  // Custom comparison pour éviter re-renders inutiles
  return (
    prevProps.consultation.id === nextProps.consultation.id &&
    prevProps.consultation.status === nextProps.consultation.status &&
    prevProps.isGenerating === nextProps.isGenerating &&
    prevProps.isNotifying === nextProps.isNotifying
  );
});
ConsultationCard.displayName = 'ConsultationCard';

// =====================================================
// PAGINATION CONTROLS
// =====================================================
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
      className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 
               dark:border-gray-800 p-2.5 shadow-sm"
    >
      <div className="flex flex-col sm:flex-row items-center justify-between gap-2.5">
        {/* Info */}
        <div className="text-[10px] text-gray-600 dark:text-gray-400 font-medium">
          <span className="font-bold text-gray-900 dark:text-gray-100">
            {((currentPage - 1) * itemsPerPage) + 1}
          </span>
          {' - '}
          <span className="font-bold text-gray-900 dark:text-gray-100">
            {Math.min(currentPage * itemsPerPage, total)}
          </span>
          {' sur '}
          <span className="font-bold text-gray-900 dark:text-gray-100">{total}</span>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-1">
          <button
            onClick={() => onPageChange(1)}
            disabled={currentPage === 1 || loading}
            className="p-1 rounded-lg border border-gray-300 dark:border-gray-700 
                     hover:bg-gray-50 dark:hover:bg-gray-800
                     disabled:opacity-30 disabled:cursor-not-allowed transition-all"
          >
            <ChevronsLeft className="w-3.5 h-3.5 text-gray-600 dark:text-gray-400" />
          </button>

          <button
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1 || loading}
            className="p-1 rounded-lg border border-gray-300 dark:border-gray-700 
                     hover:bg-gray-50 dark:hover:bg-gray-800
                     disabled:opacity-30 disabled:cursor-not-allowed transition-all"
          >
            <ChevronLeft className="w-3.5 h-3.5 text-gray-600 dark:text-gray-400" />
          </button>

          <div className="hidden sm:flex items-center gap-1">
            {getVisiblePageNumbers.map((page, index) => (
              page === '...' ? (
                <span key={`ellipsis-${index}`} className="px-1.5 text-gray-400 text-[10px]">
                  •••
                </span>
              ) : (
                <button
                  key={page}
                  onClick={() => onPageChange(page as number)}
                  disabled={loading}
                  className={`min-w-[28px] px-2 py-1 rounded-lg text-[10px] font-bold transition-all ${
                    page === currentPage
                      ? 'bg-gradient-to-r from-purple-600 to-purple-700 text-white shadow-md scale-105'
                      : 'border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800'
                  } disabled:opacity-30`}
                >
                  {page}
                </button>
              )
            ))}
          </div>

          <div className="sm:hidden px-2.5 py-1 bg-gradient-to-r from-purple-600 to-purple-700
                        text-white rounded-lg text-[10px] font-bold shadow-md">
            {currentPage} / {totalPages}
          </div>

          <button
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages || loading}
            className="p-1 rounded-lg border border-gray-300 dark:border-gray-700 
                     hover:bg-gray-50 dark:hover:bg-gray-800
                     disabled:opacity-30 disabled:cursor-not-allowed transition-all"
          >
            <ChevronRight className="w-3.5 h-3.5 text-gray-600 dark:text-gray-400" />
          </button>

          <button
            onClick={() => onPageChange(totalPages)}
            disabled={currentPage === totalPages || loading}
            className="p-1 rounded-lg border border-gray-300 dark:border-gray-700 
                     hover:bg-gray-50 dark:hover:bg-gray-800
                     disabled:opacity-30 disabled:cursor-not-allowed transition-all"
          >
            <ChevronsRight className="w-3.5 h-3.5 text-gray-600 dark:text-gray-400" />
          </button>
        </div>
      </div>
    </motion.div>
  );
});
PaginationControls.displayName = 'PaginationControls';

// =====================================================
// MAIN COMPONENT
// =====================================================
export default function ConsultationsPage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<ConsultationStatus>('all');
  const [typeFilter, setTypeFilter] = useState<ConsultationType>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [generatingIds, setGeneratingIds] = useState<Set<string>>(new Set());
  const [notifyingIds, setNotifyingIds] = useState<Set<string>>(new Set());
  const [toastMessage, setToastMessage] = useState<string | null>(null);

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
        await refetch();
        setToastMessage('✨ Analyse générée avec succès !');
        router.push(`/admin/consultations/${id}`);
      }
    } catch (err) {
      setToastMessage('❌ Erreur lors de la génération');
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

  const handleNotifyUser = useCallback(async (id: string) => {
    setNotifyingIds(prev => new Set(prev).add(id));
    try {
      const res = await api.post(`/consultations/${id}/notify-user`);
      if (res.status === 200 || res.status === 201) {
        setToastMessage('📧 Notification envoyée avec succès !');
      } else {
        setToastMessage('⚠️ Erreur lors de l\'envoi');
      }
    } catch (err) {
      setToastMessage('❌ Erreur lors de l\'envoi');
    } finally {
      setNotifyingIds(prev => {
        const newSet = new Set(prev);
        newSet.delete(id);
        return newSet;
      });
    }
  }, []);

  const totalPages = Math.ceil(total / ITEMS_PER_PAGE);

  if (loading && !consultations) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-950">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <Loader className="w-10 h-10 text-purple-600 animate-spin mx-auto mb-2" />
          <p className="text-sm font-bold text-gray-900 dark:text-gray-100">Chargement...</p>
        </motion.div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-950 p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center max-w-sm bg-white dark:bg-gray-900 rounded-xl shadow-2xl border 
                   border-gray-200 dark:border-gray-800 p-6"
        >
          <AlertCircle className="w-12 h-12 text-rose-500 mx-auto mb-3" />
          <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-2">Erreur</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">{error}</p>
          <button
            onClick={handleRefresh}
            className="w-full px-4 py-2.5 bg-gradient-to-r from-purple-600 to-purple-700
                     text-white rounded-lg font-bold hover:shadow-lg transition-all active:scale-95"
          >
            Réessayer
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      {/* Header sticky ultra-compact */}
      <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl 
                    border-b border-gray-200 dark:border-gray-800 sticky top-0 z-30 shadow-sm">
        <div className="max-w-5xl mx-auto px-3 py-2.5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="p-1.5 bg-gradient-to-br from-purple-600 to-purple-700 rounded-lg shadow-md">
                <FileText className="w-3.5 h-3.5 text-white" />
              </div>
              <div>
                <h1 className="text-sm font-bold text-gray-900 dark:text-gray-100">
                  Consultations
                </h1>
                <p className="text-[10px] text-gray-500 dark:text-gray-400 flex items-center gap-1">
                  <Zap className="w-2.5 h-2.5" />
                  {total} au total
                </p>
              </div>
            </div>

            <button
              onClick={handleRefresh}
              disabled={isRefreshing || loading}
              className={`p-1.5 rounded-lg transition-all shadow-sm ${
                isRefreshing || loading
                  ? 'bg-gray-100 dark:bg-gray-800 text-gray-400'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
              }`}
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing || loading ? 'animate-spin' : ''}`} />
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-3 py-3 space-y-2.5">
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
                  onNotifyUser={handleNotifyUser}
                  isGenerating={generatingIds.has(consultation.id)}
                  isNotifying={notifyingIds.has(consultation.id)}
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
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 
                     dark:border-gray-800 p-12 text-center"
          >
            <FileText className="w-16 h-16 text-gray-300 dark:text-gray-700 mx-auto mb-4" />
            <h3 className="text-base font-bold text-gray-900 dark:text-gray-100 mb-1">
              Aucune consultation
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Les consultations apparaîtront ici
            </p>
          </motion.div>
        )}
      </div>

      {/* Toast notification */}
      <AnimatePresence>
        {toastMessage && (
          <Toast message={toastMessage} onClose={() => setToastMessage(null)} />
        )}
      </AnimatePresence>
    </div>
  );
}
