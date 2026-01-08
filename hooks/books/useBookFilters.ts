import { useState } from 'react';
import { SortField, SortOrder } from '@/hooks/books/useAdminBooks';

export function useBookFilters(defaultCategories: string[] = []) {
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'inactive'>('all');
  const [sortField, setSortField] = useState<SortField>('createdAt');
  const [sortOrder, setSortOrder] = useState<SortOrder>('desc');

  return {
    searchQuery,
    setSearchQuery,
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
    categories: defaultCategories
  };
}
