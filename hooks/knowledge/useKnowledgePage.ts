import { useCallback, useEffect, useState } from 'react';
import { knowledgeService } from '@/lib/api/services';
import type { Knowledge, KnowledgeCategory } from '@/lib/types/knowledge.types';

export function useKnowledgePage() {
  const [knowledges, setKnowledges] = useState<Knowledge[]>([]);
  const [popular, setPopular] = useState<Knowledge[]>([]);
  const [recent, setRecent] = useState<Knowledge[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<KnowledgeCategory | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'all' | 'popular' | 'recent'>('all');

  const loadKnowledges = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await knowledgeService.getAll({
        page: 1,
        limit: 50,
        ...(selectedCategory !== 'all' && { category: selectedCategory }),
        ...(searchQuery && { search: searchQuery }),
      });
      setKnowledges(response.knowledges);
    } catch (error) {
      console.error('Erreur lors du chargement des connaissances:', error);
    } finally {
      setIsLoading(false);
    }
  }, [selectedCategory, searchQuery]);

  const loadPopular = useCallback(async () => {
    try {
      const data = await knowledgeService.getPopular(6);
      setPopular(data);
    } catch (error) {
      console.error('Erreur lors du chargement des populaires:', error);
    }
  }, []);

  const loadRecent = useCallback(async () => {
    try {
      const data = await knowledgeService.getRecent(6);
      setRecent(data);
    } catch (error) {
      console.error('Erreur lors du chargement des récentes:', error);
    }
  }, []);

  useEffect(() => {
    loadKnowledges();
    loadPopular();
    loadRecent();
  }, [loadKnowledges, loadPopular, loadRecent]);

  const handleSearch = useCallback(() => {
    loadKnowledges();
  }, [loadKnowledges]);

  const handleCategoryChange = useCallback((category: KnowledgeCategory | 'all') => {
    setSelectedCategory(category);
    setTimeout(() => loadKnowledges(), 100);
  }, [loadKnowledges]);

  const handleLike = useCallback(async (e: React.MouseEvent, knowledgeId: string) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      await knowledgeService.toggleLike(knowledgeId);
      loadKnowledges();
      loadPopular();
    } catch (error) {
      console.error('Erreur lors du like:', error);
    }
  }, [loadKnowledges, loadPopular]);

  const displayedKnowledges = activeTab === 'popular' ? popular : activeTab === 'recent' ? recent : knowledges;

  return {
    knowledges,
    popular,
    recent,
    isLoading,
    selectedCategory,
    setSelectedCategory,
    searchQuery,
    setSearchQuery,
    activeTab,
    setActiveTab,
    handleSearch,
    handleCategoryChange,
    handleLike,
    displayedKnowledges,
  };
}
