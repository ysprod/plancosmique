import { useEffect, useState, useMemo } from 'react';
import { getCategory } from '@/lib/api/services/categories.service';
import type { CategorieAdmin } from '@/lib/interfaces';

export function useCategory(id: string) {
  const [category, setCategory] = useState<CategorieAdmin | null>(null);
  const [loading, setLoading] = useState(!!id);
  const [error, setError] = useState<string | null>(null);
  const stableId = useMemo(() => id, [id]);

  useEffect(() => {
    if (!stableId) {
      setCategory(null);
      setLoading(false);
      setError(null);
      return;
    }
    setLoading(true);
    setError(null);
    (async () => {
      try {
        const cat = await getCategory(stableId);
        setCategory(cat);
        setError(null);
      } catch (err: any) {
        setCategory(null);
        setError(err?.message || 'Erreur lors du chargement de la catégorie');
        console.error('Error loading category:', err);
      } finally {
        setLoading(false);
      }
    })();
  }, [stableId]);

  return { category, loading, error };
}