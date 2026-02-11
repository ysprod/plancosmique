import { motion } from "framer-motion";
import { FileText, Plus } from "lucide-react";

interface ConsultationChoiceCardProps {
  choice: any;
  onEditPrompt?: (choice: any) => void;
}

function ConsultationChoiceCardSansPrompt({ choice, onEditPrompt }: ConsultationChoiceCardProps) {
  const handleCreate = () => {
    if (onEditPrompt) {
      onEditPrompt(choice);
      return;
    }
    window.location.href = `/admin/prompts/create?returnTo=consultations-choices&choiceId=${choice._id}&r=${Date.now()}`;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`bg-white border-2 rounded-lg p-4 transition-all border-amber-200 hover:border-amber-300`}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <FileText className="w-4 h-4 text-gray-400" />
            <h3 className="font-semibold text-gray-900">{choice.title}</h3>
            {choice.rubriqueTitle && (
              <span className="px-2 py-0.5 bg-blue-100 text-blue-700 rounded text-xs">
                {choice.rubriqueTitle}
              </span>
            )}
          </div>

          <p className="text-sm text-gray-600 mb-3">{choice.description}</p>

          <div className="flex gap-2">
            <button
              type="button"
              className="inline-flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors text-sm"
              onClick={handleCreate}
            >
              <Plus className="w-4 h-4" />
              Créer le prompt
            </button>
          </div>

        </div>
      </div>
    </motion.div>
  );
}

export default ConsultationChoiceCardSansPrompt;