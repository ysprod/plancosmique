'use client';

import { useEffect, useState, useCallback } from 'react';
import { api } from '@/lib/api/client';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertCircle, Loader2 } from 'lucide-react';
import NumerologyResultClient from '@/components/numerologie/NumerologyResultClient';
 

interface NumerologiePageProps {
  params: { id: string };
}

// ============================================================================
// COMPOSANTS DE LOADING ET ERROR
// ============================================================================

const LoadingState = () => (
  <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-indigo-950 via-purple-900 to-pink-900">
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      className="text-center"
    >
      <Loader2 className="mx-auto h-16 w-16 animate-spin text-purple-300" />
      <p className="mt-4 text-lg text-purple-200">Chargement de votre consultation...</p>
    </motion.div>
  </div>
);

const ErrorState = ({ error, onRetry }: { error: string; onRetry: () => void }) => (
  <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-indigo-950 via-purple-900 to-pink-900 px-4">
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-md rounded-2xl bg-red-500/10 p-8 text-center backdrop-blur-sm"
    >
      <AlertCircle className="mx-auto h-16 w-16 text-red-400" />
      <h2 className="mt-4 text-2xl font-bold text-red-300">Erreur</h2>
      <p className="mt-2 text-red-200">{error}</p>
      <button
        onClick={onRetry}
        className="mt-6 rounded-lg bg-purple-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-purple-700"
      >
        Réessayer
      </button>
    </motion.div>
  </div>
);

// ============================================================================
// PAGE PRINCIPALE
// ============================================================================

export default function NumerologiePage({ params }: NumerologiePageProps) {
  const { id } = params;
  const [consultation, setConsultation] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchConsultation = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.get(`/consultations/${id}`);
      if (response.status !== 200) throw new Error('Consultation introuvable');
      
      const data = response.data.consultation;
      
      // Validation du type de consultation
      if (data.type !== 'NOMBRES_PERSONNELS' && data.type !== 'CYCLES_PERSONNELS') {
        throw new Error('Type de consultation non valide');
      }

      setConsultation(data);
    } catch (err: any) {
      console.error('Erreur fetch consultation:', err);
      setError(err.message || 'Impossible de charger la consultation');
      setConsultation(null);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    if (id) fetchConsultation();
  }, [id, fetchConsultation]);

  // Rendu conditionnel
  if (loading) return <LoadingState />;
  if (error) return <ErrorState error={error} onRetry={fetchConsultation} />;
  if (!consultation) return <ErrorState error="Aucune donnée disponible" onRetry={fetchConsultation} />;

  return <NumerologyResultClient consultation={consultation} />;
}
