'use client';
import AnimatedBackground from '@/components/spiritualite/AnimatedBackground';
import ArticlesGrid from '@/components/spiritualite/ArticlesGrid';
import ContentWrapper from '@/components/spiritualite/ContentWrapper';
import FeaturedArticle from '@/components/spiritualite/FeaturedArticle';
import NoResults from '@/components/spiritualite/NoResults';
import { SpiritualiteErrorState, SpiritualiteLoadingState } from '@/components/spiritualite/SpiritualitePageStates';
import { useSpiritualiteBlogController } from '@/components/spiritualite/useSpiritualiteBlogController';
import { formatDate } from '@/lib/functions';
import { AnimatePresence, motion, Variants } from 'framer-motion';

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

export default function SpiritualiteBlogPage() {
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

  if (loading) {
    return <SpiritualiteLoadingState />;
  }

  if (error) {
    return <SpiritualiteErrorState error={error} onRetry={handleRetry} />;
  }

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
