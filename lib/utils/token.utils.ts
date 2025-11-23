/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * Utilitaires pour la gestion des tokens JWT
 */

import { config } from '../config';
import type { TokenPayload } from '@/types/auth.types';

/**
 * Stocke le token d'accès
 */
export const setAccessToken = (token: string): void => {
  if (typeof window !== 'undefined') {
    localStorage.setItem(config.auth.tokenKey, token);
  }
};

/**
 * Récupère le token d'accès
 */
export const getAccessToken = (): string | null => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem(config.auth.tokenKey);
  }
  return null;
};

/**
 * Supprime le token d'accès
 */
export const removeAccessToken = (): void => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(config.auth.tokenKey);
  }
};

/**
 * Stocke le refresh token
 */
export const setRefreshToken = (token: string): void => {
  if (typeof window !== 'undefined') {
    localStorage.setItem(config.auth.refreshTokenKey, token);
  }
};

/**
 * Récupère le refresh token
 */
export const getRefreshToken = (): string | null => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem(config.auth.refreshTokenKey);
  }
  return null;
};

/**
 * Supprime le refresh token
 */
export const removeRefreshToken = (): void => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(config.auth.refreshTokenKey);
  }
};

/**
 * Stocke les données utilisateur
 */
export const setUser = (user: any): void => {
  if (typeof window !== 'undefined') {
    localStorage.setItem(config.auth.userKey, JSON.stringify(user));
  }
};

/**
 * Récupère les données utilisateur
 */
export const getUser = (): any | null => {
  if (typeof window !== 'undefined') {
    const userData = localStorage.getItem(config.auth.userKey);
    return userData ? JSON.parse(userData) : null;
  }
  return null;
};

/**
 * Supprime les données utilisateur
 */
export const removeUser = (): void => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(config.auth.userKey);
  }
};

/**
 * Nettoie tous les tokens et données utilisateur
 */
export const clearAuth = (): void => {
  removeAccessToken();
  removeRefreshToken();
  removeUser();
};

/**
 * Décode un token JWT (sans vérification de signature)
 */
export const decodeToken = (token: string): TokenPayload | null => {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    return JSON.parse(jsonPayload);
  } catch (error) {
    console.error('Error decoding token:', error);
    return null;
  }
};

/**
 * Vérifie si un token est expiré
 */
export const isTokenExpired = (token: string): boolean => {
  const decoded = decodeToken(token);
  if (!decoded) return true;

  const currentTime = Math.floor(Date.now() / 1000);
  return decoded.exp < currentTime;
};

/**
 * Vérifie si un token est proche de l'expiration
 */
export const isTokenExpiringSoon = (token: string): boolean => {
  const decoded = decodeToken(token);
  if (!decoded) return true;

  const currentTime = Math.floor(Date.now() / 1000);
  const buffer = config.auth.tokenExpirationBuffer;
  return decoded.exp - currentTime < buffer;
};

/**
 * Récupère le temps restant avant expiration (en secondes)
 */
export const getTokenTimeRemaining = (token: string): number => {
  const decoded = decodeToken(token);
  if (!decoded) return 0;

  const currentTime = Math.floor(Date.now() / 1000);
  return Math.max(0, decoded.exp - currentTime);
};
