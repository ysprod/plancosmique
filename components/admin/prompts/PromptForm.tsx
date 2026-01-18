'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { Save, Plus, Trash2, ArrowLeft } from 'lucide-react';
import { usePromptForm } from '@/hooks/admin/usePromptForm';
import { Prompt } from '@/lib/types/prompt.types';
import { useRouter } from 'next/navigation';

interface PromptFormProps {
  initialData?: Prompt;
}

export default function PromptForm({ initialData }: PromptFormProps) {
  const router = useRouter();
  const {
    formData,
    loading,
    error,
    updateField,
    addSection,
    updateSection,
    removeSection,
    addVariable,
    removeVariable,
    handleSubmit
  } = usePromptForm(initialData);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await handleSubmit();
    } catch (err) {
      // Error already handled in hook
    }
  };

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={() => router.back()}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-2xl font-bold text-gray-900">
            {initialData ? 'Modifier le Prompt' : 'Nouveau Prompt'}
          </h1>
        </div>
        <button
          type="submit"
          disabled={loading}
          className="inline-flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50 transition-colors"
        >
          <Save className="w-5 h-5" />
          {loading ? 'Enregistrement...' : 'Enregistrer'}
        </button>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-lg">
          {error}
        </div>
      )}

      {/* Basic Info */}
      <div className="bg-white border border-gray-200 rounded-lg p-6 space-y-4">
        <h2 className="text-lg font-semibold text-gray-900">Informations de base</h2>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Titre *
          </label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => updateField('title', e.target.value)}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Description
          </label>
          <textarea
            value={formData.description}
            onChange={(e) => updateField('description', e.target.value)}
            rows={3}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Rôle *
          </label>
          <textarea
            value={formData.role}
            onChange={(e) => updateField('role', e.target.value)}
            required
            rows={3}
            placeholder="Ex: Agis comme un astrologue professionnel..."
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Objectif *
          </label>
          <textarea
            value={formData.objective}
            onChange={(e) => updateField('objective', e.target.value)}
            required
            rows={3}
            placeholder="Ex: À partir de la carte du ciel, réalise une analyse..."
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Style et Ton (un par ligne)
          </label>
          <textarea
            value={formData.styleAndTone?.join('\n')}
            onChange={(e) => updateField('styleAndTone', e.target.value.split('\n').filter(Boolean))}
            rows={4}
            placeholder="Utilise impérativement le tutoiement&#10;Adopte un ton pédagogique..."
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
        </div>

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="isActive"
            checked={formData.isActive}
            onChange={(e) => updateField('isActive', e.target.checked)}
            className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
          />
          <label htmlFor="isActive" className="text-sm font-medium text-gray-700">
            Prompt actif
          </label>
        </div>
      </div>

      {/* Structure */}
      <div className="bg-white border border-gray-200 rounded-lg p-6 space-y-4">
        <h2 className="text-lg font-semibold text-gray-900">Structure</h2>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Introduction
          </label>
          <textarea
            value={formData.structure.introduction}
            onChange={(e) => updateField('structure', { ...formData.structure, introduction: e.target.value })}
            rows={3}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
        </div>

        <div>
          <div className="flex items-center justify-between mb-3">
            <label className="block text-sm font-medium text-gray-700">
              Sections
            </label>
            <button
              type="button"
              onClick={addSection}
              className="inline-flex items-center gap-1 px-3 py-1 text-sm bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200 transition-colors"
            >
              <Plus className="w-4 h-4" />
              Ajouter une section
            </button>
          </div>

          <div className="space-y-4">
            {formData.structure.sections.map((section, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="border border-gray-200 rounded-lg p-4 space-y-3"
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700">Section {index + 1}</span>
                  <button
                    type="button"
                    onClick={() => removeSection(index)}
                    className="p-1 text-red-600 hover:bg-red-50 rounded transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <input
                  type="text"
                  value={section.title}
                  onChange={(e) => updateSection(index, 'title', e.target.value)}
                  placeholder="Titre de la section"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm"
                />

                <textarea
                  value={section.content}
                  onChange={(e) => updateSection(index, 'content', e.target.value)}
                  placeholder="Contenu de la section"
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm"
                />

                <textarea
                  value={section.guidelines?.join('\n') || ''}
                  onChange={(e) => updateSection(index, 'guidelines', e.target.value.split('\n').filter(Boolean))}
                  placeholder="Directives (une par ligne)"
                  rows={2}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm"
                />
              </motion.div>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Synthèse
          </label>
          <textarea
            value={formData.structure.synthesis}
            onChange={(e) => updateField('structure', { ...formData.structure, synthesis: e.target.value })}
            rows={3}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Conclusion
          </label>
          <textarea
            value={formData.structure.conclusion}
            onChange={(e) => updateField('structure', { ...formData.structure, conclusion: e.target.value })}
            rows={3}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Tags */}
      <div className="bg-white border border-gray-200 rounded-lg p-6 space-y-4">
        <h2 className="text-lg font-semibold text-gray-900">Tags</h2>
        <div>
          <textarea
            value={formData.tags?.join(', ')}
            onChange={(e) => updateField('tags', e.target.value.split(',').map(t => t.trim()).filter(Boolean))}
            rows={2}
            placeholder="astrologie, consultation, personnalité (séparés par des virgules)"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
        </div>
      </div>
    </form>
  );
}
