import React from 'react';

export const ConsultationChoicesLoader = React.memo(function ConsultationChoicesLoader() {
  return (
    <div className="flex justify-center items-center h-64">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 dark:border-purple-400" />
    </div>
  );
});
