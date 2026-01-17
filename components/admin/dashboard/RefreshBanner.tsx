'use client';
import { motion } from 'framer-motion';
import { RefreshCw } from 'lucide-react';

interface RefreshBannerProps {
  isRefreshing: boolean;
  loading: boolean;
  show: boolean;
}

export default function RefreshBanner({ isRefreshing, loading, show }: RefreshBannerProps) {
  if (!show) return null;
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-lg p-3 mb-4 flex items-center justify-center gap-2 shadow-md"
    >
      <RefreshCw className="w-4 h-4 animate-spin" />
      <span className="text-sm font-medium">Actualisation des données en cours...</span>
    </motion.div>
  );
}