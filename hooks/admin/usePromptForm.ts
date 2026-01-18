import { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { promptService } from '@/lib/api/services/prompt.service';
import { CreatePromptDto, Prompt, UpdatePromptDto } from '@/lib/types/prompt.types';

export function usePromptForm(initialData?: Prompt) {
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
    isActive: initialData?.isActive ?? true
  });

  const updateField = useCallback((field: keyof CreatePromptDto, value: any) => {
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

      if (initialData?._id) {
        await promptService.update(initialData._id, formData as UpdatePromptDto);
      } else {
        await promptService.create(formData);
      }

      router.push('/admin/prompts');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Erreur lors de la sauvegarde');
      throw err;
    } finally {
      setLoading(false);
    }
  }, [formData, initialData, router]);

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
