'use client';

import React, { useCallback, useMemo } from 'react';
import { AnimatePresence, motion, Variants } from 'framer-motion';
import SpiritualiteError from '@/components/spiritualite/SpiritualiteError';
import SpiritualiteLoading from '@/components/spiritualite/SpiritualiteLoading';
import { useSpiritualiteBlogPage } from '@/hooks/spiritualite/useSpiritualiteBlogPage';
import FeaturedArticle from '@/components/spiritualite/FeaturedArticle';
import ArticlesGrid from '@/components/spiritualite/ArticlesGrid';
import NoResults from '@/components/spiritualite/NoResults';

// ============================================================================
// TYPES
// ============================================================================

interface SpiritualitePractice {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  category: string;
  createdAt: string;
  featured?: boolean;
  readTime?: string;
  author?: {
    name: string;
    avatar?: string;
  };
}

// ============================================================================
// ANIMATION VARIANTS (isolées pour performance)
// ============================================================================

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.2 },
  },
};

const blobVariants: Variants = {
  animate: {
    scale: [1, 1.15, 1],
    rotate: [0, 90, 0],
    transition: {
      duration: 25,
      repeat: Infinity,
      ease: 'linear',
    },
  },
};

const contentVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: 'easeOut',
    },
  },
};

// ============================================================================
// COMPOSANTS MÉMORISÉS
// ============================================================================

const AnimatedBackground = React.memo(() => (
  <div className="fixed inset-0 -z-10 overflow-hidden bg-gradient-to-br from-slate-50 via-purple-50/30 to-pink-50/20" aria-hidden="true">
    {/* Blob 1 - Violet */}
    <motion.div
      className="absolute -top-[40%] -left-[20%] h-[60rem] w-[60rem] rounded-full bg-gradient-to-br from-violet-400/20 to-purple-500/10 blur-3xl"
      variants={blobVariants}
      animate="animate"
    />
    {/* Blob 2 - Rose */}
    <motion.div
      className="absolute -bottom-[40%] -right-[20%] h-[60rem] w-[60rem] rounded-full bg-gradient-to-tl from-pink-400/20 to-rose-500/10 blur-3xl"
      variants={blobVariants}
      animate="animate"
      style={{ animationDelay: '-12s' }}
    />
  </div>
));
AnimatedBackground.displayName = 'AnimatedBackground';

const ContentWrapper = React.memo<{ children: React.ReactNode }>(({ children }) => (
  <motion.div
    variants={contentVariants}
    initial="hidden"
    animate="visible"
    className="relative z-10"
  >
    {children}
  </motion.div>
));
ContentWrapper.displayName = 'ContentWrapper';

// ============================================================================
// HELPER - Format date en français
// ============================================================================

const formatDate = (dateString?: string): string => {
  if (!dateString) return '';
  try {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    }).format(date);
  } catch {
    return dateString || '';
  }
};

// ============================================================================
// COMPOSANT PRINCIPAL
// ============================================================================

export default function SpiritualiteBlogPage() {
  // Hook personnalisé
  const {
    setSearchQuery,
    setSelectedCategory,
    loading,
    error,
    setError,
    filteredPractices,
  } = useSpiritualiteBlogPage();

  // ============================================================================
  // CALLBACKS MÉMORISÉS
  // ============================================================================

  const handleRetry = useCallback(() => {
    setError('');
  }, [setError]);

  const handleSearchChange = useCallback(
    (query: string) => {
      setSearchQuery(query);
    },
    [setSearchQuery]
  );

  const handleCategoryChange = useCallback(
    (category: string) => {
      setSelectedCategory(category);
    },
    [setSelectedCategory]
  );

  // ============================================================================
  // VALEURS MÉMORISÉES
  // ============================================================================

  const featuredArticle = useMemo<SpiritualitePractice | null>(() => {
    if (!filteredPractices?.length) return null;
    // Map SpiritualPractice (API) to SpiritualitePractice (local)
    const mapPractice = (p: any): SpiritualitePractice => ({
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

  const regularArticles = useMemo<SpiritualitePractice[]>(() => {
    if (!filteredPractices?.length) return [];
    const mapPractice = (p: any): SpiritualitePractice => ({
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
    () => Boolean(featuredArticle || regularArticles.length > 0),
    [featuredArticle, regularArticles.length]
  );

  // ============================================================================
  // RENDU CONDITIONNEL
  // ============================================================================

  // if (loading) {
  //   return <SpiritualiteLoading />;
  // }

  if (error) {
    return (
      <SpiritualiteError
        error={error}
        onRetry={handleRetry}
      />
    );
  }

  // ============================================================================
  // RENDU PRINCIPAL
  // ============================================================================

  return (
    <>
      <AnimatedBackground />

      <main
        className="relative min-h-screen px-4 py-8 sm:px-6 lg:px-8"
        role="main"
        aria-label="Blog spiritualité"
      >
        <motion.div
          className="mx-auto max-w-7xl"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* En-tête */}
          <ContentWrapper>
            <header className="mb-8 text-center sm:mb-12">
              <h1 className="mb-3 bg-gradient-to-r from-violet-600 via-purple-600 to-pink-600 bg-clip-text text-3xl font-bold text-transparent sm:text-4xl lg:text-5xl">
                Blog Spiritualité
              </h1>
              <p className="mx-auto max-w-2xl text-sm text-slate-600 sm:text-base">
                Explorez nos articles, pratiques et enseignements spirituels
              </p>
            </header>
          </ContentWrapper>

          {/* Contenu dynamique */}
          <AnimatePresence mode="wait">
            {hasArticles ? (
              <motion.div
                key="articles-content"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="space-y-8 sm:space-y-12"
              >
                {/* Article en vedette */}
                {featuredArticle && (
                  <ContentWrapper>
                    <section aria-label="Article en vedette">
                      <FeaturedArticle
                        article={{
                          ...featuredArticle,
                          formattedDate: formatDate(featuredArticle.createdAt),
                        }}
                        formatDate={formatDate}
                      />
                    </section>
                  </ContentWrapper>
                )}

                {/* Grille d'articles */}
                {regularArticles.length > 0 && (
                  <ContentWrapper>
                    <section aria-label="Tous les articles">
                      <h2 className="sr-only">Articles récents</h2>
                      <ArticlesGrid
                        articles={regularArticles.map((article) => ({
                          ...article,
                          formattedDate: formatDate(article.createdAt),
                        }))}
                        formatDate={formatDate}
                        setSearchQuery={setSearchQuery}
                        setSelectedCategory={setSelectedCategory}
                      />
                    </section>
                  </ContentWrapper>
                )}
              </motion.div>
            ) : (
              <motion.div
                key="no-results"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
              >
                <NoResults onReset={() => { setSearchQuery(''); setSelectedCategory('all'); }} />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </main>
    </>
  );
}
