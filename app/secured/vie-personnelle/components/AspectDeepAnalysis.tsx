import React from 'react';

interface AspectDeepAnalysisProps {
  deepAnalysis: string;
}

const AspectDeepAnalysis: React.FC<AspectDeepAnalysisProps> = ({ deepAnalysis }) => (
  <div className="mb-8 p-6 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 rounded-xl">
    <h3 className="text-xl sm:text-2xl font-bold text-indigo-700 mb-4">
      🌊 Analyse Approfondie
    </h3>
    <p className="text-gray-700 leading-relaxed text-base sm:text-lg">
      {deepAnalysis}
    </p>
  </div>
);

export default AspectDeepAnalysis;
