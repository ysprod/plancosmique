'use client';
import { SortField, SortOrder } from '@/hooks/books/useAdminBooks';
import { motion } from 'framer-motion';
import { ChevronDown, Filter } from 'lucide-react';

interface BookFilterPanelProps {
  showFilters: boolean;
  setShowFilters: (v: boolean) => void;
  selectedCategory: string;
  setSelectedCategory: (v: string) => void;
  statusFilter: 'all' | 'active' | 'inactive';
  setStatusFilter: (v: 'all' | 'active' | 'inactive') => void;
  sortField: SortField;
  setSortField: (v: SortField) => void;
  sortOrder: SortOrder;
  setSortOrder: (v: SortOrder) => void;
  categories: string[];
  filteredCount: number;
  setSearchQuery: (v: string) => void;
  searchQuery: string;
}

export default function BookFilterPanel({
  showFilters,
  setShowFilters,
  selectedCategory,
  setSelectedCategory,
  statusFilter,
  setStatusFilter,
  sortField,
  setSortField,
  sortOrder,
  setSortOrder,
  categories,
  filteredCount,
  setSearchQuery,
  searchQuery
}: BookFilterPanelProps) {
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
