/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { api } from '@/lib/api/client';
import { AnimatePresence, motion } from 'framer-motion';
import { AlertCircle, ArrowLeft, Download, Share2 } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from "react";
import LoadingSpinner from './LoadingSpinner';
import SubjectCard from './SubjectCard';
import SkyChartSection from './SkyChartSection';
import MissionSection from './MissionSection';
import MetadataFooter from './MetadataFooter';
import type { AnalyseData, GenerationStep } from './types';

export default function GenereAnalysePage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [step, setStep] = useState<GenerationStep>('loading');
  const [analyseData, setAnalyseData] = useState<AnalyseData | null>(null);
  const [error, setError] = useState<string | null>(null);

  const generateAnalysis = async (consultationId: string) => {
    try {
      setStep('fetching');

      const res = await api.post(`/consultations/${consultationId}/generate-analysis`);

      if (res.status !== 200 && res.status !== 201) {
        throw new Error(res.data?.message || 'Erreur de génération');
      }

      const analyse = res.data?.analyse;
      if (!analyse) {
        throw new Error('Aucune analyse reçue');
      }

      console.log('[Analyse] ✅ Analyse reçue');
      setAnalyseData(analyse);
      setStep('success');

    } catch (err: any) {
      console.error('[Analyse] ❌ Erreur:', err);
      setError(err.response?.data?.message || err.message || 'Erreur inconnue');
      setStep('error');
    }
  };

  useEffect(() => {
    const id = searchParams.get('id');
    if (!id) {
      setError('ID consultation manquant');
      setStep('error');
      return;
    }
    generateAnalysis(id);
  }, [searchParams]);

  const handleRetry = () => {
    const id = searchParams.get('id');
    if (id) {
      setError(null);
      setStep('loading');
      generateAnalysis(id);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 
                  dark:from-gray-950 dark:via-purple-950/20 dark:to-gray-900">
      {/* Header fixe */}
      <div className="sticky top-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl 
                    border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
          <button
            onClick={() => router.push('/secured/consultations')}
            className="flex items-center gap-2 text-gray-700 dark:text-gray-300 
                     hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="font-semibold text-sm">Retour</span>
          </button>

          {step === 'success' && (
            <div className="flex gap-2">
              <button
                onClick={() => window.print()}
                className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 
                         hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              >
                <Download className="w-4 h-4 text-gray-700 dark:text-gray-300" />
              </button>
              <button
                onClick={() => navigator.share?.({
                  title: 'Analyse Astrologique',
                  text: 'Découvrez mon analyse astrologique'
                })}
                className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 
                         hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              >
                <Share2 className="w-4 h-4 text-gray-700 dark:text-gray-300" />
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-6 space-y-4">
        <AnimatePresence mode="wait">
          {(step === 'loading'  || step === 'fetching' || step === 'generating') && (
            <motion.div key="loading">
              <LoadingSpinner step={step} />
            </motion.div>
          )}

          {/* Success */}
          {step === 'success' && analyseData && (
            <motion.div key="success" className="space-y-4 pb-8">
              <SubjectCard sujet={analyseData.carteDuCiel.sujet} />
              <SkyChartSection carteDuCiel={analyseData.carteDuCiel} />
              <MissionSection missionDeVie={analyseData.missionDeVie} />
              <MetadataFooter metadata={analyseData.metadata} />
            </motion.div>
          )}

          {/* Error */}
          {step === 'error' && (
            <motion.div key="error" className="py-8 px-4 text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-red-100 dark:bg-red-900/30 
                            flex items-center justify-center">
                <AlertCircle className="w-8 h-8 text-red-600 dark:text-red-400" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-2">
                Erreur
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                {error}
              </p>
              <button
                onClick={handleRetry}
                className="px-6 py-2 bg-purple-600 hover:bg-purple-700 text-white 
                         rounded-xl font-semibold transition-colors"
              >
                Réessayer
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}