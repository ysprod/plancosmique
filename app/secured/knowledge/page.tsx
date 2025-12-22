'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Heart, Eye, Calendar, User, Tag, Search, Filter, TrendingUp, Clock } from 'lucide-react';
import { knowledgeService } from '@/lib/api/services';
import type { Knowledge, KnowledgeCategory } from '@/lib/types/knowledge.types';
import Link from 'next/link';
import Image from 'next/image';

const categoryLabels: Record<KnowledgeCategory, string> = {
  ASTROLOGIE: 'Astrologie',
  NUMEROLOGIE: 'Numérologie',
  TAROT: 'Tarot',
  SPIRITUALITE: 'Spiritualité',
  MEDITATION: 'Méditation',
  DEVELOPPEMENT_PERSONNEL: 'Développement Personnel',
  RITUELS: 'Rituels',
  AUTRES: 'Autres',
};

const categoryColors: Record<KnowledgeCategory, string> = {
  ASTROLOGIE: 'from-purple-500/20 to-pink-500/20 border-purple-500/30',
  NUMEROLOGIE: 'from-blue-500/20 to-cyan-500/20 border-blue-500/30',
  TAROT: 'from-violet-500/20 to-fuchsia-500/20 border-violet-500/30',
  SPIRITUALITE: 'from-amber-500/20 to-orange-500/20 border-amber-500/30',
  MEDITATION: 'from-green-500/20 to-emerald-500/20 border-green-500/30',
  DEVELOPPEMENT_PERSONNEL: 'from-teal-500/20 to-cyan-500/20 border-teal-500/30',
  RITUELS: 'from-rose-500/20 to-pink-500/20 border-rose-500/30',
  AUTRES: 'from-gray-500/20 to-slate-500/20 border-gray-500/30',
};

