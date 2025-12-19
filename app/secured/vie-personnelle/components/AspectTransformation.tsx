import React from 'react';

interface AspectTransformationProps {
  transformation: string;
}

const AspectTransformation: React.FC<AspectTransformationProps> = ({ transformation }) => (
  <div className="mb-8 p-6 bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl border-2 border-amber-200">
    <h3 className="text-xl sm:text-2xl font-bold text-amber-700 mb-3">
      🦋 Votre Transformation
    </h3>
    <p className="text-gray-700 leading-relaxed text-base sm:text-lg font-medium">
      {transformation}
    </p>
  </div>
);

export default AspectTransformation;
