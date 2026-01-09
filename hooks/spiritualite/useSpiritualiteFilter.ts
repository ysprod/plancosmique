import { SpiritualPractice } from '@/lib/interfaces';
import { useState, useEffect } from 'react';

export function useSpiritualiteFilter(practices: SpiritualPractice[], searchQuery: string, selectedCategory: string, sortBy: 'recent' | 'popular' | 'trending') {
  const [filteredPractices, setFilteredPractices] = useState<SpiritualPractice[]>([]);

  useEffect(() => {
    let filtered = [...practices];
    if (searchQuery) {
      filtered = filtered.filter(practice =>
        practice.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        practice.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(practice => practice.category === selectedCategory);
    }
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'popular':
          return (b.views || 0) - (a.views || 0);
        case 'trending':
          return (b.likes || 0) - (a.likes || 0);
        case 'recent':
        default:
          return new Date(b.publishedAt || 0).getTime() - new Date(a.publishedAt || 0).getTime();
      }
    });
    setFilteredPractices(filtered);
  }, [practices, searchQuery, selectedCategory, sortBy]);

  return filteredPractices;
}
