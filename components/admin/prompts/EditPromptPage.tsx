import { notFound } from 'next/navigation';
import PromptForm from '@/components/admin/prompts/PromptForm';
import { promptService } from '@/lib/api/services/prompt.service';
import { Prompt } from '@/lib/types/prompt.types';

interface EditPromptPageProps {
  promptId: string;
  returnTo?: string;
}

export default async function EditPromptPage({ promptId, returnTo }: EditPromptPageProps) {
  let prompt: Prompt | null = null;
  let error: string | null = null;

  try {
    prompt = await promptService.findById(promptId);
  } catch (err: any) {
    error = err.response?.data?.message || err.message || 'Erreur lors du chargement';
  }

  if (!prompt) {
    if (error) {
      return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 px-4">
          <div className="max-w-md w-full bg-white dark:bg-slate-900/50 backdrop-blur-xl rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-700 p-6 sm:p-8">
            <div className="bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400 p-4 rounded-xl text-center">
              <p className="font-semibold">{error}</p>
            </div>
          </div>
        </div>
      );
    }
    notFound();
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <PromptForm 
          initialData={prompt} 
          choiceId={prompt.choiceId || ''} 
          returnTo={returnTo} 
        />
      </div>
    </div>
  );
}
