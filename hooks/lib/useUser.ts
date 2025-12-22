/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import { useState, useCallback } from 'react';
import { usersService } from '@/lib/api/services';
import type { User, Role, Permission } from '@/lib/types/auth.types';
import type { PaginatedResponse, QueryParams } from '@/lib/types/api.types';
import type { CreateUserDto, UpdateUserDto, UserStats } from '@/lib/api/services/users.service';
export const useUser = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const clearError = useCallback(() => setError(null), []);
  const listUsers = useCallback(async (params?: QueryParams): Promise<PaginatedResponse<User> | null> => {
    setLoading(true);
    setError(null);
    try {
      const result = await usersService.list(params);
      return result;
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || 'Error fetching users';
      setError(errorMessage);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);
  const getUserById = useCallback(async (id: string): Promise<User | null> => {
    setLoading(true);
    setError(null);
    try {
      const user = await usersService.getById(id);
      return user;
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || 'Error fetching user';
      setError(errorMessage);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);
  // ...existing code...
  return {
    loading,
    error,
    clearError,
    listUsers,
    getUserById,
    // ...other methods...
  };
};
