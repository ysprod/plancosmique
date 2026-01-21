import React from 'react';

interface PromptBasicInfoProps {
  formData: any;
  updateField: (field: string, value: any) => void;
}

export const PromptBasicInfo: React.FC<PromptBasicInfoProps> = React.memo(({ formData, updateField }) => (
  <section className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-4 sm:p-6 space-y-4 shadow">
    <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Informations de base</h2>
    <div>
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Titre *</label>
      <input
        type="text"
        value={formData.title}
        onChange={e => updateField('title', e.target.value)}
        required
        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white"
      />
    </div>
    <div>
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Description</label>
      <textarea
        value={formData.description}
        onChange={e => updateField('description', e.target.value)}
        rows={2}
        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white"
      />
    </div>
    <div>
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Rôle *</label>
      <textarea
        value={formData.role}
        onChange={e => updateField('role', e.target.value)}
        required
        rows={2}
        placeholder="Ex: Agis comme un astrologue professionnel..."
        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white"
      />
    </div>
    <div>
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Objectif *</label>
      <textarea
        value={formData.objective}
        onChange={e => updateField('objective', e.target.value)}
        required
        rows={2}
        placeholder="Ex: À partir de la carte du ciel, réalise une analyse..."
        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white"
      />
    </div>
    <div>
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Style et Ton (un par ligne)</label>
      <textarea
        value={formData.styleAndTone?.join('\n')}
        onChange={e => updateField('styleAndTone', e.target.value.split('\n').filter(Boolean))}
        rows={2}
        placeholder="Tutoiement\nTon pédagogique..."
        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white"
      />
    </div>
    <div className="flex items-center gap-2">
      <input
        type="checkbox"
        id="isActive"
        checked={formData.isActive}
        onChange={e => updateField('isActive', e.target.checked)}
        className="w-4 h-4 text-purple-600 border-gray-300 dark:border-gray-700 rounded focus:ring-purple-500"
      />
      <label htmlFor="isActive" className="text-sm font-medium text-gray-700 dark:text-gray-300">Prompt actif</label>
    </div>
  </section>
));