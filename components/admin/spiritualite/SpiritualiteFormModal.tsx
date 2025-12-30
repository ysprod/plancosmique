import React from "react";
import { motion } from "framer-motion";
import { Sparkles, X, BookOpen, ChevronUp, ChevronDown, Eye, EyeOff, Loader, Save, Plus, List, Target, Lightbulb, AlertTriangle, Package } from "lucide-react";
import { ArraySection, ArraySectionProps } from "./ArraySection";

interface FormData {
  title: string;
  slug: string;
  iconName: string;
  order?: number;
  published: boolean;
  description: string;
  introduction: string;
  detailedGuide: string;
  affirmation: string;
  category: string;
  bestTiming?: string;
  keyElements: string[];
  benefits: string[];
  practicalSteps: string[];
  warnings: string[];
  materials?: string[];
}

interface SpiritualiteFormModalProps {
  show: boolean;
  onClose: () => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  formData: FormData;
  setFormData: (data: FormData) => void;
  editingPractice?: any;
  saving: boolean;
  expandedSections: Set<string>;
  toggleSection: (section: string) => void;
  addArrayItem: (field: keyof FormData) => void;
  removeArrayItem: (field: keyof FormData, index: number) => void;
  updateArrayItem: (field: keyof FormData, index: number, value: string) => void;
  availableIcons: string[];
}

