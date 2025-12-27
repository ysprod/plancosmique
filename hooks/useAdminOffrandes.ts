import { useState, useEffect, useCallback } from 'react';
import { api } from '@/lib/api/client';

// Types (à adapter selon le modèle exact)
export interface Offering {
  id: string;
  name: string;
  category: string;
  price: number;
  priceUSD: number;
  icon: string;
  description: string;
}

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

  // Fetch offerings
  const fetchOfferings = useCallback(async () => {
    setLoading(true);
    try {
      const res = await api.get('/offerings');
      console.log(res);
      setOfferings(res.data.offerings || []);
     // setStatsData(res.data.stats || null);
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

   const fetchStats = async () => {
        setStatsLoading(true);
        setStatsError(null);
        try {
            const response = await api.get('/admin/offerings/stats');
            if (response.status === 200 && response.data) {
                setStatsData(response.data);
            } else {
                setStatsError('Erreur lors du chargement des statistiques');
            }
        } catch (err: any) {
            setStatsError('Erreur lors du chargement des statistiques');
        } finally {
            setStatsLoading(false);
        }
    };

  useEffect(() => {
    fetchOfferings();
  }, [fetchOfferings]);

  // Add/Edit
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

  // Confirm add/edit
  const handleConfirm = async () => {
    if (!formData.id || !formData.name || !formData.category || !formData.price || !formData.icon || !formData.description) {
      setErrorMessage('Veuillez remplir tous les champs obligatoires');
      return;
    }
    setSaving(true);
    try {
      let res;
      if (editingId) {
        res = await api.put(`/offrandes/${editingId}`, formData);
      } else {
        res = await api.post('/offrandes', formData);
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

  // Delete
  const handleDelete = async (id: string) => {
    setSaving(true);
    try {
      const res = await api.delete(`/offrandes/${id}`);
      if (!res || (res.status < 200 || res.status >= 300)) throw new Error('Erreur API');
      setSuccessMessage('Offrande supprimée');
      fetchOfferings();
    } catch (e: any) {
      setErrorMessage('Erreur lors de la suppression');
    } finally {
      setSaving(false);
    }
  };

  // Save all (batch)
  const handleSaveAll = async () => {
    setSaving(true);
    try {
      const res = await api.post('/offrandes/batch', { offerings });
      if (!res || (res.status < 200 || res.status >= 300)) throw new Error('Erreur API');
      setSuccessMessage('Toutes les offrandes ont été sauvegardées');
      fetchOfferings();
    } catch (e: any) {
      setErrorMessage('Erreur lors de la sauvegarde groupée');
    } finally {
      setSaving(false);
    }
  };

  // Reset messages on modal close
  useEffect(() => {
    if (!showAddModal) {
      setErrorMessage(null);
      setSuccessMessage(null);
    }
  }, [showAddModal]);

  // Calcul automatique du prix USD
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
    handleSaveAll,
  };
}
