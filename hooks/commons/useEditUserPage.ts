import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { api } from '@/lib/api/client';
import { User } from '@/lib/interfaces';
import { Role } from '@/lib/types/auth.types';

export function useEditUserPage() {
  const router = useRouter();
  const params = useParams();
  const userId = params?.id as string;

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState<Partial<User>>({
    username: '',
    phone: '',
    country: '',
    gender: 'Other',
    role: Role.USER,
    isActive: true,
    emailVerified: false,
    credits: 0,
    preferences: {
      notifications: true,
      newsletter: false,
    },
  });

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setLoading(true);
        const { data } = await api.get(`/admin/users/${userId}`);
        setFormData(data);
      } catch (err) {
        const error = err as { response?: { data?: { message?: string } } };
        setError(error.response?.data?.message || 'Erreur lors du chargement');
      } finally {
        setLoading(false);
      }
    };
    if (userId) {
      fetchUser();
    }
  }, [userId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    try {
      await api.patch(`/admin/users/${userId}`, formData);
      setSuccess(true);
      setTimeout(() => {
        router.push('/admin/users');
      }, 1500);
    } catch (err) {
      const error = err as { response?: { data?: { message?: string } } };
      setError(error.response?.data?.message || 'Erreur lors de la modification');
    } finally {
      setSaving(false);
    }
  };

  return {
    loading,
    saving,
    error,
    setError,
    success,
    formData,
    setFormData,
    handleSubmit,
  };
}
