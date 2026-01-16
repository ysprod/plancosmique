'use client';

import React from 'react';
import OffrandesList from './OffrandesList';
import { OffrandesGestionPanelHeader } from './OffrandesGestionPanelHeader';
import { OffrandesGestionPanelPagination } from './OffrandesGestionPanelPagination';
import { useOffrandesGestionPagination } from '../../../hooks/admin/useOffrandesGestionPagination';
import OffrandesCategoriesSummary from './OffrandesCategoriesSummary';
import { OffrandesLoading } from './OffrandesLoading';
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
  const { page, setPage, totalPages, paginatedItems: paginatedOfferings } = useOffrandesGestionPagination(offerings, 6);
  return (
    <>
      <div className="mb-6">
        <OffrandesGestionPanelHeader
          offeringsCount={offerings.length}
          loading={loading}
          fetchOfferings={fetchOfferings}
          handleAdd={handleAdd}
        />
        <OffrandesMessages successMessage={successMessage} errorMessage={errorMessage} setErrorMessage={setErrorMessage} />
      </div>
      <OffrandesCategoriesSummary CATEGORIES={CATEGORIES_OFFRANDES} offerings={offerings} />
      {loading ? (
        <OffrandesLoading />
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
        <>
          <OffrandesList offerings={paginatedOfferings} CATEGORIES={CATEGORIES_OFFRANDES} onEdit={handleEdit} onDelete={handleDelete} />
          <OffrandesGestionPanelPagination page={page} totalPages={totalPages} setPage={setPage} />
        </>
      )}
    </>
  );
}
