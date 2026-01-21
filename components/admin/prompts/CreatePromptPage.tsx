"use client";
import PromptForm from '@/components/admin/prompts/PromptForm';
import { useConsultationChoiceFromRubriques } from '@/hooks/admin/useConsultationChoiceFromRubriques';
import { CreatePromptError } from './CreatePromptError';
import { CreatePromptHeader } from './CreatePromptHeader';
import { CreatePromptLoader } from './CreatePromptLoader';

interface CreatePromptPageProps {
  choiceId: string | null;
  returnTo: string;
}

export default function CreatePromptPage({ choiceId, returnTo }: CreatePromptPageProps) {
  const { choice, loading, error, } = useConsultationChoiceFromRubriques(choiceId);
 
  if (loading) {
    return <CreatePromptLoader />;
  }

  if (error || !choice) {
    return (
      <CreatePromptError
        title="Erreur de chargement"
        message={error || 'Choix de consultation introuvable'}
        returnTo="/admin/consultations/choices"
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 flex flex-col items-center justify-center px-2 py-4 animate-fade-in">
      <div className="w-full max-w-2xl flex flex-col items-center">
        <CreatePromptHeader title={choice.title} rubriqueTitle={choice.rubriqueTitle} />
        <div className="w-full">
          <PromptForm
            choiceId={choiceId!}
            returnTo={returnTo}
          />
        </div>
      </div>
    </div>
  );
}