import React from 'react';
import { motion } from 'framer-motion';
import { Plus, Trash2 } from 'lucide-react';

interface PromptStructureProps {
  structure: any;
  updateField: (field: string, value: any) => void;
  addSection: () => void;
  updateSection: (index: number, field: string, value: any) => void;
  removeSection: (index: number) => void;
}

export const PromptStructure: React.FC<PromptStructureProps> = React.memo(({ structure, updateField, addSection, updateSection, removeSection }) => (
  <section className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-4 sm:p-6 space-y-4 shadow">
    <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Structure</h2>
    <div>
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Introduction</label>
      <textarea
        value={structure.introduction}
        onChange={e => updateField('structure', { ...structure, introduction: e.target.value })}
        rows={2}
        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white"
      />
    </div>
    <div>
      <div className="flex items-center justify-between mb-3">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Sections</label>
        <button
          type="button"
          onClick={addSection}
          className="inline-flex items-center gap-1 px-3 py-1 text-sm bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300 rounded-lg hover:bg-purple-200 dark:hover:bg-purple-800 transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span className="hidden sm:inline">Ajouter une section</span>
        </button>
      </div>
      <div className="space-y-4">
        {structure.sections.map((section: any, index: number) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 space-y-3 bg-gray-50 dark:bg-gray-800"
          >
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Section {index + 1}</span>
              <button
                type="button"
                onClick={() => removeSection(index)}
                className="p-1 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900 rounded transition-colors"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
            <input
              type="text"
              value={section.title}
              onChange={e => updateSection(index, 'title', e.target.value)}
              placeholder="Titre de la section"
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
            />
            <textarea
              value={section.content}
              onChange={e => updateSection(index, 'content', e.target.value)}
              placeholder="Contenu de la section"
              rows={2}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
            />
            <textarea
              value={section.guidelines?.join('\n') || ''}
              onChange={e => updateSection(index, 'guidelines', e.target.value.split('\n').filter(Boolean))}
              placeholder="Directives (une par ligne)"
              rows={1}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
            />
          </motion.div>
        ))}
      </div>
    </div>
    <div>
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Synthèse</label>
      <textarea
        value={structure.synthesis}
        onChange={e => updateField('structure', { ...structure, synthesis: e.target.value })}
        rows={2}
        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white"
      />
    </div>
    <div>
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Conclusion</label>
      <textarea
        value={structure.conclusion}
        onChange={e => updateField('structure', { ...structure, conclusion: e.target.value })}
        rows={2}
        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white"
      />
    </div>
  </section>
));