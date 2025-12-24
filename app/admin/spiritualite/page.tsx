'use client';
import { api } from '@/lib/api/client';
import type { AxiosError } from 'axios';
import { AnimatePresence, motion } from 'framer-motion';
import {
  AlertCircle,
  AlertTriangle,
  BookOpen,
  Check,
  ChevronDown,
  ChevronUp,
  Clock,
  Database,
  Edit,
  Eye,
  EyeOff,
  Flame,
  Lightbulb,
  List,
  Loader,
  Package,
  Plus,
  Save,
  Sparkles,
  Target,
  Trash2,
  X
} from 'lucide-react';
import { useEffect, useState } from 'react';

interface SpiritualPractice {
  _id?: string;
  slug: string;
  title: string;
  iconName: string;
  category: string;
  published: boolean;
  order_index?: number;
  order?: number;
  description: string;
  introduction: string;
  keyElements: string[];
  detailedGuide: string;
  benefits: string[];
  practicalSteps: string[];
  warnings: string[];
  affirmation: string;
  materials?: string[];
  best_timing?: string;
  bestTiming?: string;
  createdAt?: string;
  updatedAt?: string;
}

interface ApiResponse {
  success: boolean;
  data: SpiritualPractice[];
  count: number;
}

const emptyPractice: SpiritualPractice = {
  slug: '',
  title: '',
  iconName: 'Sparkles',
  category: 'spiritualite-africaine',
  published: false,
  order: 0,
  description: '',
  introduction: '',
  keyElements: [''],
  detailedGuide: '',
  benefits: [''],
  practicalSteps: [''],
  warnings: [''],
  affirmation: '',
  materials: [''],
  bestTiming: ''
};

const availableIcons = [
  'Sparkles', 'Flame', 'Zap', 'Heart', 'Star', 'Sun', 'Moon',
  'BookOpen', 'Eye', 'Compass', 'Target', 'Shield'
];

