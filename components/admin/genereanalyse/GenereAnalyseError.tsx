import React from 'react';
import { AlertCircle } from 'lucide-react';

interface GenereAnalyseErrorProps {
  error: string | null;
  onRetry: () => void;
}

export const GenereAnalyseError: React.FC<GenereAnalyseErrorProps> = ({ error, onRetry }) => (
  <div className="py-8 px-4 text-center">
    <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
      <AlertCircle className="w-8 h-8 text-red-600 dark:text-red-400" />
    </div>
    <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-2">Erreur</h3>
    <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">{error}</p>
    <button
      onClick={onRetry}
      className="px-6 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-xl font-semibold transition-colors"
    >
      Réessayer
    </button>
  </div>
);
