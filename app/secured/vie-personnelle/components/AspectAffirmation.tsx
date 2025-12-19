import React from 'react';

interface AspectAffirmationProps {
  affirmation: string;
}

const AspectAffirmation: React.FC<AspectAffirmationProps> = ({ affirmation }) => (
  <div className="p-6 bg-gradient-to-br from-pink-100 via-purple-100 to-indigo-100 rounded-xl border-2 border-purple-300 text-center mb-8">
    <h3 className="text-xl sm:text-2xl font-bold text-purple-800 mb-3">
      💫 Affirmation de Pouvoir
    </h3>
    <p className="text-gray-800 leading-relaxed text-lg sm:text-xl font-semibold italic">
      "{affirmation}"
    </p>
  </div>
);

export default AspectAffirmation;
