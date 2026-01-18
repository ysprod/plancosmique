'use client';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Edit, Trash2, Power, Search, Tag, Clock, Link2, AlertCircle } from 'lucide-react';
import { usePrompts } from '@/hooks/admin/usePrompts';
import { PromptWithUsage } from '@/lib/types/prompt.types';
import Link from 'next/link';

export default function PromptsList() {
  const { prompts, loading, error, toggleActive, deletePrompt } = usePrompts();
  const [search, setSearch] = useState('');
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);

  const filteredPrompts = prompts.filter(p =>
    p.title.toLowerCase().includes(search.toLowerCase()) ||
    p.description?.toLowerCase().includes(search.toLowerCase()) ||
    p.tags?.some(t => t.toLowerCase().includes(search.toLowerCase()))
  );

  const handleToggle = async (id: string) => {
    try {
      await toggleActive(id);
    } catch (err: any) {
      alert(err.message);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirmDelete !== id) {
      setConfirmDelete(id);
      return;
    }
    try {
      await deletePrompt(id);
      setConfirmDelete(null);
    } catch (err: any) {
      alert(err.message);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-lg">
        {error}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Gestion des Prompts</h1>
          <p className="text-sm text-gray-600 mt-1">
            {prompts.length} prompt{prompts.length > 1 ? 's' : ''} • {prompts.filter(p => p.isActive).length} actif{prompts.filter(p => p.isActive).length > 1 ? 's' : ''}
          </p>
        </div>
        <Link
          href="/admin/prompts/create"
          className="inline-flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
        >
          <Plus className="w-5 h-5" />
          Nouveau Prompt
        </Link>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Rechercher un prompt..."
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
        />
      </div>

      {/* List */}
      <div className="grid gap-4">
        {filteredPrompts.map((prompt) => (
          <motion.div
            key={prompt._id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-lg font-semibold text-gray-900">{prompt.title}</h3>
                  <button
                    onClick={() => handleToggle(prompt._id)}
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      prompt.isActive
                        ? 'bg-green-100 text-green-700'
                        : 'bg-gray-100 text-gray-600'
                    }`}
                  >
                    {prompt.isActive ? 'Actif' : 'Inactif'}
                  </button>
                </div>

                {prompt.description && (
                  <p className="text-gray-600 text-sm mb-3">{prompt.description}</p>
                )}

                {/* Usage Info */}
                {prompt.consultationChoices && prompt.consultationChoices.length > 0 && (
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-3">
                    <div className="flex items-start gap-2">
                      <Link2 className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                      <div className="flex-1">
                        <p className="text-sm font-medium text-blue-900 mb-1">
                          Utilisé par {prompt.consultationChoices.length} consultation{prompt.consultationChoices.length > 1 ? 's' : ''}
                        </p>
                        <div className="space-y-1">
                          {prompt.consultationChoices.map((choice) => (
                            <div key={choice._id} className="text-xs text-blue-700">
                              • {choice.title}
                              {choice.rubriqueTitle && (
                                <span className="text-blue-600"> ({choice.rubriqueTitle})</span>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* No usage warning */}
                {(!prompt.consultationChoices || prompt.consultationChoices.length === 0) && prompt.isActive && (
                  <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 mb-3">
                    <div className="flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 text-amber-600" />
                      <p className="text-xs text-amber-800">
                        Ce prompt est actif mais n'est associé à aucune consultation
                      </p>
                    </div>
                  </div>
                )}

                <div className="flex flex-wrap gap-2 mb-3">
                  {prompt.tags?.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center gap-1 px-2 py-1 bg-purple-50 text-purple-700 rounded text-xs"
                    >
                      <Tag className="w-3 h-3" />
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-4 text-xs text-gray-500">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {new Date(prompt.updatedAt).toLocaleDateString('fr-FR')}
                  </span>
                  <span>{prompt.structure.sections.length} sections</span>
                  {prompt.variables && (
                    <span>{Object.keys(prompt.variables).length} variables</span>
                  )}
                </div>
              </div>

              <div className="flex gap-2">
                <Link
                  href={`/admin/prompts/${prompt._id}/edit`}
                  className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                >
                  <Edit className="w-5 h-5" />
                </Link>
                <button
                  onClick={() => handleDelete(prompt._id)}
                  className={`p-2 rounded-lg transition-colors ${
                    confirmDelete === prompt._id
                      ? 'bg-red-600 text-white'
                      : 'text-red-600 hover:bg-red-50'
                  }`}
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          </motion.div>
        ))}

        {filteredPrompts.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            Aucun prompt trouvé
          </div>
        )}
      </div>
    </div>
  );
}
