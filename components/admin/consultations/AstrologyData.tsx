'use client';
import { memo } from 'react';
import { Heart, CircleDot } from 'lucide-react';
import ExpandableSection from './ExpandableSection';

const AstrologyData = memo(({ formData }: { formData: any }) => {
  const carteDuCiel = formData?.carteDuCiel;
  if (!carteDuCiel) return null;
  return (
    <div className="space-y-1">
      {/* Mission de Vie */}
      {carteDuCiel.missionDeVie?.contenu && (
        <ExpandableSection
          title="🎯 Mission de Vie Astrologique"
          icon={Heart}
          iconColor="text-pink-600"
          content={
            <pre className="text-[9px] leading-relaxed text-gray-700 dark:text-gray-300 whitespace-pre-wrap font-sans max-h-64 overflow-y-auto">
              {carteDuCiel.missionDeVie.contenu}
            </pre>
          }
        />
      )}
      {/* Positions Planétaires */}
      {carteDuCiel.carteDuCiel?.positions && (
        <ExpandableSection
          title={`⭐ Positions Planétaires (${carteDuCiel.carteDuCiel.positions.length})`}
          icon={CircleDot}
          iconColor="text-blue-600"
          content={
            <div className="grid grid-cols-2 gap-1">
              {carteDuCiel.carteDuCiel.positions.slice(0, 12).map((pos: any, i: number) => (
                <div key={i} className="flex items-center gap-1 p-1 rounded bg-blue-50 dark:bg-blue-900/20">
                  <span className="text-[10px] font-bold text-blue-900 dark:text-blue-200">
                    {pos.planete}:
                  </span>
                  <span className="text-[9px] text-gray-700 dark:text-gray-300">
                    {pos.signe} M{pos.maison}
                    {pos.retrograde && " ℞"}
                  </span>
                </div>
              ))}
            </div>
          }
        />
      )}
    </div>
  );
});
AstrologyData.displayName = 'AstrologyData';

export default AstrologyData;