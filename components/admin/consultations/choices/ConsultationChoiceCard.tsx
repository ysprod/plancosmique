import React from 'react';
import { motion } from 'framer-motion';
import { FileText, Tag, Plus, Edit, Trash2, AlertCircle, Sparkles } from 'lucide-react';
import Link from 'next/link';

interface ConsultationChoiceCardProps {
  choice: any;
  onDelete: () => void;
  hasPrompt: boolean;
}

export const ConsultationChoiceCard = React.memo(function ConsultationChoiceCard({
  choice,
  onDelete,
  hasPrompt
}: ConsultationChoiceCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`bg-white dark:bg-zinc-900 border-2 rounded-lg p-4 transition-all flex flex-col items-center justify-center shadow-md max-w-2xl mx-auto ${
        hasPrompt ? 'border-green-200 hover:border-green-300' : 'border-amber-200 hover:border-amber-300'
      }`}
    >
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 w-full">
        <div className="flex-1 w-full">
          {/* Title & Rubrique */}
          <div className="flex flex-wrap items-center gap-2 mb-2 justify-center md:justify-start">
            <FileText className="w-4 h-4 text-gray-400" />
            <h3 className="font-semibold text-gray-900 dark:text-zinc-100 text-center md:text-left">{choice.title}</h3>
            {choice.rubriqueTitle && (
              <span className="px-2 py-0.5 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-200 rounded text-xs">
                {choice.rubriqueTitle}
              </span>
            )}
          </div>

          {/* Description */}
          <p className="text-sm text-gray-600 dark:text-zinc-300 mb-3 text-center md:text-left">{choice.description}</p>

          {/* Current Prompt */}
          {choice.prompt ? (
            <div className="bg-purple-50 dark:bg-purple-900/30 border border-purple-200 dark:border-purple-700 rounded-lg p-3 mb-3">
              <div className="flex items-start gap-2">
                <Sparkles className="w-4 h-4 text-purple-600 dark:text-purple-300 mt-0.5 flex-shrink-0" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-purple-900 dark:text-purple-100">{choice.prompt.title}</p>
                  {choice.prompt.description && (
                    <p className="text-xs text-purple-700 dark:text-purple-200 mt-1">{choice.prompt.description}</p>
                  )}
                  {choice.prompt.tags && choice.prompt.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-2">
                      {choice.prompt.tags.map((tag: string) => (
                        <span
                          key={tag}
                          className="inline-flex items-center gap-1 px-2 py-0.5 bg-purple-100 dark:bg-purple-800 text-purple-700 dark:text-purple-200 rounded text-xs"
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
            <div className="bg-amber-50 dark:bg-amber-900/30 border border-amber-200 dark:border-amber-700 rounded-lg p-3 mb-3">
              <div className="flex items-center gap-2 text-amber-800 dark:text-amber-200 text-sm">
                <AlertCircle className="w-4 h-4" />
                <span>Aucun prompt assigné</span>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-col md:flex-row gap-2 justify-center md:justify-start">
            {!hasPrompt ? (
              <Link
                href={`/admin/prompts/create?returnTo=consultations-choices&choiceId=${choice._id}`}
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
});
