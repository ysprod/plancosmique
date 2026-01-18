'use client';
import { useSearchParams } from 'next/navigation';
import PromptForm from '@/components/admin/prompts/PromptForm';

export default function CreatePromptPage() {
  const searchParams = useSearchParams();
  const choiceId = searchParams?.get('choiceId');
  const choiceTitle = searchParams?.get('choiceTitle');
  const returnTo = searchParams?.get('returnTo');

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
        choiceId={choiceId || undefined} 
        returnTo={returnTo || undefined}
      />
    </div>
  );
}
