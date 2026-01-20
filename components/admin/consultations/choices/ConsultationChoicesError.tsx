import React from 'react';
import { AlertCircle } from 'lucide-react';

export const ConsultationChoicesError = React.memo(function ConsultationChoicesError({ error }: { error: string }) {
  return (
    <div className="bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-700 text-red-700 dark:text-red-200 p-4 rounded-lg flex items-center gap-2 justify-center max-w-xl mx-auto">
      <AlertCircle className="w-6 h-6" />
      <span className="text-sm font-medium">{error}</span>
    </div>
  );
});
