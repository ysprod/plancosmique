import React from 'react';
import OffrandesList from './OffrandesList';
import OffrandesCategoriesSummary from './OffrandesCategoriesSummary';
import OffrandesMessages from './OffrandesMessages';
import { CATEGORIES_OFFRANDES } from '@/lib/constants';

interface OffrandesGestionPanelProps {
  offerings: any[];
  loading: boolean;
  saving: boolean;
  successMessage: string | null;
  errorMessage: string | null;
  setErrorMessage: (msg: string | null) => void;
  fetchOfferings: () => void;
  handleAdd: () => void;
  handleEdit: (offering: any) => void;
  handleDelete: (id: string) => void;
}

export default function OffrandesGestionPanel({
  offerings,
  loading,
  saving,
  successMessage,
  errorMessage,
  setErrorMessage,
  fetchOfferings,
  handleAdd,
  handleEdit,
  handleDelete,
}: OffrandesGestionPanelProps) {
  return (
    <>
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              {offerings.length} offrande{offerings.length > 1 ? 's' : ''} • Marché Spirituel
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
        <OffrandesMessages successMessage={successMessage} errorMessage={errorMessage} setErrorMessage={setErrorMessage} />
      </div>
      <OffrandesCategoriesSummary CATEGORIES={CATEGORIES_OFFRANDES} offerings={offerings} />
      {loading ? (
        <div className="text-center py-16 bg-gray-50 dark:bg-gray-900 rounded-2xl">
          <span className="w-12 h-12 text-violet-500 mx-auto mb-4 animate-spin">⏳</span>
          <p className="text-sm font-semibold text-gray-600 dark:text-gray-400">Chargement des offrandes...</p>
        </div>
      ) : offerings.length === 0 ? (
        <div className="text-center py-16 bg-gray-50 dark:bg-gray-900 rounded-2xl border-2 border-dashed border-gray-300 dark:border-gray-700">
          <span className="w-16 h-16 text-gray-400 dark:text-gray-600 mx-auto mb-4">🛍️</span>
          <p className="text-base font-bold text-gray-700 dark:text-gray-300 mb-2">Aucune offrande</p>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">Commencez par ajouter votre première offrande</p>
          <button onClick={handleAdd} className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-violet-500 hover:bg-violet-600 text-white font-bold">
            <span className="w-4 h-4">➕</span>Ajouter une offrande
          </button>
        </div>
      ) : (
        <OffrandesList offerings={offerings} CATEGORIES={CATEGORIES_OFFRANDES} onEdit={handleEdit} onDelete={handleDelete} />
      )}
    </>
  );
}
