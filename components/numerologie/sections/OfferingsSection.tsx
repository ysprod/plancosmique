'use client';

import React from 'react';
import { motion, Variants } from 'framer-motion';
import { Gift, DollarSign } from 'lucide-react';

// ============================================================================
// TYPES
// ============================================================================

interface Offering {
  offeringId: string;
  name: string;
  icon: string;
  description: string;
  category: string;
  quantity: number;
  price: number;
  priceUSD: number;
  visible: boolean;
}

// ============================================================================
// ANIMATION VARIANTS
// ============================================================================

const sectionVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: 'easeOut',
    },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.4,
      ease: 'easeOut',
    },
  },
};

// ============================================================================
// COMPOSANTS
// ============================================================================

const OfferingCard = React.memo<{ offering: Offering }>(({ offering }) => {
  const categoryGradients: Record<string, string> = {
    animal: 'from-red-500 to-orange-500',
    vegetal: 'from-green-500 to-emerald-500',
    beverage: 'from-purple-500 to-pink-500',
  };

  const gradient = categoryGradients[offering.category] || 'from-gray-500 to-slate-500';

  return (
    <motion.article
      variants={cardVariants}
      className="group overflow-hidden rounded-2xl bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm transition-all hover:shadow-xl hover:shadow-purple-500/20"
    >
      {/* Header avec icône */}
      <div className={`bg-gradient-to-r ${gradient} p-5 text-center`}>
        <div className="mb-2 text-5xl">{offering.icon}</div>
        <h3 className="text-xl font-bold text-white">{offering.name}</h3>
        <p className="mt-1 text-xs uppercase tracking-wider text-white/80">
          {offering.category}
        </p>
      </div>

      {/* Corps */}
      <div className="p-5">
        <p className="mb-4 text-sm text-purple-200">{offering.description}</p>

        {/* Prix */}
        <div className="flex items-center justify-between rounded-lg bg-black/20 p-3">
          <div className="flex items-center gap-2">
            <DollarSign className="h-5 w-5 text-green-400" />
            <span className="font-semibold text-purple-100">Prix</span>
          </div>
          <div className="text-right">
            <p className="text-lg font-bold text-green-400">{offering.price} XOF</p>
            <p className="text-xs text-purple-300">≈ ${offering.priceUSD}</p>
          </div>
        </div>

        {/* Quantité */}
        <div className="mt-3 text-center">
          <span className="rounded-full bg-purple-500/20 px-3 py-1 text-xs font-medium text-purple-200">
            Quantité : {offering.quantity}
          </span>
        </div>
      </div>
    </motion.article>
  );
});
OfferingCard.displayName = 'OfferingCard';

// ============================================================================
// SECTION PRINCIPALE
// ============================================================================

interface Props {
  alternatives: Offering[];
}

export const OfferingsSection = React.memo<Props>(({ alternatives }) => {
  const visibleOfferings = alternatives.filter((o) => o.visible);

  if (visibleOfferings.length === 0) return null;

  return (
    <motion.section
      variants={sectionVariants}
      className="rounded-3xl bg-gradient-to-br from-pink-800/40 to-rose-800/40 p-5 backdrop-blur-sm sm:p-8"
      aria-labelledby="offerings-title"
    >
      <div className="mb-8 text-center">
        <div className="mb-3 flex items-center justify-center gap-2">
          <Gift className="h-6 w-6 text-pink-400" />
          <h2
            id="offerings-title"
            className="text-2xl font-bold text-purple-100 sm:text-3xl"
          >
            Offrandes Spirituelles
          </h2>
          <Gift className="h-6 w-6 text-pink-400" />
        </div>
        <p className="text-sm text-purple-300">
          Renforcez votre connexion spirituelle avec ces offrandes traditionnelles
        </p>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {visibleOfferings.map((offering) => (
          <OfferingCard key={offering.offeringId} offering={offering} />
        ))}
      </div>
    </motion.section>
  );
});

OfferingsSection.displayName = 'OfferingsSection';
