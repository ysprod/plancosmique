'use client';
import React from 'react';

interface OffrandesGestionPanelHeaderProps {
  offeringsCount: number;
  loading: boolean;
  fetchOfferings: () => void;
  handleAdd: () => void;
}

export function OffrandesGestionPanelHeader({
  offeringsCount,
  loading,
  fetchOfferings,
  handleAdd,
}: OffrandesGestionPanelHeaderProps) {
  return (
    <div className="flex items-center justify-between mb-4">
      <div>
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
          {offeringsCount} offrande{offeringsCount > 1 ? 's' : ''}
        </p>
      </div>
      <div className="flex gap-2">
        <button
          onClick={fetchOfferings}
          disabled={loading}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all font-semibold text-sm disabled:opacity-50"
        >
          <span className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`}>🔄</span>
          <span className="hidden sm:inline">Recharger</span>
        </button>
        <button
          onClick={handleAdd}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-violet-500 to-purple-500 hover:from-violet-600 hover:to-purple-600 text-white font-bold text-sm shadow-lg transition-all active:scale-95"
        >
          <span className="w-4 h-4">➕</span>
          <span className="hidden sm:inline">Ajouter</span>
        </button>
      </div>
    </div>
  );
}