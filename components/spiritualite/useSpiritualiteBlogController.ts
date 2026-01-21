import { useSpiritualiteFilter } from '@/hooks/spiritualite/useSpiritualiteFilter';
import { api } from '@/lib/api/client';
import { SpiritualPractice } from '@/lib/interfaces';
import { useCallback, useEffect, useMemo, useState } from 'react';

export function useSpiritualiteBlogController() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'recent' | 'popular' | 'trending'>('recent');
  const [practices, setPractices] = useState<SpiritualPractice[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchPractices = useCallback(async () => {
    try {
      setLoading(true);
      setError('');
      const categories = [
        { id: 'all', label: 'Tous les articles', icon: null },
        { id: 'meditation', label: 'Méditation', icon: null },
        { id: 'rituel', label: 'Rituels', icon: null },
        { id: 'energie', label: 'Énergie', icon: null },
        { id: 'sagesse', label: 'Sagesse', icon: null }
      ];
      const { data } = await api.get<{ success: boolean; data: SpiritualPractice[]; count: number }>('/spiritualite');
      const enrichedData = data.data.map((practice: SpiritualPractice, index: number) => ({
        ...practice,
        readTime: practice.readTime || Math.floor(Math.random() * 5) + 3,
        publishedAt: practice.publishedAt || new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(),
        author: practice.author || 'Équipe Mon Étoile',
        views: practice.views || Math.floor(Math.random() * 1000) + 100,
        likes: practice.likes || Math.floor(Math.random() * 100) + 10,
        comments: practice.comments || Math.floor(Math.random() * 50),
        featured: practice.featured || index === 0,
        trending: practice.trending || Math.random() > 0.7,
        category: practice.category || categories[Math.floor(Math.random() * (categories.length - 1)) + 1].id
      }));
      setPractices(enrichedData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPractices();
  }, [fetchPractices]);

  const filteredPractices = useSpiritualiteFilter(practices, searchQuery, selectedCategory, sortBy);

  const handleRetry = useCallback(() => {
    setError('');
    fetchPractices();
  }, [fetchPractices]);

  const featuredArticle = useMemo(() => {
    if (!filteredPractices?.length) return null;
    const mapPractice = (p: any) => ({
      id: p._id,
      title: p.title,
      description: p.description,
      imageUrl: p.imageUrl || '',
      category: p.category || '',
      createdAt: p.publishedAt || '',
      featured: p.featured,
      readTime: p.readTime,
      author: typeof p.author === 'string' ? { name: p.author } : p.author,
    });
    const found = filteredPractices.find((p: any) => p.featured === true) || filteredPractices[0] || null;
    return found ? mapPractice(found) : null;
  }, [filteredPractices]);

  const regularArticles = useMemo(() => {
    if (!filteredPractices?.length) return [];
    const mapPractice = (p: any) => ({
      id: p._id,
      title: p.title,
      description: p.description,
      imageUrl: p.imageUrl || '',
      category: p.category || '',
      createdAt: p.publishedAt || '',
      featured: p.featured,
      readTime: p.readTime,
      author: typeof p.author === 'string' ? { name: p.author } : p.author,
    });
    return featuredArticle
      ? filteredPractices.filter((p: any) => p._id !== featuredArticle.id).map(mapPractice)
      : filteredPractices.slice(1).map(mapPractice);
  }, [filteredPractices, featuredArticle]);

  const hasArticles = useMemo(
    () => Boolean(featuredArticle || (regularArticles && regularArticles.length > 0)),
    [featuredArticle, regularArticles]
  );

  return {
    setSearchQuery,
    setSelectedCategory,
    loading,
    error,
    handleRetry,
    featuredArticle,
    regularArticles,
    hasArticles,
  };
}