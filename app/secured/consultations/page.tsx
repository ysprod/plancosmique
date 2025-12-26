/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import { api } from '@/lib/api/client';
import { formatDate } from '@/lib/functions';
import { Consultation, ConsultationStatus, ConsultationType } from '@/lib/interfaces';
import { AnimatePresence, motion } from 'framer-motion';
import {
  AlertCircle, Calendar, CheckCircle, Clock, Download,
  Eye, FileText, Filter, Loader2, MapPin, Search,
  Sparkles, Star, TrendingUp, User
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const TYPE_LABELS: Record<ConsultationType, { label: string; color: string; icon: typeof Star }> = {
  SPIRITUALITE: { label: 'Spiritualité', color: 'from-purple-500 to-pink-500', icon: Sparkles },
  VIE_PERSONNELLE: { label: 'Vie Personnelle', color: 'from-blue-500 to-cyan-500', icon: User },
  RELATIONS: { label: 'Relations', color: 'from-rose-500 to-red-500', icon: Star },
  PROFESSIONNEL: { label: 'Professionnel', color: 'from-green-500 to-emerald-500', icon: TrendingUp },
  OFFRANDES: { label: 'Offrandes', color: 'from-amber-500 to-orange-500', icon: Star },
  ASTROLOGIE_AFRICAINE: { label: 'Astrologie Africaine', color: 'from-yellow-500 to-orange-600', icon: Sparkles },
  HOROSCOPE: { label: 'Horoscope', color: 'from-indigo-500 to-blue-500', icon: Calendar }
};

const STATUS_CONFIG: Record<ConsultationStatus, { label: string; color: string; icon: typeof CheckCircle }> = {
  COMPLETED: { label: 'Complète', color: 'bg-green-100 text-green-800', icon: CheckCircle },
  PROCESSING: { label: 'En cours', color: 'bg-blue-100 text-blue-800', icon: Loader2 },
  PENDING: { label: 'En attente', color: 'bg-gray-100 text-gray-800', icon: Clock },
  FAILED: { label: 'Erreur', color: 'bg-red-100 text-red-800', icon: AlertCircle }
};

const DEFAULT_STATUS_CONFIG = { label: 'Inconnu', color: 'bg-gray-100 text-gray-800', icon: Clock };

interface StatusBadgeProps {
  status: ConsultationStatus | string;
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  const config = STATUS_CONFIG[status as ConsultationStatus] || DEFAULT_STATUS_CONFIG;
  const Icon = config.icon;

  return (
    <span className={`inline-flex items-center gap-1.5 px-3 py-1 ${config.color} rounded-full text-xs font-semibold`}>
      <Icon className={`w-3.5 h-3.5 ${status === 'PROCESSING' ? 'animate-spin' : ''}`} />
      {config.label}
    </span>
  );
};

interface TypeBadgeProps {
  type: ConsultationType;
}

const TypeBadge: React.FC<TypeBadgeProps> = ({ type }) => {
  const config = TYPE_LABELS[type];
  const Icon = config.icon;

  return (
    <div className={`inline-flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r ${config.color} text-white rounded-lg text-xs font-bold`}>
      <Icon className="w-4 h-4" />
      {config.label}
    </div>
  );
};

interface ConsultationCardProps {
  consultation: Consultation;
  index: number;
  onView: (id: string) => void;
  onDownload: (id: string) => void;
}

const ConsultationCard: React.FC<ConsultationCardProps> = ({ consultation, index, onView, onDownload }) => {
  const typeConfig = TYPE_LABELS[consultation.type];
  const Icon = typeConfig.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ y: -4 }}
      className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 hover:bg-white/15 hover:border-white/30 transition-all"
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-start gap-3 flex-1">
          <div className={`w-12 h-12 bg-gradient-to-br ${typeConfig.color} rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg`}>
            <Icon className="w-6 h-6 text-white" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-xl font-bold text-white mb-1 line-clamp-1">
              {consultation.title}
            </h3>
            <p className="text-purple-200 text-sm line-clamp-2">
              {consultation.description}
            </p>
          </div>
        </div>
        <StatusBadge status={consultation.status} />
      </div>

      <div className="mb-4">
        <TypeBadge type={consultation.type} />
      </div>

      <div className="space-y-2 mb-4 p-4 bg-black/20 rounded-xl">
        <div className="flex items-center gap-2 text-sm text-purple-200">
          <User className="w-4 h-4 flex-shrink-0" />
          <span className="font-medium">
            {consultation.formData.prenoms} {consultation.formData.nom}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-purple-300">
          <div className="flex items-center gap-2">
            <Calendar className="w-3.5 h-3.5 flex-shrink-0" />
            Né(e) le {formatDate(consultation.formData.dateNaissance)}
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-3.5 h-3.5 flex-shrink-0" />
            à {consultation.formData.heureNaissance}
          </div>
          <div className="flex items-center gap-2 col-span-1 sm:col-span-2">
            <MapPin className="w-3.5 h-3.5 flex-shrink-0" />
            {consultation.formData.villeNaissance}, {consultation.formData.paysNaissance}
          </div>
        </div>
      </div>

      <div className="flex flex-wrap gap-3 text-xs text-purple-300 mb-4">
        <div className="flex items-center gap-1.5">
          <Calendar className="w-3.5 h-3.5" />
          Créé le {formatDate(consultation.createdAt)}
        </div>
        {consultation.completedDate && (
          <div className="flex items-center gap-1.5">
            <CheckCircle className="w-3.5 h-3.5" />
            Complété le {formatDate(consultation.completedDate)}
          </div>
        )}
      </div>

      {consultation.status === 'COMPLETED' && (
        <div className="flex gap-2">
          <button
            onClick={() => onView(consultation._id)}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-white/20 hover:bg-white/30 text-white rounded-xl transition-all font-semibold"
          >
            <Eye className="w-4 h-4" />
            Voir l'analyse
          </button>
          <button
            onClick={() => onDownload(consultation._id)}
            className="flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:shadow-lg text-white rounded-xl transition-all font-semibold"
          >
            <Download className="w-4 h-4" />
            <span className="hidden sm:inline">PDF</span>
          </button>
        </div>
      )}

      {consultation.status === 'PROCESSING' && (
        <div className="text-center py-3 bg-blue-500/20 rounded-xl border border-blue-500/30">
          <p className="text-blue-200 text-sm font-medium">
            Génération en cours... Revenez dans quelques instants
          </p>
        </div>
      )}

      {consultation.status === 'FAILED' && (
        <div className="text-center py-3 bg-red-500/20 rounded-xl border border-red-500/30">
          <p className="text-red-200 text-sm font-medium">
            Une erreur est survenue. Contactez le support.
          </p>
        </div>
      )}
    </motion.div>
  );
};


