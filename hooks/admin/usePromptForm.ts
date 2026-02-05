import { promptService } from '@/lib/api/services/prompt.service';
import { ConsultationChoice } from '@/lib/interfaces';
import { CreatePromptDto } from '@/lib/types/prompt.types';

import { useCallback, useState } from 'react';

interface UsePromptFormOptions {
  initialData?: ConsultationChoice;
  choiceId?: string;
  returnTo?: string;
}

export function usePromptForm({ initialData, choiceId, returnTo }: UsePromptFormOptions = {}) {

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState<CreatePromptDto>({
    title: initialData?.title || '',
    description: initialData?.description || '',
    prompt: initialData?.prompt || '',   
     choiceId: initialData?.choiceId || choiceId || ''
  });

  const updateField = useCallback((field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  }, []);

    

  const handleSubmit = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      console.log('Submitting form with data:', formData);

      if (initialData?._id) {
        await promptService.update(initialData._id, { prompt: formData.prompt });
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
  }, [formData, initialData, choiceId, returnTo]);

  return {
    formData,
    loading,
    error,
    updateField,
  
    handleSubmit
  };
}