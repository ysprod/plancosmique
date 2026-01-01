'use client';
import SpiritualiteError from '@/components/spiritualite/SpiritualiteError';
import SpiritualiteLoading from '@/components/spiritualite/SpiritualiteLoading';
import { useSpiritualiteBlogPage } from '@/hooks/spiritualite/useSpiritualiteBlogPage';
import { AnimatePresence, motion } from 'framer-motion';
import FeaturedArticle from '@/components/spiritualite/FeaturedArticle';
import ArticlesGrid from '@/components/spiritualite/ArticlesGrid';
import NoResults from '@/components/spiritualite/NoResults';

export default function SpiritualiteBlogPage() {
  const categories = [
    { id: 'all', label: 'Tous les articles', icon: null },
    { id: 'meditation', label: 'Méditation', icon: null },
    { id: 'rituel', label: 'Rituels', icon: null },
    { id: 'energie', label: 'Énergie', icon: null },
    { id: 'sagesse', label: 'Sagesse', icon: null }
  ];
  const {
    setSearchQuery,
    setSelectedCategory,
    loading,
    error,
    setError,
    filteredPractices
  } = useSpiritualiteBlogPage(categories);

  const formatDate = (dateString?: string) => {
    if (!dateString) return 'Récemment';
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    if (diffDays === 0) return 'Aujourd\'hui';
    if (diffDays === 1) return 'Hier';
    if (diffDays < 7) return `Il y a ${diffDays} jours`;
    if (diffDays < 30) return `Il y a ${Math.floor(diffDays / 7)} semaines`;
    return `Il y a ${Math.floor(diffDays / 30)} mois`;
  };

  if (loading) {
    return <SpiritualiteLoading />;
  }
  if (error) {
    return <SpiritualiteError error={error} onRetry={() => setError('')} />;
  }
  const featuredArticle = filteredPractices.find((p: any) => p.featured) || filteredPractices[0];
  const regularArticles = filteredPractices.filter((p: any) => p._id !== featuredArticle?._id);
  return (
    <div className="bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 0], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 20, repeat: Infinity }}
          className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-br from-purple-300/30 to-pink-300/30 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ scale: [1.2, 1, 1.2], rotate: [90, 0, 90], opacity: [0.5, 0.3, 0.5] }}
          transition={{ duration: 20, repeat: Infinity }}
          className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-to-tl from-blue-300/30 to-purple-300/30 rounded-full blur-3xl"
        />
      </div>
      <div className="relative z-10 px-2 sm:px-4 md:px-8 lg:px-16 xl:px-32 py-8 sm:py-12">
        <FeaturedArticle article={featuredArticle} formatDate={formatDate} />
        <AnimatePresence mode="wait">
          {regularArticles.length > 0 ? (
            <ArticlesGrid
              articles={regularArticles}
              formatDate={formatDate}
              setSearchQuery={setSearchQuery}
              setSelectedCategory={setSelectedCategory}
            />
          ) : (
            <NoResults onReset={() => { setSearchQuery(''); setSelectedCategory('all'); }} />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}