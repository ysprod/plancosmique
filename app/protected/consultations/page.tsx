'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { 
  Star, 
  Calendar, 
  Clock, 
  CheckCircle, 
  Loader2, 
  AlertCircle,
  Eye,
  Download,
  ArrowLeft,
  Sparkles
} from 'lucide-react';

interface Consultation {
  id: string;
  consultationId: string;
  titre: string;
  dateGeneration: string;
  statut: 'pending' | 'generating_chart' | 'generating_analysis' | 'completed' | 'error';
  prenoms: string;
  nom: string;
  dateNaissance: string;
}

export default function ConsultationsListPage() {
  const router = useRouter();
  const [consultations, setConsultations] = useState<Consultation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadConsultations();
  }, []);

  const loadConsultations = () => {
    try {
      // Charger toutes les analyses depuis localStorage
      const allKeys = Object.keys(localStorage);
      console.log('🔍 Toutes les clés localStorage:', allKeys);
      
      const analysisKeys = allKeys.filter(key => key.startsWith('astro_analysis_'));
      console.log('📊 Clés d\'analyse trouvées:', analysisKeys);
      
      const loadedConsultations: Consultation[] = [];
      
      analysisKeys.forEach(key => {
        const consultationId = key.replace('astro_analysis_', '');
        const data = localStorage.getItem(key);
        console.log(`📄 Données pour ${consultationId}:`, data ? 'Présentes' : 'Absentes');
        
        if (data) {
          try {
            const analyse = JSON.parse(data);
            console.log(`✅ Analyse parsée pour ${consultationId}:`, analyse);
            
            loadedConsultations.push({
              id: consultationId,
              consultationId: consultationId,
              titre: 'Analyse Astrologique',
              dateGeneration: analyse.dateGeneration,
              statut: 'completed',
              prenoms: analyse.carteDuCiel?.sujet?.prenoms || 'Non renseigné',
              nom: analyse.carteDuCiel?.sujet?.nom || '',
              dateNaissance: analyse.carteDuCiel?.sujet?.dateNaissance || '',
            });
          } catch (e) {
            console.error('❌ Erreur parsing analyse:', e);
          }
        }
      });

      // Trier par date décroissante
      loadedConsultations.sort((a, b) => 
        new Date(b.dateGeneration).getTime() - new Date(a.dateGeneration).getTime()
      );

      console.log('📋 Consultations chargées:', loadedConsultations.length);
      console.log('📝 Détails:', loadedConsultations);

      setConsultations(loadedConsultations);
      setLoading(false);
    } catch (err) {
      console.error('❌ Erreur chargement consultations:', err);
      setError('Erreur lors du chargement des consultations');
      setLoading(false);
    }
  };

  const getStatutBadge = (statut: Consultation['statut']) => {
    switch (statut) {
      case 'completed':
        return (
          <span className="inline-flex items-center gap-1 px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-semibold">
            <CheckCircle className="w-3 h-3" />
            Complète
          </span>
        );
      case 'generating_analysis':
      case 'generating_chart':
        return (
          <span className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-semibold">
            <Loader2 className="w-3 h-3 animate-spin" />
            En cours
          </span>
        );
      case 'error':
        return (
          <span className="inline-flex items-center gap-1 px-3 py-1 bg-red-100 text-red-800 rounded-full text-xs font-semibold">
            <AlertCircle className="w-3 h-3" />
            Erreur
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-xs font-semibold">
            <Clock className="w-3 h-3" />
            En attente
          </span>
        );
    }
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
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => router.push('/protected/profil')}
            className="flex items-center gap-2 text-white/80 hover:text-white transition-colors mb-6"
          >
            <ArrowLeft className="w-5 h-5" />
            Retour au profil
          </button>

          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-white/10 backdrop-blur-lg rounded-2xl flex items-center justify-center">
              <Star className="w-8 h-8 text-yellow-300" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
                Mes Consultations
              </h1>
              <p className="text-purple-200">
                {consultations.length} {consultations.length > 1 ? 'analyses disponibles' : 'analyse disponible'}
              </p>
            </div>
          </div>
        </div>

        {/* Error */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-red-500/20 backdrop-blur-lg border border-red-500/30 rounded-2xl p-6 mb-6"
          >
            <div className="flex items-center gap-3">
              <AlertCircle className="w-6 h-6 text-red-300" />
              <p className="text-red-100">{error}</p>
            </div>
          </motion.div>
        )}

        {/* Liste des consultations */}
        {consultations.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white/10 backdrop-blur-lg rounded-3xl p-12 text-center border border-white/20"
          >
            <Sparkles className="w-16 h-16 text-purple-300 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-white mb-2">
              Aucune consultation pour le moment
            </h3>
            <p className="text-purple-200 mb-6">
              Commandez votre première analyse astrologique pour découvrir votre destinée
            </p>
            <button
              onClick={() => router.push('/protected/vie-personnelle')}
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-xl hover:shadow-lg transition-all"
            >
              <Star className="w-5 h-5" />
              Commander une analyse
            </button>
          </motion.div>
        ) : (
          <div className="grid gap-4">
            {consultations.map((consultation, index) => (
              <motion.div
                key={consultation.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  {/* Info */}
                  <div className="flex-1">
                    <div className="flex items-start gap-3 mb-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center flex-shrink-0">
                        <Star className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-white mb-1">
                          {consultation.titre}
                        </h3>
                        <p className="text-purple-200 text-sm">
                          {consultation.prenoms} {consultation.nom}
                        </p>
                      </div>
                      {getStatutBadge(consultation.statut)}
                    </div>

                    <div className="flex flex-wrap gap-4 text-sm text-purple-200">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        Né(e) le {new Date(consultation.dateNaissance).toLocaleDateString('fr-FR')}
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        Généré le {new Date(consultation.dateGeneration).toLocaleDateString('fr-FR')}
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  {consultation.statut === 'completed' && (
                    <div className="flex gap-2">
                      <button
                        onClick={() => router.push(`/protected/consultations/${consultation.consultationId}`)}
                        className="flex items-center gap-2 px-4 py-2 bg-white/20 hover:bg-white/30 text-white rounded-xl transition-all"
                      >
                        <Eye className="w-4 h-4" />
                        <span className="hidden sm:inline">Voir</span>
                      </button>
                      <button
                        onClick={() => {
                          const url = `/api/consultations/${consultation.consultationId}/download-pdf`;
                          window.open(url, '_blank');
                        }}
                        className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:shadow-lg text-white rounded-xl transition-all"
                      >
                        <Download className="w-4 h-4" />
                        <span className="hidden sm:inline">PDF</span>
                      </button>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* CTA */}
        {consultations.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-8 text-center"
          >
            <button
              onClick={() => router.push('/protected/vie-personnelle')}
              className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-xl border border-white/20 transition-all"
            >
              <Sparkles className="w-5 h-5" />
              Commander une nouvelle analyse
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
}
