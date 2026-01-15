import React from 'react';

export const LoadingSkeleton: React.FC = () => (
  <div className="flex flex-col sm:flex-row gap-6 items-center justify-center py-6">
    {[1, 2].map((i) => (
      <div
        key={i}
        className="flex flex-col items-center bg-white rounded-2xl shadow-lg px-8 py-6 border-2 border-gray-100 animate-pulse min-w-[160px]"
      >
        <div className="w-12 h-12 bg-gray-200 rounded-xl mb-3" />
        <div className="w-20 h-10 bg-gray-200 rounded mb-2" />
        <div className="w-16 h-4 bg-gray-200 rounded" />
      </div>
    ))}
  </div>
);
