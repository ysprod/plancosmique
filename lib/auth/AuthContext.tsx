'use client';

/**
 * Contexte d'authentification avec gestion JWT
 */

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import type { User, LoginDto, RegisterDto, Permission } from '@/lib/types/auth.types';
import { Role } from '@/lib/types/auth.types';
import { authService } from '@/lib/api/services';
import { getUser, clearAuth, getAccessToken } from '@/lib/utils/token.utils';
import { config } from '@/lib/config';

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

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  /**
   * Initialise l'utilisateur depuis le localStorage au montage
   */
  useEffect(() => {
    const initAuth = async () => {
      try {
        const storedUser = getUser();
        const token = getAccessToken();

        // IMPORTANT : ne faire l'appel authService.me() que si on a un token ET un utilisateur en cache
        if (storedUser && token) {
          try {
            const currentUser = await authService.me();
            setUser(currentUser);
          } catch (error) {
            // Token invalide ou expiré
            console.error('Error fetching user profile:', error);
            clearAuth();
            setUser(null);
          }
        } else {
          // Pas de token = pas d'utilisateur connecté
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
   * Connexion utilisateur
   */
  const login = useCallback(async (credentials: LoginDto) => {
    setIsLoading(true);
    try {
      const response = await authService.login(credentials);
      setUser(response.user);
      // Laisser le middleware/page gérer la redirection
      // Juste attendre une fraction de seconde pour laisser les tokens se propager
      await new Promise(resolve => setTimeout(resolve, 100));
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, []);

  /**
   * Inscription utilisateur
   */
  const register = useCallback(async (data: RegisterDto) => {
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
   * Déconnexion utilisateur
   */
  const logout = useCallback(async () => {
    setIsLoading(true);
    try {
      await authService.logout();
      window.location.href = "/auth/logout";
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setUser(null);
      setIsLoading(false);
      router.push(config.routes.login);
    }
  }, [router]);

  /**
   * Rafraîchit les données utilisateur
   */
  const refreshUser = useCallback(async () => {
    try {
      const currentUser = await authService.me();
      setUser(currentUser);
    } catch (error) {
      console.error('Error refreshing user:', error);
      throw error;
    }
  }, []);

  /**
   * Vérifie si l'utilisateur a un ou plusieurs rôles
   */
  const hasRole = useCallback((roles: Role | Role[]): boolean => {
    if (!user) return false;
    
    const roleArray = Array.isArray(roles) ? roles : [roles];
    return roleArray.includes(user.role);
  }, [user]);

  /**
   * Vérifie si l'utilisateur a une ou plusieurs permissions
   */
  const hasPermission = useCallback((permissions: Permission | Permission[]): boolean => {
    if (!user) return false;

    const permissionArray = Array.isArray(permissions) ? permissions : [permissions];
    
    // Super Admin a toutes les permissions
    if (user.role === Role.SUPER_ADMIN) return true;

    // Vérifier dans les permissions personnalisées
    if (user.customPermissions) {
      return permissionArray.some(perm => user.customPermissions?.includes(perm));
    }

    return false;
  }, [user]);

  const value: AuthContextType = {
    user,
    isAuthenticated: !!user && !!getAccessToken(),
    isLoading,
    login,
    register,
    logout,
    refreshUser,
    hasRole,
    hasPermission,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext;
