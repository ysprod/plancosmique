import { motion } from "framer-motion";
import { Edit, FileText } from "lucide-react";

interface ConsultationChoiceCardProps {
  choice: any;
  onEditPrompt?: (choice: any) => void;
}

function ConsultationChoiceCard({ choice, onEditPrompt }: ConsultationChoiceCardProps) {

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`bg-white border-2 rounded-lg p-4 transition-all  border-green-200 hover:border-green-300 `}
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
              onClick={() => onEditPrompt?.(choice)}
              className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
            >
              <Edit className="w-4 h-4" />
              Mettre à jour le prompt
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default ConsultationChoiceCard;