export default function ConsultationsListPage() {
  const router = useRouter();
  const [consultations, setConsultations] = useState<Consultation[]>([]);
  const [filteredConsultations, setFilteredConsultations] = useState<Consultation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState<ConsultationType | 'ALL'>('ALL');
  const [statusFilter, setStatusFilter] = useState<ConsultationStatus | 'ALL'>('ALL');

  useEffect(() => {
    loadConsultations();
  }, []);

  useEffect(() => {
    filterConsultations();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [consultations, searchQuery, typeFilter, statusFilter]);

  const loadConsultations = async () => {
    try {
      const token = localStorage.getItem('monetoile_access_token');

      if (!token) {
        setError('Vous devez être connecté pour voir vos consultations');
        setLoading(false);
        return;
      }

      const response = await api.get('/consultations/my');

      if (response.status !== 200) {
        throw new Error('Erreur lors du chargement des consultations');
      }

      const data = response.data;

      const filtered = (data.consultations || []).filter((c: any) => c.type !== 'HOROSCOPE');
      setConsultations(filtered);
      setLoading(false);
    } catch (err: any) {
      console.error('❌ Erreur chargement consultations:', err);

      if (err.response?.status === 403 || err.response?.status === 401) {
        setError('Session expirée. Veuillez vous reconnecter.');
      } else {
        setError('Erreur lors du chargement des consultations');
      }

      setLoading(false);
    }
  };

  const filterConsultations = () => {
    // Vérifier que consultations est bien un tableau
    if (!Array.isArray(consultations)) {
      console.warn('⚠️ consultations n\'est pas un tableau:', consultations);
      setFilteredConsultations([]);
      return;
    }

    let filtered = [...consultations];

    // Filtre par recherche
    if (searchQuery) {
      filtered = filtered.filter(c =>
        c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.formData.prenoms.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.formData.nom.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Filtre par type
    if (typeFilter !== 'ALL') {
      filtered = filtered.filter(c => c.type === typeFilter);
    }

    // Filtre par statut
    if (statusFilter !== 'ALL') {
      filtered = filtered.filter(c => c.status === statusFilter);
    }

    setFilteredConsultations(filtered);
  };

  const handleView = (id: string) => {
    router.push(`/secured/consultations/${id}`);
  };

  const handleDownload = (id: string) => {
    window.open(`/api/consultations/${id}/download-pdf`, '_blank');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-white animate-spin mx-auto mb-4" />
          <p className="text-white text-lg">Chargement de vos consultations...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-2xl">
                <FileText className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl md:text-4xl font-black text-white mb-1">
                  Mes Consultations
                </h1>
                <p className="text-purple-200">
                  {consultations.length} {consultations.length > 1 ? 'analyses' : 'analyse'} · {filteredConsultations.length} affichée{filteredConsultations.length > 1 ? 's' : ''}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Filtres */}
        {consultations.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 mb-6"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Recherche */}
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-purple-300" />
                <input
                  type="text"
                  placeholder="Rechercher..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder:text-purple-300 focus:outline-none focus:border-purple-400 transition-colors"
                />
              </div>
            </div>
          </motion.div>
        )}

        {/* Error */}
        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-red-500/20 backdrop-blur-lg border border-red-500/30 rounded-2xl p-6 mb-6"
            >
              <div className="flex items-center gap-3">
                <AlertCircle className="w-6 h-6 text-red-300 flex-shrink-0" />
                <p className="text-red-100">{error}</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Liste */}
        {filteredConsultations.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white/10 backdrop-blur-lg rounded-3xl p-12 text-center border border-white/20"
          >
            <Sparkles className="w-16 h-16 text-purple-300 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-white mb-2">
              {consultations.length === 0
                ? 'Aucune consultation pour le moment'
                : 'Aucun résultat trouvé'}
            </h3>
            <p className="text-purple-200 mb-6">
              {consultations.length === 0
                ? 'Commandez votre première analyse astrologique pour découvrir votre destinée'
                : 'Essayez de modifier vos filtres de recherche'}
            </p>

            {consultations.length > 0 && (
              <button
                onClick={() => {
                  if (consultations.length === 0) {
                    router.push('/secured/vie-personnelle');
                  } else {
                    setSearchQuery('');
                    setTypeFilter('ALL');
                    setStatusFilter('ALL');
                  }
                }}
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-xl hover:shadow-lg transition-all"
              >           <Filter className="w-5 h-5" />
                Réinitialiser les filtres
              </button>)}
          </motion.div>
        ) : (
          <div className="grid gap-6">
            {filteredConsultations.map((consultation, index) => (
              <ConsultationCard
                key={consultation._id}
                consultation={consultation}
                index={index}
                onView={handleView}
                onDownload={handleDownload}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}