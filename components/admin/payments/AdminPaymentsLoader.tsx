import React from 'react';

export const AdminPaymentsLoader: React.FC = () => (
  <div className="flex items-center justify-center  bg-gray-50">
    <div className="text-center">
      <div className="w-12 h-12 border-4 border-green-500 border-t-transparent rounded-full mx-auto mb-3 animate-spin" />
      <p className="text-sm text-gray-600 font-medium">Chargement...</p>
    </div>
  </div>
);
