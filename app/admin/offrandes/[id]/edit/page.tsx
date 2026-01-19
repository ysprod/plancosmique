"use client";
import { api } from "@/lib/api/client";
import { Offering } from "@/lib/interfaces";
import { Loader2 } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState, useMemo } from "react";
import { CATEGORIES_OFFRANDES } from '@/lib/constants';

export default function EditOffrandePage() {
  const router = useRouter();
  const params = useParams();
  const id = Array.isArray(params?.id) ? params.id[0] : params?.id;
  const [formData, setFormData] = useState<Offering | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    api.get(`/offerings/${id}`)
      .then(res => setFormData(res.data))
      .catch(err => setError(err.response?.data?.message || "Erreur de chargement"))
      .finally(() => setLoading(false));
  }, [id]);

  // Calcul USD à la volée, sans setState inutile
  const priceUSD = useMemo(() => {
    if (!formData?.price) return 0;
    return Math.round((formData.price || 0) / 563.5);
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
      router.push("/admin/offrandes");
    } catch (err: any) {
      setError(err.response?.data?.message || "Erreur lors de la sauvegarde");
    } finally {
      setSaving(false);
    }
  }

  if (loading) return (
    <div className="flex items-center justify-center h-64 animate-pulse">
      <Loader2 className="w-8 h-8 animate-spin mr-2" /> Chargement de l'offrande...
    </div>
  );

  if (error) return (
    <div className="bg-gradient-to-r from-red-900 via-rose-900 to-pink-900 text-white p-6 rounded-xl shadow-lg flex flex-col items-center">
      <span className="font-bold mb-2">Erreur :</span>
      <span>{error}</span>
      <button
        type="button"
        className="mt-4 px-4 py-2 rounded-xl bg-gradient-to-r from-violet-500 to-purple-500 text-white font-bold shadow hover:from-violet-600 hover:to-purple-600"
        onClick={() => router.refresh()}
      >
        Réessayer
      </button>
    </div>
  );

  if (!formData) return null;

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto bg-white dark:bg-gray-900 p-8 rounded-3xl shadow-2xl border-2 border-violet-200 dark:border-violet-800 space-y-6 mt-8">
      <h1 className="text-2xl font-bold mb-4 text-cosmic-indigo">Modifier l'offrande</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">            
        <div>
          <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Nom *</label>
          <input
            type="text"
            name="name"
            value={formData.name || ""}
            onChange={handleChange}
            placeholder="ex: Poulet blanc"
            required
            className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:border-violet-500 dark:focus:border-violet-500 transition-colors"
          />
        </div>
      </div>
      <div>
        <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Catégorie *</label>
        <div className="grid grid-cols-3 gap-2">
          {CATEGORIES_OFFRANDES.map(cat => (
            <button
              key={cat.value}
              type="button"
              tabIndex={0}
              aria-pressed={formData.category === cat.value}
              onClick={() => handleCategoryChange(cat.value as 'animal' | 'vegetal' | 'beverage')}
              className={`py-3 px-4 rounded-xl font-bold text-sm transition-all outline-none focus:ring-2 focus:ring-violet-500 ${formData.category === cat.value ? `bg-gradient-to-br ${cat.color} text-white shadow-lg scale-105` : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'}`}
            >
              <span className="text-xl block mb-1">{cat.emoji}</span>
              {cat.label}
            </button>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Prix XOF */}
        <div>
          <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Prix (XOF) *</label>
          <input
            type="number"
            name="price"
            value={formData.price || 0}
            onChange={handleChange}
            min="0"
            step="100"
            required
            className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:border-violet-500 dark:focus:border-violet-500 transition-colors"
          />
        </div>
        {/* Prix USD (auto-calculé) */}
        <div>
          <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Prix (USD)</label>
          <input
            type="number"
            name="priceUSD"
            value={priceUSD}
            disabled
            className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 cursor-not-allowed"
          />
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Calculé automatiquement (1 USD = 563.5 XOF)</p>
        </div>
      </div>
      {/* Icône */}
      <div>
        <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Icône (emoji) *</label>
        <input
          type="text"
          name="icon"
          value={formData.icon || ''}
          onChange={handleChange}
          placeholder="🐓"
          maxLength={2}
          className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-2xl text-center focus:border-violet-500 dark:focus:border-violet-500 transition-colors"
        />
      </div>
      {/* Description */}
      <div>
        <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Description *</label>
        <textarea
          name="description"
          value={formData.description || ''}
          onChange={handleChange}
          placeholder="Symbole de pureté et d'harmonie"
          rows={3}
          className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:border-violet-500 dark:focus:border-violet-500 transition-colors resize-none"
        />
      </div>
      {/* Error */}
      {error && <div className="text-red-600 text-sm font-bold mt-2">{error}</div>}
      {/* Boutons */}
      <div className="flex gap-3 pt-4">
        <button
          type="button"
          onClick={() => router.push("/admin/offrandes")}
          className="flex-1 py-3 rounded-xl border-2 border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 font-bold hover:bg-gray-100 dark:hover:bg-gray-800 transition-all"
        >
          Annuler
        </button>
        <button
          type="submit"
          disabled={saving}
          className="flex-1 py-3 rounded-xl bg-gradient-to-r from-violet-500 to-purple-500 hover:from-violet-600 hover:to-purple-600 text-white font-black shadow-xl transition-all active:scale-95 disabled:opacity-50 flex items-center gap-2"
        >
          {saving ? <Loader2 className="animate-spin" /> : '💾'}
          {saving ? "Sauvegarde..." : "Enregistrer"}
        </button>
      </div>
    </form>
  );
}