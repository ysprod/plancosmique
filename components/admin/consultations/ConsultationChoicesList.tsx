'use client';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, AlertCircle, Sparkles, CheckCircle, FileText, Tag, Plus, Edit, Trash2 } from 'lucide-react';
import { useConsultationChoices } from '@/hooks/admin/useConsultationChoices';
import Link from 'next/link';

export default function ConsultationChoicesList() {
  const { choices, loading, error, assignPrompt } = useConsultationChoices();
  const [search, setSearch] = useState('');

  const filteredChoices = choices.filter(c =>
    c.title.toLowerCase().includes(search.toLowerCase()) ||
    c.description.toLowerCase().includes(search.toLowerCase()) ||
    c.rubriqueTitle?.toLowerCase().includes(search.toLowerCase())
  );

  const handleDeletePrompt = async (choice: any) => {
    if (!confirm(`Êtes-vous sûr de vouloir retirer le prompt de "${choice.title}" ?`)) {
      return;
    }
    try {
      await assignPrompt(choice._id, null);
    } catch (err: any) {
      alert(err.message);
    }
  };

  const choicesWithPrompt = filteredChoices.filter(c => c.promptId);
  const choicesWithoutPrompt = filteredChoices.filter(c => !c.promptId);

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
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Attribution des Prompts</h1>
          <p className="text-sm text-gray-600 mt-1">
            {choices.length} consultations • {choicesWithPrompt.length} avec prompt • {choicesWithoutPrompt.length} sans prompt
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
          placeholder="Rechercher une consultation..."
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
        />
      </div>

      {/* Choices without prompt */}
      {choicesWithoutPrompt.length > 0 && (
        <div>
          <div className="flex items-center gap-2 mb-3">
            <AlertCircle className="w-5 h-5 text-amber-600" />
            <h2 className="text-lg font-semibold text-gray-900">
              Sans prompt ({choicesWithoutPrompt.length})
            </h2>
          </div>
          <div className="grid gap-3">
            {choicesWithoutPrompt.map((choice) => (
              <ConsultationChoiceCard
                key={choice._id}
                choice={choice}
                onDelete={() => {}}
                hasPrompt={false}
              />
            ))}
          </div>
        </div>
      )}

      {/* Choices with prompt */}
      {choicesWithPrompt.length > 0 && (
        <div>
          <div className="flex items-center gap-2 mb-3">
            <CheckCircle className="w-5 h-5 text-green-600" />
            <h2 className="text-lg font-semibold text-gray-900">
              Avec prompt ({choicesWithPrompt.length})
            </h2>
          </div>
          <div className="grid gap-3">
            {choicesWithPrompt.map((choice) => (
              <ConsultationChoiceCard
                key={choice._id}
                choice={choice}
                onDelete={() => handleDeletePrompt(choice)}
                hasPrompt={true}
              />
            ))}
          </div>
        </div>
      )}

      {filteredChoices.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          Aucune consultation trouvée
        </div>
      )}
    </div>
  );
}

interface ConsultationChoiceCardProps {
  choice: any;
  onDelete: () => void;
  hasPrompt: boolean;
}

function ConsultationChoiceCard({
  choice,
  onDelete,
  hasPrompt
}: ConsultationChoiceCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`bg-white border-2 rounded-lg p-4 transition-all ${
        hasPrompt ? 'border-green-200 hover:border-green-300' : 'border-amber-200 hover:border-amber-300'
      }`}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          {/* Title & Rubrique */}
          <div className="flex items-center gap-2 mb-2">
            <FileText className="w-4 h-4 text-gray-400" />
            <h3 className="font-semibold text-gray-900">{choice.title}</h3>
            {choice.rubriqueTitle && (
              <span className="px-2 py-0.5 bg-blue-100 text-blue-700 rounded text-xs">
                {choice.rubriqueTitle}
              </span>
            )}
          </div>

          {/* Description */}
          <p className="text-sm text-gray-600 mb-3">{choice.description}</p>

          {/* Current Prompt */}
          {choice.prompt ? (
            <div className="bg-purple-50 border border-purple-200 rounded-lg p-3 mb-3">
              <div className="flex items-start gap-2">
                <Sparkles className="w-4 h-4 text-purple-600 mt-0.5 flex-shrink-0" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-purple-900">{choice.prompt.title}</p>
                  {choice.prompt.description && (
                    <p className="text-xs text-purple-700 mt-1">{choice.prompt.description}</p>
                  )}
                  {choice.prompt.tags && choice.prompt.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-2">
                      {choice.prompt.tags.map((tag: string) => (
                        <span
                          key={tag}
                          className="inline-flex items-center gap-1 px-2 py-0.5 bg-purple-100 text-purple-700 rounded text-xs"
                        >
                          <Tag className="w-2 h-2" />
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 mb-3">
              <div className="flex items-center gap-2 text-amber-800 text-sm">
                <AlertCircle className="w-4 h-4" />
                <span>Aucun prompt assigné</span>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-2">
            {!hasPrompt ? (
              <Link
                href={`/admin/prompts/create?returnTo=consultations-choices&choiceId=${choice._id}&choiceTitle=${encodeURIComponent(choice.title)}`}
                className="inline-flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors text-sm"
              >
                <Plus className="w-4 h-4" />
                Créer le prompt
              </Link>
            ) : (
              <>
                <Link
                  href={`/admin/prompts/${choice.promptId}/edit?returnTo=consultations-choices`}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
                >
                  <Edit className="w-4 h-4" />
                  Modifier le prompt
                </Link>
                <button
                  onClick={onDelete}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm"
                >
                  <Trash2 className="w-4 h-4" />
                  Retirer le prompt
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
