import React from 'react';

interface EditPromptShellProps {
  children: React.ReactNode;
  error?: string | null;
}

export const EditPromptShell: React.FC<EditPromptShellProps> = ({ children, error }) => (
  <div className="w-full  mx-auto flex flex-col items-center justify-center">
    {error ? (
      <div className="bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400 rounded-xl text-center w-full mb-6">
        <p className="font-semibold">{error}</p>
      </div>
    ) : null}
    {children}
  </div>
);