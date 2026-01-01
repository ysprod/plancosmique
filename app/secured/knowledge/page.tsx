'use client';
import KnowledgeCategories from '@/components/knowledge/KnowledgeCategories';
import KnowledgeEmpty from '@/components/knowledge/KnowledgeEmpty';
import KnowledgeGrid from '@/components/knowledge/KnowledgeGrid';
import KnowledgeLoadingList from '@/components/knowledge/KnowledgeLoadingList';
import KnowledgeTabs from '@/components/knowledge/KnowledgeTabs';
import { useKnowledgePage } from '@/hooks/knowledge/useKnowledgePage';
import { motion } from 'framer-motion';
import { BookOpen, Search } from 'lucide-react';

export default function KnowledgePage() {
  const {
    isLoading,
    selectedCategory,
    searchQuery,
    setSearchQuery,
    activeTab,
    setActiveTab,
    handleSearch,
    handleCategoryChange,
    handleLike,
    displayedKnowledges,
  } = useKnowledgePage();

  return (
    <div className=" bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
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
          <KnowledgeTabs activeTab={activeTab} setActiveTab={setActiveTab} />
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        <KnowledgeCategories selectedCategory={selectedCategory} onChange={handleCategoryChange} />
      </div>
      <div className="container mx-auto px-4 py-8">
        {isLoading ? (
          <KnowledgeLoadingList />
        ) : displayedKnowledges.length === 0 ? (
          <KnowledgeEmpty searchQuery={searchQuery} />
        ) : (
          <KnowledgeGrid knowledges={displayedKnowledges} onLike={handleLike} />
        )}
      </div>
    </div>
  );
}
