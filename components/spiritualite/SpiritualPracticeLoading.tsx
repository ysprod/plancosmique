import { Loader2 } from 'lucide-react';
import React from 'react';

const SpiritualPracticeLoading = () => (
  <div className=" bg-gradient-to-br from-slate-50 via-purple-50 to-orange-50 flex items-center justify-center">
    <div className="text-center">
      <Loader2 className="w-12 h-12 text-purple-600 animate-spin mx-auto mb-4" />
      <p className="text-slate-600 font-semibold">Chargement de la pratique...</p>
    </div>
  </div>
);

export default SpiritualPracticeLoading;