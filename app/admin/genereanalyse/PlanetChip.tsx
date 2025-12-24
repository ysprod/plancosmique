import { Position } from '@/lib/interfaces';
import { motion } from 'framer-motion';
import { memo } from 'react';
 

const PLANET_SYMBOLS: Record<string, string> = {
  'Soleil': '☉',
  'Lune': '☽',
  'Mercure': '☿',
  'Vénus': '♀',
  'Mars': '♂',
  'Jupiter': '♃',
  'Saturne': '♄',
  'Uranus': '♅',
  'Neptune': '♆',
  'Pluton': '♇',
  'Ascendant': 'ASC',
  'Milieu du Ciel': 'MC',
  'Nœud Nord': '☊',
  'Nœud Sud': '☋',
  'Chiron': '⚷',
  'Lilith': '⚸',
  'Vertex': 'VX',
};

const getPlanetSymbol = (planetName: string): string => {
  const cleanName = planetName.replace(' RÉTROGRADE', '').replace(' Vraie', '').trim();
  return PLANET_SYMBOLS[cleanName] || planetName.substring(0, 2).toUpperCase();
};

const PlanetChip = memo(({ position }: { position: Position }) => {
  const symbol = getPlanetSymbol(position.planete!);
  const isRetrograde = position.retrograde;

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className={`
        relative flex items-center gap-2 p-3 rounded-xl border-2 transition-all
        ${isRetrograde
          ? 'bg-red-50 dark:bg-red-900/20 border-red-300 dark:border-red-800'
          : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700'
        }
        hover:shadow-md
      `}
    >
      {/* Symbole planète */}
      <div className={`
        flex items-center justify-center w-8 h-8 rounded-full font-bold text-sm
        ${isRetrograde
          ? 'bg-red-500 text-white'
          : 'bg-gradient-to-br from-purple-500 to-pink-500 text-white'
        }
      `}>
        {symbol}
      </div>

      {/* Infos */}
      <div className="flex-1 min-w-0">
        <p className="text-xs font-semibold text-gray-900 dark:text-gray-100 truncate">
          {position.planete!.replace(' RÉTROGRADE', '').replace(' Vraie', '')}
        </p>
        <p className="text-[10px] text-gray-600 dark:text-gray-400">
          {position.signe} • M{position.maison}
        </p>
      </div>

      {/* Badge rétrograde */}
      {isRetrograde && (
        <div className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-red-500 
                      flex items-center justify-center">
          <span className="text-[8px] font-bold text-white">R</span>
        </div>
      )}
    </motion.div>
  );
});

PlanetChip.displayName = 'PlanetChip';

export default PlanetChip;

export { getPlanetSymbol };
