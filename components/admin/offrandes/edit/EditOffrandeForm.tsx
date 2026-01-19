"use client";
import { Loader2 } from "lucide-react";
import { CATEGORIES_OFFRANDES } from '@/lib/constants';
import React from "react";

export interface EditOffrandeFormProps {
  formData: {
    name: string;
    price: number;
    priceUSD: number;
    category: 'animal' | 'vegetal' | 'beverage' | '';
    icon: string;
    description: string;
  };
  priceUSD: number;
  saving: boolean;
  error: string | null;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onCategory: (cat: 'animal' | 'vegetal' | 'beverage') => void;
  onSubmit: (e: React.FormEvent) => void;
  onCancel: () => void;
}

export default function EditOffrandeForm({
  formData,
  priceUSD,
  saving,
  error,
  onChange,
  onCategory,
  onSubmit,
  onCancel,
}: EditOffrandeFormProps) {
  return (
    <form
      onSubmit={onSubmit}
      className="w-full max-w-md mx-auto bg-white dark:bg-gray-900 p-4 sm:p-6 rounded-3xl shadow-2xl border-2 border-violet-200 dark:border-violet-800 space-y-5 mt-8 flex flex-col items-center animate-fade-in"
      autoComplete="off"
      noValidate
    >
      <h1 className="text-xl sm:text-2xl font-black mb-2 text-cosmic-indigo text-center tracking-tight">Modifier l'offrande</h1>
      <div className="w-full flex flex-col gap-2">
        <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1" htmlFor="offrande-name">Nom *</label>
        <input
          id="offrande-name"
          type="text"
          name="name"
          value={formData.name}
          onChange={onChange}
          placeholder="ex: Poulet blanc"
          required
          minLength={2}
          maxLength={64}
          className="w-full px-3 py-2 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:border-violet-500 dark:focus:border-violet-500 transition-colors text-sm font-semibold"
          autoFocus
        />
      </div>
      <div className="w-full flex flex-col gap-2">
        <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">Catégorie *</label>
        <div className="flex w-full gap-2 justify-center">
          {CATEGORIES_OFFRANDES.map(cat => (
            <button
              key={cat.value}
              type="button"
              tabIndex={0}
              aria-pressed={formData.category === cat.value}
              onClick={() => onCategory(cat.value as 'animal' | 'vegetal' | 'beverage')}
              className={`flex-1 py-2 px-2 rounded-xl font-bold text-xs transition-all outline-none focus:ring-2 focus:ring-violet-500 flex flex-col items-center gap-0.5 ${formData.category === cat.value ? `bg-gradient-to-br ${cat.color} text-white shadow-lg scale-105` : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'}`}
            >
              <span className="text-lg">{cat.emoji}</span>
              <span className="leading-tight">{cat.label}</span>
            </button>
          ))}
        </div>
      </div>
      <div className="w-full flex flex-col gap-2 sm:flex-row sm:gap-4">
        <div className="flex-1 flex flex-col gap-2">
          <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1" htmlFor="offrande-price">Prix (XOF) *</label>
          <input
            id="offrande-price"
            type="number"
            name="price"
            value={formData.price}
            onChange={onChange}
            min={0}
            step={100}
            required
            className="w-full px-3 py-2 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:border-violet-500 dark:focus:border-violet-500 transition-colors text-sm font-semibold"
          />
        </div>
        <div className="flex-1 flex flex-col gap-2">
          <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">Prix (USD)</label>
          <input
            type="number"
            name="priceUSD"
            value={priceUSD}
            disabled
            className="w-full px-3 py-2 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 cursor-not-allowed text-sm font-semibold"
            tabIndex={-1}
          />
          <p className="text-[10px] text-gray-500 dark:text-gray-400 mt-0.5">Calculé automatiquement (1 USD = 563.5 XOF)</p>
        </div>
      </div>
      <div className="w-full flex flex-col gap-2">
        <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1" htmlFor="offrande-icon">Icône (emoji) *</label>
        <input
          id="offrande-icon"
          type="text"
          name="icon"
          value={formData.icon}
          onChange={onChange}
          placeholder="🐓"
          maxLength={2}
          required
          pattern="[\u{1F300}-\u{1FAFF}]|.{1,2}"
          className="w-full px-3 py-2 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-2xl text-center focus:border-violet-500 dark:focus:border-violet-500 transition-colors"
        />
      </div>
      <div className="w-full flex flex-col gap-2">
        <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1" htmlFor="offrande-description">Description *</label>
        <textarea
          id="offrande-description"
          name="description"
          value={formData.description}
          onChange={onChange}
          placeholder="Symbole de pureté et d'harmonie"
          rows={2}
          minLength={4}
          maxLength={256}
          required
          className="w-full px-3 py-2 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:border-violet-500 dark:focus:border-violet-500 transition-colors resize-none text-sm font-semibold"
        />
      </div>
      {error && <div className="text-red-600 text-xs font-bold mt-2 text-center w-full">{error}</div>}
      <div className="flex gap-2 pt-2 w-full">
        <button
          type="button"
          onClick={onCancel}
          className="flex-1 py-2 rounded-xl border-2 border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 font-bold hover:bg-gray-100 dark:hover:bg-gray-800 transition-all text-xs"
        >
          Annuler
        </button>
        <button
          type="submit"
          disabled={saving}
          className="flex-1 py-2 rounded-xl bg-gradient-to-r from-violet-500 to-purple-500 hover:from-violet-600 hover:to-purple-600 text-white font-black shadow-xl transition-all active:scale-95 disabled:opacity-50 flex items-center justify-center gap-2 text-xs"
        >
          {saving ? <Loader2 className="animate-spin" /> : '💾'}
          {saving ? "Sauvegarde..." : "Enregistrer"}
        </button>
      </div>
    </form>
  );
}