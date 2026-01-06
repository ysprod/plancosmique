import { useSpiritualiteBlogController } from '@/components/spiritualite/useSpiritualiteBlogController';
import { formatDate } from '@/lib/functions';

export function useSpiritualiteBlogPage() {
  const {
    setSearchQuery,
    setSelectedCategory,
    loading,
    error,
    handleRetry,
    featuredArticle,
    regularArticles,
    hasArticles,
  } = useSpiritualiteBlogController();

  return {
    setSearchQuery,
    setSelectedCategory,
    loading,
    error,
    handleRetry,
    featuredArticle,
    regularArticles,
    hasArticles,
    formatDate,
  };
}
