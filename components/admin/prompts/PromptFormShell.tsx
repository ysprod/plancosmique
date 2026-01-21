import React from 'react';
import { PromptHeader } from './PromptHeader';
import { PromptBasicInfo } from './PromptBasicInfo';
import { PromptStructure } from './PromptStructure';
import { PromptTags } from './PromptTags';
import { PromptVariables } from './PromptVariables';

interface PromptFormShellProps {
  formData: any;
  loading: boolean;
  error: string | null;
  updateField: (field: string, value: any) => void;
  addSection: () => void;
  updateSection: (index: number, field: string, value: any) => void;
  removeSection: (index: number) => void;
  addVariable: (key: string, desc: string) => void;
  removeVariable: (key: string) => void;
  onBack: () => void;
  isEdit: boolean;
}

export const PromptFormShell: React.FC<PromptFormShellProps> = ({
  formData,
  loading,
  error,
  updateField,
  addSection,
  updateSection,
  removeSection,
  addVariable,
  removeVariable,
  onBack,
  isEdit
}) => (
  <div className="space-y-6 max-w-2xl mx-auto px-2 sm:px-0">
    <PromptHeader isEdit={isEdit} loading={loading} onBack={onBack} />
    {error && (
      <div className="bg-red-50 dark:bg-red-900 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 p-4 rounded-lg">
        {error}
      </div>
    )}
    <PromptBasicInfo formData={formData} updateField={updateField} />
    <PromptStructure
      structure={formData.structure}
      updateField={updateField}
      addSection={addSection}
      updateSection={updateSection}
      removeSection={removeSection}
    />
    <PromptTags tags={formData.tags} updateField={updateField} />
    <PromptVariables variables={formData.variables} addVariable={addVariable} removeVariable={removeVariable} />
  </div>
);