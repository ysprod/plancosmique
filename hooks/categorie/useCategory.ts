import { useEffect, useState } from 'react';
import { getCategory } from '@/lib/api/services/categories.service';
import type { CategorieAdmin } from '@/lib/interfaces';

export function useCategory(id: string | null) {
  const [category, setCategory] = useState<CategorieAdmin | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) {
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    getCategory(id)
      .then(cat => {
        setCategory(cat);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error loading category:', err);
        setError(err.message || 'Erreur lors du chargement de la catégorie');
        setLoading(false);
      });
  }, [id]);

  return { category, loading, error };
}
