'use client';
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, Link2, AlertCircle, Sparkles, CheckCircle, FileText, Tag } from 'lucide-react';
import { useConsultationChoices } from '@/hooks/admin/useConsultationChoices';
import { promptService } from '@/lib/api/services/prompt.service';
import { Prompt } from '@/lib/types/prompt.types';

export default function ConsultationChoicesList() {
  const { choices, loading, error, assignPrompt } = useConsultationChoices();
  const [prompts, setPrompts] = useState<Prompt[]>([]);
  const [search, setSearch] = useState('');
  const [loadingPrompts, setLoadingPrompts] = useState(true);
  const [selectedChoice, setSelectedChoice] = useState<string | null>(null);

  useEffect(() => {
    const fetchPrompts = async () => {
      try {
        const data = await promptService.findActive();
        setPrompts(data);
      } catch (err) {
        console.error('Erreur chargement prompts:', err);
      } finally {
        setLoadingPrompts(false);
      }
    };
    fetchPrompts();
  }, []);

  const filteredChoices = choices.filter(c =>
    c.title.toLowerCase().includes(search.toLowerCase()) ||
    c.description.toLowerCase().includes(search.toLowerCase()) ||
    c.rubriqueTitle?.toLowerCase().includes(search.toLowerCase())
  );

  const handleAssignPrompt = async (choiceId: string, promptId: string | null) => {
    try {
      await assignPrompt(choiceId, promptId);
      setSelectedChoice(null);
    } catch (err: any) {
      alert(err.message);
    }
  };

  const choicesWithPrompt = filteredChoices.filter(c => c.promptId);
  const choicesWithoutPrompt = filteredChoices.filter(c => !c.promptId);

  if (loading || loadingPrompts) {
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
                prompts={prompts}
                selectedChoice={selectedChoice}
                setSelectedChoice={setSelectedChoice}
                onAssign={handleAssignPrompt}
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
                prompts={prompts}
                selectedChoice={selectedChoice}
                setSelectedChoice={setSelectedChoice}
                onAssign={handleAssignPrompt}
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
  prompts: Prompt[];
  selectedChoice: string | null;
  setSelectedChoice: (id: string | null) => void;
  onAssign: (choiceId: string, promptId: string | null) => void;
  hasPrompt: boolean;
}

function ConsultationChoiceCard({
  choice,
  prompts,
  selectedChoice,
  setSelectedChoice,
  onAssign,
  hasPrompt
}: ConsultationChoiceCardProps) {
  const isSelecting = selectedChoice === choice._id;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`bg-white border-2 rounded-lg p-4 transition-all ${
        hasPrompt ? 'border-green-200' : 'border-amber-200'
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

          {/* Current Prompt or Select */}
          {isSelecting ? (
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-3 space-y-2">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm font-medium text-gray-700">Choisir un prompt :</p>
                <button
                  onClick={() => setSelectedChoice(null)}
                  className="text-xs text-gray-500 hover:text-gray-700"
                >
                  Annuler
                </button>
              </div>
              {choice.promptId && (
                <button
                  onClick={() => onAssign(choice._id!, null)}
                  className="w-full text-left px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded border border-red-200 transition-colors"
                >
                  ✕ Retirer le prompt
                </button>
              )}
              <div className="space-y-1 max-h-60 overflow-y-auto">
                {prompts.map((prompt) => (
                  <button
                    key={prompt._id}
                    onClick={() => onAssign(choice._id!, prompt._id)}
                    className={`w-full text-left px-3 py-2 text-sm rounded border transition-colors ${
                      choice.promptId === prompt._id
                        ? 'bg-purple-50 border-purple-300 text-purple-900'
                        : 'hover:bg-gray-100 border-gray-200'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-3 h-3" />
                      <span className="font-medium">{prompt.title}</span>
                    </div>
                    {prompt.description && (
                      <p className="text-xs text-gray-500 mt-1 ml-5">{prompt.description}</p>
                    )}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div>
              {choice.prompt ? (
                <div className="bg-purple-50 border border-purple-200 rounded-lg p-3">
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
                <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
                  <div className="flex items-center gap-2 text-amber-800 text-sm">
                    <AlertCircle className="w-4 h-4" />
                    <span>Aucun prompt assigné</span>
                  </div>
                </div>
              )}
              <button
                onClick={() => setSelectedChoice(choice._id!)}
                className="mt-2 w-full px-3 py-1.5 text-sm bg-purple-100 text-purple-700 rounded hover:bg-purple-200 transition-colors"
              >
                {choice.prompt ? 'Changer le prompt' : 'Assigner un prompt'}
              </button>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
