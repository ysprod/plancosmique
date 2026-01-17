'use client';
import { motion } from 'framer-motion';
import { ChevronDown, Filter } from 'lucide-react';

interface BookFilterPanelProps {
  showFilters: boolean;
  setShowFilters: (v: boolean) => void;
}

export default function BookFilterPanel({ showFilters, setShowFilters }: BookFilterPanelProps) {

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={() => setShowFilters(!showFilters)}
      className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all ${showFilters ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
    >
      <Filter className="w-5 h-5" />
      Filtres
      <ChevronDown className={`w-4 h-4 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
    </motion.button>
  );
}