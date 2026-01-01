import { useState } from 'react';
import { useSpiritualiteData } from '@/hooks/spiritualite/useSpiritualiteData';
import { useSpiritualiteFilter } from '@/hooks/spiritualite/useSpiritualiteFilter';

export function useSpiritualiteBlogPage(categories: { id: string; label: string; icon: any }[]) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'recent' | 'popular' | 'trending'>('recent');
  const { practices, loading, error, setError } = useSpiritualiteData(categories);
  const filteredPractices = useSpiritualiteFilter(practices, searchQuery, selectedCategory, sortBy);

  return {
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    sortBy,
    setSortBy,
    practices,
    loading,
    error,
    setError,
    filteredPractices
  };
}
