'use client';
import React from 'react';
import OffrandesList from './OffrandesList';
import { OffrandesGestionPanelHeader } from './OffrandesGestionPanelHeader';
import { OffrandesGestionPanelPagination } from './OffrandesGestionPanelPagination';
import OffrandesCategoriesSummary from './OffrandesCategoriesSummary';
import { OffrandesLoading } from './OffrandesLoading';
import OffrandesMessages from './OffrandesMessages';
import { CATEGORIES_OFFRANDES } from '@/lib/constants';
import GestionPanelContainer from './gestion/GestionPanelContainer';
import GestionEmptyState from './gestion/GestionEmptyState';
import { useGestionPanel } from './gestion/useGestionPanel';

interface OffrandesGestionPanelProps {
  offerings: any[];
  loading: boolean;
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
  successMessage,
  errorMessage,
  setErrorMessage,
  fetchOfferings,
  handleAdd,
  handleEdit,
  handleDelete,
}: OffrandesGestionPanelProps) {
  const { page, setPage, totalPages, offerings: paginatedOfferings } = useGestionPanel(offerings, 15);
  return (
    <GestionPanelContainer>
      <div className="w-full flex flex-col items-center justify-center mb-6 animate-fade-in">
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
        <GestionEmptyState onAdd={handleAdd} />
      ) : (
        <>
          <OffrandesList offerings={paginatedOfferings} CATEGORIES={CATEGORIES_OFFRANDES} onEdit={handleEdit} onDelete={handleDelete} />
          <OffrandesGestionPanelPagination page={page} totalPages={totalPages} setPage={setPage} />
        </>
      )}
    </GestionPanelContainer>
  );
}
