'use client';
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, AlertCircle, Sparkles, CheckCircle, FileText, Tag, Plus, Edit, Trash2, X } from 'lucide-react';
import { useConsultationChoices } from '@/hooks/admin/useConsultationChoices';
import { promptService } from '@/lib/api/services/prompt.service';
import { Prompt } from '@/lib/types/prompt.types';
import Link from 'next/link';

export default function ConsultationChoicesList() {
  const { choices, loading, error, assignPrompt } = useConsultationChoices();
  const [prompts, setPrompts] = useState<Prompt[]>([]);
  const [search, setSearch] = useState('');
  const [loadingPrompts, setLoadingPrompts] = useState(true);
  const [showPromptModal, setShowPromptModal] = useState(false);
  const [selectedChoice, setSelectedChoice] = useState<any>(null);
  const [modalAction, setModalAction] = useState<'add' | 'edit'>('add');

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

  const handleAddPrompt = (choice: any) => {
    setSelectedChoice(choice);
    setModalAction('add');
    setShowPromptModal(true);
  };

  const handleEditPrompt = (choice: any) => {
    setSelectedChoice(choice);
    setModalAction('edit');
    setShowPromptModal(true);
  };

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

  const handleSelectPrompt = async (promptId: string) => {
    try {
      await assignPrompt(selectedChoice._id, promptId);
      setShowPromptModal(false);
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
                onAdd={() => handleAddPrompt(choice)}
                onEdit={() => {}}
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
                onAdd={() => {}}
                onEdit={() => handleEditPrompt(choice)}
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

      {/* Prompt Selection Modal */}
      <AnimatePresence>
        {showPromptModal && (
          <PromptSelectionModal
            prompts={prompts}
            selectedChoice={selectedChoice}
            action={modalAction}
            onSelect={handleSelectPrompt}
            onClose={() => {
              setShowPromptModal(false);
              setSelectedChoice(null);
            }}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

interface ConsultationChoiceCardProps {
  choice: any;
  onAdd: () => void;
  onEdit: () => void;
  onDelete: () => void;
  hasPrompt: boolean;
}

function ConsultationChoiceCard({
  choice,
  onAdd,
  onEdit,
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
              <button
                onClick={onAdd}
                className="inline-flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors text-sm"
              >
                <Plus className="w-4 h-4" />
                Ajouter prompt
              </button>
            ) : (
              <>
                <button
                  onClick={onEdit}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
                >
                  <Edit className="w-4 h-4" />
                  Modifier prompt
                </button>
                <button
                  onClick={onDelete}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm"
                >
                  <Trash2 className="w-4 h-4" />
                  Supprimer prompt
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

interface PromptSelectionModalProps {
  prompts: Prompt[];
  selectedChoice: any;
  action: 'add' | 'edit';
  onSelect: (promptId: string) => void;
  onClose: () => void;
}

function PromptSelectionModal({
  prompts,
  selectedChoice,
  action,
  onSelect,
  onClose
}: PromptSelectionModalProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[80vh] overflow-hidden"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div>
            <h2 className="text-xl font-bold text-gray-900">
              {action === 'add' ? 'Ajouter un prompt' : 'Modifier le prompt'}
            </h2>
            <p className="text-sm text-gray-600 mt-1">
              Pour : <span className="font-medium">{selectedChoice?.title}</span>
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(80vh-140px)]">
          {prompts.length === 0 ? (
            <div className="text-center py-12">
              <Sparkles className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600 mb-4">Aucun prompt actif disponible</p>
              <Link
                href="/admin/prompts/create"
                className="inline-flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
              >
                <Plus className="w-4 h-4" />
                Créer un prompt
              </Link>
            </div>
          ) : (
            <div className="space-y-2">
              {prompts.map((prompt) => {
                const isCurrentPrompt = selectedChoice?.promptId === prompt._id;
                return (
                  <button
                    key={prompt._id}
                    onClick={() => onSelect(prompt._id)}
                    disabled={isCurrentPrompt}
                    className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                      isCurrentPrompt
                        ? 'border-purple-400 bg-purple-50 cursor-not-allowed'
                        : 'border-gray-200 hover:border-purple-300 hover:bg-purple-50'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <Sparkles className={`w-5 h-5 mt-0.5 flex-shrink-0 ${
                        isCurrentPrompt ? 'text-purple-600' : 'text-gray-400'
                      }`} />
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-semibold text-gray-900">{prompt.title}</h3>
                          {isCurrentPrompt && (
                            <span className="px-2 py-0.5 bg-purple-200 text-purple-800 rounded text-xs font-medium">
                              Actuel
                            </span>
                          )}
                        </div>
                        {prompt.description && (
                          <p className="text-sm text-gray-600 mb-2">{prompt.description}</p>
                        )}
                        {prompt.tags && prompt.tags.length > 0 && (
                          <div className="flex flex-wrap gap-1">
                            {prompt.tags.map((tag) => (
                              <span
                                key={tag}
                                className="inline-flex items-center gap-1 px-2 py-0.5 bg-gray-100 text-gray-700 rounded text-xs"
                              >
                                <Tag className="w-2 h-2" />
                                {tag}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-6 border-t border-gray-200 bg-gray-50">
          <Link
            href={`/admin/prompts/create?returnTo=consultations-choices&choiceId=${selectedChoice?._id}&choiceTitle=${encodeURIComponent(selectedChoice?.title || '')}`}
            className="inline-flex items-center gap-2 px-4 py-2 text-purple-600 hover:bg-purple-50 rounded-lg transition-colors text-sm"
          >
            <Plus className="w-4 h-4" />
            Créer un nouveau prompt
          </Link>
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-700 hover:bg-gray-200 rounded-lg transition-colors"
          >
            Annuler
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}
