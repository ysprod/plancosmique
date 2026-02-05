import React from "react";
import { Save } from "lucide-react";

interface PromptFormHeaderProps {
  title: string;
  isSaving: boolean;
  onSave?: () => void;
}

const PromptFormHeader: React.FC<PromptFormHeaderProps> = ({ title, isSaving, onSave }) => (
  <div className="flex items-center justify-between mb-4">
    <h2 className="text-lg font-bold text-cosmic-indigo dark:text-cosmic-pink">{title}</h2>
    {onSave && (
      <button
        type="button"
        className="inline-flex items-center gap-2 px-3 py-1 rounded bg-cosmic-purple text-white hover:bg-cosmic-indigo transition"
        onClick={onSave}
        disabled={isSaving}
      >
        <Save className="w-4 h-4" />
        {isSaving ? "Enregistrement..." : "Enregistrer"}
      </button>
    )}
  </div>
);

export default PromptFormHeader;
