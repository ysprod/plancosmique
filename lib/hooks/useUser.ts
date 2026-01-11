'use client';
import { useState, useCallback } from 'react';
import { usersService } from '@/lib/api/services';
import type { Role, Permission } from '@/lib/interfaces';
import type { PaginatedResponse, QueryParams } from '@/lib/types/api.types';
import type { CreateUserDto, UpdateUserDto, UserStats, } from '@/lib/api/services/users.service';
import { User } from '../interfaces';

export const useUser = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const clearError = useCallback(() => setError(null), []);

  /**
   * Liste des utilisateurs
   */
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

  /**
   * Récupérer un utilisateur par ID
   */
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

  /**
   * Créer un utilisateur
   */
  const createUser = useCallback(async (data: CreateUserDto): Promise<User | null> => {
    setLoading(true);
    setError(null);
    try {
      const user = await usersService.create(data);
      return user;
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || 'Error creating user';
      setError(errorMessage);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Mettre à jour un utilisateur
   */
  const updateUser = useCallback(async (id: string, data: UpdateUserDto): Promise<User | null> => {
    setLoading(true);
    setError(null);
    try {
      const user = await usersService.update(id, data);
      return user;
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || 'Error updating user';
      setError(errorMessage);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Supprimer un utilisateur
   */
  const deleteUser = useCallback(async (id: string): Promise<boolean> => {
    setLoading(true);
    setError(null);
    try {
      await usersService.delete(id);
      return true;
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || 'Error deleting user';
      setError(errorMessage);
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Changer le rôle d'un utilisateur
   */
  const updateUserRole = useCallback(async (id: string, role: Role): Promise<User | null> => {
    setLoading(true);
    setError(null);
    try {
      const user = await usersService.updateRole(id, role);
      return user;
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || 'Error updating user role';
      setError(errorMessage);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Mettre à jour les permissions d'un utilisateur
   */
  const updateUserPermissions = useCallback(async (id: string, permissions: Permission[]): Promise<User | null> => {
    setLoading(true);
    setError(null);
    try {
      const user = await usersService.updatePermissions(id, permissions);
      return user;
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || 'Error updating user permissions';
      setError(errorMessage);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Récupérer les statistiques d'un utilisateur
   */
  const getUserStats = useCallback(async (id: string): Promise<UserStats | null> => {
    setLoading(true);
    setError(null);
    try {
      const stats = await usersService.getStats(id);
      return stats;
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || 'Error fetching user stats';
      setError(errorMessage);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    loading,
    error,
    clearError,
    listUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    updateUserRole,
    updateUserPermissions,
    getUserStats,
  };
};