import { useState, useCallback } from 'react';
import { api } from '@/lib/api/client';
import type { User } from '@/lib/interfaces';

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
    api.get<User>('/users/me')
      .then(res => {
        const user = res.data;
        setFormData(prev => ({
          firstName: user.prenoms || '',
          lastName: user.nom || '',
          birthDate: user.dateNaissance
            ? (typeof user.dateNaissance === 'string' ? user.dateNaissance : user.dateNaissance.toISOString().slice(0, 10))
            : '',
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
