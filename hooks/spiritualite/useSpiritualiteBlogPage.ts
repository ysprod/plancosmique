import { useState } from 'react';
import { useSpiritualiteData } from '@/hooks/spiritualite/useSpiritualiteData';
import { useSpiritualiteFilter } from '@/hooks/spiritualite/useSpiritualiteFilter';

export function useSpiritualiteBlogPage() {
  const categories = [
    { id: 'all', label: 'Tous les articles', icon: null },
    { id: 'meditation', label: 'Méditation', icon: null },
    { id: 'rituel', label: 'Rituels', icon: null },
    { id: 'energie', label: 'Énergie', icon: null },
    { id: 'sagesse', label: 'Sagesse', icon: null }
  ];

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
