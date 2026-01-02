import { useCallback, useMemo } from 'react';
import { useSpiritualiteBlogPage } from '@/hooks/spiritualite/useSpiritualiteBlogPage';

export function useSpiritualiteBlogController() {
  const {
    setSearchQuery,
    setSelectedCategory,
    loading,
    error,
    setError,
    filteredPractices,
  } = useSpiritualiteBlogPage();

  const handleRetry = useCallback(() => {
    setError('');
  }, [setError]);

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
