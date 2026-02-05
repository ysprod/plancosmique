import React from 'react';
import PromptBasicInfo from './PromptBasicInfo';
import { PromptHeader } from './PromptHeader';

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
    <PromptBasicInfo
      title={formData?.title}
      description={formData?.description}
      frequence={formData?.frequence}
      participants={formData?.participants}
      rubriqueTitle={formData?.rubriqueTitle}
      offering={formData?.offering}
    />
  
    <div className="flex justify-end pt-2">
      <button
        type="submit"
        disabled={loading}
        className="inline-flex items-center gap-2 px-4 py-2 bg-pink-500 dark:bg-pink-700 text-white rounded-lg hover:bg-pink-600 dark:hover:bg-pink-800 disabled:opacity-50 transition-colors shadow"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a2 2 0 01-2 2H7a2 2 0 01-2-2V7a2 2 0 012-2h4a2 2 0 012 2v1" /></svg>
        <span>{loading ? 'Enregistrement...' : 'Enregistrer'}</span>
      </button>
    </div>
  </div>
);