'use client';
import CinqPortesNotAvailableSection from '@/components/carteduciel/CinqPortesNotAvailableSection';
import PorteCard from '@/components/carteduciel/PorteCard';
import { useCinqPortes } from '@/hooks/carteduciel/useCinqPortes';
import { CarteDuCielData } from '@/lib/types/astrology.types';
import { motion } from 'framer-motion';
import { memo } from 'react';

interface CinqPortesSectionProps {
  carteDuCiel: CarteDuCielData | null;
  isPremium: boolean;
}

const CinqPortesSection = memo<CinqPortesSectionProps>(({ carteDuCiel, isPremium }) => {
  const { cinqPortes, portesArray } = useCinqPortes(carteDuCiel);

  if (!cinqPortes) { return <CinqPortesNotAvailableSection />; }

  return (
    <section className="mb-6 px-3">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-4 flex items-center justify-between"
      >
        <div>
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <span className="text-2xl">🌟</span>
            Les 5 Portes de votre Étoile
          </h2>
          <p className="text-xs text-white/50 mt-1">
            Découvrez les 5 dimensions fondamentales de votre être
          </p>
        </div>
        {isPremium && (
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <span className="text-xl">✨</span>
          </motion.div>
        )}
      </motion.div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {portesArray.map((porte, index) => (
          <PorteCard
            key={porte.label}
            label={porte.label}
            valeur={porte.valeur}
            description={porte.description}
            icon={porte.icon}
            gradient={porte.gradient}
            index={index}
            isPremium={isPremium}
          />
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-4 text-center"
      >
        <p className="text-[10px] text-white/40">
          Basé sur votre thème astral • Calculs astrologiques précis
        </p>
      </motion.div>
    </section>
  );
}, (prevProps, nextProps) => {
  return (
    prevProps.carteDuCiel === nextProps.carteDuCiel &&
    prevProps.isPremium === nextProps.isPremium
  );
});

CinqPortesSection.displayName = 'CinqPortesSection';

export default CinqPortesSection;