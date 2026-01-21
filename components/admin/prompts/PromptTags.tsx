import React from 'react';

interface PromptTagsProps {
  tags: string[];
  updateField: (field: string, value: any) => void;
}

export const PromptTags: React.FC<PromptTagsProps> = React.memo(({ tags, updateField }) => (
  <section className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-4 sm:p-6 space-y-4 shadow">
    <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Tags</h2>
    <textarea
      value={tags?.join(', ')}
      onChange={e => updateField('tags', e.target.value.split(',').map(t => t.trim()).filter(Boolean))}
      rows={2}
      placeholder="astrologie, consultation, personnalité (séparés par des virgules)"
      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white"
    />
  </section>
));