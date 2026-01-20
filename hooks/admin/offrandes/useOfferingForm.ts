import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { api } from "@/lib/api/client";
import { OfferingFormData } from "@/components/admin/offrandes/OfferingForm";

export function useOfferingForm() {
  const router = useRouter();
  const [formData, setFormData] = useState<OfferingFormData>({
    name: '',
    price: 0,
    priceUSD: 0,
    category: '',
    icon: '',
    description: '',
  });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const priceUSD = useMemo(() => {
    if (!formData?.price) return 0;
    return Number(((formData.price || 0) / 563.90).toFixed(2));
  }, [formData?.price]);

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'number' ? Number(value) : value,
    }));
  }

  function handleCategoryChange(value: 'animal' | 'vegetal' | 'beverage') {
    setFormData(prev => ({ ...prev, category: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!formData.name.trim() || !formData.description.trim() || !formData.price) {
      setError('Tous les champs sont obligatoires');
      return;
    }
    setSaving(true);
    setError(null);
    try {
      await api.post('/offerings', {
        name: formData.name.trim(),
        price: formData.price,
        priceUSD,
        category: formData.category,
        icon: formData.icon?.trim()||'❓',
        description: formData.description.trim(),
      });
      router.push('/admin/offrandes');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Erreur lors de la sauvegarde');
    } finally {
      setSaving(false);
    }
  }

  function handleCancel() {
    router.push('/admin/offrandes');
  }

  return {
    formData,
    setFormData,
    saving,
    error,
    priceUSD,
    handleChange,
    handleCategoryChange,
    handleSubmit,
    handleCancel,
  };
}
