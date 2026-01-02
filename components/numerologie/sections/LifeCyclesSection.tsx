'use client';

import React from 'react';
import { motion, Variants } from 'framer-motion';
import { Clock, TrendingUp } from 'lucide-react';

// ============================================================================
// TYPES
// ============================================================================

interface LifeCycle {
  periode: string;
  ages: string;
  nombre: number;
  theme: string;
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

const cycleVariants: Variants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.4,
      ease: 'easeOut',
    },
  },
};

// ============================================================================
// COMPOSANTS
// ============================================================================

const CycleCard = React.memo<{ cycle: LifeCycle; index: number }>(({ cycle, index }) => {
  const gradients = [
    'from-purple-500 to-indigo-500',
    'from-blue-500 to-cyan-500',
    'from-teal-500 to-green-500',
  ];
  const gradient = gradients[index % gradients.length];

  return (
    <motion.article
      variants={cycleVariants}
      className="group rounded-2xl bg-gradient-to-br from-white/10 to-white/5 p-6 backdrop-blur-sm transition-all hover:shadow-xl hover:shadow-purple-500/20"
    >
      <div className="mb-4 flex items-start justify-between">
        <div>
          <h3 className="mb-1 text-xl font-bold text-purple-100">{cycle.periode}</h3>
          <p className="text-sm text-purple-300">{cycle.ages}</p>
        </div>
        <div
          className={`flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-r ${gradient} text-2xl font-bold text-white shadow-lg`}
        >
          {cycle.nombre}
        </div>
      </div>

      <p className="text-sm leading-relaxed text-purple-200">{cycle.theme}</p>
    </motion.article>
  );
});
CycleCard.displayName = 'CycleCard';

// ============================================================================
// SECTION PRINCIPALE
// ============================================================================

interface Props {
  data: LifeCycle[];
}

export const LifeCyclesSection = React.memo<Props>(({ data }) => (
  <motion.section
    variants={sectionVariants}
    className="rounded-3xl bg-gradient-to-br from-teal-800/40 to-green-800/40 p-5 backdrop-blur-sm sm:p-8"
    aria-labelledby="lifecycles-title"
  >
    <div className="mb-8 text-center">
      <div className="mb-3 flex items-center justify-center gap-2">
        <Clock className="h-6 w-6 text-teal-400" />
        <h2
          id="lifecycles-title"
          className="text-2xl font-bold text-purple-100 sm:text-3xl"
        >
          Cycles de Vie
        </h2>
        <Clock className="h-6 w-6 text-teal-400" />
      </div>
      <p className="text-sm text-purple-300">
        Les grandes périodes de transformation et d'évolution
      </p>
    </div>

    <div className="grid gap-5 sm:grid-cols-2 lg:gap-6">
      {data.map((cycle, index) => (
        <CycleCard key={index} cycle={cycle} index={index} />
      ))}
    </div>
  </motion.section>
));

LifeCyclesSection.displayName = 'LifeCyclesSection';
