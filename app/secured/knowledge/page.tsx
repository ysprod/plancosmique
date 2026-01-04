'use client';
import KnowledgeCategories from '@/components/knowledge/KnowledgeCategories';
import KnowledgeEmpty from '@/components/knowledge/KnowledgeEmpty';
import KnowledgeGrid from '@/components/knowledge/KnowledgeGrid';
import KnowledgeHeader from '@/components/knowledge/KnowledgeHeader';
import KnowledgeLoadingList from '@/components/knowledge/KnowledgeLoadingList';
import KnowledgeSearchBar from '@/components/knowledge/KnowledgeSearchBar';
import KnowledgeTabs from '@/components/knowledge/KnowledgeTabs';
import { useKnowledgePage } from '@/hooks/knowledge/useKnowledgePage';

export default function KnowledgePage() {
  const {
    isLoading, displayedKnowledges,
    selectedCategory,
    searchQuery, activeTab,
    setSearchQuery,
    setActiveTab,
    handleSearch,
    handleCategoryChange,
    handleLike,   
  } = useKnowledgePage();

  return (
    <div className=" bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="bg-white/5 backdrop-blur-xl border-b border-white/10">
        <div className="container mx-auto px-4 py-8">
          <KnowledgeHeader onShare={() => { }} />

          <KnowledgeSearchBar
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            handleSearch={handleSearch}
          />

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
