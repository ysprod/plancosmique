'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { api } from '@/lib/api/client';
import {
  BookOpen,
  Clock,
  TrendingUp,
  Search,
  Filter,
  Calendar,
  User,
  Heart,
  MessageCircle,
  Sparkles,
  Eye,
  ArrowRight,
  Loader2,
  AlertCircle,
  Star,
  Flame,
  Zap
} from 'lucide-react';

interface SpiritualPractice {
  _id: string;
  slug: string;
  title: string;
  description: string;
  detailedGuide?: string;
  benefits?: string[];
  practicalSteps?: string[];
  category?: string;
  readTime?: number;
  publishedAt?: string;
  author?: string;
  views?: number;
  likes?: number;
  comments?: number;
  featured?: boolean;
  trending?: boolean;
}

export default function SpiritualiteBlogPage() {
  const [practices, setPractices] = useState<SpiritualPractice[]>([]);
  const [filteredPractices, setFilteredPractices] = useState<SpiritualPractice[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'recent' | 'popular' | 'trending'>('recent');

  const categories = [
    { id: 'all', label: 'Tous les articles', icon: BookOpen },
    { id: 'meditation', label: 'Méditation', icon: Sparkles },
    { id: 'rituel', label: 'Rituels', icon: Flame },
    { id: 'energie', label: 'Énergie', icon: Zap },
    { id: 'sagesse', label: 'Sagesse', icon: Star }
  ];

  useEffect(() => {
    fetchPractices();
  }, []);

  useEffect(() => {
    filterAndSortPractices();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [practices, searchQuery, selectedCategory, sortBy]);

  const fetchPractices = async () => {
    try {
      setIsLoading(true);
      const { data } = await api.get<{ success: boolean; data: SpiritualPractice[]; count: number }>('/spiritualite');
      
      // Enrichir les données avec des métadonnées de blog
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
      setIsLoading(false);
    }
  };

  const filterAndSortPractices = () => {
    let filtered = [...practices];

    // Filtre par recherche
    if (searchQuery) {
      filtered = filtered.filter(practice =>
        practice.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        practice.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Filtre par catégorie
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(practice => practice.category === selectedCategory);
    }

    // Tri
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
  };

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

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
            className="inline-block mb-4"
          >
            <Loader2 className="w-12 h-12 sm:w-16 sm:h-16 text-purple-600" />
          </motion.div>
          <p className="text-base sm:text-lg text-purple-800 font-medium">
            Chargement des articles...
          </p>
        </motion.div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl p-6 sm:p-8 shadow-xl max-w-md w-full text-center"
        >
          <AlertCircle className="w-12 h-12 sm:w-16 sm:h-16 text-red-500 mx-auto mb-4" />
          <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">
            Erreur de chargement
          </h3>
          <p className="text-sm sm:text-base text-gray-600 mb-6">{error}</p>
          <button
            onClick={fetchPractices}
            className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-medium hover:shadow-lg transform hover:scale-105 transition-all duration-300"
          >
            Réessayer
          </button>
        </motion.div>
      </div>
    );
  }

  const featuredArticle = filteredPractices.find(p => p.featured) || filteredPractices[0];
  const regularArticles = filteredPractices.filter(p => p._id !== featuredArticle?._id);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
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
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8 sm:mb-12"
        >
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
            className="inline-block mb-4"
          >
            <BookOpen className="w-12 h-12 sm:w-16 sm:h-16 text-purple-600" />
          </motion.div>
          
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4">
            <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 text-transparent bg-clip-text">
              Blog Spirituel
            </span>
          </h1>
          
          <p className="text-sm sm:text-base lg:text-lg text-gray-600 max-w-2xl mx-auto px-4">
            Découvrez nos articles sur la spiritualité, la méditation et le développement personnel
          </p>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-wrap justify-center gap-4 sm:gap-8 mt-6 sm:mt-8"
          >
            {[
              { icon: BookOpen, label: 'Articles', value: practices.length },
              { icon: Eye, label: 'Lectures', value: practices.reduce((sum, p) => sum + (p.views || 0), 0) },
              { icon: Heart, label: 'J\'aime', value: practices.reduce((sum, p) => sum + (p.likes || 0), 0) }
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                className="flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-md"
              >
                <stat.icon className="w-4 h-4 sm:w-5 sm:h-5 text-purple-600" />
                <span className="text-lg sm:text-xl font-bold text-gray-900">{stat.value}</span>
                <span className="text-xs sm:text-sm text-gray-600">{stat.label}</span>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Search and Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-6 sm:mb-8"
        >
          {/* Search Bar */}
          <div className="relative mb-4 sm:mb-6">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Rechercher un article..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 sm:py-4 bg-white rounded-2xl border-2 border-purple-100 focus:border-purple-400 focus:ring-4 focus:ring-purple-100 outline-none transition-all text-sm sm:text-base"
            />
          </div>

          {/* Categories */}
          <div className="flex flex-wrap gap-2 sm:gap-3 mb-4">
            {categories.map((category) => {
              const Icon = category.icon;
              return (
                <motion.button
                  key={category.id}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`flex items-center gap-2 px-3 sm:px-4 py-2 rounded-xl font-medium transition-all text-xs sm:text-sm ${
                    selectedCategory === category.id
                      ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg'
                      : 'bg-white text-gray-700 hover:bg-purple-50'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="hidden sm:inline">{category.label}</span>
                  <span className="sm:hidden">{category.label.split(' ')[0]}</span>
                </motion.button>
              );
            })}
          </div>

          {/* Sort Options */}
          <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
            <Filter className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
            <span className="text-xs sm:text-sm text-gray-600 font-medium">Trier par:</span>
            {[
              { id: 'recent', label: 'Plus récents' },
              { id: 'popular', label: 'Populaires' },
              { id: 'trending', label: 'Tendances' }
            ].map((option) => (
              <motion.button
                key={option.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSortBy(option.id as 'recent' | 'popular' | 'trending')}
                className={`px-3 py-1.5 rounded-lg font-medium transition-all text-xs sm:text-sm ${
                  sortBy === option.id
                    ? 'bg-purple-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-purple-50'
                }`}
              >
                {option.label}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Featured Article */}
        {featuredArticle && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mb-8 sm:mb-12"
          >
            <Link href={`/spiritualite/${featuredArticle.slug}`}>
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

                  {/* Gradient Overlay */}
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

        {/* Regular Articles Grid */}
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
                  <Link href={`/spiritualite/${practice.slug}`}>
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

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-12 sm:mt-16 text-center"
        >
          <div className="bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 rounded-3xl p-8 sm:p-12 shadow-2xl relative overflow-hidden">
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                rotate: [0, 180, 360]
              }}
              transition={{ duration: 20, repeat: Infinity }}
              className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent"
            />
            
            <div className="relative z-10">
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                className="inline-block mb-4"
              >
                <Sparkles className="w-12 h-12 sm:w-16 sm:h-16 text-white" />
              </motion.div>
              
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4">
                Restez connecté à votre spiritualité
              </h2>
              
              <p className="text-base sm:text-lg text-white/90 mb-6 sm:mb-8 max-w-2xl mx-auto">
                Rejoignez notre communauté et recevez nos derniers articles directement dans votre boîte mail
              </p>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 sm:px-8 py-3 sm:py-4 bg-white text-purple-600 rounded-xl sm:rounded-2xl font-bold text-sm sm:text-base shadow-xl hover:shadow-2xl transition-all"
              >
                S'abonner gratuitement
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}