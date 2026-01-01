/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import { api } from '@/lib/api/client';
import { formatDate } from '@/lib/functions';
import { Consultation, ConsultationStatus, ConsultationType } from '@/lib/interfaces';
import { AnimatePresence, motion } from 'framer-motion';
import { AlertCircle, FileText, Filter, Loader2, Search, Sparkles } from 'lucide-react';
import ConsultationCard from '@/components/consultations/ConsultationCard';
import { useConsultationsListPage } from '@/components/consultations/useConsultationsListPage';

export default function ConsultationsListPage() {
  const {
    consultations,
    filteredConsultations,
    loading,
    error,
    searchQuery,
    setSearchQuery,
    typeFilter,
    setTypeFilter,
    statusFilter,
    setStatusFilter,
    handleView,
    handleDownload
  } = useConsultationsListPage();

  if (loading) {
    return (
      <div className=" bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-white animate-spin mx-auto mb-4" />
          <p className="text-white text-lg">Chargement de vos consultations...</p>
        </div>
      </div>
    );
  }

  return (
    <div className=" bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-2xl">
                <FileText className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl md:text-4xl font-black text-white mb-1">Mes Consultations</h1>
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
                    // Redirection à la commande d'une nouvelle analyse
                  } else {
                    setSearchQuery('');
                    setTypeFilter('ALL');
                    setStatusFilter('ALL');
                  }
                }}
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-xl hover:shadow-lg transition-all"
              >
                <Filter className="w-5 h-5" />
                Réinitialiser les filtres
              </button>
            )}
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