import { useEffect, useState, useMemo, useCallback } from "react";
import { api } from "@/lib/api/client";
import { useParams } from "next/navigation";
import { Offering } from "@/lib/interfaces";

export function useEditOffrande() {

  const params = useParams();
  const id = Array.isArray(params?.id) ? params.id[0] : params?.id;
  const [formData, setFormData] = useState<Offering | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(() => {
    if (!id) return;
    setLoading(true);
    api.get(`/offerings/${id}`)
      .then(res => setFormData(res.data))
      .catch(err => setError(err.response?.data?.message || "Erreur de chargement"))
      .finally(() => setLoading(false));
  }, [id]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const priceUSD = useMemo(() => {
    if (!formData?.price) return 0;
    // 2 chiffres après la virgule, taux 563.90
    return Number(((formData.price || 0) / 563.90).toFixed(2));
  }, [formData?.price]);

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    if (!formData) return;
    const { name, value, type } = e.target;
    setFormData(prev => prev && ({
      ...prev,
      [name]: type === 'number' ? Number(value) : value,
    }));
  }

  function handleCategoryChange(value: 'animal' | 'vegetal' | 'beverage') {
    if (!formData) return;
    setFormData(prev => prev && { ...prev, category: value });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!formData) return;
    setSaving(true);
    setError(null);
    try {
      await api.put(`/offerings/${id}`,
        { ...formData, priceUSD }
      );
      window.location.href = `/admin/offrandes?r=${Date.now()}`;
    } catch (err: any) {
      setError(err.response?.data?.message || "Erreur lors de la sauvegarde");
    } finally {
      setSaving(false);
    }
  }

  return {
    formData,
    setFormData,
    loading,
    saving,
    error,
    priceUSD,
    handleChange,
    handleCategoryChange,
    handleSubmit,
    fetchData,
  };
}
