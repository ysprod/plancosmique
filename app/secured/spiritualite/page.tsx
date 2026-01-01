'use client';
import { AnimatePresence, motion } from 'framer-motion';
import Link from 'next/link';
//
import {
  AlertCircle,
  ArrowRight,
  BookOpen,
  Calendar,
  Search,
  Filter,
  Star,
  TrendingUp,
  Clock,
  User,
  Eye,
  Heart,
  MessageCircle,
  Flame
} from 'lucide-react';
import { useSpiritualiteBlogPage } from '@/hooks/spiritualite/useSpiritualiteBlogPage';
import SpiritualiteLoading from '@/components/spiritualite/SpiritualiteLoading';
import SpiritualiteError from '@/components/spiritualite/SpiritualiteError';
export default function SpiritualiteBlogPage() {
  const categories = [
    { id: 'all', label: 'Tous les articles', icon: null },
    { id: 'meditation', label: 'Méditation', icon: null },
    { id: 'rituel', label: 'Rituels', icon: null },
    { id: 'energie', label: 'Énergie', icon: null },
    { id: 'sagesse', label: 'Sagesse', icon: null }
  ];
  const {
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
    <div className=" bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{ duration: 20, repeat: Infinity }}
          className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-br from-purple-300/30 to-pink-300/30 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [90, 0, 90],
            opacity: [0.5, 0.3, 0.5]
          }}
          transition={{ duration: 20, repeat: Infinity }}
          className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-to-tl from-blue-300/30 to-purple-300/30 rounded-full blur-3xl"
        />

        {/* Featured Article */}
        {featuredArticle && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mb-8 sm:mb-12"
          >
            <Link href={`/spiritualite/${featuredArticle._id}`}>
              <motion.div
                whileHover={{ y: -5 }}
                className="bg-white rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 cursor-pointer"
              >
                <div className="relative">
                  {/* Badge Featured */}
                  <div className="absolute top-4 left-4 z-10 flex gap-2">
                    <motion.div
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-3 py-1.5 rounded-full text-xs sm:text-sm font-bold shadow-lg flex items-center gap-1"
                    >
                      <Star className="w-3 h-3 sm:w-4 sm:h-4" />
                      À LA UNE
                    </motion.div>
                    {featuredArticle.trending && (
                      <motion.div
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                        className="bg-gradient-to-r from-pink-500 to-red-500 text-white px-3 py-1.5 rounded-full text-xs sm:text-sm font-bold shadow-lg flex items-center gap-1"
                      >
                        <TrendingUp className="w-3 h-3 sm:w-4 sm:h-4" />
                        TENDANCE
                      </motion.div>
                    )}
                  </div>

                  <div className="h-48 sm:h-64 lg:h-80 bg-gradient-to-br from-purple-500 via-pink-500 to-blue-500 relative overflow-hidden">
                    <motion.div
                      animate={{
                        scale: [1, 1.2, 1],
                        rotate: [0, 180, 360]
                      }}
                      transition={{ duration: 20, repeat: Infinity }}
                      className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent"
                    />
                  </div>
                </div>

                <div className="p-6 sm:p-8">
                  {/* Meta Info */}
                  <div className="flex flex-wrap items-center gap-3 sm:gap-4 mb-4 text-xs sm:text-sm text-gray-600">
                    <div className="flex items-center gap-1.5">
                      <Calendar className="w-4 h-4" />
                      <span>{formatDate(featuredArticle.publishedAt)}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-4 h-4" />
                      <span>{featuredArticle.readTime} min de lecture</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <User className="w-4 h-4" />
                      <span>{featuredArticle.author}</span>
                    </div>
                  </div>

                  {/* Title */}
                  <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 sm:mb-4 hover:text-purple-600 transition-colors">
                    {featuredArticle.title}
                  </h2>

                  {/* Description */}
                  <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6 line-clamp-2 sm:line-clamp-3">
                    {featuredArticle.description}
                  </p>

                  {/* Stats and CTA */}
                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <div className="flex items-center gap-4 sm:gap-6">
                      <div className="flex items-center gap-1.5 text-gray-600">
                        <Eye className="w-4 h-4 sm:w-5 sm:h-5" />
                        <span className="text-xs sm:text-sm font-medium">{featuredArticle.views}</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-gray-600">
                        <Heart className="w-4 h-4 sm:w-5 sm:h-5" />
                        <span className="text-xs sm:text-sm font-medium">{featuredArticle.likes}</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-gray-600">
                        <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5" />
                        <span className="text-xs sm:text-sm font-medium">{featuredArticle.comments}</span>
                      </div>
                    </div>

                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex items-center gap-2 text-purple-600 font-semibold text-sm sm:text-base"
                    >
                      Lire l'article
                      <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            </Link>
          </motion.div>
        )}
   
        <AnimatePresence mode="wait">
          {regularArticles.length > 0 ? (
            <motion.div
              key="articles-grid"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8"
            >
              {regularArticles.map((practice, index) => (
                <motion.div
                  key={practice._id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index }}
                  whileHover={{ y: -8 }}
                  className="group"
                >
                  <Link href={`/spiritualite/${practice._id}`}>
                    <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 h-full flex flex-col cursor-pointer">
                      {/* Image Header */}
                      <div className="relative h-40 sm:h-48 bg-gradient-to-br from-purple-400 via-pink-400 to-blue-400 overflow-hidden">
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent"
                          animate={{
                            scale: [1, 1.1, 1],
                            rotate: [0, 90, 0]
                          }}
                          transition={{ duration: 15, repeat: Infinity }}
                        />
                        
                        {/* Badges */}
                        <div className="absolute top-3 right-3 flex flex-col gap-2">
                          {practice.trending && (
                            <motion.div
                              animate={{ scale: [1, 1.1, 1] }}
                              transition={{ duration: 2, repeat: Infinity }}
                              className="bg-gradient-to-r from-pink-500 to-red-500 text-white px-2 py-1 rounded-full text-xs font-bold shadow-md flex items-center gap-1"
                            >
                              <Flame className="w-3 h-3" />
                              HOT
                            </motion.div>
                          )}
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-4 sm:p-6 flex-1 flex flex-col">
                        {/* Meta Info */}
                        <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-3 text-xs text-gray-500">
                          <div className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            <span>{formatDate(practice.publishedAt)}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            <span>{practice.readTime} min</span>
                          </div>
                        </div>

                        {/* Title */}
                        <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 group-hover:text-purple-600 transition-colors line-clamp-2">
                          {practice.title}
                        </h3>

                        {/* Description */}
                        <p className="text-xs sm:text-sm text-gray-600 mb-4 line-clamp-3 flex-1">
                          {practice.description}
                        </p>

                        {/* Footer */}
                        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                          <div className="flex items-center gap-3 text-gray-600">
                            <div className="flex items-center gap-1">
                              <Eye className="w-4 h-4" />
                              <span className="text-xs font-medium">{practice.views}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Heart className="w-4 h-4" />
                              <span className="text-xs font-medium">{practice.likes}</span>
                            </div>
                          </div>

                          <motion.div
                            whileHover={{ x: 5 }}
                            className="text-purple-600 group-hover:text-purple-700"
                          >
                            <ArrowRight className="w-5 h-5" />
                          </motion.div>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="no-results"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="text-center py-12 sm:py-16"
            >
              <AlertCircle className="w-12 h-12 sm:w-16 sm:h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">
                Aucun article trouvé
              </h3>
              <p className="text-sm sm:text-base text-gray-600 mb-6">
                Essayez de modifier vos critères de recherche
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('all');
                }}
                className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-medium shadow-lg hover:shadow-xl transition-all"
              >
                Réinitialiser les filtres
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence> 
      </div>
    </div>
  );
}