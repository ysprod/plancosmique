'use client';
import { useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'next/navigation';
import PromptForm from '@/components/admin/prompts/PromptForm';
import { promptService } from '@/lib/api/services/prompt.service';
import { Prompt } from '@/lib/types/prompt.types';

export default function EditPromptPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const returnTo = searchParams?.get('returnTo');
  const [prompt, setPrompt] = useState<Prompt | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPrompt = async () => {
      try {
        const data = await promptService.findById(params?.id as string);
        setPrompt(data);
      } catch (err: any) {
        setError(err.response?.data?.message || 'Erreur lors du chargement');
      } finally {
        setLoading(false);
      }
    };

    if (params?.id) {
      fetchPrompt();
    }
  }, [params]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600" />
      </div>
    );
  }

  if (error || !prompt) {
    return (
      <div className="max-w-5xl mx-auto p-6">
        <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-lg">
          {error || 'Prompt introuvable'}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto p-6">
      <PromptForm 
        initialData={prompt} 
        choiceId={prompt.choiceId || ''} 
        returnTo={returnTo || undefined} 
      />
    </div>
  );
}
