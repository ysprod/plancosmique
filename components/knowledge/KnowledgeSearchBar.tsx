'use client';
import { motion } from 'framer-motion';
import { Search } from 'lucide-react';
import React from 'react';

interface KnowledgeSearchBarProps {
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  handleSearch: () => void;
}

export default function KnowledgeSearchBar({ searchQuery, setSearchQuery, handleSearch }: KnowledgeSearchBarProps) {
  return (
    <div className="flex gap-4 items-center">
      <div className="flex-1 relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
          placeholder="Rechercher une connaissance..."
          className="w-full pl-12 pr-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
      </div>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleSearch}
        className="px-6 py-3 rounded-xl bg-purple-500 hover:bg-purple-600 text-white font-medium transition-colors"
      >
        Rechercher
      </motion.button>
    </div>
  );
}
