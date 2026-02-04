import { api } from '@/lib/api/client';
import { Offering } from '@/lib/interfaces';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';

export interface StatsData {
  byCategory: Array<{ category: string; revenue: number; quantitySold: number }>;
  periods: {
    today: { revenue: number; quantitySold: number };
    last7: { revenue: number; quantitySold: number };
    last30: { revenue: number; quantitySold: number };
  };
  byOffering: Array<{
    offeringId: string;
    name: string;
    icon: string;
    category: string;
    revenue: number;
    quantitySold: number;
    avgUnitPrice: number;
  }>;
}

export interface OfferingFormData {
  id: string;
  name: string;
  category: string;
  price: number;
  priceUSD: number;
  icon: string;
  description: string;
}

export function useAdminOffrandes() {
  const router = useRouter();
  const [statsError, setStatsError] = useState<string | null>(null);
  const [offerings, setOfferings] = useState<Offering[]>([]);
  const [statsData, setStatsData] = useState<StatsData | null>(null);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const fetchOfferings = useCallback(async () => {
    setLoading(true);
    try {
      const res = await api.get('/offerings');
      setOfferings(res.data.offerings || []);
      const response = await api.get('/admin/offerings/stats');
      if (response.status === 200 && response.data) {
        setStatsData(response.data);
      } else {
        setStatsError('Erreur lors du chargement des statistiques');
      }
    } catch (e: any) {
      setErrorMessage('Erreur lors du chargement des offrandes');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchOfferings();
  }, [fetchOfferings]);

  const handleEdit = (offering: Offering) => {
    window.location.href = `/admin/offrandes/${offering._id}/edit`;
  };

  const handleAdd = () => {
    window.location.href = '/admin/offrandes/new';
  };

  const handleDelete = async (id: string) => {
    setSaving(true);
    try {
      const res = await api.delete(`/offerings/${id}`);
      if (!res || (res.status < 200 || res.status >= 300)) throw new Error('Erreur API');
      setSuccessMessage('Offrande supprimée');
      fetchOfferings();
    } catch (e: any) {
      setErrorMessage('Erreur lors de la suppression');
    } finally {
      setSaving(false);
    }
  };

  return {
    offerings,
    statsData,
    loading,
    saving,
    successMessage,
    setSuccessMessage,
    errorMessage,
    setErrorMessage,
    fetchOfferings,
    handleAdd,
    handleEdit,
    handleDelete,
    statsError,
  };
}