export default function KnowledgePage() {
  const [knowledges, setKnowledges] = useState<Knowledge[]>([]);
  const [popular, setPopular] = useState<Knowledge[]>([]);
  const [recent, setRecent] = useState<Knowledge[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<KnowledgeCategory | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'all' | 'popular' | 'recent'>('all');

  useEffect(() => {
    loadKnowledges();
    loadPopular();
    loadRecent();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadKnowledges = async () => {
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
  };

  const loadPopular = async () => {
    try {
      const data = await knowledgeService.getPopular(6);
      setPopular(data);
    } catch (error) {
      console.error('Erreur lors du chargement des populaires:', error);
    }
  };

  const loadRecent = async () => {
    try {
      const data = await knowledgeService.getRecent(6);
      setRecent(data);
    } catch (error) {
      console.error('Erreur lors du chargement des récentes:', error);
    }
  };

  const handleSearch = () => {
    loadKnowledges();
  };

  const handleCategoryChange = (category: KnowledgeCategory | 'all') => {
    setSelectedCategory(category);
    setTimeout(() => loadKnowledges(), 100);
  };

  const handleLike = async (e: React.MouseEvent, knowledgeId: string) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      await knowledgeService.toggleLike(knowledgeId);
      // Recharger les connaissances
      loadKnowledges();
      loadPopular();
    } catch (error) {
      console.error('Erreur lors du like:', error);
    }
  };

  const displayedKnowledges = activeTab === 'popular' ? popular : activeTab === 'recent' ? recent : knowledges;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <div className="bg-white/5 backdrop-blur-xl border-b border-white/10">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-white flex items-center gap-3">
                <BookOpen className="w-8 h-8" />
                Connaissances Spirituelles
              </h1>
              <p className="text-gray-400 mt-2">
                Découvrez des articles et contenus inspirants partagés par notre communauté
              </p>
            </div>
            
          </div>

          {/* Barre de recherche */}
          <div className="flex gap-4 items-center">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                placeholder="Rechercher une connaissance..."
                className="w-full pl-12 pr-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleSearch}
              className="px-6 py-3 rounded-xl bg-purple-500 hover:bg-purple-600 text-white font-medium transition-colors"
            >
              Rechercher
            </motion.button>
          </div>

          {/* Onglets */}
          <div className="flex gap-2 mt-6">
            {[
              { value: 'all', label: 'Toutes', icon: BookOpen },
              { value: 'popular', label: 'Populaires', icon: TrendingUp },
              { value: 'recent', label: 'Récentes', icon: Clock },
            ].map((tab) => (
              <button
                key={tab.value}
                onClick={() => setActiveTab(tab.value as 'all' | 'popular' | 'recent')}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all flex items-center gap-2 ${
                  activeTab === tab.value
                    ? 'bg-purple-500 text-white'
                    : 'bg-white/10 text-gray-300 hover:bg-white/20'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Filtres par catégorie */}
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center gap-2 overflow-x-auto pb-2">
          <Filter className="w-5 h-5 text-gray-400 flex-shrink-0" />
          <button
            onClick={() => handleCategoryChange('all')}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-all whitespace-nowrap ${
              selectedCategory === 'all'
                ? 'bg-purple-500 text-white'
                : 'bg-white/10 text-gray-300 hover:bg-white/20'
            }`}
          >
            Toutes les catégories
          </button>
          {Object.entries(categoryLabels).map(([key, label]) => (
            <button
              key={key}
              onClick={() => handleCategoryChange(key as KnowledgeCategory)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all whitespace-nowrap ${
                selectedCategory === key
                  ? 'bg-purple-500 text-white'
                  : 'bg-white/10 text-gray-300 hover:bg-white/20'
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Liste des connaissances */}
      <div className="container mx-auto px-4 py-8">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500 mb-4"></div>
            <p className="text-gray-400">Chargement des connaissances...</p>
          </div>
        ) : displayedKnowledges.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20">
            <BookOpen className="w-20 h-20 text-gray-600 mb-4" />
            <h2 className="text-xl font-semibold text-white mb-2">Aucune connaissance trouvée</h2>
            <p className="text-gray-400 text-center max-w-md">
              {searchQuery
                ? 'Essayez de modifier votre recherche ou de changer de catégorie.'
                : 'Aucune connaissance n\'a encore été partagée dans cette catégorie.'}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayedKnowledges.map((knowledge, index) => (
              <motion.div
                key={knowledge._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Link href={`/secured/knowledge/${knowledge._id}`}>
                  <div className={`group relative h-full p-6 rounded-2xl border backdrop-blur-xl cursor-pointer transition-all duration-200 hover:scale-[1.02] bg-gradient-to-br ${
                    categoryColors[knowledge.category]
                  }`}>
                    {/* Image si disponible */}
                    {knowledge.imageUrl && (
                      <div className="relative w-full h-48 mb-4 rounded-xl overflow-hidden">
                        <Image
                          src={knowledge.imageUrl}
                          alt={knowledge.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                      </div>
                    )}

                    {/* Badge catégorie */}
                    <div className="mb-3">
                      <span className="px-3 py-1 rounded-full text-xs font-medium bg-white/20 text-white">
                        {categoryLabels[knowledge.category]}
                      </span>
                    </div>

                    {/* Titre */}
                    <h3 className="text-xl font-bold text-white mb-2 line-clamp-2 group-hover:text-purple-300 transition-colors">
                      {knowledge.title}
                    </h3>

                    {/* Extrait */}
                    <p className="text-gray-300 text-sm mb-4 line-clamp-3">
                      {knowledge.content.substring(0, 150)}...
                    </p>

                    {/* Tags */}
                    {knowledge.tags && knowledge.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-4">
                        {knowledge.tags.slice(0, 3).map((tag, i) => (
                          <span key={i} className="px-2 py-1 rounded-lg text-xs bg-white/10 text-gray-300 flex items-center gap-1">
                            <Tag className="w-3 h-3" />
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Footer */}
                    <div className="flex items-center justify-between pt-4 border-t border-white/10">
                      <div className="flex items-center gap-4 text-xs text-gray-400">
                        <span className="flex items-center gap-1">
                          <Eye className="w-4 h-4" />
                          {knowledge.viewsCount}
                        </span>
                        <button
                          onClick={(e) => handleLike(e, knowledge._id)}
                          className="flex items-center gap-1 hover:text-red-400 transition-colors"
                        >
                          <Heart className="w-4 h-4" />
                          {knowledge.likesCount}
                        </button>
                      </div>
                      
                      <div className="flex items-center gap-1 text-xs text-gray-400">
                        <Calendar className="w-4 h-4" />
                        {new Date(knowledge.createdAt).toLocaleDateString('fr-FR', {
                          day: 'numeric',
                          month: 'short',
                        })}
                      </div>
                    </div>

                    {/* Auteur */}
                    {typeof knowledge.authorId !== 'string' && (
                      <div className="flex items-center gap-2 mt-4 pt-4 border-t border-white/10">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                          <User className="w-4 h-4 text-white" />
                        </div>
                        <div className="text-xs">
                          <p className="text-white font-medium">
                            {knowledge.authorId.firstName} {knowledge.authorId.lastName}
                          </p>
                          <p className="text-gray-400">{knowledge.authorId.role}</p>
                        </div>
                      </div>
                    )}
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
