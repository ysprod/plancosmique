import React, { memo } from 'react';
import { Moon, Sparkles } from 'lucide-react';
import InfoCard from './InfoCard';

interface ResultInfoGridProps {
  dominantPlanet: string;
  luckyColor: string;
}

export const ResultInfoGrid = memo<ResultInfoGridProps>(({
  dominantPlanet,
  luckyColor
}) => {
  return (
    <div className="grid grid-cols-2 gap-3 sm:gap-4">
      <InfoCard
        icon={Moon}
        label="Planète Dominante"
        value={dominantPlanet}
        color="from-purple-500 to-indigo-500"
      />
      <InfoCard
        icon={Sparkles}
        label="Couleur Porte-bonheur"
        value={luckyColor}
        color="from-amber-500 to-orange-500"
      />
    </div>
  );
});

ResultInfoGrid.displayName = 'ResultInfoGrid';
