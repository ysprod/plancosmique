import { motion } from 'framer-motion';
import { Search } from 'lucide-react';
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

export default function SpiritualiteBlogFilters({
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
          onChange={e => setSearchQuery(e.target.value)}
          className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-100 bg-white text-gray-900 text-sm sm:text-base shadow-sm outline-none transition-all"
        />
      </div>
      {/* Category Filters */}
      <div className="flex flex-wrap gap-2 mb-4">
        {categories.map(category => (
          <button
            key={category.id}
            onClick={() => setSelectedCategory(category.id)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors border ${selectedCategory === category.id ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white border-transparent' : 'bg-white text-gray-700 border-gray-200 hover:bg-purple-50'}`}
          >
            {category.icon && <category.icon className="inline-block w-4 h-4 mr-2 align-text-bottom" />}
            {category.label}
          </button>
        ))}
      </div>
      {/* Sort By */}
      <div className="flex gap-2 items-center">
        <span className="text-xs text-gray-500">Trier par :</span>
        <select
          value={sortBy}
          onChange={e => setSortBy(e.target.value as 'recent' | 'popular' | 'trending')}
          className="rounded-lg border border-gray-200 px-3 py-1 text-sm text-gray-700 focus:border-purple-500 focus:ring-2 focus:ring-purple-100 bg-white shadow-sm outline-none transition-all"
        >
          <option value="recent">Récent</option>
          <option value="popular">Populaire</option>
          <option value="trending">Tendance</option>
        </select>
      </div>
    </motion.div>
  );
}
