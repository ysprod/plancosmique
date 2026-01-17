'use client';
import { memo } from 'react';
import { Gift } from 'lucide-react';
import ExpandableSection from './ExpandableSection';

const OfferingsData = memo(({ alternatives }: { alternatives: any[] }) => {
  if (!alternatives || alternatives.length === 0) return null;
  const visibleOfferings = alternatives.filter(o => o.visible);
  if (visibleOfferings.length === 0) return null;
  return (
    <ExpandableSection
      title={`🎁 Offrandes Spirituelles (${visibleOfferings.length})`}
      icon={Gift}
      iconColor="text-rose-600"
      badge={visibleOfferings.length.toString()}
      content={
        <div className="grid grid-cols-3 gap-1.5">
          {visibleOfferings.map((offering, i) => (
            <div key={i} className="p-2 rounded-lg bg-gradient-to-br from-rose-50 to-pink-50 dark:from-rose-900/20 dark:to-pink-900/20 text-center">
              <div className="text-2xl mb-1">{offering.icon || '🎁'}</div>
              <div className="text-[8px] font-bold text-gray-900 dark:text-gray-100 line-clamp-1">
                {offering.name || offering.category}
              </div>
              <div className="text-[10px] font-bold text-rose-600 dark:text-rose-400">
                {offering.price} XOF
              </div>
            </div>
          ))}
        </div>
      }
    />
  );
});
OfferingsData.displayName = 'OfferingsData';

export default OfferingsData;