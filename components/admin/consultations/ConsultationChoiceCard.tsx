import { motion } from "framer-motion";
import { FileText, Sparkles, Tag, AlertCircle, Link, Plus, Edit, Trash2 } from "lucide-react";

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
}

export default ConsultationChoiceCard;
