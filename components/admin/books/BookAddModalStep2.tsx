import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Save, Loader2 } from 'lucide-react';
import { BookFormData } from '@/hooks/books/useAdminBooks';

interface BookAddModalStep2Props {
  formData: BookFormData;
  setFormData: (data: BookFormData) => void;
  formErrors: Partial<BookFormData>;
  submitting: boolean;
  handlePrevStep: () => void;
  categories: string[];
}

export default function BookAddModalStep2({ formData, setFormData, formErrors, submitting, handlePrevStep, categories }: BookAddModalStep2Props) {
  return (
    <div className="space-y-5">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">Auteur <span className="text-red-500">*</span></label>
          <input
            type="text"
            value={formData.author}
            onChange={e => setFormData({ ...formData, author: e.target.value })}
            className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none font-medium transition-all ${formErrors.author ? 'border-red-300 focus:border-red-500' : 'border-gray-200 focus:border-indigo-500'}`}
            placeholder="Ex: Jean Dupont"
            disabled={submitting}
          />
          {formErrors.author && <p className="mt-1 text-sm text-red-600">{formErrors.author}</p>}
        </div>
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">Catégorie <span className="text-red-500">*</span></label>
          <input
            type="text"
            value={formData.category}
            onChange={e => setFormData({ ...formData, category: e.target.value })}
            className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none font-medium transition-all ${formErrors.category ? 'border-red-300 focus:border-red-500' : 'border-gray-200 focus:border-indigo-500'}`}
            placeholder="Ex: Programmation"
            disabled={submitting}
            list="categories-list"
          />
          {categories.length > 0 && (
            <datalist id="categories-list">
              {categories.map(cat => (
                <option key={cat} value={cat} />
              ))}
            </datalist>
          )}
          {formErrors.category && <p className="mt-1 text-sm text-red-600">{formErrors.category}</p>}
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">Prix de vente (FCFA) <span className="text-red-500">*</span></label>
          <div className="relative">
            <input
              type="number"
              value={formData.price}
              onChange={e => setFormData({ ...formData, price: e.target.value })}
              className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none font-medium transition-all ${formErrors.price ? 'border-red-300 focus:border-red-500' : 'border-gray-200 focus:border-indigo-500'}`}
              placeholder="5000"
              min="0"
              step="100"
              disabled={submitting}
            />
            <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 font-semibold">FCFA</span>
          </div>
          {formErrors.price && <p className="mt-1 text-sm text-red-600">{formErrors.price}</p>}
        </div>
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">Nombre de pages <span className="text-red-500">*</span></label>
          <input
            type="number"
            value={formData.pageCount}
            onChange={e => setFormData({ ...formData, pageCount: e.target.value })}
            className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none font-medium transition-all ${formErrors.pageCount ? 'border-red-300 focus:border-red-500' : 'border-gray-200 focus:border-indigo-500'}`}
            placeholder="250"
            min="1"
            disabled={submitting}
          />
          {formErrors.pageCount && <p className="mt-1 text-sm text-red-600">{formErrors.pageCount}</p>}
        </div>
      </div>
      <div className="bg-gradient-to-r from-indigo-50 to-purple-50 p-5 rounded-xl border-2 border-indigo-100">
        <div className="flex items-start gap-3">
          <input
            type="checkbox"
            id="isActive"
            checked={formData.isActive}
            onChange={e => setFormData({ ...formData, isActive: e.target.checked })}
            className="w-5 h-5 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500 mt-0.5"
            disabled={submitting}
          />
          <label htmlFor="isActive" className="cursor-pointer flex-1">
            <span className="text-sm font-bold text-gray-900 block mb-1">Activer ce livre immédiatement</span>
            <span className="text-xs text-gray-600">Le livre sera visible et disponible à l'achat dès sa création</span>
          </label>
        </div>
      </div>
      <div className="flex gap-3 pt-4">
        <motion.button
          type="button"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handlePrevStep}
          disabled={submitting}
          className="px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl font-bold transition-all disabled:opacity-50 flex items-center gap-2"
        >
          <ArrowLeft className="w-5 h-5" />
          Précédent
        </motion.button>
        <motion.button
          type="submit"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          disabled={submitting}
          className="flex-1 px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white rounded-xl font-bold shadow-lg hover:shadow-xl transition-all disabled:opacity-50 flex items-center justify-center gap-2"
        >
          {submitting ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Ajout en cours...
            </>
          ) : (
            <>
              <Save className="w-5 h-5" />
              Ajouter le livre
            </>
          )}
        </motion.button>
      </div>
    </div>
  );
}
