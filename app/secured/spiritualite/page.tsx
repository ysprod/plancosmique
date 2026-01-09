'use client';
import AnimatedBackground from '@/components/spiritualite/AnimatedBackground';
import SpiritualiteArticlesSection from '@/components/spiritualite/SpiritualiteArticlesSection';
import SpiritualiteNoResultsSection from '@/components/spiritualite/SpiritualiteNoResultsSection';
import { SpiritualiteErrorState, SpiritualiteLoadingState } from '@/components/spiritualite/SpiritualitePageStates';
import SpiritualiteHeader from '@/components/spiritualite/SpiritualiteHeader';
import { useSpiritualiteBlogPage } from '@/hooks/commons/useSpiritualiteBlogPage';
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
    setSearchQuery, setSelectedCategory, loading, error, handleRetry,
    featuredArticle, regularArticles, hasArticles,
  } = useSpiritualiteBlogPage();

  if (loading) { return <SpiritualiteLoadingState />; }

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
          <SpiritualiteHeader />
          <AnimatePresence mode="wait">
            {hasArticles ? (
              <motion.div
                key="articles-content"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <SpiritualiteArticlesSection
                  featuredArticle={featuredArticle}
                  regularArticles={regularArticles}
                  setSearchQuery={setSearchQuery}
                  setSelectedCategory={setSelectedCategory}
                />
              </motion.div>
            ) : (
              <motion.div
                key="no-results"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
              >
                <SpiritualiteNoResultsSection onReset={() => { setSearchQuery(''); setSelectedCategory('all'); }} />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </main>
    </>
  );
}