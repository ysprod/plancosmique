"use client";
import { useConsultationChoiceFromRubriques } from '@/hooks/admin/useConsultationChoiceFromRubriques';
import { notFound, useSearchParams } from 'next/navigation';
import { CreatePromptError } from './CreatePromptError';
import { CreatePromptLoader } from './CreatePromptLoader';
 
import PromptForm from './PromptForm';
import CreatePromptShell from './CreatePromptShell';

export default function CreatePromptPage() {
  const searchParams = useSearchParams();
  const choiceId = searchParams?.get('choiceId') || '';
  const returnTo = searchParams?.get('returnTo') || undefined;

  const { choice, loading, error } = useConsultationChoiceFromRubriques(choiceId);

  if (loading) {
    return (
      <CreatePromptShell>
        <CreatePromptLoader />
      </CreatePromptShell>
    );
  }

  if (!choice) {
    if (error) {
      return (
        <CreatePromptShell>
          <CreatePromptError title="Erreur de chargement" message={error} returnTo="/admin/consultations/choices" />
        </CreatePromptShell>
      );
    }
    notFound();
  }

  return (
    <CreatePromptShell>
      <PromptForm
        initialData={choice}
        choiceId={choiceId}
        returnTo={returnTo}
      />
    </CreatePromptShell>
  );
}