'use client';
import React from 'react';
import { motion, Variants } from 'framer-motion';
import { Gift } from 'lucide-react';
import OfferingCard from './OfferingCard';

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



// ============================================================================


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
