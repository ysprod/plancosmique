import { Flame } from 'lucide-react';
import React from 'react';

const SpiritualPracticeError = ({ error }: { error: string }) => (
  <div className=" bg-gradient-to-br from-slate-50 via-purple-50 to-orange-50 p-6">
    <div className="max-w-2xl mx-auto">
      <div className="bg-red-50 border-2 border-red-200 rounded-2xl p-8 text-center">
        <span className="inline-block mb-4">
          <Flame className="w-12 h-12 text-red-600 mx-auto" />
        </span>
        <p className="text-red-700 font-semibold text-lg">{error}</p>
        <button
          onClick={() => window.history.back()}
          className="mt-6 px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
        >
          Retour
        </button>
      </div>
    </div>
  </div>
);

export default SpiritualPracticeError;
