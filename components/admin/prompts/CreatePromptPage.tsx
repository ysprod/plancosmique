'use client';
import { useEffect, useState } from 'react';
import { AlertCircle, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import PromptForm from '@/components/admin/prompts/PromptForm';
import { api } from '@/lib/api/client';

interface CreatePromptPageProps {
  choiceId: string | null;
  returnTo: string;
}

export default function CreatePromptPage({ choiceId, returnTo }: CreatePromptPageProps) {
  const [choice, setChoice] = useState<any>(null);
  const [loadingChoice, setLoadingChoice] = useState(true);
  const [errorChoice, setErrorChoice] = useState<string | null>(null);

  useEffect(() => {
    const fetchChoice = async () => {
      if (!choiceId) {
        setLoadingChoice(false);
        return;
      }

      try {
        // TEMPORAIRE: Désactivation du cache pendant le développement
        const response = await api.get(`/consultation-choices/${choiceId}?_t=${Date.now()}`, {
          headers: {
            'Cache-Control': 'no-cache, no-store, must-revalidate',
            'Pragma': 'no-cache',
            'Expires': '0'
          }
        });
        console.log('Fetched choice:', response);
        setChoice(response.data);
      } catch (err: any) {
        setErrorChoice(err.response?.data?.message || 'Erreur lors du chargement du choix de consultation');
      } finally {
        setLoadingChoice(false);
      }
    };

    fetchChoice();
  }, [choiceId]);

  // Le choiceId est obligatoire car chaque prompt appartient à un choix de consultation
  if (!choiceId) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 px-4">
        <div className="max-w-2xl w-full bg-white dark:bg-slate-900/50 backdrop-blur-xl rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-700 p-6 sm:p-8">
          <div className="bg-red-50 dark:bg-red-950/30 border-2 border-red-200 dark:border-red-800 rounded-xl p-6">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-6 h-6 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <h2 className="text-lg font-semibold text-red-900 dark:text-red-200 mb-2">
                  Choix de consultation manquant
                </h2>
                <p className="text-red-700 dark:text-red-300 mb-4">
                  Un prompt doit obligatoirement être associé à un choix de consultation. 
                  Veuillez créer le prompt depuis la page d'attribution des prompts.
                </p>
                <Link
                  href="/admin/consultations/choices"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 dark:bg-red-700 dark:hover:bg-red-800 text-white rounded-xl transition-colors shadow-lg"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Aller à l'attribution des prompts
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (loadingChoice) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
        <div className="flex flex-col items-center gap-4">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-slate-200 dark:border-slate-700 border-t-purple-600 dark:border-t-purple-400" />
          <p className="text-sm text-slate-600 dark:text-slate-400">Chargement...</p>
        </div>
      </div>
    );
  }

  if (errorChoice || !choice) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 px-4">
        <div className="max-w-2xl w-full bg-white dark:bg-slate-900/50 backdrop-blur-xl rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-700 p-6 sm:p-8">
          <div className="bg-red-50 dark:bg-red-950/30 border-2 border-red-200 dark:border-red-800 rounded-xl p-6">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-6 h-6 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <h2 className="text-lg font-semibold text-red-900 dark:text-red-200 mb-2">
                  Erreur de chargement
                </h2>
                <p className="text-red-700 dark:text-red-300 mb-4">
                  {errorChoice || 'Choix de consultation introuvable'}
                </p>
                <Link
                  href="/admin/consultations/choices"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 dark:bg-red-700 dark:hover:bg-red-800 text-white rounded-xl transition-colors shadow-lg"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Retour à l'attribution des prompts
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className="mb-6 bg-white dark:bg-slate-900/50 backdrop-blur-xl rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700 p-4 sm:p-6">
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mb-2">
            Créer un nouveau prompt
          </h1>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            Pour la consultation : <span className="font-semibold text-purple-600 dark:text-purple-400">{choice.title}</span>
            {choice.rubriqueTitle && (
              <span className="ml-2 px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-lg text-xs font-medium">
                {choice.rubriqueTitle}
              </span>
            )}
          </p>
        </div>
        <PromptForm 
          choiceId={choiceId} 
          returnTo={returnTo}
        />
      </div>
    </div>
  );
}
