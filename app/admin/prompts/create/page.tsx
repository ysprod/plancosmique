'use client';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { AlertCircle, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import PromptForm from '@/components/admin/prompts/PromptForm';
import { api } from '@/lib/api/client';

export default function CreatePromptPage() {
  const searchParams = useSearchParams();
  const choiceId = searchParams?.get('choiceId');
  const returnTo = searchParams?.get('returnTo');
  
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
        const response = await api.get(`/consultation-choices/${choiceId}`);
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
      <div className="max-w-5xl mx-auto p-6">
        <div className="bg-red-50 border-2 border-red-200 rounded-lg p-6">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-6 h-6 text-red-600 flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <h2 className="text-lg font-semibold text-red-900 mb-2">
                Choix de consultation manquant
              </h2>
              <p className="text-red-700 mb-4">
                Un prompt doit obligatoirement être associé à un choix de consultation. 
                Veuillez créer le prompt depuis la page d'attribution des prompts.
              </p>
              <Link
                href="/admin/consultations/choices"
                className="inline-flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Aller à l'attribution des prompts
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (loadingChoice) {
    return (
      <div className="max-w-5xl mx-auto p-6">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600" />
        </div>
      </div>
    );
  }

  if (errorChoice || !choice) {
    return (
      <div className="max-w-5xl mx-auto p-6">
        <div className="bg-red-50 border-2 border-red-200 rounded-lg p-6">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-6 h-6 text-red-600 flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <h2 className="text-lg font-semibold text-red-900 mb-2">
                Erreur de chargement
              </h2>
              <p className="text-red-700 mb-4">
                {errorChoice || 'Choix de consultation introuvable'}
              </p>
              <Link
                href="/admin/consultations/choices"
                className="inline-flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Retour à l'attribution des prompts
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Créer un nouveau prompt</h1>
        <p className="text-sm text-gray-600 mt-1">
          Pour la consultation : <span className="font-semibold text-purple-600">{choice.title}</span>
          {choice.rubriqueTitle && (
            <span className="ml-2 px-2 py-0.5 bg-blue-100 text-blue-700 rounded text-xs">
              {choice.rubriqueTitle}
            </span>
          )}
        </p>
      </div>
      <PromptForm 
        choiceId={choiceId} 
        returnTo={returnTo || undefined}
      />
    </div>
  );
}
