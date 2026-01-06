import React from 'react';
import { motion } from 'framer-motion';
import { Plus, X, CheckCircle, ArrowRight, ArrowLeft, Save, Loader2 } from 'lucide-react';
import { BookFormData } from '@/hooks/books/useAdminBooks';

interface BookAddModalProps {
  show: boolean;
  onClose: () => void;
  currentStep: number;
  formData: BookFormData;
  setFormData: (data: BookFormData) => void;
  formErrors: Partial<BookFormData>;
  submitting: boolean;
  handleNextStep: () => void;
  handlePrevStep: () => void;
  handleAddBook: (e: React.FormEvent) => void;
  categories: string[];
}

export const BookAddModal: React.FC<BookAddModalProps> = ({
  show,
  onClose,
  currentStep,
  formData,
  setFormData,
  formErrors,
  submitting,
  handleNextStep,
  handlePrevStep,
  handleAddBook,
  categories,
}) => {
  if (!show) return null;
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-1 overflow-y-auto"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-white rounded-2xl shadow-2xl p-4 max-w-2xl w-full my-8"
        onClick={e => e.stopPropagation()}
      >
        {/* Header avec indicateur d'étapes */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center">
                <Plus className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-black text-gray-900">Ajouter un nouveau livre</h3>
                <p className="text-sm text-gray-600">Étape {currentStep} sur 2</p>
              </div>
            </div>
            <button
              onClick={onClose}
              disabled={submitting}
              className="p-2 hover:bg-gray-100 rounded-lg transition-all disabled:opacity-50"
            >
              <X className="w-6 h-6 text-gray-500" />
            </button>
          </div>
          {/* Indicateur de progression */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 flex-1">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all ${currentStep === 1 ? 'bg-indigo-600 text-white' : 'bg-green-100 text-green-700'}`}>
                {currentStep === 1 ? '1' : <CheckCircle className="w-5 h-5" />}
              </div>
              <div className="flex-1">
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-indigo-500 to-purple-600"
                    initial={{ width: '0%' }}
                    animate={{ width: currentStep >= 1 ? '100%' : '0%' }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
                <p className="text-xs font-semibold text-gray-600 mt-1">Informations principales</p>
              </div>
            </div>
            <div className="flex items-center gap-2 flex-1">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all ${currentStep === 2 ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-500'}`}>
                2
              </div>
              <div className="flex-1">
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-indigo-500 to-purple-600"
                    initial={{ width: '0%' }}
                    animate={{ width: currentStep === 2 ? '100%' : '0%' }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
                <p className="text-xs font-semibold text-gray-600 mt-1">Détails & Prix</p>
              </div>
            </div>
          </div>
        </div>
        {/* Formulaire */}
        <form onSubmit={handleAddBook}>
          {/* Étape 1 */}
          {currentStep === 1 && (
            <div className="space-y-5">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Titre du livre <span className="text-red-500">*</span></label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={e => setFormData({ ...formData, title: e.target.value })}
                  className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none font-medium transition-all ${formErrors.title ? 'border-red-300 focus:border-red-500' : 'border-gray-200 focus:border-indigo-500'}`}
                  placeholder="Ex: Guide Complet du Développement Web"
                  disabled={submitting}
                />
                {formErrors.title && <p className="mt-1 text-sm text-red-600">{formErrors.title}</p>}
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Sous-titre <span className="text-red-500">*</span></label>
                <input
                  type="text"
                  value={formData.subtitle}
                  onChange={e => setFormData({ ...formData, subtitle: e.target.value })}
                  className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none font-medium transition-all ${formErrors.subtitle ? 'border-red-300 focus:border-red-500' : 'border-gray-200 focus:border-indigo-500'}`}
                  placeholder="Ex: De débutant à expert en 30 jours"
                  disabled={submitting}
                />
                {formErrors.subtitle && <p className="mt-1 text-sm text-red-600">{formErrors.subtitle}</p>}
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Description complète <span className="text-red-500">*</span><span className="text-gray-400 font-normal ml-2">(min. 50 caractères)</span></label>
                <textarea
                  value={formData.description}
                  onChange={e => setFormData({ ...formData, description: e.target.value })}
                  rows={1}
                  className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none font-medium transition-all resize-none ${formErrors.description ? 'border-red-300 focus:border-red-500' : 'border-gray-200 focus:border-indigo-500'}`}
                  placeholder="Décrivez le contenu du livre en détail, les sujets abordés, ce que les lecteurs apprendront..."
                  disabled={submitting}
                />
                <div className="flex items-center justify-between mt-1">
                  {formErrors.description ? (
                    <p className="text-sm text-red-600">{formErrors.description}</p>
                  ) : (
                    <p className={`text-sm ${formData.description.length >= 50 ? 'text-green-600' : 'text-gray-500'}`}>{formData.description.length} / 50 caractères {formData.description.length >= 50 && '✓'}</p>
                  )}
                </div>
              </div>
              <div className="flex justify-end pt-4">
                <motion.button
                  type="button"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleNextStep}
                  className="px-8 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white rounded-xl font-bold shadow-lg hover:shadow-xl transition-all flex items-center gap-2"
                >
                  Suivant
                  <ArrowRight className="w-5 h-5" />
                </motion.button>
              </div>
            </div>
          )}
          {/* Étape 2 */}
          {currentStep === 2 && (
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
          )}
        </form>
      </motion.div>
    </motion.div>
  );
};
