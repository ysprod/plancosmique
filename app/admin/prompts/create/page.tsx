'use client';
import { useSearchParams } from 'next/navigation';
import { AlertCircle, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import PromptForm from '@/components/admin/prompts/PromptForm';

export default function CreatePromptPage() {
  const searchParams = useSearchParams();
  const choiceId = searchParams?.get('choiceId');
  const choiceTitle = searchParams?.get('choiceTitle');
  const returnTo = searchParams?.get('returnTo');

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

  return (
    <div className="max-w-5xl mx-auto p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Créer un nouveau prompt</h1>
        {choiceTitle && (
          <p className="text-sm text-gray-600 mt-1">
            Pour la consultation : <span className="font-semibold text-purple-600">{choiceTitle}</span>
          </p>
        )}
      </div>
      <PromptForm 
        choiceId={choiceId} 
        returnTo={returnTo || undefined}
      />
    </div>
  );
}
