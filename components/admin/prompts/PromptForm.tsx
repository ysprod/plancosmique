'use client';
import { usePromptForm } from '@/hooks/admin/usePromptForm';
import { PromptFormShell } from './PromptFormShell';
import { useRouter } from 'next/navigation';
import React, { useCallback, useEffect } from 'react';
import { Prompt } from '@/lib/types/prompt.types';
import { api } from '@/lib/api/client';

interface PromptFormProps {
  initialData?: Prompt;
  choiceId: string;
  returnTo?: string;
}

export default function PromptForm({ initialData, choiceId, returnTo }: PromptFormProps) {
  const router = useRouter();
  const {
    formData, loading, error, updateField, addSection, updateSection,
    removeSection, addVariable, removeVariable, handleSubmit
  } = usePromptForm({ initialData, choiceId, returnTo });


  const [choices, setChoices] = React.useState<any[]>([]);
  const [selectedChoiceId, setSelectedChoiceId] = React.useState<string>(choiceId || "");
  const [choicesLoading, setChoicesLoading] = React.useState(false);
  const [choicesError, setChoicesError] = React.useState<string | null>(null);


  const fetchChoices = useCallback(async () => {
    setChoicesLoading(true);
    setChoicesError(null);
    try {
      const response = await api.get('/consultation-choices/with-prompts');
      console.log('response choices:', response);
      console.log('Fetched choices:', response.data);
      setChoices(response.data);
    } catch (err: any) {
      setChoicesError(err.response?.data?.message || 'Erreur lors du chargement');
    } finally {
      setChoicesLoading(false);
    }
  }, []);


  useEffect(() => {
    fetchChoices();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  console.log('Choices loaded in PromptForm:', choices);


  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await handleSubmit();
    } catch (err) {
      // Error already handled in hook
    }
  };

  return (
    <form onSubmit={onSubmit} className="w-full">
{/* Zone de liste des choix de consultation */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Choix de consultation</label>
        {choicesLoading ? (
          <div className="text-xs text-gray-500">Chargement des choix...</div>
        ) : choicesError ? (
          <div className="text-xs text-red-500">{choicesError}</div>
        ) : (
          <select
            className="w-full border rounded px-2 py-1"
            value={selectedChoiceId}
            onChange={e => setSelectedChoiceId(e.target.value)}
          >
            <option value="">Sélectionner un choix...</option>
            {choices.map((choice: any) => (
              <option key={choice.id || choice.choiceId} value={choice.id || choice.choiceId}>
                {choice.title || choice.name || choice.titre || choice.id || choice.choiceId}
              </option>
            ))}
          </select>
        )}
      </div>


      <PromptFormShell
        formData={formData}
        loading={loading}
        error={error}
        updateField={updateField}
        addSection={addSection}
        updateSection={updateSection}
        removeSection={removeSection}
        addVariable={addVariable}
        removeVariable={removeVariable}
        onBack={() => router.back()}
        isEdit={!!initialData}
      />
    </form>
  );
}