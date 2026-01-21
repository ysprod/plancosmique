'use client';
import { usePromptForm } from '@/hooks/admin/usePromptForm';
import { PromptFormShell } from './PromptFormShell';
import { useRouter } from 'next/navigation';
import React from 'react';
import { Prompt } from '@/lib/types/prompt.types';

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