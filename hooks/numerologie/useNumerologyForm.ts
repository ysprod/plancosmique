import { useState, useCallback } from 'react';
import { api } from '@/lib/api/client';
import type { UserData } from '@/lib/interfaces';

export interface NumerologyFormData {
  firstName: string;
  lastName: string;
  birthDate: string;
}

export function useNumerologyForm() {
  const [formData, setFormData] = useState<NumerologyFormData>({
    firstName: '',
    lastName: '',
    birthDate: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchUserData = useCallback(() => {
    api.get<UserData>('/users/me')
      .then(res => {
        const user = res.data;
        setFormData(prev => ({
          firstName: user.prenoms || user.firstName || '',
          lastName: user.nom || user.lastName || '',
          birthDate: user.dateNaissance || user.birthDate || '',
        }));
      })
      .catch(() => { });
  }, []);

  return {
    formData,
    setFormData,
    loading,
    setLoading,
    error,
    setError,
    fetchUserData
  };
}
