'use client';

import { FileText } from 'lucide-react';

interface ConsultationsHeaderProps {
  consultationsCount: number;
  filteredCount: number;
}

export default function ConsultationsHeader({ consultationsCount, filteredCount }: ConsultationsHeaderProps) {
  return (
    <div className="mb-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-2xl">
            <FileText className="w-8 h-8 text-white" />
          </div>
          <div>
            <h1 className="text-3xl md:text-4xl font-black text-white mb-1">Mes Consultations</h1>
            <p className="text-purple-200">
              {consultationsCount} {consultationsCount > 1 ? 'analyses' : 'analyse'} · {filteredCount} affichée{filteredCount > 1 ? 's' : ''}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
