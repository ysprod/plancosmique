"use client";
import { AdminBooksErrorAlert } from "@/components/admin/books/AdminBooksErrorAlert";
import { AdminBooksHeader } from "@/components/admin/books/AdminBooksHeader";
import { BookAddModal } from "@/components/admin/books/BookAddModal";
import { BookDeleteModal } from "@/components/admin/books/BookDeleteModal";
import { BookFilters } from "@/components/admin/books/BookFilters";
import { BookList } from "@/components/admin/books/BookList";
import { BookStats } from "@/components/admin/books/BookStats";
import { useAdminBooks } from "@/hooks/useAdminBooks";
import { motion } from "framer-motion";
import { Loader2, Plus } from "lucide-react";

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
      <AdminBooksHeader
        booksCount={books.length}
        loading={loading}
        fetchBooks={fetchBooks}
        openAddModal={openAddModal}
      />

      <AdminBooksErrorAlert error={error} onClose={() => setError(null)} />

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