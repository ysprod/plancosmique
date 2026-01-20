

import { Loader2 } from "lucide-react";
import { CATEGORIES_OFFRANDES } from '@/lib/constants';
import { MobileHint } from "./MobileHint";

export interface OfferingFormData {
  name: string;
  price: number;
  priceUSD: number;
  category: 'animal' | 'vegetal' | 'beverage' | '';
  icon: string;
  description: string;
}

interface OfferingFormProps {
  formData: OfferingFormData;
  error: string | null;
  saving: boolean;
  priceUSD: number;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onCategoryChange: (value: 'animal' | 'vegetal' | 'beverage') => void;
  onSubmit: (e: React.FormEvent) => void;
  onCancel: () => void;
}

export function OfferingForm({
  formData,
  error,
  saving,
  priceUSD,
  onChange,
  onCategoryChange,
  onSubmit,
  onCancel,
}: OfferingFormProps) {
  return (
    <>
      <MobileHint />
      <form onSubmit={onSubmit} className="max-w-xl mx-auto bg-white dark:bg-gray-950 p-6 rounded-2xl shadow-xl border border-violet-200 dark:border-violet-800 space-y-5 mt-6 flex flex-col items-center justify-center animate-fade-in">
        <h1 className="text-xl font-extrabold mb-2 text-cosmic-indigo text-center tracking-tight">Nouvelle offrande</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full">
          <div>
            <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">Nom *</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={onChange}
              placeholder="ex: Poulet blanc"
              required
              className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:border-violet-500 dark:focus:border-violet-500 transition-colors text-sm"
            />
          </div>
        </div>
        <div className="w-full">
          <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">Catégorie *</label>
          <div className="grid grid-cols-3 gap-1">
            {CATEGORIES_OFFRANDES.map(cat => (
              <button
                key={cat.value}
                type="button"
                tabIndex={0}
                aria-pressed={formData.category === cat.value}
                onClick={() => onCategoryChange(cat.value as 'animal' | 'vegetal' | 'beverage')}
                className={`py-2 px-2 rounded-lg font-bold text-xs transition-all outline-none focus:ring-2 focus:ring-violet-500 ${formData.category === cat.value ? `bg-gradient-to-br ${cat.color} text-white shadow-lg scale-105` : 'bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-800'}`}
              >
                <span className="text-lg block mb-0.5">{cat.emoji}</span>
                {cat.label}
              </button>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full">
          <div>
            <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">Prix (XOF) *</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={onChange}
              min="0"
              step="100"
              required
              className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:border-violet-500 dark:focus:border-violet-500 transition-colors text-sm"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">Prix (USD)</label>
            <input
              type="number"
              name="priceUSD"
              value={priceUSD}
              disabled
              className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-100 dark:bg-gray-900 text-gray-500 dark:text-gray-400 cursor-not-allowed text-sm"
            />
            <p className="text-[10px] text-gray-500 dark:text-gray-400 mt-0.5">Calculé automatiquement (1 USD = 563,90 XOF)</p>
          </div>
        </div>
        <div className="w-full">
          <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">Icône (emoji) *</label>
          <input
            type="text"
            name="icon"
            value={formData.icon}
            onChange={onChange}
            placeholder="🐓"
            maxLength={2}
            className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white text-xl text-center focus:border-violet-500 dark:focus:border-violet-500 transition-colors"
          />
        </div>
        <div className="w-full">
          <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">Description *</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={onChange}
            placeholder="Symbole de pureté et d'harmonie"
            rows={2}
            className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:border-violet-500 dark:focus:border-violet-500 transition-colors resize-none text-sm"
          />
        </div>
        {error && <div className="text-red-600 text-xs font-bold mt-1 text-center animate-pulse">{error}</div>}
        <div className="flex gap-2 pt-2 w-full">
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 py-2 rounded-lg border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 font-bold hover:bg-gray-100 dark:hover:bg-gray-900 transition-all text-xs"
          >
            Annuler
          </button>
          <button
            type="submit"
            disabled={saving}
            className="flex-1 py-2 rounded-lg bg-gradient-to-r from-violet-500 to-purple-500 hover:from-violet-600 hover:to-purple-600 text-white font-black shadow-lg transition-all active:scale-95 disabled:opacity-50 flex items-center gap-1 text-xs justify-center"
          >
            {saving ? <Loader2 className="animate-spin" /> : '💾'}
            {saving ? "Sauvegarde..." : "Ajouter"}
          </button>
        </div>
      </form>
    </>
  );
}
