import { useCallback } from 'react';

export function usePromptFormFields(formData: any, setFormData: (data: any) => void) {
  const updateField = useCallback((field: string, value: any) => {
    setFormData((prev: any) => ({ ...prev, [field]: value }));
  }, [setFormData]);
  return { updateField };
}