"use client";
import { BookAddModal } from "@/components/admin/books/BookAddModal";
import { BookDeleteModal } from "@/components/admin/books/BookDeleteModal";
import { BookFilters } from "@/components/admin/books/BookFilters";
import { BookList } from "@/components/admin/books/BookList";
import { BookStats } from "@/components/admin/books/BookStats";
import { useAdminBooks } from "@/hooks/useAdminBooks";
import { AnimatePresence, motion } from "framer-motion";
import { Loader2, Plus, RefreshCw } from "lucide-react";

export default function AdminBooksPage() {
  const booksState = useAdminBooks();
  const {
    books,
    loading,
    error,
    setError,
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    statusFilter,
    setStatusFilter,
    sortField,
    setSortField,
    sortOrder,
    setSortOrder,
    showFilters,
    setShowFilters,
    deleteConfirm,
    setDeleteConfirm,
    showAddModal,
    currentStep,
    formData,
    setFormData,
    formErrors,
    submitting,
    fetchBooks,
    handleToggleActive,
    handleDeleteBook,
    handleNextStep,
    handlePrevStep,
    handleAddBook,
    openAddModal,
    closeAddModal,
    categories,
    filteredAndSortedBooks,
    stats,
  } = booksState;

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-indigo-600 animate-spin mx-auto mb-4" />
          <p className="text-gray-600 font-semibold">Chargement des livres...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 lg:p-6 max-w-7xl mx-auto">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <div className="flex items-center justify-between mb-4 flex-wrap gap-4">
          <div>
            <h1 className="text-3xl lg:text-4xl font-black text-gray-900 flex items-center gap-3">
              <span className="inline-block bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl p-2">
                <Plus className="w-8 h-8 text-white" />
              </span>
              Gestion des Livres
            </h1>
            <p className="text-gray-600 mt-2">
              Gérez votre catalogue de {books.length} livre{books.length > 1 ? "s" : ""} PDF
            </p>
          </div>
          <div className="flex gap-3 flex-wrap">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={fetchBooks}
              disabled={loading}
              className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl font-semibold transition-all disabled:opacity-50"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
              Actualiser
            </motion.button>
            {books.length > 0 && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={openAddModal}
                className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-xl font-bold shadow-lg hover:shadow-xl transition-all"
              >
                <Plus className="w-5 h-5" />
                Ajouter un livre
              </motion.button>
            )}
          </div>
        </div>
      </motion.div>

      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="mb-6 bg-red-50 border-2 border-red-200 rounded-xl p-4"
          >
            <div className="flex items-center justify-between">
              <p className="text-red-700 font-semibold">{error}</p>
              <button onClick={() => setError(null)} className="text-red-500 hover:text-red-700">
                ×
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <BookStats stats={stats} />

      {books.length > 0 && (
        <BookFilters
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
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
          filteredCount={filteredAndSortedBooks.length}
          totalCount={books.length}
        />
      )}

      {books.length === 0 ? (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-white rounded-2xl shadow-lg p-12 text-center border-2 border-gray-200">
          <span className="inline-block bg-gradient-to-br from-indigo-200 to-purple-300 rounded-xl p-4 mb-6">
            <Plus className="w-12 h-12 text-indigo-600" />
          </span>
          <h3 className="text-2xl font-bold text-gray-900 mb-3">Aucun livre disponible</h3>
          <p className="text-gray-600 mb-6">Cliquez sur "Initialiser les livres" pour ajouter les 4 livres par défaut</p>
        </motion.div>
      ) : filteredAndSortedBooks.length === 0 ? (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-white rounded-2xl shadow-lg p-12 text-center border-2 border-gray-200">
          <h3 className="text-2xl font-bold text-gray-900 mb-3">Aucun résultat</h3>
          <p className="text-gray-600 mb-6">Essayez de modifier vos critères de recherche ou vos filtres</p>
        </motion.div>
      ) : (
        <BookList
          books={filteredAndSortedBooks}
          onToggleActive={handleToggleActive}
          onDelete={id => setDeleteConfirm(id)}
          onEdit={() => alert("Fonctionnalité de modification à implémenter")}
        />
      )}

      <BookAddModal
        show={showAddModal}
        onClose={closeAddModal}
        currentStep={currentStep}
        formData={formData}
        setFormData={setFormData}
        formErrors={formErrors}
        submitting={submitting}
        handleNextStep={handleNextStep}
        handlePrevStep={handlePrevStep}
        handleAddBook={handleAddBook}
        categories={categories}
      />

      <BookDeleteModal
        show={!!deleteConfirm}
        onClose={() => setDeleteConfirm(null)}
        onConfirm={() => {
          if (deleteConfirm) handleDeleteBook(deleteConfirm);
        }}
      />
    </div>
  );
}