'use client';
import { Compass, Award, Target, Heart, Drama, Hash } from 'lucide-react';
import { NumerologyResult } from '@/hooks/numerologie/useNumerologyCalculator';

interface NumerologyResultProps {
  result: NumerologyResult;
}

export function NumerologyResultCard({ result }: NumerologyResultProps) {
  return (
    <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Votre Profil Numérologique</h2>
      <div className="space-y-6">
        <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl p-5 border-2 border-amber-200">
          <div className="flex items-center gap-3 mb-2">
            <Compass className="w-5 h-5 text-amber-700" />
            <span className="font-semibold text-gray-700">Chemin de Vie</span>
          </div>
          <div className="text-4xl font-bold text-amber-700">
            {result.lifePathNumber}
          </div>
          <p className="text-sm text-gray-600 mt-2">{result.interpretation}</p>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
            <div className="flex items-center gap-2 mb-2">
              <Award className="w-4 h-4 text-gray-700" />
              <span className="font-semibold text-gray-700 text-sm">Naissance</span>
            </div>
            <div className="text-3xl font-bold text-gray-900">{result.birthNumber}</div>
          </div>
          <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
            <div className="flex items-center gap-2 mb-2">
              <Target className="w-4 h-4 text-gray-700" />
              <span className="font-semibold text-gray-700 text-sm">Expression</span>
            </div>
            <div className="text-3xl font-bold text-gray-900">{result.expressionNumber}</div>
          </div>
          <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
            <div className="flex items-center gap-2 mb-2">
              <Heart className="w-4 h-4 text-gray-700" />
              <span className="font-semibold text-gray-700 text-sm">Âme</span>
            </div>
            <div className="text-3xl font-bold text-gray-900">{result.soulNumber}</div>
          </div>
          <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
            <div className="flex items-center gap-2 mb-2">
              <Drama className="w-4 h-4 text-gray-700" />
              <span className="font-semibold text-gray-700 text-sm">Personnalité</span>
            </div>
            <div className="text-3xl font-bold text-gray-900">{result.personalityNumber}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
