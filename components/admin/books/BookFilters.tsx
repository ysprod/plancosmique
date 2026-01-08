import BookSearchInput from './BookSearchInput';
import BookFilterPanel from './BookFilterPanel';
import BookFiltersPanelContent from './BookFiltersPanelContent';
import { motion, AnimatePresence } from 'framer-motion';
import { SortField, SortOrder } from '@/hooks/books/useAdminBooks';

interface BookFiltersProps {
  searchQuery: string;
  setSearchQuery: (v: string) => void;
  showFilters: boolean;
  setShowFilters: (v: boolean) => void;
  selectedCategory: string;
  setSelectedCategory: (v: string) => void;
  statusFilter: 'all' | 'active' | 'inactive';
  setStatusFilter: (v: 'all' | 'active' | 'inactive') => void;
  sortField: SortField;
  setSortField: (v: SortField) => void;
  sortOrder: SortOrder;
  setSortOrder: (v: SortOrder) => void;
  categories: string[];
  filteredCount: number;
}

export const BookFilters: React.FC<BookFiltersProps> = ({
  searchQuery,
  setSearchQuery,
  showFilters,
  setShowFilters,
  selectedCategory,
  setSelectedCategory,
  statusFilter,
  setStatusFilter,
  sortField,
  setSortField,
  sortOrder,
  setSortOrder,
  categories,
  filteredCount,
}) => (
  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
    <div className="bg-white rounded-2xl shadow-lg p-4 border-2 border-gray-100">
      <div className="flex flex-col md:flex-row gap-4">
        <BookSearchInput searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        <BookFilterPanel
          showFilters={showFilters}
          setShowFilters={setShowFilters}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
          sortField={sortField}
          setSortField={setSortField}
          sortOrder={sortOrder}
          setSortOrder={setSortOrder}
          categories={categories}
          filteredCount={filteredCount}
          setSearchQuery={setSearchQuery}
          searchQuery={searchQuery}
        />
      </div>
      <AnimatePresence>
        {showFilters && (
          <BookFiltersPanelContent
            showFilters={showFilters}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            statusFilter={statusFilter}
            setStatusFilter={setStatusFilter}
            sortField={sortField}
            setSortField={setSortField}
            sortOrder={sortOrder}
            setSortOrder={setSortOrder}
            categories={categories}
            filteredCount={filteredCount}
            setSearchQuery={setSearchQuery}
          />
        )}
      </AnimatePresence>
    </div>
    {(searchQuery || selectedCategory !== 'all' || statusFilter !== 'all') && (
      <div className="mt-4 text-sm text-gray-600">
        <span className="font-semibold">{filteredCount}</span> résultat{filteredCount > 1 ? 's' : ''} trouvé{filteredCount > 1 ? 's' : ''}
      </div>
    )}
  </motion.div>
);