export default function SpiritualiteAdmin() {
  const [practices, setPractices] = useState<SpiritualPractice[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // États pour le formulaire
  const [showForm, setShowForm] = useState(false);
  const [editingPractice, setEditingPractice] = useState<SpiritualPractice | null>(null);
  const [formData, setFormData] = useState<SpiritualPractice>(emptyPractice);
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set(['basic']));
  const [saving, setSaving] = useState(false);

  // États pour la visualisation
  const [expandedPractices, setExpandedPractices] = useState<Set<string>>(new Set());
  const [deletingId, setDeletingId] = useState<string | null>(null);

  useEffect(() => {
    fetchPractices();
  }, []);

  const fetchPractices = async () => {
    try {
      setLoading(true);
      setError(null);
      const { data } = await api.get<ApiResponse>('/spiritualite');

      if (data?.data && Array.isArray(data.data)) {
        setPractices(data.data);
      } else {
        setError('Format de réponse invalide');
      }
    } catch (err) {
      const axiosErr = err as AxiosError<{ message?: string }>;
      setError(axiosErr?.response?.data?.message || 'Erreur de chargement');
    } finally {
      setLoading(false);
    }
  };

  const showSuccess = (message: string) => {
    setSuccess(message);
    setTimeout(() => setSuccess(null), 3000);
  };

  const showError = (message: string) => {
    setError(message);
    setTimeout(() => setError(null), 5000);
  };

  const handleCreate = () => {
    setFormData({ ...emptyPractice, order: practices.length + 1 });
    setEditingPractice(null);
    setShowForm(true);
    setExpandedSections(new Set(['basic']));
  };

  const handleEdit = (practice: SpiritualPractice) => {
    setFormData({ ...practice });
    setEditingPractice(practice);
    setShowForm(true);
    setExpandedSections(new Set(['basic']));
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer cette pratique ?')) return;

    try {
      setDeletingId(id);
      await api.delete(`/spiritualite/${id}`);
      showSuccess('Pratique supprimée avec succès');
      await fetchPractices();
    } catch {
      showError('Erreur lors de la suppression');
    } finally {
      setDeletingId(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (!formData.title || !formData.slug || !formData.description) {
      showError('Veuillez remplir tous les champs obligatoires');
      return;
    }

    try {
      setSaving(true);

      // Nettoyer les tableaux vides
      const cleanData = {
        ...formData,
        keyElements: formData.keyElements.filter(e => e.trim()),
        benefits: formData.benefits.filter(e => e.trim()),
        practicalSteps: formData.practicalSteps.filter(e => e.trim()),
        warnings: formData.warnings.filter(e => e.trim()),
        materials: formData.materials?.filter(e => e.trim()) || []
      };

      if (editingPractice?._id) {
        await api.put(`/spiritualite/${editingPractice._id}`, cleanData);
        showSuccess('Pratique mise à jour avec succès');
      } else {
        await api.post('/spiritualite', cleanData);
        showSuccess('Pratique créée avec succès');
      }

      setShowForm(false);
      setFormData(emptyPractice);
      await fetchPractices();
    } catch (err) {
      const axiosErr = err as AxiosError<{ message?: string }>;
      showError(axiosErr?.response?.data?.message || 'Erreur lors de l\'enregistrement');
    } finally {
      setSaving(false);
    }
  };

  const toggleSection = (section: string) => {
    const newExpanded = new Set(expandedSections);
    if (newExpanded.has(section)) {
      newExpanded.delete(section);
    } else {
      newExpanded.add(section);
    }
    setExpandedSections(newExpanded);
  };

  const togglePracticeExpanded = (id: string) => {
    const newExpanded = new Set(expandedPractices);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedPractices(newExpanded);
  };

  const addArrayItem = (field: keyof SpiritualPractice) => {
    setFormData(prev => ({
      ...prev,
      [field]: [...(prev[field] as string[]), '']
    }));
  };

  const removeArrayItem = (field: keyof SpiritualPractice, index: number) => {
    setFormData(prev => ({
      ...prev,
      [field]: (prev[field] as string[]).filter((_, i) => i !== index)
    }));
  };

  const updateArrayItem = (field: keyof SpiritualPractice, index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: (prev[field] as string[]).map((item, i) => i === index ? value : item)
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-orange-50 to-amber-50 p-4 sm:p-6">
      <div className="max-w-7xl mx-auto">
        {/* En-tête */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-xl p-4 sm:p-8 mb-6 sm:mb-8"
        >
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-4">
            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-amber-600 to-red-600 rounded-xl flex items-center justify-center flex-shrink-0">
              <Database className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-amber-700 to-red-600 bg-clip-text text-transparent">
                Gestion Spiritualité Africaine
              </h1>
              <p className="text-xs sm:text-sm text-gray-600 mt-1">
                Créez et gérez les pratiques spirituelles
              </p>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleCreate}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 sm:px-6 py-3 bg-gradient-to-r from-amber-600 to-red-600 text-white rounded-xl font-bold shadow-lg hover:shadow-xl transition-all"
            >
              <Plus className="w-5 h-5" />
              <span className="hidden sm:inline">Nouvelle Pratique</span>
              <span className="sm:hidden">Créer</span>
            </motion.button>
          </div>

          {/* Messages */}
          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="mb-4 p-3 sm:p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3"
              >
                <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                <div className="flex-1 min-w-0">
                  <h4 className="font-bold text-red-700 text-sm sm:text-base">Erreur</h4>
                  <p className="text-xs sm:text-sm text-red-600">{error}</p>
                </div>
              </motion.div>
            )}

            {success && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="mb-4 p-3 sm:p-4 bg-green-50 border border-green-200 rounded-lg flex items-start gap-3"
              >
                <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <div className="flex-1 min-w-0">
                  <h4 className="font-bold text-green-700 text-sm sm:text-base">Succès</h4>
                  <p className="text-xs sm:text-sm text-green-600">{success}</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-2 sm:gap-4">
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg p-3 sm:p-4 border border-purple-200">
              <div className="text-xl sm:text-2xl font-bold text-purple-700">
                {loading ? '-' : practices.length}
              </div>
              <div className="text-xs sm:text-sm text-gray-600">Pratiques</div>
            </div>
            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-lg p-3 sm:p-4 border border-blue-200">
              <div className="text-xl sm:text-2xl font-bold text-blue-700">
                {loading ? '-' : practices.filter(p => p.published).length}
              </div>
              <div className="text-xs sm:text-sm text-gray-600">Publiées</div>
            </div>
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg p-3 sm:p-4 border border-green-200">
              <div className="text-xl sm:text-2xl font-bold text-green-700">
                {loading ? '-' : practices.filter(p => !p.published).length}
              </div>
              <div className="text-xs sm:text-sm text-gray-600">Brouillons</div>
            </div>
          </div>
        </motion.div>

        {/* Formulaire de création/édition */}
        <AnimatePresence>
          {showForm && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="fixed inset-0 z-50 flex items-start justify-center p-4 bg-black/50 backdrop-blur-sm overflow-y-auto"
              onClick={() => setShowForm(false)}
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
                    onClick={() => setShowForm(false)}
                    className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </motion.button>
                </div>

                <form onSubmit={handleSubmit} className="p-4 sm:p-6 space-y-4 max-h-[calc(100vh-200px)] overflow-y-auto">
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
                      onClick={() => setShowForm(false)}
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
          )}
        </AnimatePresence>

        {/* Liste des pratiques */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl shadow-xl p-4 sm:p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg sm:text-xl font-bold text-gray-900 flex items-center gap-2">
              <Flame className="w-5 h-5 sm:w-6 sm:h-6 text-orange-600" />
              <span>Pratiques spirituelles ({practices.length})</span>
            </h2>
            <motion.button
              whileHover={{ rotate: 180 }}
              onClick={fetchPractices}
              disabled={loading}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors disabled:opacity-50"
            >
              <Database className="w-5 h-5 text-gray-600" />
            </motion.button>
          </div>

          {loading ? (
            <div className="flex items-center justify-center h-32">
              <Loader className="w-6 h-6 animate-spin text-amber-600" />
              <span className="ml-2 text-sm sm:text-base text-gray-600">Chargement...</span>
            </div>
          ) : practices.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              <Sparkles className="w-12 h-12 mx-auto mb-4 text-gray-400" />
              <p className="text-base sm:text-lg font-semibold">Aucune pratique trouvée</p>
              <p className="text-xs sm:text-sm mt-2">Cliquez sur "Nouvelle Pratique" pour commencer</p>
            </div>
          ) : (
            <div className="space-y-3">
              {practices.map((practice, index) => (
                <motion.div
                  key={practice._id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="border-2 border-amber-100 rounded-xl overflow-hidden hover:shadow-lg transition-shadow"
                >
                  {/* Header de la carte */}
                  <div className="flex items-center justify-between p-3 sm:p-4 bg-gradient-to-r from-amber-50 to-orange-50">
                    <div className="flex items-center gap-3 flex-1 min-w-0">
                      <div className="w-8 h-8 sm:w-10 sm:h-10 bg-amber-600 text-white rounded-xl flex items-center justify-center font-bold text-sm sm:text-base flex-shrink-0">
                        {practice.order || index + 1}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-bold text-gray-900 text-sm sm:text-base truncate">
                          {practice.title}
                        </div>
                        <div className="text-xs text-gray-600 flex flex-wrap gap-2 mt-1">
                          <span className="flex items-center gap-1">
                            <List className="w-3 h-3" />
                            {practice.keyElements?.length || 0}
                          </span>
                          <span className="flex items-center gap-1">
                            <Target className="w-3 h-3" />
                            {practice.benefits?.length || 0}
                          </span>
                          <span className="flex items-center gap-1">
                            <Lightbulb className="w-3 h-3" />
                            {practice.practicalSteps?.length || 0}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 flex-shrink-0">
                      <div className={`px-2 sm:px-3 py-1 rounded-full text-xs font-bold ${practice.published
                          ? 'bg-green-500 text-white'
                          : 'bg-gray-300 text-gray-700'
                        }`}>
                        {practice.published ? 'Publié' : 'Brouillon'}
                      </div>

                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => togglePracticeExpanded(practice._id!)}
                        className="p-2 hover:bg-white/50 rounded-lg transition-colors"
                      >
                        {expandedPractices.has(practice._id!) ? (
                          <ChevronUp className="w-5 h-5 text-gray-600" />
                        ) : (
                          <ChevronDown className="w-5 h-5 text-gray-600" />
                        )}
                      </motion.button>
                    </div>
                  </div>

                  {/* Détails expandables */}
                  <AnimatePresence>
                    {expandedPractices.has(practice._id!) && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="border-t border-amber-100"
                      >
                        <div className="p-3 sm:p-4 space-y-3 text-xs sm:text-sm">
                          <p className="text-gray-700">{practice.description}</p>

                          <div className="flex flex-wrap gap-2">
                            <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-lg text-xs font-semibold">
                              {practice.category}
                            </span>
                            {practice.bestTiming && (
                              <span className="px-2 py-1 bg-purple-100 text-purple-700 rounded-lg text-xs font-semibold flex items-center gap-1">
                                <Clock className="w-3 h-3" />
                                {practice.bestTiming}
                              </span>
                            )}
                          </div>

                          {/* Actions */}
                          <div className="flex flex-col sm:flex-row gap-2 pt-2">
                            <motion.button
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                              onClick={() => handleEdit(practice)}
                              className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-600 transition-colors"
                            >
                              <Edit className="w-4 h-4" />
                              Modifier
                            </motion.button>

                            <motion.button
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                              onClick={() => handleDelete(practice._id!)}
                              disabled={deletingId === practice._id}
                              className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg font-semibold hover:bg-red-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                              {deletingId === practice._id ? (
                                <>
                                  <Loader className="w-4 h-4 animate-spin" />
                                  Suppression...
                                </>
                              ) : (
                                <>
                                  <Trash2 className="w-4 h-4" />
                                  Supprimer
                                </>
                              )}
                            </motion.button>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}

// Composant pour les sections de tableau
interface ArraySectionProps {
  title: string;
  icon: React.ReactNode;
  items: string[];
  expanded: boolean;
  onToggle: () => void;
  onAdd: () => void;
  onRemove: (index: number) => void;
  onUpdate: (index: number, value: string) => void;
  placeholder: string;
}

function ArraySection({
  title,
  icon,
  items,
  expanded,
  onToggle,
  onAdd,
  onRemove,
  onUpdate,
  placeholder
}: ArraySectionProps) {
  return (
    <div className="border border-gray-200 rounded-xl overflow-hidden">
      <button
        type="button"
        onClick={onToggle}
        className="w-full flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 transition-colors"
      >
        <div className="flex items-center gap-2">
          {icon}
          <span className="font-bold text-gray-900">{title}</span>
          <span className="text-xs text-gray-500">({items.length})</span>
        </div>
        {expanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
      </button>

      {expanded && (
        <div className="p-4 space-y-2">
          {items.map((item, index) => (
            <div key={index} className="flex gap-2">
              <input
                type="text"
                value={item}
                onChange={(e) => onUpdate(index, e.target.value)}
                className="flex-1 px-3 py-2 border-2 border-gray-200 rounded-lg focus:border-amber-500 focus:ring-2 focus:ring-amber-200 outline-none transition-all text-sm"
                placeholder={placeholder}
              />
              <motion.button
                type="button"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => onRemove(index)}
                className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              >
                <Trash2 className="w-5 h-5" />
              </motion.button>
            </div>
          ))}

          <motion.button
            type="button"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onAdd}
            className="w-full flex items-center justify-center gap-2 px-4 py-2 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-amber-500 hover:text-amber-600 transition-colors font-semibold"
          >
            <Plus className="w-4 h-4" />
            Ajouter
          </motion.button>
        </div>
      )}
    </div>
  );
}