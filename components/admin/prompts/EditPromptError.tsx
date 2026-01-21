import React from 'react';

export function EditPromptError({ error }: { error: string }) {
  return (
    <div className="bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400 p-4 rounded-xl text-center w-full mb-6">
      <p className="font-semibold">{error}</p>
    </div>
  );
}
