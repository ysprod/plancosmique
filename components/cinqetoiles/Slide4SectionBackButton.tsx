'use client';

import BackButton from '@/components/cinqetoiles/BackButton';
import { motion } from 'framer-motion';

export function Slide4SectionBackButton({ show, onClick }: { show: boolean; onClick: () => void }) {
  if (!show) return null;
  return (
    <motion.div
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="sticky top-0 z-50 bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl border-b border-gray-200 dark:border-gray-800 px-3 sm:px-4 py-3 shadow-sm"
    >
      <div className="max-w-6xl mx-auto">
        <BackButton onClick={onClick} />
      </div>
    </motion.div>
  );
}
