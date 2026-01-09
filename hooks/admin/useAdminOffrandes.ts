import { useState, useEffect, useCallback } from 'react';
import { api } from '@/lib/api/client';
import { Offering } from '@/lib/interfaces';

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
  const [statsLoading, setStatsLoading] = useState(true);
  const [statsError, setStatsError] = useState<string | null>(null);
  const [offerings, setOfferings] = useState<Offering[]>([]);
  const [statsData, setStatsData] = useState<StatsData | null>(null);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<OfferingFormData>({
    id: '',
    name: '',
    category: '',
    price: 0,
    priceUSD: 0,
    icon: '',
    description: '',
  });
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

  const handleAdd = () => {
    setEditingId(null);
    setFormData({
      id: '',
      name: '',
      category: '',
      price: 0,
      priceUSD: 0,
      icon: '',
      description: '',
    });
    setShowAddModal(true);
  };

  const handleEdit = (offering: Offering) => {
    setEditingId(offering.id);
    setFormData({ ...offering });
    setShowAddModal(true);
  };

  const handleConfirm = async () => {
    if (!formData.name || !formData.category || !formData.price || !formData.icon || !formData.description) {
      setErrorMessage('Veuillez remplir tous les champs obligatoires');
      return;
    }
    setSaving(true);
    try {
      let res;
      if (editingId) {
        res = await api.put(`/offerings/${editingId}`, formData);
      } else {
        res = await api.post('/offerings', formData);
      }
      if (!res || (res.status < 200 || res.status >= 300)) throw new Error('Erreur API');
      setSuccessMessage(editingId ? 'Offrande modifiée' : 'Offrande ajoutée');
      setShowAddModal(false);
      fetchOfferings();
    } catch (e: any) {
      setErrorMessage('Erreur lors de la sauvegarde');
    } finally {
      setSaving(false);
    }
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

  useEffect(() => {
    if (!showAddModal) {
      setErrorMessage(null);
      setSuccessMessage(null);
    }
  }, [showAddModal]);

  useEffect(() => {
    if (formData.price) {
      setFormData((prev) => ({ ...prev, priceUSD: Math.round(formData.price / 563.5) }));
    }
  }, [formData.price]);

  return {
    offerings,
    statsData,
    loading,
    saving,
    showAddModal,
    setShowAddModal,
    editingId,
    setEditingId,
    formData,
    setFormData,
    successMessage,
    setSuccessMessage,
    errorMessage,
    setErrorMessage,
    fetchOfferings,
    handleAdd,
    handleEdit,
    handleConfirm,
    handleDelete,
  };
}
