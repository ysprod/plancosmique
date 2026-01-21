'use client';
import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import type { LoginDto, RegisterDto, Permission } from '@/lib/types/auth.types';
import { Role } from '@/lib/interfaces';
import { authService } from '@/lib/api/services';
import { getUser, clearAuth, getAccessToken } from '@/lib/utils/token.utils';
import { config } from '@/lib/config';
import type { User } from '../interfaces';

/**
 * Interface du contexte d'authentification
 */
interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (credentials: LoginDto) => Promise<void>;
  register: (data: RegisterDto) => Promise<void>;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
  hasRole: (roles: Role | Role[]) => boolean;
  hasPermission: (permissions: Permission | Permission[]) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

/**
 * Hook personnalisé pour accéder au contexte d'authentification
 * @throws Error si utilisé en dehors d'un AuthProvider
 */
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: React.ReactNode;
}

/**
 * Provider d'authentification optimisé avec gestion des tokens et permissions
 */
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  /**
   * Initialise l'authentification au montage du composant
   * Vérifie le token et récupère les données utilisateur
   */
  useEffect(() => {
    const initAuth = async () => {
      try {
        const storedUser = getUser();
        const token = getAccessToken();

        // Vérification du token et de l'utilisateur en cache
        if (storedUser && token) {
          try {
            const currentUser = await authService.me();
            setUser(currentUser);
          } catch (error) {
            console.error('Error fetching user profile:', error);
            clearAuth();
            setUser(null);
          }
        } else {
          setUser(null);
        }
      } catch (error) {
        console.error('Error initializing auth:', error);
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    initAuth();
  }, []);

  /**
   * Connexion utilisateur avec gestion d'erreurs
   * @param credentials - Identifiants de connexion
   */
  const login = useCallback(async (credentials: LoginDto): Promise<void> => {
    setIsLoading(true);
    try {
      const response = await authService.login(credentials);
      setUser(response.user);
      // Petite pause pour la propagation des tokens
      await new Promise(resolve => setTimeout(resolve, 100));
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, []);

  /**
   * Inscription utilisateur avec redirection
   * @param data - Données d'inscription
   */
  const register = useCallback(async (data: RegisterDto): Promise<void> => {
    setIsLoading(true);
    try {
      const response = await authService.register(data);
      setUser(response.user);
      router.push(config.routes.dashboard);
    } catch (error) {
      console.error('Register error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, [router]);

  /**
   * Déconnexion utilisateur avec nettoyage complet
   */
  const logout = useCallback(async (): Promise<void> => {
    setIsLoading(true);
    try {
      await authService.logout();
      window.location.href = '/auth/logout';
    } catch (error) {
      console.error('Logout error:', error);
      // Continuer la déconnexion même en cas d'erreur
    } finally {
      setUser(null);
      setIsLoading(false);
      router.push(config.routes.login);
    }
  }, [router]);

  /**
   * Rafraîchit les données utilisateur depuis l'API
   */
  const refreshUser = useCallback(async (): Promise<void> => {
    try {
      const currentUser = await authService.me();
      setUser(currentUser);
    } catch (error) {
      console.error('Error refreshing user:', error);
      throw error;
    }
  }, []);

  /**
   * Vérifie si l'utilisateur possède un ou plusieurs rôles
   * @param roles - Rôle(s) à vérifier
   * @returns true si l'utilisateur a au moins un des rôles
   */
  const hasRole = useCallback((roles: Role | Role[]): boolean => {
    if (!user?.role) return false;
    const roleArray = Array.isArray(roles) ? roles : [roles];
    return roleArray.includes(user.role);
  }, [user]);

  /**
   * Vérifie si l'utilisateur possède une ou plusieurs permissions
   * @param permissions - Permission(s) à vérifier
   * @returns true si l'utilisateur a au moins une des permissions
   */
  const hasPermission = useCallback((permissions: Permission | Permission[]): boolean => {
    if (!user) return false;

    // Super Admin a toutes les permissions
    if (user.role === Role.SUPER_ADMIN) return true;

    const permissionArray = Array.isArray(permissions) ? permissions : [permissions];

    // Vérification dans les permissions personnalisées
    return user.customPermissions
      ? permissionArray.some(perm => user.customPermissions?.includes(perm))
      : false;
  }, [user]);

  /**
   * Calcul mémoïsé de l'état d'authentification
   */
  const isAuthenticated = useMemo(() => !!user && !!getAccessToken(), [user]);

  /**
   * Valeur du contexte mémoïsée pour éviter les re-renders inutiles
   */
  const value = useMemo<AuthContextType>(
    () => ({
      user,
      isAuthenticated,
      isLoading,
      login,
      register,
      logout,
      refreshUser,
      hasRole,
      hasPermission,
    }),
    [user, isAuthenticated, isLoading, login, register, logout, refreshUser, hasRole, hasPermission]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext;
