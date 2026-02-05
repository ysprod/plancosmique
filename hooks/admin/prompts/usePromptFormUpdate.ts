import { promptService } from '@/lib/api/services/prompt.service';
import { ConsultationChoice } from '@/lib/interfaces';
import { CreatePromptDto, Prompt } from '@/lib/types/prompt.types';

import { useCallback, useState } from 'react';

interface UsePromptFormOptions {
  initialData?: ConsultationChoice;
  choiceId?: string;
  returnTo?: string;
}

export function usePromptFormUpdate({ initialData, choiceId, returnTo }: UsePromptFormOptions = {}) {

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState<CreatePromptDto>({
    title: initialData?.title || '',
    description: initialData?.description || '',
    prompt: initialData?.prompt || '' , // Assuming prompt content is not part of Prompt type
     
    choiceId: initialData?.choiceId || choiceId || ''
  });

  const updateField = useCallback((field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  }, []);

 

  const handleSubmit = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      await promptService.create(formData);
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
  }, [formData, initialData, choiceId, returnTo]);

  return {
    formData,
    loading,
    error,
    updateField,
    handleSubmit
  };
}