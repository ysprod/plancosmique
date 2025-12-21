import { motion } from 'framer-motion';
import { memo } from 'react';
import PlanetChip from './PlanetChip';
import type { CarteDuCiel } from './types';

const SkyChartSection = memo(({ carteDuCiel }: { carteDuCiel: CarteDuCiel }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.1 }}
    className="space-y-4"
  >
    <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 flex items-center gap-2">
      <span className="text-2xl">🌟</span>
      Carte du Ciel
    </h3>

    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
      {carteDuCiel.positions.map((pos, idx) => (
        <PlanetChip key={idx} position={pos} />
      ))}
    </div>
  </motion.div>
));

SkyChartSection.displayName = 'SkyChartSection';

export default SkyChartSection;
