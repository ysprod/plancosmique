'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';

type Theme = 'light' | 'dark' | 'system';

interface ThemeContextType {
  theme: Theme;
  effectiveTheme: 'light' | 'dark';
  setTheme: (theme: Theme) => void;
}


// Contexte React pour le thème supprimé. Utiliser uniquement la classe `dark` sur <html> et localStorage.
// Ce fichier peut être supprimé ou remplacé par des helpers utilitaires si besoin.
