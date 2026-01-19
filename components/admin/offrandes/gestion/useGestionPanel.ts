 import { useOffrandesGestionPagination } from '@/hooks/admin/useOffrandesGestionPagination';
import { useMemo } from 'react';

export function useGestionPanel(offerings: any[], perPage = 6) {
  const { page, setPage, totalPages, paginatedItems } = useOffrandesGestionPagination(offerings, perPage);
  // Ajout d'un tri par nom pour la compacité visuelle
  const sortedOfferings = useMemo(() =>
    [...paginatedItems].sort((a, b) => a.name.localeCompare(b.name)),
    [paginatedItems]
  );
  return { page, setPage, totalPages, offerings: sortedOfferings };
}
