import { promptService } from '@/lib/api/services/prompt.service';
import { CreatePromptDto, Prompt } from '@/lib/types/prompt.types';
import { useRouter } from 'next/navigation';
import { useCallback, useState } from 'react';

interface UsePromptFormOptions {
  initialData?: Prompt;
  choiceId?: string;
  returnTo?: string;
}

export function usePromptForm({ initialData, choiceId, returnTo }: UsePromptFormOptions = {}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState<CreatePromptDto>({
    title: initialData?.title || '',
    description: initialData?.description || '',
    role: initialData?.role || '',
    objective: initialData?.objective || '',
    styleAndTone: initialData?.styleAndTone || [],
    structure: initialData?.structure || {
      introduction: '',
      sections: [],
      synthesis: '',
      conclusion: ''
    },
    variables: initialData?.variables || {},
    tags: initialData?.tags || [],
    isActive: initialData?.isActive ?? true,
    choiceId: initialData?.choiceId || choiceId || ''
  });

  const updateField = useCallback((field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  }, []);

  const addSection = useCallback(() => {
    setFormData(prev => ({
      ...prev,
      structure: {
        ...prev.structure,
        sections: [...prev.structure.sections, { title: '', content: '', guidelines: [] }]
      }
    }));
  }, []);

  const updateSection = useCallback((index: number, field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      structure: {
        ...prev.structure,
        sections: prev.structure.sections.map((s, i) =>
          i === index ? { ...s, [field]: value } : s
        )
      }
    }));
  }, []);

  const removeSection = useCallback((index: number) => {
    setFormData(prev => ({
      ...prev,
      structure: {
        ...prev.structure,
        sections: prev.structure.sections.filter((_, i) => i !== index)
      }
    }));
  }, []);

  const addVariable = useCallback((key: string, description: string) => {
    setFormData(prev => ({
      ...prev,
      variables: { ...prev.variables, [key]: description }
    }));
  }, []);

  const removeVariable = useCallback((key: string) => {
    setFormData(prev => {
      const { [key]: _, ...rest } = prev.variables || {};
      return { ...prev, variables: rest };
    });
  }, []);

  const handleSubmit = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      if (!formData.structure.sections || formData.structure.sections.length === 0) {
        setError('Le prompt doit contenir au moins une section.');
        throw new Error('Le prompt doit contenir au moins une section.');
      }
      if (initialData?._id) {
        await promptService.update(initialData._id, formData);
      } else {
        await promptService.create(formData);
      }
      if (returnTo === 'consultations-choices') {
        window.location.href = '/admin/consultations/choices';
      } else {
        window.location.href = '/admin/prompts';
      }
    } catch (err: any) {
      setError(err.response?.data?.message || err.message || 'Erreur lors de la sauvegarde');
      throw err;
    } finally {
      setLoading(false);
    }
  }, [formData, initialData, router, choiceId, returnTo]);

  return {
    formData,
    loading,
    error,
    updateField,
    addSection,
    updateSection,
    removeSection,
    addVariable,
    removeVariable,
    handleSubmit
  };
}