export function SpiritualiteFormModal({
  show,
  onClose,
  onSubmit,
  formData,
  setFormData,
  editingPractice,
  saving,
  expandedSections,
  toggleSection,
  addArrayItem,
  removeArrayItem,
  updateArrayItem,
  availableIcons,
}: SpiritualiteFormModalProps) {
  if (!show) return null;
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="fixed inset-0 z-50 flex items-start justify-center p-4 bg-black/50 backdrop-blur-sm overflow-y-auto"
      onClick={onClose}
    >
      <motion.div
        initial={{ y: 50 }}
        animate={{ y: 0 }}
        exit={{ y: 50 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl my-8"
      >
        <div className="sticky top-0 z-10 bg-gradient-to-r from-amber-600 to-red-600 text-white px-4 sm:px-6 py-4 rounded-t-2xl flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Sparkles className="w-6 h-6" />
            <div>
              <h2 className="text-lg sm:text-xl font-bold">
                {editingPractice ? 'Modifier la pratique' : 'Nouvelle pratique'}
              </h2>
              <p className="text-xs sm:text-sm text-white/80">
                Remplissez les informations ci-dessous
              </p>
            </div>
          </div>
          <motion.button
            whileHover={{ rotate: 90 }}
            whileTap={{ scale: 0.9 }}
            onClick={onClose}
            className="p-2 hover:bg-white/20 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </motion.button>
        </div>
        <form onSubmit={onSubmit} className="p-4 sm:p-6 space-y-4 max-h-[calc(100vh-200px)] overflow-y-auto">
          {/* Section: Informations de base */}
          <div className="border border-gray-200 rounded-xl overflow-hidden">
            <button
              type="button"
              onClick={() => toggleSection('basic')}
              className="w-full flex items-center justify-between p-4 bg-gradient-to-r from-amber-50 to-orange-50 hover:from-amber-100 hover:to-orange-100 transition-colors"
            >
              <div className="flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-amber-600" />
                <span className="font-bold text-gray-900">Informations de base *</span>
              </div>
              {expandedSections.has('basic') ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
            </button>
            {expandedSections.has('basic') && (
              <div className="p-4 space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">
                      Titre *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      className="w-full px-4 py-2 border-2 border-gray-200 rounded-xl focus:border-amber-500 focus:ring-2 focus:ring-amber-200 outline-none transition-all text-sm sm:text-base"
                      placeholder="Ex: Notions de Base"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">
                      Slug (URL) *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.slug}
                      onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                      className="w-full px-4 py-2 border-2 border-gray-200 rounded-xl focus:border-amber-500 focus:ring-2 focus:ring-amber-200 outline-none transition-all text-sm sm:text-base"
                      placeholder="Ex: notions-de-base"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">
                      Icône
                    </label>
                    <select
                      value={formData.iconName}
                      onChange={(e) => setFormData({ ...formData, iconName: e.target.value })}
                      className="w-full px-4 py-2 border-2 border-gray-200 rounded-xl focus:border-amber-500 focus:ring-2 focus:ring-amber-200 outline-none transition-all text-sm sm:text-base"
                    >
                      {availableIcons.map(icon => (
                        <option key={icon} value={icon}>{icon}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">
                      Ordre
                    </label>
                    <input
                      type="number"
                      value={formData.order || 0}
                      onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) })}
                      className="w-full px-4 py-2 border-2 border-gray-200 rounded-xl focus:border-amber-500 focus:ring-2 focus:ring-amber-200 outline-none transition-all text-sm sm:text-base"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">
                      Statut
                    </label>
                    <div className="flex items-center gap-3 h-[42px]">
                      <button
                        type="button"
                        onClick={() => setFormData({ ...formData, published: !formData.published })}
                        className={`flex items-center gap-2 px-4 py-2 rounded-xl font-bold transition-all ${formData.published
                          ? 'bg-green-500 text-white'
                          : 'bg-gray-200 text-gray-700'
                        }`}
                      >
                        {formData.published ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                        {formData.published ? 'Publié' : 'Brouillon'}
                      </button>
                    </div>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    Description courte *
                  </label>
                  <textarea
                    required
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    rows={2}
                    className="w-full px-4 py-2 border-2 border-gray-200 rounded-xl focus:border-amber-500 focus:ring-2 focus:ring-amber-200 outline-none transition-all resize-none text-sm sm:text-base"
                    placeholder="Description courte pour la liste"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    Introduction *
                  </label>
                  <textarea
                    required
                    value={formData.introduction}
                    onChange={(e) => setFormData({ ...formData, introduction: e.target.value })}
                    rows={3}
                    className="w-full px-4 py-2 border-2 border-gray-200 rounded-xl focus:border-amber-500 focus:ring-2 focus:ring-amber-200 outline-none transition-all resize-none text-sm sm:text-base"
                    placeholder="Introduction détaillée"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    Guide détaillé *
                  </label>
                  <textarea
                    required
                    value={formData.detailedGuide}
                    onChange={(e) => setFormData({ ...formData, detailedGuide: e.target.value })}
                    rows={5}
                    className="w-full px-4 py-2 border-2 border-gray-200 rounded-xl focus:border-amber-500 focus:ring-2 focus:ring-amber-200 outline-none transition-all resize-none text-sm sm:text-base"
                    placeholder="Guide complet et détaillé"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    Affirmation
                  </label>
                  <textarea
                    value={formData.affirmation}
                    onChange={(e) => setFormData({ ...formData, affirmation: e.target.value })}
                    rows={2}
                    className="w-full px-4 py-2 border-2 border-gray-200 rounded-xl focus:border-amber-500 focus:ring-2 focus:ring-amber-200 outline-none transition-all resize-none text-sm sm:text-base"
                    placeholder="Affirmation positive"
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">
                      Catégorie
                    </label>
                    <input
                      type="text"
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      className="w-full px-4 py-2 border-2 border-gray-200 rounded-xl focus:border-amber-500 focus:ring-2 focus:ring-amber-200 outline-none transition-all text-sm sm:text-base"
                      placeholder="spiritualite-africaine"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">
                      Meilleur moment
                    </label>
                    <input
                      type="text"
                      value={formData.bestTiming || ''}
                      onChange={(e) => setFormData({ ...formData, bestTiming: e.target.value })}
                      className="w-full px-4 py-2 border-2 border-gray-200 rounded-xl focus:border-amber-500 focus:ring-2 focus:ring-amber-200 outline-none transition-all text-sm sm:text-base"
                      placeholder="Ex: Matin au lever du soleil"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
          {/* Section: Éléments clés */}
          <ArraySection
            title="Éléments clés"
            icon={<List className="w-5 h-5 text-blue-600" />}
            items={formData.keyElements}
            expanded={expandedSections.has('keyElements')}
            onToggle={() => toggleSection('keyElements')}
            onAdd={() => addArrayItem('keyElements')}
            onRemove={(index) => removeArrayItem('keyElements', index)}
            onUpdate={(index, value) => updateArrayItem('keyElements', index, value)}
            placeholder="Un élément clé"
          />
          {/* Section: Bénéfices */}
          <ArraySection
            title="Bénéfices"
            icon={<Target className="w-5 h-5 text-green-600" />}
            items={formData.benefits}
            expanded={expandedSections.has('benefits')}
            onToggle={() => toggleSection('benefits')}
            onAdd={() => addArrayItem('benefits')}
            onRemove={(index) => removeArrayItem('benefits', index)}
            onUpdate={(index, value) => updateArrayItem('benefits', index, value)}
            placeholder="Un bénéfice"
          />
          {/* Section: Étapes pratiques */}
          <ArraySection
            title="Étapes pratiques"
            icon={<Lightbulb className="w-5 h-5 text-purple-600" />}
            items={formData.practicalSteps}
            expanded={expandedSections.has('practicalSteps')}
            onToggle={() => toggleSection('practicalSteps')}
            onAdd={() => addArrayItem('practicalSteps')}
            onRemove={(index) => removeArrayItem('practicalSteps', index)}
            onUpdate={(index, value) => updateArrayItem('practicalSteps', index, value)}
            placeholder="Une étape pratique"
          />
          {/* Section: Avertissements */}
          <ArraySection
            title="Avertissements"
            icon={<AlertTriangle className="w-5 h-5 text-red-600" />}
            items={formData.warnings}
            expanded={expandedSections.has('warnings')}
            onToggle={() => toggleSection('warnings')}
            onAdd={() => addArrayItem('warnings')}
            onRemove={(index) => removeArrayItem('warnings', index)}
            onUpdate={(index, value) => updateArrayItem('warnings', index, value)}
            placeholder="Un avertissement"
          />
          {/* Section: Matériel */}
          <ArraySection
            title="Matériel nécessaire"
            icon={<Package className="w-5 h-5 text-indigo-600" />}
            items={formData.materials || ['']}
            expanded={expandedSections.has('materials')}
            onToggle={() => toggleSection('materials')}
            onAdd={() => addArrayItem('materials')}
            onRemove={(index) => removeArrayItem('materials', index)}
            onUpdate={(index, value) => updateArrayItem('materials', index, value)}
            placeholder="Un élément de matériel"
          />
          {/* Boutons d'action */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t">
            <motion.button
              type="button"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={onClose}
              className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl font-bold hover:bg-gray-50 transition-all"
            >
              Annuler
            </motion.button>
            <motion.button
              type="submit"
              disabled={saving}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-amber-600 to-red-600 text-white rounded-xl font-bold shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {saving ? (
                <>
                  <Loader className="w-5 h-5 animate-spin" />
                  Enregistrement...
                </>
              ) : (
                <>
                  <Save className="w-5 h-5" />
                  {editingPractice ? 'Mettre à jour' : 'Créer la pratique'}
                </>
              )}
            </motion.button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
}
