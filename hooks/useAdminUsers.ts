import { api } from '@/lib/api/client';
import { useCallback, useEffect, useRef, useState } from 'react';

interface User {
  id: string;
  email: string;
  nom: string;
  prenom: string;
  username: string;
  telephone: string;
  phone?: string;
  role: 'USER' | 'ADMIN';
  status: 'active' | 'inactive' | 'suspended';
  isActive: boolean;
  emailVerified: boolean;
  createdAt: string;
  lastLogin: string;
  consultationsCount: number;
  totalConsultations: number;
  rating: number;
  credits: number;
  country?: string;
  gender?: string;
  preferences?: {
    notifications?: boolean;
  };
}

interface UseAdminUsersOptions {
  search?: string;
  status?: string;
  role?: string;
  page?: number;
  limit?: number;
}

export function useAdminUsers(options: UseAdminUsersOptions = {}) {
  const [users, setUsers] = useState<User[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const abortControllerRef = useRef<AbortController | null>(null);

  const fetchUsers = useCallback(async () => {
    try {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }

      abortControllerRef.current = new AbortController();

      setLoading(true);
      setError(null);

      const params = new URLSearchParams({
        search: options.search || '',
        status: options.status || 'all',
        role: options.role || 'all',
        page: String(options.page || 1),
        limit: String(options.limit || 10),
      });

      const response = await api.get(`/admin/users?${params}`, {
        signal: abortControllerRef.current.signal,
        timeout: 10000,
      });

      setUsers(response.data.users || []);
      setTotal(response.data.total || 0);
    } catch (err: any) {
      if (err.name === 'AbortError' || err.name === 'CanceledError') {
        return;
      }

      console.error('Erreur lors du chargement des utilisateurs:', err);

      let errorMessage = 'Erreur inconnue';

      if (err.response) {
        errorMessage = err.response.data?.message || 
                      `Erreur ${err.response.status}`;
      } else if (err.request) {
        errorMessage = 'Erreur de connexion au serveur';
      } else {
        errorMessage = err.message;
      }

      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  }, [options.search, options.status, options.role, options.page, options.limit]);

  useEffect(() => {
    fetchUsers();

    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, [fetchUsers]);

  return { users, total, loading, error, refetch: fetchUsers };
}
