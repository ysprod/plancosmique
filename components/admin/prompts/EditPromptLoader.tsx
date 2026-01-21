import React from 'react';

export function EditPromptLoader() {
  return (
    <div className="flex flex-col items-center justify-center py-12 w-full">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-500 mb-4" />
      <div className="text-center text-gray-500 dark:text-gray-300">Chargement...</div>
    </div>
  );
}
