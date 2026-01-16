'use client';

import { motion } from 'framer-motion';
import { Search, Filter, BookOpen } from 'lucide-react';
import React from 'react';

interface Category {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }> | null;
}

interface Props {
  categories: Category[];
  selectedCategory: string;
  setSelectedCategory: (id: string) => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  sortBy: 'recent' | 'popular' | 'trending';
  setSortBy: (s: 'recent' | 'popular' | 'trending') => void;
}

export default function SpiritualiteFilters({
  categories,
  selectedCategory,
  setSelectedCategory,
  searchQuery,
  setSearchQuery,
  sortBy,
  setSortBy
}: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="mb-6 sm:mb-8"
    >
      {/* Search Bar */}
      <div className="relative mb-4 sm:mb-6">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
        <input
          type="text"
          placeholder="Rechercher un article..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-12 pr-4 py-3 sm:py-4 bg-white rounded-2xl border-2 border-purple-100 focus:border-purple-400 focus:ring-4 focus:ring-purple-100 outline-none transition-all text-sm sm:text-base"
        />
      </div>
      {/* Categories */}
      <div className="flex flex-wrap gap-2 sm:gap-3 mb-4">
        {categories.map((category) => {
          const Icon = category.icon || BookOpen;
          return (
            <motion.button
              key={category.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedCategory(category.id)}
              className={`flex items-center gap-2 px-3 sm:px-4 py-2 rounded-xl font-medium transition-all text-xs sm:text-sm ${
                selectedCategory === category.id
                  ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg'
                  : 'bg-white text-gray-700 hover:bg-purple-50'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span className="hidden sm:inline">{category.label}</span>
              <span className="sm:hidden">{category.label.split(' ')[0]}</span>
            </motion.button>
          );
        })}
      </div>
      {/* Sort Options */}
      <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
        <Filter className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
        <span className="text-xs sm:text-sm text-gray-600 font-medium">Trier par:</span>
        {[
          { id: 'recent', label: 'Plus récents' },
          { id: 'popular', label: 'Populaires' },
          { id: 'trending', label: 'Tendances' }
        ].map((option) => (
          <motion.button
            key={option.id}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setSortBy(option.id as 'recent' | 'popular' | 'trending')}
            className={`px-3 py-1.5 rounded-lg font-medium transition-all text-xs sm:text-sm ${
              sortBy === option.id
                ? 'bg-purple-600 text-white'
                : 'bg-white text-gray-700 hover:bg-purple-50'
            }`}
          >
            {option.label}
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
}
