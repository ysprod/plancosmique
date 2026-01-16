'use client';

import { motion } from 'framer-motion';
import { Target, BarChart3, Shield, Crown, FileText } from 'lucide-react';
import React, { memo } from 'react';
import type { Consultation } from '@/lib/interfaces';

const TYPE_CONFIG = {
  'natal': { gradient: 'from-blue-500 to-cyan-500', icon: Target },
  'thematique': { gradient: 'from-purple-500 to-pink-500', icon: BarChart3 },
  'synastrie': { gradient: 'from-orange-500 to-red-500', icon: Shield },
  'karmique': { gradient: 'from-emerald-500 to-teal-500', icon: Crown },
  'default': { gradient: 'from-gray-500 to-slate-600', icon: FileText }
} as const;

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(' ');
}

const TypeIndicator = memo(({ type }: { type: Consultation['type'] }) => {
  const config = TYPE_CONFIG[type as unknown as keyof typeof TYPE_CONFIG] || TYPE_CONFIG.default;
  const Icon = config.icon;
  return (
    <motion.div
      whileHover={{ scale: 1.05, rotate: 5 }}
      className={cx(
        'inline-flex items-center gap-2 rounded-full px-3 py-1.5',
        'bg-gradient-to-r shadow-md', config.gradient
      )}
    >
      <Icon className="h-3 w-3 text-white" />
      <span className="text-xs font-extrabold text-white capitalize">{type}</span>
    </motion.div>
  );
});
TypeIndicator.displayName = 'TypeIndicator';
export default TypeIndicator;
