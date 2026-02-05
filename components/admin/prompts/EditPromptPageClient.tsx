"use client";
import { useEditPromptPage } from '@/hooks/admin/prompts/useEditPromptPage';
import { notFound } from 'next/navigation';
import { EditPromptError } from './EditPromptError';
import { EditPromptLoader } from './EditPromptLoader';
import { EditPromptShell } from './EditPromptShell';
import PromptForm from './PromptForm';

interface PageProps {
  choiceId: string;
  returnTo?: string;
}

export default function EditPromptPageClient({ choiceId, returnTo }: PageProps) {
  const { prompt, error, loading } = useEditPromptPage(choiceId);

  if (loading) {
    return (
      <EditPromptShell>
        <EditPromptLoader />
      </EditPromptShell>
    );
  }

  if (!prompt) {
    if (error) {
      return (
        <EditPromptShell>
          <EditPromptError error={error} />
        </EditPromptShell>
      );
    }
    notFound();
  }

  return (
    <EditPromptShell>
      <PromptForm
        initialData={prompt}
        choiceId={prompt.choiceId || ''}
        returnTo={returnTo}
      />
    </EditPromptShell>
  );
}
