'use client';
import { memo, useMemo } from 'react';
import { motion } from 'framer-motion';
import { CarteDuCielData } from '@/lib/types/astrology.types';
import { extractCinqPortes } from '@/lib/utils/astrology.utils';

interface CinqPortesSectionProps {
  carteDuCiel: CarteDuCielData | null;
  isPremium: boolean;
}

interface PorteCardProps {
  label: string;
  valeur: string;
  description: string;
  icon: string;
  gradient: string;
  index: number;
  isPremium: boolean;
}

const PorteCard = memo<PorteCardProps>(({
  label,
  valeur,
  description,
  icon,
  gradient,
  index,
  isPremium
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        delay: index * 0.08,
        duration: 0.4,
        ease: [0.25, 0.46, 0.45, 0.94]
      }}
      whileHover={{
        scale: 1.03,
        y: -4,
        transition: { duration: 0.2 }
      }}
      className="relative group"
    >
      {/* Card Container */}
      <div className={`
        relative overflow-hidden rounded-2xl
        ${isPremium ? 'bg-white/10' : 'bg-white/5'}
        backdrop-blur-md border border-white/20
        p-4 h-full
        transition-all duration-300
        group-hover:border-white/40
        group-hover:shadow-lg group-hover:shadow-white/10
      `}>
        {/* Gradient Overlay */}
        <div className={`
          absolute inset-0 opacity-0 group-hover:opacity-20
          bg-gradient-to-br ${gradient}
          transition-opacity duration-300
        `} />

        {/* Content */}
        <div className="relative z-10 flex flex-col gap-2">
          {/* Header */}
          <div className="flex items-start justify-between gap-2">
            <div className="flex-1">
              <p className="text-xs font-medium text-white/60 uppercase tracking-wide">
                {label}
              </p>
              <h3 className={`
                text-xl font-bold mt-1
                bg-gradient-to-r ${gradient}
                bg-clip-text text-transparent
              `}>
                {valeur}
              </h3>
            </div>

            {/* Icon */}
            <motion.div
              whileHover={{ rotate: 360, scale: 1.2 }}
              transition={{ duration: 0.6 }}
              className="text-2xl"
            >
              {icon}
            </motion.div>
          </div>

          {/* Description */}
          <p className="text-xs text-white/50 leading-relaxed line-clamp-2">
            {description}
          </p>

          {/* Premium Badge */}
          {isPremium && (
            <div className="flex items-center gap-1 mt-1">
              <div className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500" />
              <span className="text-[10px] font-medium text-yellow-400/80 uppercase tracking-wider">
                Premium
              </span>
            </div>
          )}
        </div>

        {/* Animated Border on Hover */}
        <motion.div
          className={`
            absolute inset-0 rounded-2xl
            bg-gradient-to-r ${gradient}
            opacity-0 group-hover:opacity-30
          `}
          style={{
            filter: 'blur(20px)',
            zIndex: -1
          }}
          animate={{
            scale: [1, 1.05, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>
    </motion.div>
  );
}, (prevProps, nextProps) => {
  return (
    prevProps.valeur === nextProps.valeur &&
    prevProps.isPremium === nextProps.isPremium
  );
});

PorteCard.displayName = 'PorteCard';

const CinqPortesSection = memo<CinqPortesSectionProps>(({
  carteDuCiel,
  isPremium
}) => {
  // Extraction mémoïsée des 5 portes
  const cinqPortes = useMemo(() => {
    return extractCinqPortes(carteDuCiel);
  }, [carteDuCiel]);

  // Si pas de données
  if (!cinqPortes) {
    return (
      <section className="mb-6 px-3">
        <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 text-center">
          <p className="text-white/50 text-sm">
            Les 5 Portes de votre Étoile ne sont pas encore disponibles.
          </p>
        </div>
      </section>
    );
  }

  // Conversion en array pour mapping
  const portesArray = useMemo(() => [
    cinqPortes.signesolaire,
    cinqPortes.ascendant,
    cinqPortes.signeLunaire,
    cinqPortes.milieuDuCiel,
    cinqPortes.descendant
  ], [cinqPortes]);

  return (
    <section className="mb-6 px-3">
      {/* Section Header */}
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

      {/* Grid des 5 Portes */}
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

      {/* Footer Info */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-4 text-center"
      >
        <p className="text-[10px] text-white/40">
          Basé sur votre thème astral complet • Calculs astrologiques précis
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
