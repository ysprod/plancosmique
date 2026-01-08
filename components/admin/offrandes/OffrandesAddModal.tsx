import { CATEGORIES_OFFRANDES } from '@/lib/constants';
import React from 'react';

interface OfferingFormData {
  id: string;
  name: string;
  category: string;
  price: number;
  priceUSD: number;
  icon: string;
  description: string;
}

interface OffrandesAddModalProps {
  show: boolean;
  onClose: () => void;
  onConfirm: () => void;
  formData: OfferingFormData;
  setFormData: (data: OfferingFormData) => void;
  editingId: string | null; 
  saving?: boolean;
  errorMessage?: string | null;
}

const OffrandesAddModal: React.FC<OffrandesAddModalProps> = ({
  show,
  onClose,
  onConfirm,
  formData,
  setFormData,
  editingId, 
  saving,
  errorMessage,
}) => {
  if (!show) return null;
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[9998]" onClick={onClose} />
      <div className="w-full max-w-2xl bg-white dark:bg-gray-900 rounded-3xl shadow-2xl border-2 border-violet-200 dark:border-violet-800 max-h-[90vh] overflow-y-auto relative z-[9999]" onClick={e => e.stopPropagation()}>
        {/* Header */}
        <div className="bg-gradient-to-r from-violet-500 to-purple-500 px-6 py-5 flex items-center justify-between sticky top-0 z-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
              {editingId ? '✏️' : '➕'}
            </div>
            <div>
              <h2 className="text-xl font-black text-white">{editingId ? 'Modifier l\'offrande' : 'Nouvelle offrande'}</h2>
              <p className="text-xs text-violet-100">{editingId ? 'Mettez à jour les informations' : 'Ajoutez une offrande au catalogue'}</p>
            </div>
          </div>
          <button onClick={onClose} className="w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors">
            <span className="text-white text-xl">×</span>
          </button>
        </div>
        {/* Formulaire */}
        <div className="p-6 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">            
            <div>
              <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Nom *</label>
              <input
                type="text"
                value={formData.name}
                onChange={e => setFormData({ ...formData, name: e.target.value })}
                placeholder="ex: Poulet blanc"
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
                  onClick={() => setFormData({ ...formData, category: cat.value })}
                  className={`py-3 px-4 rounded-xl font-bold text-sm transition-all ${formData.category === cat.value ? `bg-gradient-to-br ${cat.color} text-white shadow-lg scale-105` : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'}`}
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
                value={formData.price}
                onChange={e => setFormData({ ...formData, price: Number(e.target.value) })}
                min="0"
                step="100"
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:border-violet-500 dark:focus:border-violet-500 transition-colors"
              />
            </div>
            {/* Prix USD (auto-calculé) */}
            <div>
              <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Prix (USD)</label>
              <input
                type="number"
                value={formData.priceUSD}
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
              value={formData.icon}
              onChange={e => setFormData({ ...formData, icon: e.target.value })}
              placeholder="🐓"
              maxLength={2}
              className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-2xl text-center focus:border-violet-500 dark:focus:border-violet-500 transition-colors"
            />
          </div>
          {/* Description */}
          <div>
            <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Description *</label>
            <textarea
              value={formData.description}
              onChange={e => setFormData({ ...formData, description: e.target.value })}
              placeholder="Symbole de pureté et d'harmonie"
              rows={3}
              className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:border-violet-500 dark:focus:border-violet-500 transition-colors resize-none"
            />
          </div>
          {/* Error */}
          {errorMessage && <div className="text-red-600 text-sm font-bold mt-2">{errorMessage}</div>}
          {/* Boutons */}
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3 rounded-xl border-2 border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 font-bold hover:bg-gray-100 dark:hover:bg-gray-800 transition-all"
            >
              Annuler
            </button>
            <button
              type="button"
              onClick={onConfirm}
              disabled={saving}
              className="flex-1 py-3 rounded-xl bg-gradient-to-r from-violet-500 to-purple-500 hover:from-violet-600 hover:to-purple-600 text-white font-black shadow-xl transition-all active:scale-95 disabled:opacity-50"
            >
              {editingId ? 'Modifier' : 'Ajouter'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OffrandesAddModal;