'use client';
import { notFound } from 'next/navigation';
import PromptForm from '@/components/admin/prompts/PromptForm';
import { EditPromptShell } from './EditPromptShell';
import { useEditPromptPage } from '@/hooks/admin/prompts/useEditPromptPage';
import { EditPromptError } from './EditPromptError';
import { EditPromptLoader } from './EditPromptLoader';

interface EditPromptPageProps {
  promptId: string;
  returnTo?: string;
}

export default function EditPromptPage({ promptId, returnTo }: EditPromptPageProps) {
  const { prompt, error, loading } = useEditPromptPage(promptId);

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